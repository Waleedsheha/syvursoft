"use client";

import { useEffect, useId, useRef } from "react";
import { animate, stagger, svg } from "animejs";
import { products, type ProductId } from "@/lib/products";

const mapProducts = ["radex", "mend", "adam"] satisfies ProductId[];

const nodes = [
  {
    id: "syvursoft",
    name: "Syvursoft",
    role: "Clinical software ecosystem",
    x: 320,
    y: 210,
    width: 190,
    height: 82,
    tone: "central",
  },
  {
    id: "radex",
    name: "RADex",
    role: "Radiology engine",
    x: 128,
    y: 114,
    width: 154,
    height: 72,
    tone: "radex",
  },
  {
    id: "mend",
    name: "MEND",
    role: "Facility operations",
    x: 512,
    y: 114,
    width: 154,
    height: 72,
    tone: "mend",
  },
  {
    id: "adam",
    name: "ADAM",
    role: "Clinical intelligence",
    x: 320,
    y: 342,
    width: 154,
    height: 72,
    tone: "adam",
  },
] as const;

const productNames = mapProducts
  .map((productId) => products.find(({ id }) => id === productId)?.name)
  .filter(Boolean)
  .join(", ");

const drawableAttributeNames = [
  "pathLength",
  "stroke-dasharray",
  "stroke-dashoffset",
] as const;

type DrawableAttributeName = (typeof drawableAttributeNames)[number];

function NodeLabel({
  filterId,
  node,
}: {
  filterId: string;
  node: (typeof nodes)[number];
}) {
  const left = node.x - node.width / 2;
  const top = node.y - node.height / 2;

  return (
    <g
      aria-hidden="true"
      className={`system-map-node system-map-node-${node.tone}`}
      filter={`url(#${filterId})`}
    >
      <rect
        x={left}
        y={top}
        width={node.width}
        height={node.height}
        rx="8"
        className="system-map-node-shell"
      />
      <text
        x={node.x}
        y={node.y - 6}
        textAnchor="middle"
        className="system-map-node-title"
      >
        {node.name}
      </text>
      <text
        x={node.x}
        y={node.y + 18}
        textAnchor="middle"
        className="system-map-node-role"
      >
        {node.role}
      </text>
    </g>
  );
}

