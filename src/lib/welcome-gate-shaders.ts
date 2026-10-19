/* The welcome gate's shaders: snow over a thin sheet of ice over deep water, with the welcome floating in it.
   See welcome-gate.ts for how they are used. */

/* sweep segments handled in one pass */
export const MAXSEG = 16;

const NOISE = `
  float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
  vec2 hash22(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973)); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.xx + p3.yz) * p3.zy); }
  float gnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p), u = f * f * f * (f * (f * 6. - 15.) + 10.);
    float a = dot(hash22(i) * 2. - 1., f), b = dot(hash22(i + vec2(1, 0)) * 2. - 1., f - vec2(1, 0));
    float c = dot(hash22(i + vec2(0, 1)) * 2. - 1., f - vec2(0, 1)), d = dot(hash22(i + vec2(1, 1)) * 2. - 1., f - vec2(1, 1));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }
  float fbm(vec2 p, int n) { float s = 0., a = .5; for (int i = 0; i < n; i++) { s += a * gnoise(p); p = mat2(1.6, 1.2, -1.2, 1.6) * p + vec2(19.7, 7.3); a *= .5; } return s; }`;
export const VERT = `#version 300 es
  in vec2 aPos; out vec2 vUv;
  void main() { vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`;
const HEAD = `#version 300 es
  precision highp float;
  precision highp sampler2D;
  uniform sampler2D uState, uBase;
  uniform vec2 uSim, uSize;    /* snow cells; CSS px */
  in vec2 vUv; out vec4 o;` + NOISE;

/* the resting snow: an even blanket with broad soft swells */
export const BASE = HEAD + `
  void main() {
    vec2 p = vUv * uSize, sp = p + vec2(311., 173.);
    float h = 1. + .5 * fbm(sp / 620., 3) + .1 * fbm(sp / 140. + 9.1, 3);
    o = vec4(h, 0., 0., 1.);
  }`;
export const COPY = HEAD + `
  void main() { o = vec4(texture(uBase, vUv).r, 0., 0., 1.); }`;

/* what never changes, worked out once: the snow's own surface texture (rg, as a slope) and the ice's own light (b):
   a soft sky reflection, a sheen, a few hairline cracks, trapped bubbles and milky patches */
export const DETAIL = HEAD + `
  float surf(vec2 p) { return 1.6 * fbm(p / 26. + 2.3, 3) + .5 * gnoise(p / 7. + 5.1) + .22 * gnoise(p / 2.4 + 8.7); }
  float crackDist(vec2 p) {                /* CSS px to the nearest crack: the borders of a warped cell pattern */
    const float S = 170.;
    vec2 x = p / S + .35 * vec2(fbm(p / 260., 2), fbm(p / 260. + 5.2, 2));
    vec2 n = floor(x), f = fract(x), mr = vec2(0.);
    float md = 8.;
    for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(i, j), r = g + hash22(n + g) - f;
      float d = dot(r, r);
      if (d < md) { md = d; mr = r; }
    }
    md = 8.;
    for (int j = -2; j <= 2; j++) for (int i = -2; i <= 2; i++) {
      vec2 g = vec2(i, j), r = g + hash22(n + g) - f;
      if (dot(mr - r, mr - r) > 1e-5) md = min(md, dot(.5 * (mr + r), normalize(r - mr)));
    }
    return md * S;
  }
  void main() {
    vec2 p = vUv * uSize, e = vec2(.75, 0.);
    vec2 gt = vec2(surf(p + e) - surf(p - e), surf(p + e.yx) - surf(p - e.yx)) / 1.5;
    float sky = .05 + .06 * smoothstep(0., 1., vUv.y * .7 + (1. - vUv.x) * .3);
    float sheen = .05 * smoothstep(.55, 1., sin((p.x + p.y * .55) / 380. + .6) * .5 + .5);
    float crack = (1. - smoothstep(.3, 1.4, crackDist(p))) * .45 * smoothstep(-.05, .25, gnoise(p / 420. + 3.));
    vec2 bc = floor(p / 18.);
    float br = 1. + 2.2 * hash12(bc + 29.);
    float bub = step(.86, hash12(bc + 71.)) * (1. - smoothstep(br - .6, br + .4, length(p - (bc + .2 + .6 * hash22(bc + 13.)) * 18.))) * .22;
    float haze = .07 * smoothstep(-.15, .45, fbm(p / 190. + 7.7, 3));
    o = vec4(clamp(.5 + gt / 2.4, 0., 1.), min(sky + sheen + crack + bub + haze, 1.), 1.);
  }`;

