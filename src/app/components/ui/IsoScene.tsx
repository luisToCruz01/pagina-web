"use client";

import { useId } from "react";

// Escena de cubos isometricos dibujada en SVG. Usada por Benefits y Expertise.

export type Cube = [x: number, y: number, z: number];
// o: opacidad del cubo. gold: intensidad del contorno dorado punteado.
// glow: intensidad del relleno dorado luminoso.
export type Item = { c: Cube; o: number; gold: number; glow?: number };

export const easeInOut = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);
export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
// Sube y baja dentro del ciclo: 0 en los extremos, 1 a la mitad, sin saltos en el bucle
export const pulse = (e: number) => Math.sin(Math.PI * clamp01(e));

// Proyeccion isometrica: x baja a la derecha, y baja a la izquierda, z sube.
export const ISO_A = 26;
export const ISO_B = 15;
export const ISO_H = 30;
export const project = (x: number, y: number, z: number) => [
  (x - y) * ISO_A,
  (x + y) * ISO_B - z * ISO_H,
];

function faces([x, y, z]: Cube) {
  const pts = (corners: Cube[]) =>
    corners.map((c) => project(...c).join(",")).join(" ");
  return [
    pts([[x, y, z + 1], [x + 1, y, z + 1], [x + 1, y + 1, z + 1], [x, y + 1, z + 1]]),
    pts([[x, y + 1, z], [x + 1, y + 1, z], [x + 1, y + 1, z + 1], [x, y + 1, z + 1]]),
    pts([[x + 1, y, z], [x + 1, y + 1, z], [x + 1, y + 1, z + 1], [x + 1, y, z + 1]]),
  ];
}

// Centro de la forma en reposo (cubos visibles), para centrar la escena.
export function sceneCenter(items: Item[]): [number, number] {
  const xs: number[] = [];
  const ys: number[] = [];
  for (const { c, o } of items) {
    if (o < 0.5) continue;
    const [x, y, z] = c;
    for (const [dx, dy, dz] of [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]]) {
      const [px, py] = project(x + dx, y + dy, z + dz);
      xs.push(px);
      ys.push(py);
    }
  }
  return [(Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2];
}

export function IsoScene({
  items,
  viewBox,
  className,
  grid = false,
  preserveAspectRatio,
}: {
  items: Item[];
  viewBox: [number, number, number, number];
  className?: string;
  grid?: boolean;
  preserveAspectRatio?: string;
}) {
  const id = useId().replace(/:/g, "");
  // Pintar de atras hacia adelante para que los cubos de delante tapen a los de atras
  const ordered = items
    .filter((it) => it.o > 0.01)
    .sort((a, b) => a.c[0] + a.c[1] + a.c[2] - (b.c[0] + b.c[1] + b.c[2]));

  return (
    <svg
      aria-hidden
      viewBox={viewBox.join(" ")}
      preserveAspectRatio={preserveAspectRatio}
      className={className}
    >
      <defs>
        <linearGradient id={`glow-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8973b" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#c8973b" stopOpacity="0.08" />
        </linearGradient>
        {grid && (
          <pattern
            id={`grid-${id}`}
            width={ISO_A * 2}
            height={ISO_B * 2}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M0 0 L${ISO_A * 2} ${ISO_B * 2} M0 ${ISO_B * 2} L${ISO_A * 2} 0`}
              stroke="rgba(245, 240, 232, 0.05)"
              strokeWidth={0.6}
            />
          </pattern>
        )}
      </defs>
      {grid && <rect x={viewBox[0]} y={viewBox[1]} width={viewBox[2]} height={viewBox[3]} fill={`url(#grid-${id})`} />}
      {ordered.map((it, idx) => {
        const f = faces(it.c);
        const glow = it.glow ?? 0;
        return (
          <g key={idx} opacity={it.o}>
            {f.map((p, i) => (
              <polygon
                key={i}
                points={p}
                fill="var(--color-surface-raised)"
                stroke="rgba(245, 240, 232, 0.2)"
                strokeWidth={0.7}
                strokeLinejoin="bevel"
              />
            ))}
            {glow > 0.01 &&
              f.map((p, i) => (
                <polygon
                  key={`l${i}`}
                  points={p}
                  fill={`url(#glow-${id})`}
                  stroke="#e8c27a"
                  strokeWidth={0.8}
                  strokeLinejoin="bevel"
                  opacity={glow}
                />
              ))}
            {it.gold > 0.01 &&
              f.map((p, i) => (
                <polygon
                  key={`g${i}`}
                  points={p}
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth={1}
                  strokeDasharray="2 2"
                  strokeLinejoin="bevel"
                  opacity={it.gold}
                />
              ))}
          </g>
        );
      })}
    </svg>
  );
}
