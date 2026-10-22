import { BASE, COMPOSE, COPY, DETAIL, LIGHT, MAXSEG, PLOUGH, SOFT, VERT, WARP } from "@/lib/welcome-gate-shaders";

/* The welcome gate's scene. What the visitor sees is one WebGL scene: deep water with the welcome floating in it, a thin
   still sheet of ice over the water, and snow over the ice. The pointer sweeps the snow aside; the welcome's logo, three
   lines and Enter button are laid out by the page, invisibly, and painted into the water from their positions. */

export type GateParts = {
  root: HTMLElement;
  canvas: HTMLCanvasElement;
  logo: HTMLImageElement;
  title: HTMLElement;      /* its children are the lines */
  enter: HTMLButtonElement;
};

type Program = { p: WebGLProgram; u: Record<string, WebGLUniformLocation> };
type Target = { tex: WebGLTexture; fb: WebGLFramebuffer; w: number; h: number; ok: boolean };
type Segment = [number, number, number, number, number, number, number, number];
type Box = [number, number, number, number];

const CELL = 2;                          /* CSS px per snow cell */
const DPR_CAP = 1.5;
const R_SLOW = 36, R_FAST = 46;          /* brush radius in CSS px; a fast sweep clears a little wider */
const RIM = 0.7, FRONT_SLOW = 1.0, FRONT_FAST = 1.4;
const SCOOP_R = 40, SCOOP_RIM = 0.8;
const WATER_MS = 1000 / 30;              /* the water moves slowly: 30 frames a second is plenty */

/* Starts the scene and returns its stop. onPass is called when the visitor is let in: the Enter button once swept free,
   or from the keyboard, or at once if this browser cannot draw the scene, so nobody is shut out behind a blank gate. */