/* the ice is uneven, so it bends what lies under it, a little, and always the same way: worked out once */
export const WARP = HEAD + `
  void main() {
    vec2 p = vUv * uSize;
    vec2 w = vec2(fbm(p / 210. + 3.3, 3), fbm(p / 210. + 8.1, 3)) * 9. + vec2(gnoise(p / 60.), gnoise(p / 60. + 4.)) * 1.5;
    o = vec4(clamp(.5 + w / 24., 0., 1.), 0., 1.);
  }`;

/* the sweep: each capsule clears the snow down to bare ice and pushes it into clumpy banks beside the stroke and a pile
   ahead of it. Only snow that was really there gets pushed, and only onto snow, so swept ice stays clear. */
export const PLOUGH = HEAD + `
  #define MAXSEG ${MAXSEG}
  uniform vec4 uSeg[MAXSEG];   /* from A.xy to B.xy, CSS px from the bottom left */
  uniform vec4 uPar[MAXSEG];   /* radius, bank gain, front pile gain, kind: 0 a stroke going on, 1 a scoop, 2 the first segment of a stroke */
  uniform int uCount;
  float bump(float x, float R, float band) { return x > R && x < R + band ? .5 - .5 * cos(6.2831853 * (x - R) / band) : 0.; }
  void main() {
    vec2 p = vUv * uSize;
    float h = texture(uState, vUv).r, b = texture(uBase, vUv).r;
    float jag = 4. * gnoise(p / 9.) + 1.2 * gnoise(p / 3.5 + 5.);           /* ragged edge, CSS px */
    float lump = .6 + .8 * smoothstep(-.3, .4, gnoise(p / 12. + 1.7));     /* banks break into soft clumps */
    vec2 cc = floor(p / 6.);                                                 /* loose crumbs: a few small round lumps */
    float crumb = step(.92, hash12(cc + 7.)) * (1. - smoothstep(1.2, 2.6, length(p - (cc + .5) * 6. - (hash22(cc + 3.) - .5) * 3.)));
    for (int i = 0; i < MAXSEG; i++) {
      if (i >= uCount) break;
      vec2 A = uSeg[i].xy, B = uSeg[i].zw;
      float R = uPar[i].x, g = uPar[i].y, front = uPar[i].z, kind = uPar[i].w;
      float band = R * .7, len = length(B - A);
      vec2 dir = len > 1e-3 ? (B - A) / len : vec2(1., 0.);
      float t = dot(p - A, dir);
      /* behind its start a segment leaves the snow to the one before it, so a stroke never re-cuts its own joints */
      if (kind < .5 && t < 0.) continue;
      vec2 q = A + dir * clamp(t, 0., len);
      float d = length(p - q);
      if (d > 2.8 * R) continue;
      float dj = d + jag;
      /* how much snow the brush is pushing: measured just ahead of it, past the spot the previous segment already cleared */
      vec2 qs = abs(kind - 1.) < .5 ? q : q + dir * R;
      float hc = clamp(texture(uState, qs / uSize).r, 0., 1.5);
      /* bare ice in the middle, walls of snow rising to the ragged edge, a few crumbs left behind on the ice */
      if (dj < R) h = min(h, b * smoothstep(R * .62, R, dj) + crumb * .25 * smoothstep(R * .3, R * .9, dj));
      float rim;
      if (abs(kind - 1.) < .5) rim = bump(dj, R, band);
      else {
        float lat = abs(dot(p - A, vec2(-dir.y, dir.x))) + jag;
        /* along the stroke each segment's bank fades in and out so that consecutive segments add up to exactly one bank,
           however long the segments are: a fast sweep gets the same even bank as a slow one */
        float X = .5 * R, along = (kind > 1.5 ? 1. : smoothstep(0., X, t)) - smoothstep(len, len + X, t);
        rim = t < 0. ? bump(dj, R, band) * (1. - smoothstep(.15, .65, dot(normalize(p - A), -dir)))
                     : bump(lat, R, band) * along;
        if (t > len) rim = max(rim, front * bump(length(p - B) + jag, R, band) * smoothstep(.9, .99, dot(normalize(p - B), dir)));
      }
      float add = g * lump * rim * hc * smoothstep(.15, .6, h / max(b, .01));
      float cap = b * (1. + g * lump);
      if (h < cap) h = min(h + add, cap);
    }
    o = vec4(h, 0., 0., 1.);
  }`;

/* the snow and the ice, drawn into their own layer (premultiplied) only when they change.
   Snow: white in soft daylight from the top left, cool light grey in shade, a packed uneven surface, glitter.
   Ice, where the snow is gone: a thin clear sheet with its own light, and frost along the edge of the snow. */
