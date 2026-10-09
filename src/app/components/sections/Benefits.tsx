"use client";

import * as motion from "motion/react-client";
import { Container } from "@/app/components/ui/Container";
import { fadeUp, stagger, staggerItem } from "@/app/lib/motion";

// Seccion inspirada en "Benefits" de la referencia Xirex. Los cubos se dibujan
// en codigo (proyeccion isometrica), no se copian los SVG de la plantilla.

type Cube = [x: number, y: number, z: number];

const BENEFITS: {
  title: string;
  body: string;
  cubes: Cube[];
  highlight: Cube[];
}[] = [
  {
    title: "Elimina la repetición",
    body: "Automatiza las tareas rutinarias que consumen tiempo valioso en cada área.",
    cubes: [[0, 0, 0], [1, 0, 0], [2, 0, 0], [0, 0, 1], [0, 0, 2]],
    highlight: [[1, 0, 0], [2, 0, 0]],
  },
  {
    title: "Acelera la operación",
    body: "Mueve información, aprobaciones y tareas por tu empresa con más rapidez.",
    cubes: [[0, 0, 0], [0, 1, 0], [0, 2, 0], [0, 0, 1], [0, 1, 1], [0, 0, 2]],
    highlight: [[0, 0, 1], [0, 1, 1], [0, 0, 2]],
  },
  {
    title: "Mejora el flujo de trabajo",
    body: "Estandariza los procesos para elevar la calidad y reducir los errores manuales.",
    cubes: [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [0, 0, 2]],
    highlight: [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]],
  },
];

// Proyeccion isometrica: x baja a la derecha, y baja a la izquierda, z sube.
const A = 26;
const B = 15;
const H = 30;
const project = (x: number, y: number, z: number) => [(x - y) * A, (x + y) * B - z * H];

function faces([x, y, z]: Cube) {
  const pts = (corners: Cube[]) =>
    corners.map((c) => project(...c).join(",")).join(" ");
  return [
    pts([[x, y, z + 1], [x + 1, y, z + 1], [x + 1, y + 1, z + 1], [x, y + 1, z + 1]]),
    pts([[x, y + 1, z], [x + 1, y + 1, z], [x + 1, y + 1, z + 1], [x, y + 1, z + 1]]),
    pts([[x + 1, y, z], [x + 1, y + 1, z], [x + 1, y + 1, z + 1], [x + 1, y, z + 1]]),
  ];
}

function IsoCubes({ cubes, highlight }: { cubes: Cube[]; highlight: Cube[] }) {
  // Pintar de atras hacia adelante para que los cubos de delante tapen a los de atras
  const ordered = [...cubes].sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]));
  const isHl = (c: Cube) => highlight.some((h) => h.every((v, i) => v === c[i]));

  const xs: number[] = [];
  const ys: number[] = [];
  for (const [x, y, z] of cubes) {
    for (const [dx, dy, dz] of [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]]) {
      const [px, py] = project(x + dx, y + dy, z + dz);
      xs.push(px);
      ys.push(py);
    }
  }
  const pad = 2;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const w = Math.max(...xs) + pad - minX;
  const h = Math.max(...ys) + pad - minY;

  const layer = (active: boolean) =>
    ordered.map((c) => {
      const gold = active && isHl(c);
      return faces(c).map((p, i) => (
        <polygon
          key={`${c.join("-")}-${i}`}
          points={p}
          fill="var(--color-surface-raised)"
          stroke={gold ? "var(--color-accent)" : "rgba(245, 240, 232, 0.2)"}
          strokeWidth={gold ? 1 : 0.7}
          strokeDasharray={gold ? "2 2" : undefined}
          strokeLinejoin="bevel"
        />
      ));
    });

  return (
    <svg
      aria-hidden
      viewBox={`${minX} ${minY} ${w} ${h}`}
      className="mx-auto h-auto w-[150px]"
    >
      <g>{layer(false)}</g>
      <g className="opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
        {layer(true)}
      </g>
    </svg>
  );
}

export function Benefits() {
  return (
    <section className="border-t border-rule">
      <Container className="py-section">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center font-display font-light leading-[1] tracking-[-0.02em] text-fg"
          style={{ fontSize: "var(--text-h1)" }}
        >
          <span className="block">Diseñado para</span>
          <span className="block italic text-accent">operar mejor</span>
        </motion.h2>

        <div className="mt-16">
          {/* Franja de regla sobre las tarjetas */}
          <div
            aria-hidden
            className="h-8 border border-dashed border-fg-faintest"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent 0 33px, var(--color-fg-faintest) 33px 34px)",
            }}
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="mt-2 grid divide-y divide-fg-faintest border-x border-fg-faintest lg:grid-cols-3 lg:divide-x lg:divide-y-0"
          >
            {BENEFITS.map((item, i) => (
              <motion.article
                key={item.title}
                variants={staggerItem}
                className="group px-8 py-14 text-center"
              >
                <p className="font-sans text-xs tracking-[0.2em] text-accent [font-variant-numeric:tabular-nums]">
                  .{String(i + 1).padStart(2, "0")}.
                </p>
                <div className="mt-10">
                  <IsoCubes cubes={item.cubes} highlight={item.highlight} />
                </div>
                <h3 className="mt-12 font-sans text-lg font-medium text-fg">
                  {item.title}
                </h3>
                <p className="mx-auto mt-3 max-w-[34ch] font-sans text-sm leading-relaxed text-fg-muted sm:text-base">
                  {item.body}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