export function startWelcomeGate(parts: GateParts, onPass: () => void): () => void {
  const { root, canvas, logo, title, enter } = parts;
  const gl = canvas.getContext("webgl2", { alpha: false, antialias: false, depth: false, stencil: false });
  if (!gl) {
    console.error("Welcome gate: this browser did not provide WebGL2, so the gate cannot be drawn; letting the visitor in.");
    onPass();
    return () => {};
  }
  if (!gl.getExtension("EXT_color_buffer_float")) {
    console.error("Welcome gate: this browser cannot render to float textures (EXT_color_buffer_float), so the gate cannot be drawn; letting the visitor in.");
    onPass();
    return () => {};
  }
  const g = gl;

  function program(frag: string): Program {
    const p = g.createProgram();
    for (const [type, src] of [[g.VERTEX_SHADER, VERT], [g.FRAGMENT_SHADER, frag]] as const) {
      const sh = g.createShader(type);
      if (!sh) throw new Error("Welcome gate: could not create a shader.");
      g.shaderSource(sh, src); g.compileShader(sh);
      if (!g.getShaderParameter(sh, g.COMPILE_STATUS)) throw new Error(`Welcome gate: shader failed to compile. ${g.getShaderInfoLog(sh)}`);
      g.attachShader(p, sh);
    }
    g.bindAttribLocation(p, 0, "aPos");
    g.linkProgram(p);
    if (!g.getProgramParameter(p, g.LINK_STATUS)) throw new Error(`Welcome gate: shader failed to link. ${g.getProgramInfoLog(p)}`);
    const u: Record<string, WebGLUniformLocation> = {};
    for (let i = g.getProgramParameter(p, g.ACTIVE_UNIFORMS) - 1; i >= 0; i--) {
      const info = g.getActiveUniform(p, i);
      if (!info) continue;
      const loc = g.getUniformLocation(p, info.name);
      if (loc) u[info.name.replace("[0]", "")] = loc;
    }
    return { p, u };
  }
  const progs = {
    base: program(BASE), copy: program(COPY), detail: program(DETAIL), warp: program(WARP), plough: program(PLOUGH),
    light: program(LIGHT), soft: program(SOFT), compose: program(COMPOSE),
  };
  g.bindVertexArray(g.createVertexArray());
  g.bindBuffer(g.ARRAY_BUFFER, g.createBuffer());
  g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), g.STATIC_DRAW);
  g.enableVertexAttribArray(0); g.vertexAttribPointer(0, 2, g.FLOAT, false, 0, 0);

  function texture(w: number, h: number, internal: number, format: number, type: number) {
    const tex = g.createTexture();
    g.bindTexture(g.TEXTURE_2D, tex);
    g.texImage2D(g.TEXTURE_2D, 0, internal, w, h, 0, format, type, null);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR); g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE); g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
    return tex;
  }
  function target(w: number, h: number, internal: number, format: number, type: number): Target {
    const tex = texture(w, h, internal, format, type), fb = g.createFramebuffer();
    g.bindFramebuffer(g.FRAMEBUFFER, fb);
    g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, tex, 0);
    return { tex, fb, w, h, ok: g.checkFramebufferStatus(g.FRAMEBUFFER) === g.FRAMEBUFFER_COMPLETE };
  }
  const release = (t: Target | null) => { if (t) { g.deleteTexture(t.tex); g.deleteFramebuffer(t.fb); } };

  /* the snow (two float textures read and written in turn, r = depth) and its resting shape; what never changes;
     the snow and ice layer; the welcome painted, and as it looks in the water */
  let sim = [0, 0], size = [0, 0];
  let state: Target[] = [], rest: Target | null = null, detail: Target | null = null, warp: Target | null = null;
  let layer: Target | null = null, soft: Target | null = null, content: WebGLTexture | null = null;

  /* one full-screen pass of a program into a target (null: the screen), with named textures and its own uniforms */
  function pass(prog: Program, out: Target | null, textures: Record<string, WebGLTexture>, setUniforms?: (u: Record<string, WebGLUniformLocation>) => void) {
    g.useProgram(prog.p);
    g.bindFramebuffer(g.FRAMEBUFFER, out ? out.fb : null);
    g.viewport(0, 0, out ? out.w : canvas.width, out ? out.h : canvas.height);
    Object.entries(textures).forEach(([name, tex], unit) => {
      const loc = prog.u[name];
      if (!loc) throw new Error(`Welcome gate: the shader has no texture named ${name}.`);
      g.activeTexture(g.TEXTURE0 + unit); g.bindTexture(g.TEXTURE_2D, tex); g.uniform1i(loc, unit);
    });
    if (prog.u.uSim) g.uniform2f(prog.u.uSim, sim[0], sim[1]);
    if (prog.u.uSize) g.uniform2f(prog.u.uSize, size[0], size[1]);
    if (setUniforms) setUniforms(prog.u);
    g.drawArrays(g.TRIANGLES, 0, 3);
  }
  function makeTargets() {
    [...state, rest, detail, warp, layer, soft].forEach(release);
    if (content) g.deleteTexture(content);
    sim = [Math.ceil(size[0] / CELL), Math.ceil(size[1] / CELL)];
    const snow = () => target(sim[0], sim[1], g.RGBA16F, g.RGBA, g.HALF_FLOAT);
    const full = () => target(canvas.width, canvas.height, g.RGBA8, g.RGBA, g.UNSIGNED_BYTE);
    state = [snow(), snow()]; rest = snow();
    detail = full(); warp = target(sim[0], sim[1], g.RGBA8, g.RGBA, g.UNSIGNED_BYTE); layer = full(); soft = full();
    content = texture(canvas.width, canvas.height, g.RGBA8, g.RGBA, g.UNSIGNED_BYTE);
    return [...state, rest, detail, warp, layer, soft].every(t => t.ok);
  }
  const need = <T,>(t: T | null): T => { if (!t) throw new Error("Welcome gate: used before its render targets were made."); return t; };
  function advance(prog: Program, setUniforms: (u: Record<string, WebGLUniformLocation>) => void) {
    pass(prog, state[1], { uState: state[0].tex, uBase: need(rest).tex }, setUniforms); state.reverse();
  }
  function buildStill() {
    pass(progs.base, need(rest), {});
    pass(progs.copy, state[1], { uBase: need(rest).tex }); state.reverse();
    pass(progs.detail, need(detail), {});
    pass(progs.warp, need(warp), {});
  }

  /* the snow and ice layer is reshaded only where it changed: around the latest sweeps, or everywhere ("all") */
  let view = [0, 0], glint = [0, 0];     /* glint: the eye the glitter was last drawn for, kept for partial reshades */
  let layerBox: Box | "all" | null = null;
  function markLayer(box: Box | "all") {
    layerBox = layerBox === "all" || box === "all" ? "all"
      : layerBox ? [Math.min(layerBox[0], box[0]), Math.min(layerBox[1], box[1]), Math.max(layerBox[2], box[2]), Math.max(layerBox[3], box[3])] : box;
  }
  function renderLayer() {
    if (!layerBox) return false;
    if (layerBox !== "all") {
      const s = canvas.width / size[0];
      const x0 = Math.max(0, Math.floor(layerBox[0] * s)), y0 = Math.max(0, Math.floor(layerBox[1] * s));
      const x1 = Math.min(canvas.width, Math.ceil(layerBox[2] * s)), y1 = Math.min(canvas.height, Math.ceil(layerBox[3] * s));
      layerBox = null;
      if (x1 <= x0 || y1 <= y0) return false;
      g.enable(g.SCISSOR_TEST); g.scissor(x0, y0, x1 - x0, y1 - y0);
    } else glint = view.slice();
    layerBox = null;
    pass(progs.light, need(layer), { uState: state[0].tex, uBase: need(rest).tex, uDetail: need(detail).tex }, u => g.uniform2f(u.uView, glint[0], glint[1]));
    g.disable(g.SCISSOR_TEST);
    return true;
  }

  /* the cursor lens: where it is and how visible; it fades in and out */
  let lens = [0, 0], lensVis = 0, lensWant = 0, lensMoved = false;
  function stepLens() {
    const before = lensVis;
    lensVis += (lensWant - lensVis) * 0.3;
    if (Math.abs(lensWant - lensVis) < 0.01) lensVis = lensWant;
    const changed = lensMoved || lensVis !== before;
    lensMoved = false;
    return changed;
  }

  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let button: Box = [0, 0, 0, 0], pivot = [0, 0], hover = 0;
  const start = performance.now();
  function compose(now: number) {
    const t = reduced.matches ? 0 : (now - start) / 1000;
    const bob = [Math.sin(t * 0.5) * 9 + Math.sin(t * 0.21 + 1.3) * 4, Math.cos(t * 0.37) * 6 + Math.sin(t * 0.17 + 0.4) * 3];
    const tilt = Math.sin(t * 0.33) * 0.008 + Math.sin(t * 0.13 + 2) * 0.004;
    const depth = 0.5 + 0.5 * Math.sin(t * 0.29 + 0.7);
    pass(progs.compose, null, { uLayer: need(layer).tex, uContent: need(content), uSoft: need(soft).tex, uWarp: need(warp).tex }, u => {
      g.uniform2f(u.uBob, bob[0], bob[1]); g.uniform1f(u.uTilt, tilt); g.uniform1f(u.uDepth, depth); g.uniform2f(u.uPivot, pivot[0], pivot[1]);
      g.uniform4f(u.uButton, button[0], button[1], button[2], button[3]); g.uniform1f(u.uHover, hover);
      g.uniform3f(u.uLens, lens[0], lens[1], lensVis);
    });
  }

  /* the welcome, painted where the page lays it out: the logo, the lines, the button as a slab of frosted ice. It is
     painted in the page's own font (Inter, or IBM Plex Sans Arabic on the Arabic pages), so it waits for that font and
     will not paint in any other. */
  const paper = document.createElement("canvas"), pen = paper.getContext("2d");
  if (!pen) throw new Error("Welcome gate: could not get a 2D canvas to paint the welcome.");
  const family = getComputedStyle(title).fontFamily.split(",")[0].trim();
  let ready = false;
  function paintContent() {
    if (!ready || !size[0] || !pen) return;
    paper.width = canvas.width; paper.height = canvas.height;
    const s = canvas.width / size[0], c = canvas.getBoundingClientRect();
    const box = (r: DOMRect) => ({ x: r.left - c.left, y: r.top - c.top, w: r.width, h: r.height });
    pen.setTransform(s, 0, 0, s, 0, 0);
    pen.clearRect(0, 0, size[0], size[1]);

    const f = box(title.parentElement!.getBoundingClientRect());
    pivot = [f.x + f.w / 2, size[1] - (f.y + f.h / 2)];

    const l = box(logo.getBoundingClientRect());
    pen.shadowColor = "rgba(56,189,248,.45)"; pen.shadowBlur = 22 * s;
    pen.drawImage(logo, l.x, l.y, l.w, l.h);

    /* the lines keep the page's own letter spacing: tight in English, none in Arabic, whose letters join */
    const titleStyle = getComputedStyle(title), fs = parseFloat(titleStyle.fontSize);
    pen.font = `800 ${fs}px ${family}`; pen.letterSpacing = titleStyle.letterSpacing === "normal" ? "0px" : titleStyle.letterSpacing;
    pen.textAlign = "center"; pen.textBaseline = "alphabetic";
    pen.fillStyle = "rgba(226,244,255,.95)"; pen.shadowColor = "rgba(125,211,252,.4)"; pen.shadowBlur = 26 * s;
    for (const line of Array.from(title.children)) {
      const text = line.textContent;
      if (!text) continue;
      const r = box(line.getBoundingClientRect()), m = pen.measureText(text);
      pen.fillText(text, r.x + r.w / 2, r.y + r.h / 2 + (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2);
    }

    const b = box(enter.getBoundingClientRect()), rad = b.h / 2;
    button = [b.x, size[1] - (b.y + b.h), b.x + b.w, size[1] - b.y];
    pen.beginPath(); pen.roundRect(b.x + 0.5, b.y + 0.5, b.w - 1, b.h - 1, rad - 0.5);
    const fill = pen.createLinearGradient(b.x, b.y, b.x + b.w * 0.5, b.y + b.h * 1.4);
    fill.addColorStop(0, "rgba(215,242,255,.45)"); fill.addColorStop(0.55, "rgba(155,210,242,.2)"); fill.addColorStop(1, "rgba(215,242,255,.34)");
    pen.shadowColor = "rgba(125,211,252,.35)"; pen.shadowBlur = 24 * s;
    pen.fillStyle = fill; pen.fill();
    pen.shadowBlur = 0;
    pen.strokeStyle = "rgba(225,247,255,.8)"; pen.lineWidth = 1.5; pen.stroke();
    pen.beginPath(); pen.roundRect(b.x + 1.5, b.y + 1.5, b.w - 3, b.h - 3, rad - 1.5);
    const shine = pen.createLinearGradient(0, b.y, 0, b.y + b.h);
    shine.addColorStop(0, "rgba(255,255,255,.55)"); shine.addColorStop(0.3, "rgba(255,255,255,0)");
    pen.strokeStyle = shine; pen.stroke();
    const label = enter.firstChild;
    if (!label || !label.textContent) throw new Error("Welcome gate: the Enter button has no label to paint.");
    const range = document.createRange(); range.selectNodeContents(label);
    const tr = box(range.getBoundingClientRect());
    pen.font = `600 15px ${family}`; pen.letterSpacing = "0px"; pen.textAlign = "left"; pen.fillStyle = "#f4fbff";
    const tm = pen.measureText(label.textContent);
    pen.fillText(label.textContent, tr.x, tr.y + tr.h / 2 + (tm.actualBoundingBoxAscent - tm.actualBoundingBoxDescent) / 2);
    const arrow = enter.querySelector("svg");
    if (!arrow) throw new Error("Welcome gate: the Enter button has no arrow to paint.");
    const a = box(arrow.getBoundingClientRect()), k = a.w / 24;
    /* the arrow points the way the page reads: right in English, left in Arabic */
    const ax = getComputedStyle(enter).direction === "rtl" ? (u: number) => a.x + (24 - u) * k : (u: number) => a.x + u * k;
    pen.strokeStyle = "#f4fbff"; pen.lineWidth = 2 * k; pen.lineCap = "round"; pen.lineJoin = "round";
    pen.beginPath();
    pen.moveTo(ax(5), a.y + 12 * k); pen.lineTo(ax(19), a.y + 12 * k);
    pen.moveTo(ax(12), a.y + 5 * k); pen.lineTo(ax(19), a.y + 12 * k); pen.lineTo(ax(12), a.y + 19 * k);
    pen.stroke();

    g.bindTexture(g.TEXTURE_2D, need(content));
    g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, true); g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    g.texImage2D(g.TEXTURE_2D, 0, g.RGBA8, g.RGBA, g.UNSIGNED_BYTE, paper);
    g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, false); g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    pass(progs.soft, need(soft), { uContent: need(content) });
    composeNeeded = true; request();
  }
  let stopped = false;
  Promise.all([document.fonts.load(`800 100px ${family}`), document.fonts.load(`600 15px ${family}`), logo.decode()]).then(() => {
    if (stopped) return;
    if (!document.fonts.check(`800 100px ${family}`) || !document.fonts.check(`600 15px ${family}`)) {
      console.error(`Welcome gate: the font ${family} did not load, so the welcome cannot be painted; letting the visitor in.`);
      onPass();
      return;
    }
    ready = true;
    paintContent();
  }, err => {
    if (stopped) return;
    console.error("Welcome gate: the welcome could not be prepared; letting the visitor in.", err);
    onPass();
  });

  const pending: Segment[] = [];
  function flush() {
    if (!pending.length) return;
    for (const e of pending) {             /* what a sweep can change: its capsule, its banks, and the shading around them */
      const m = e[4] * 2.8 + 40;
      markLayer([Math.min(e[0], e[2]) - m, Math.min(e[1], e[3]) - m, Math.max(e[0], e[2]) + m, Math.max(e[1], e[3]) + m]);
    }
    for (let i = 0; i < pending.length; i += MAXSEG) {
      const batch = pending.slice(i, i + MAXSEG), seg = new Float32Array(MAXSEG * 4), par = new Float32Array(MAXSEG * 4);
      batch.forEach((e, k) => { seg.set(e.slice(0, 4), k * 4); par.set(e.slice(4), k * 4); });
      advance(progs.plough, u => { g.uniform4fv(u.uSeg, seg); g.uniform4fv(u.uPar, par); g.uniform1i(u.uCount, batch.length); });
    }
    pending.length = 0;
    swept = true;
  }

  /* a frame is drawn when something changed: a sweep (reshading only around it), the lens, the button, or, once any ice
     shows, the welcome drifting under it, 30 times a second (still, for anyone who asks for reduced motion) */
  let frameId = 0, swept = false, drawn = 0, composeNeeded = true;
  function frame(now: number) {
    frameId = 0;
    flush();
    const layerChanged = renderLayer(), lensChanged = stepLens();
    const water = swept && !reduced.matches;
    if (layerChanged || lensChanged || composeNeeded || (water && now - drawn >= WATER_MS)) { compose(now); drawn = now; composeNeeded = false; }
    if (water || lensVis !== lensWant) request();
  }
  function request() { if (!frameId && size[0] && !stopped) frameId = requestAnimationFrame(frame); }

  function rebuild() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    const s = Math.min(devicePixelRatio, DPR_CAP);
    canvas.width = Math.round(w * s); canvas.height = Math.round(h * s);
    size = [w, h];
    if (!makeTargets()) throw new Error("Welcome gate: a render target is incomplete on this GPU.");
    pending.length = 0; swept = false;
    buildStill(); markLayer("all"); composeNeeded = true; paintContent(); request();
  }
  const resize = new ResizeObserver(rebuild);
  resize.observe(canvas);

  const smooth = (a: number, b: number, x: number) => { const t = Math.min(Math.max((x - a) / (b - a), 0), 1); return t * t * (3 - 2 * t); };
  function local(e: PointerEvent | MouseEvent) {
    const b = canvas.getBoundingClientRect();
    return [(e.clientX - b.left) * canvas.clientWidth / b.width, (e.clientY - b.top) * canvas.clientHeight / b.height];
  }
  /* mouse, pen or finger: each move sweeps along the whole segment since the last position, so a fast sweep stays continuous */
  let prev: [number, number, number, boolean] | null = null, speed = 0, glitter = 0;
  function onMove(e: PointerEvent) {
    if (!size[0]) return;
    const mouse = e.pointerType === "mouse";
    lensWant = mouse ? 1 : 0;              /* the lens is the mouse's cursor; a finger needs none */
    root.classList.toggle("lens", mouse);
    if (!mouse && !e.buttons) { request(); return; }
    const [x, y] = local(e);
    lens = [x, size[1] - y]; lensMoved = true;
    view = [x / size[0] - 0.5, 0.5 - y / size[1]];
    /* the glitter follows the eye everywhere, so all the snow is reshaded, but only about 12 times a second */
    if (e.timeStamp - glitter > 80) { glitter = e.timeStamp; markLayer("all"); }
    request();
    if (!prev) { prev = [x, y, e.timeStamp, true]; return; }
    const moved = Math.hypot(x - prev[0], y - prev[1]);
    if (moved < 0.75) return;
    speed = speed * 0.5 + moved / Math.max(e.timeStamp - prev[2], 4) * 0.5;
    const f = smooth(0.15, 2.4, speed);
    pending.push([prev[0], size[1] - prev[1], x, size[1] - y, R_SLOW + (R_FAST - R_SLOW) * f, RIM, FRONT_SLOW + (FRONT_FAST - FRONT_SLOW) * f, prev[3] ? 2 : 0]);
    request();
    prev = [x, y, e.timeStamp, false];
  }
  const end = () => { prev = null; speed = 0; };
  const onLeave = () => { end(); lensWant = 0; request(); };
  const onUp = (e: PointerEvent) => { if (e.pointerType !== "mouse") end(); };
  function scoop(e: MouseEvent) {
    const [x, y] = local(e);
    pending.push([x, size[1] - y, x, size[1] - y, SCOOP_R, SCOOP_RIM, 1, 1]);
    request();
  }
  /* a click anywhere but the button scoops a round hollow */
  const onClick = (e: MouseEvent) => { if (size[0] && !(e.target instanceof Element && e.target.closest("button") === enter)) scoop(e); };

  /* the button is frozen under the snow too: it lets the visitor in only once most of the snow over it is swept away */
  function clearedShare(r: DOMRect) {        /* share of the cells over a screen box that are down to bare ice */
    flush();
    const c = canvas.getBoundingClientRect();
    const x0 = Math.max(0, Math.floor((r.left - c.left) / CELL)), x1 = Math.min(sim[0], Math.ceil((r.right - c.left) / CELL));
    const y0 = Math.max(0, Math.floor((c.bottom - r.bottom) / CELL)), y1 = Math.min(sim[1], Math.ceil((c.bottom - r.top) / CELL));
    const w = x1 - x0, h = y1 - y0;
    if (w <= 0 || h <= 0) return 0;
    const cells = new Float32Array(w * h * 4);
    g.bindFramebuffer(g.FRAMEBUFFER, state[0].fb);
    g.readPixels(x0, y0, w, h, g.RGBA, g.FLOAT, cells);
    const err = g.getError();
    if (err !== g.NO_ERROR) throw new Error(`Welcome gate: reading the snow over the button failed (WebGL error ${err}).`);
    let bare = 0;
    for (let i = 0; i < w * h; i++) if (cells[i * 4] < 0.2) bare++;
    return bare / (w * h);
  }
  const isFree = () => size[0] > 0 && clearedShare(enter.getBoundingClientRect()) >= 0.55;
  let checked = 0;
  const onEnterMove = (e: PointerEvent) => {
    if (e.timeStamp - checked < 120) return;
    checked = e.timeStamp;
    const ok = isFree();
    enter.classList.toggle("free", ok);
    if (hover !== (ok ? 1 : 0)) { hover = ok ? 1 : 0; composeNeeded = true; request(); }
  };
  const onEnterLeave = () => { if (hover) { hover = 0; composeNeeded = true; request(); } };
  const onEnterClick = (e: MouseEvent) => {
    if (e.detail === 0 || isFree()) onPass();  /* from the keyboard, or once swept free */
    else scoop(e);
  };
  /* reaching it with the keyboard sweeps the snow off it, so it can be seen */
  const onEnterFocus = () => {
    if (!size[0] || !enter.matches(":focus-visible")) return;
    const c = canvas.getBoundingClientRect(), r = enter.getBoundingClientRect(), y = c.bottom - (r.top + r.bottom) / 2;
    pending.push([r.left - c.left + r.height / 2, y, r.right - c.left - r.height / 2, y, r.height * 0.95, RIM, FRONT_SLOW, 2]);
    request();
    enter.classList.add("free");
  };

  window.addEventListener("pointermove", onMove);
  document.documentElement.addEventListener("pointerleave", onLeave);
  window.addEventListener("pointerup", onUp);
  window.addEventListener("pointercancel", end);
  window.addEventListener("click", onClick);
  enter.addEventListener("pointermove", onEnterMove);
  enter.addEventListener("pointerleave", onEnterLeave);
  enter.addEventListener("click", onEnterClick);
  enter.addEventListener("focus", onEnterFocus);

  return () => {
    stopped = true;
    if (frameId) cancelAnimationFrame(frameId);
    resize.disconnect();
    window.removeEventListener("pointermove", onMove);
    document.documentElement.removeEventListener("pointerleave", onLeave);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", end);
    window.removeEventListener("click", onClick);
    enter.removeEventListener("pointermove", onEnterMove);
    enter.removeEventListener("pointerleave", onEnterLeave);
    enter.removeEventListener("click", onEnterClick);
    enter.removeEventListener("focus", onEnterFocus);
    /* free the GPU memory but keep the context: React may mount the gate again on this same canvas */
    [...state, rest, detail, warp, layer, soft].forEach(release);
    if (content) g.deleteTexture(content);
    Object.values(progs).forEach(p => g.deleteProgram(p.p));
  };
}