export const LIGHT = HEAD + `
  uniform sampler2D uDetail;
  uniform vec2 uView;      /* the pointer's offset from the centre, -0.5..0.5: the eye moves with it, so the glitter shifts */
  const vec3 L = vec3(-.62, .5, .6);
  const float HS = 22.;    /* CSS px of relief per unit of snow depth */
  const float HB = 160.;   /* relief that shows the broad swells of the resting snow */
  const vec3 WHITE = vec3(.955, .962, .972), SHADE = vec3(.72, .76, .82);   /* glints alone reach full white */
  float H(vec2 uv) { return texture(uState, uv).r; }
  float B(vec2 uv) { return texture(uBase, uv).r; }
  void main() {
    vec3 l = normalize(L);
    vec2 px = 1. / uSize, p = vUv * uSize;
    float h = H(vUv);
    vec4 dt = texture(uDetail, vUv);

    vec2 gs = vec2(H(vUv + vec2(2., 0.) * px) - H(vUv - vec2(2., 0.) * px), H(vUv + vec2(0., 2.) * px) - H(vUv - vec2(0., 2.) * px)) / 4.;
    vec2 gb = vec2(B(vUv + vec2(16., 0.) * px) - B(vUv - vec2(16., 0.) * px), B(vUv + vec2(0., 16.) * px) - B(vUv - vec2(0., 16.) * px)) / 32.;
    vec3 n = normalize(vec3(-(gs * HS + gb * HB + (dt.rg - .5) * 2.4), 1.));
    vec2 ld = normalize(l.xy);
    float rise = l.z / length(l.xy) / HS;
    float occ = 0.;
    for (int i = 1; i <= 10; i++) { float t = float(i) * 2.5; occ = max(occ, (H(vUv + ld * t * px) - h - t * rise) / (.06 + t * .015)); }
    float sh = 1. - .55 * smoothstep(0., 1., occ);
    float ring = 0.;
    for (int i = 0; i < 8; i++) { float a = float(i) * .785398 + .39; ring += H(vUv + vec2(cos(a), sin(a)) * 9. * px); }
    ring /= 8.;
    float ao = 1. - clamp((ring - h) * .9, 0., .5);
    float k = smoothstep(.15, .95, clamp((dot(n, l) * .5 + .5) * sh * ao, 0., 1.));
    vec3 col = mix(SHADE, WHITE, k);
    vec2 cell = floor(p / 3.);
    vec3 facet = normalize(vec3((hash22(cell + 7.) - .5) * 1.4, 1.));
    vec3 V = normalize(vec3(uView * .8, 1.));
    float g = pow(max(dot(facet, normalize(l + V)), 0.), 120.) * step(.2, hash12(cell + 93.));
    float dg = length(p - (cell + .25 + .5 * hash22(cell + 41.)) * 3.);
    float spark = g * sh * ((1. - smoothstep(.4, 1.3, dg)) + .5 * smoothstep(.5, 1., g) * (1. - smoothstep(.9, 2.8, dg)));
    col = mix(col, hash12(cell + 61.) < .85 ? vec3(1.) : vec3(.86, .95, 1.), clamp(spark * 1.4, 0., 1.));
    float snowA = smoothstep(.03, .32, h);

    float tintA = .1, w = dt.b + smoothstep(.02, .45, ring) * .45;
    vec4 ice = min(vec4(vec3(.72, .88, 1.) * tintA + w, tintA + w), vec4(1.));
    o = mix(ice, vec4(col, 1.), snowA);
    o.rgb += (hash12(gl_FragCoord.xy) - .5) / 255. * o.a;
  }`;

/* the welcome as it looks in the water, worked out once: a little soft, and taking on the water's colour */
export const SOFT = `#version 300 es
  precision highp float;
  uniform sampler2D uContent;
  uniform vec2 uSize;
  in vec2 vUv; out vec4 o;
  void main() {
    vec2 px = 1. / uSize;
    vec4 c = texture(uContent, vUv) * .4
           + (texture(uContent, vUv + vec2(1.2, 0.) * px) + texture(uContent, vUv - vec2(1.2, 0.) * px)
            + texture(uContent, vUv + vec2(0., 1.2) * px) + texture(uContent, vUv - vec2(0., 1.2) * px)) * .15;
    o = vec4(mix(c.rgb, c.a * vec3(.35, .62, .78), .14), c.a);
  }`;

/* every water frame: the deep navy, the welcome floating in it (drifting, rocking, slowly sinking and rising: sharper and
   brighter near the ice, softer and dimmer deeper down) seen through the still, uneven ice that bends it, and the snow and
   ice layer on top. Four texture reads a pixel. */