export default function AnimatedSystemMap() {
  const reactId = useId().replace(/:/g, "");
  const headingId = `${reactId}-system-map-title`;
  const svgTitleId = `${reactId}-system-map-svg-title`;
  const pathGradientId = `${reactId}-system-map-path-gradient`;
  const shadowFilterId = `${reactId}-system-map-soft-shadow`;
  const mapRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mapElement = mapRef.current;

    if (!mapElement) {
      return;
    }

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (reducedMotionQuery.matches) {
      return;
    }

    const paths = Array.from(
      mapElement.querySelectorAll<SVGPathElement>(".system-map-path"),
    );
    const nodeElements = Array.from(
      mapElement.querySelectorAll<SVGGElement>(".system-map-node"),
    );
    const pathSnapshots = paths.map((path) => ({
      attributes: drawableAttributeNames.reduce<
        Record<DrawableAttributeName, string | null>
      >(
        (snapshot, attributeName) => ({
          ...snapshot,
          [attributeName]: path.getAttribute(attributeName),
        }),
        {
          pathLength: null,
          "stroke-dasharray": null,
          "stroke-dashoffset": null,
        },
      ),
      opacity: path.style.opacity,
      path,
      strokeLinecap: path.style.strokeLinecap,
    }));
    const nodeOpacitySnapshots = nodeElements.map((node) => ({
      node,
      opacity: node.style.opacity,
    }));

    const restoreStaticMap = () => {
      pathSnapshots.forEach(({ attributes, opacity, path, strokeLinecap }) => {
        drawableAttributeNames.forEach((attributeName) => {
          const attributeValue = attributes[attributeName];

          if (attributeValue === null) {
            path.removeAttribute(attributeName);
          } else {
            path.setAttribute(attributeName, attributeValue);
          }
        });

        path.style.opacity = opacity;
        path.style.strokeLinecap = strokeLinecap;
      });

      nodeOpacitySnapshots.forEach(({ node, opacity }) => {
        node.style.opacity = opacity;
      });
    };

    paths.forEach((path) => {
      path.style.opacity = "0";
    });
    nodeElements.forEach((node) => {
      node.style.opacity = "0";
    });

    try {
      const pathDrawAnimation = animate(svg.createDrawable(paths, 0, 0), {
        draw: "0 1",
        duration: 950,
        delay: stagger(110),
        ease: "inOutSine",
      });

      const pathFadeAnimation = animate(paths, {
        opacity: [0, 1],
        duration: 260,
        delay: stagger(110),
        ease: "out(2)",
      });

      const nodeRevealAnimation = animate(nodeElements, {
        opacity: [0, 1],
        duration: 620,
        delay: stagger(135, { start: 180 }),
        ease: "out(3)",
      });

      return () => {
        pathDrawAnimation.revert();
        pathFadeAnimation.revert();
        nodeRevealAnimation.revert();
      };
    } catch {
      restoreStaticMap();
    }
  }, []);

  return (
    <section
      ref={mapRef}
      className="animated-system-map relative overflow-hidden bg-[#070c17] px-4 py-24 text-white sm:px-6 lg:px-8"
      aria-labelledby={headingId}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(14,165,233,0.14),transparent_48%),radial-gradient(ellipse_at_86%_80%,rgba(37,99,235,0.12),transparent_48%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:84px_84px]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-cyan-300">
              System map
            </p>
            <h2
              id={headingId}
              className="mt-4 max-w-xl text-4xl font-bold leading-[0.98] tracking-[-0.045em] text-white sm:text-5xl"
            >
              Syvursoft coordinates specialized healthcare systems.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300">
              RADex, MEND, and ADAM connect through one product direction for
              clinical operations, imaging workflows, and intelligence.
            </p>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#081624]/80 shadow-2xl shadow-black/30 backdrop-blur">
            <svg
              viewBox="0 0 640 440"
              role="img"
              aria-labelledby={svgTitleId}
              className="h-auto w-full"
            >
              <title id={svgTitleId}>
                {`Syvursoft connected to ${productNames}`}
              </title>
              <defs>
                <linearGradient
                  id={pathGradientId}
                  x1="120"
                  y1="90"
                  x2="520"
                  y2="360"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#22d3ee" />
                  <stop offset="0.5" stopColor="#0ea5e9" />
                  <stop offset="1" stopColor="#10b981" />
                </linearGradient>
                <filter
                  id={shadowFilterId}
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feDropShadow
                    dx="0"
                    dy="10"
                    stdDeviation="10"
                    floodColor="#020617"
                    floodOpacity="0.45"
                  />
                </filter>
              </defs>

              <rect width="640" height="440" fill="#07111f" />
              <path
                className="system-map-path"
                d="M245 185 C210 166 186 143 205 130"
                stroke={`url(#${pathGradientId})`}
              />
              <path
                className="system-map-path"
                d="M395 185 C430 166 454 143 435 130"
                stroke={`url(#${pathGradientId})`}
              />
              <path
                className="system-map-path"
                d="M320 251 C320 285 320 302 320 306"
                stroke={`url(#${pathGradientId})`}
              />

              {nodes.map((node) => (
                <NodeLabel
                  key={node.id}
                  filterId={shadowFilterId}
                  node={node}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        .animated-system-map .system-map-path {
          fill: none;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          vector-effect: non-scaling-stroke;
        }

        .animated-system-map .system-map-node {
          transform-box: fill-box;
          transform-origin: center;
        }

        .animated-system-map .system-map-node-shell {
          fill: rgba(8, 22, 36, 0.94);
          stroke-width: 1.5;
        }

        .animated-system-map .system-map-node-central .system-map-node-shell {
          fill: #0ea5e9;
          stroke: #22d3ee;
        }

        .animated-system-map .system-map-node-radex .system-map-node-shell {
          stroke: rgba(125, 211, 252, 0.55);
        }

        .animated-system-map .system-map-node-mend .system-map-node-shell {
          stroke: rgba(34, 211, 238, 0.55);
        }

        .animated-system-map .system-map-node-adam .system-map-node-shell {
          stroke: rgba(110, 231, 183, 0.55);
        }

        .animated-system-map .system-map-node-title {
          fill: #f8fafc;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0;
        }

        .animated-system-map .system-map-node-role {
          fill: #94a3b8;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0;
        }

        .animated-system-map
          .system-map-node-central
          .system-map-node-title,
        .animated-system-map .system-map-node-central .system-map-node-role {
          fill: #ffffff;
        }
      `}</style>
    </section>
  );
}