export const COMPOSE = `#version 300 es
  precision highp float;
  uniform sampler2D uLayer, uContent, uSoft, uWarp;
  uniform vec2 uSize;      /* CSS px */
  uniform vec2 uBob;       /* the welcome's drift, CSS px */
  uniform float uTilt;     /* its tilt, radians */
  uniform float uDepth;    /* 0 just under the ice, 1 deeper down */
  uniform vec2 uPivot;     /* the point it turns about, CSS px from the bottom left */
  uniform vec4 uButton;    /* the button's box: left, bottom, right, top, CSS px from the bottom left */
  uniform float uHover;    /* the button lights up under the pointer once it is free */
  uniform vec3 uLens;      /* the cursor lens: x, y in CSS px from the bottom left, how visible 0..1 */
  in vec2 vUv; out vec4 o;
  float roundBox(vec2 p, vec4 r) {
    vec2 c = (r.xy + r.zw) * .5, hs = (r.zw - r.xy) * .5;
    vec2 q = abs(p - c) - hs + hs.y;
    return length(max(q, 0.)) + min(max(q.x, q.y), 0.) - hs.y;
  }
  /* the scene at a point, CSS px from the bottom left: the snow and ice layer over the deep water and the floating welcome */
  vec3 scene(vec2 p) {
    vec2 uv = p / uSize;
    vec4 top = texture(uLayer, uv);
    if (top.a > .997) return top.rgb;                       /* under the snow nothing below shows */
    float d = length(uv - vec2(.5, .54)) / length(vec2(.5, .54));
    vec3 bg = d < .42 ? mix(vec3(.071, .188, .353), vec3(.043, .102, .2), d / .42)
                      : mix(vec3(.043, .102, .2), vec3(.027, .047, .09), clamp((d - .42) / .36, 0., 1.));
    vec2 q = p - (texture(uWarp, uv).rg - .5) * 24.;
    vec2 r = q - uPivot - uBob;
    float cs = cos(uTilt), sn = sin(uTilt);
    vec2 src = uPivot + vec2(cs * r.x + sn * r.y, -sn * r.x + cs * r.y);
    vec4 sharp = texture(uContent, src / uSize);
    vec4 c = mix(vec4(mix(sharp.rgb, sharp.a * vec3(.35, .62, .78), .1), sharp.a), texture(uSoft, src / uSize), .35 + .65 * uDepth);
    c.rgb *= (1. - .14 * uDepth) * (1. + .35 * uHover * (1. - smoothstep(-1., 1., roundBox(src, uButton))));
    return top.rgb + (c.rgb + bg * (1. - c.a)) * (1. - top.a);
  }
  void main() {
    vec2 p = vUv * uSize, lc = uLens.xy;
    vec3 col = scene(p);
    float dl = length(p - lc);
    if (uLens.z > 0. && dl < 70.) {
      /* the cursor lens. How much of the area around it is bare ice: judged over a wide ring, since the brush always
         leaves bare ice right under the cursor. In snow (one fresh trench) it is frosted glass the size of the brush;
         over a cleared patch, a clear lens that magnifies what is frozen beneath */
      vec2 px = 1. / uSize;
      float snow = 0.;
      for (int i = 0; i < 8; i++) { float a = float(i) * .785398; snow += texture(uLayer, (lc + vec2(cos(a), sin(a)) * 56.) * px).a; }
      float ice = 1. - smoothstep(.2, .55, snow / 8.);
      float R = mix(36., 58., ice) * (1. - .22 * uHover);
      vec2 dir = p - lc;
      float r = dl / R;
      if (r < 1.) {
        float f = mix(1. / mix(1., 1.7, ice), 1., r * r);     /* magnified in the middle, true again at the rim */
        float split = .035 * ice * r * r;                      /* the colours part a touch toward the rim */
        vec3 seen = vec3(scene(lc + dir * f * (1. + split)).r, scene(lc + dir * f).g, scene(lc + dir * f * (1. - split)).b);
        seen = mix(seen, vec3(.95, .97, 1.), .1 * (1. - ice));                               /* frosted over snow */
        seen += smoothstep(.42, 0., length(dir / R - vec2(-.36, .4))) * .3 * ice;             /* a soft shine, top left */
        col = mix(col, seen, uLens.z);
      }
      /* the rim: darker over snow so it shows on white, frosted white over ice, cyan over the button once it is free */
      float ring = smoothstep(1.6, .3, abs(dl - R + 1.));
      vec3 rim = mix(mix(vec3(.38, .5, .62), vec3(.92, .97, 1.), ice), vec3(.45, .9, 1.), uHover);
      col = mix(col, rim, ring * uLens.z * mix(.75, .6, ice));
      col = mix(col, vec3(.3, .45, .58), (1. - smoothstep(1.2, 2.2, dl)) * (1. - ice) * uLens.z * .8);   /* the centre, over snow */
    }
    o = vec4(col, 1.);
  }`;
