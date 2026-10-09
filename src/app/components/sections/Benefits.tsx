"use client";

import { useRef, useState } from "react";
import * as motion from "motion/react-client";
import { Container } from "@/app/components/ui/Container";
import { fadeUp, stagger, staggerItem } from "@/app/lib/motion";

// Seccion inspirada en "Benefits" de la referencia Xirex. Los cubos se dibujan
// en codigo (proyeccion isometrica) y se animan en bucle mientras el mouse
// esta encima de la tarjeta.

type Cube = [x: number, y: number, z: number];
// gold: intensidad del contorno dorado punteado (0 = solo gris)
type Item = { c: Cube; o: number; gold: number };

const easeInOut = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
// Sube y baja dentro del ciclo: 0 en reposo, 1 a mitad del movimiento, sin saltos en el bucle
const pulse = (e: number) => Math.sin(Math.PI * e);

// Cada escena recibe t en [0, 1). t = 0 y t = 1 dan la misma imagen (la forma
// en reposo), asi el bucle no tiene saltos.

// Linea de 3 cubos: entra uno adelante, sale el de atras, la fila avanza.
function lineScene(t: number): Item[] {
  const e = easeInOut(t);
  return [0, 1, 2, 3].map((k) => ({
    c: [k - e, 0, 0],
    o: k === 0 ? 1 - e : k === 3 ? e : 1,
    gold: k === 0 || k === 3 ? pulse(e) : 0,
  }));
}

// Escalera 3-2-1: entra una columna de 4 detras de la mas alta, sale la de 1,
// y todo baja un nivel. Parece crecer sin fin.
function stairsScene(t: number): Item[] {
  const e = easeInOut(t);
  const items: Item[] = [];
  for (let col = 0; col < 4; col++) {
    const colOpacity = col === 0 ? 1 - e : col === 3 ? e : 1;
    for (let j = 0; j <= col; j++) {
      items.push({
        c: [0, 2 - col + e, j - e],
        o: colOpacity * (j === 0 ? 1 - e : 1),
        gold: col === 0 || col === 3 ? pulse(e) : 0,
      });
    }
  }
  return items;
}

// Columna de 3 cubos: dos columnas iguales le pasan por los lados en sentidos
// opuestos. Se mueven en profundidad (x + y) con un desplazamiento lateral fijo
// (x - y = +-LANE), asi nunca se cruzan con la columna central en pantalla.
function passScene(t: number): Item[] {
  const items: Item[] = [];
  const travel = 2.6;
  const lane = 2.3;
  const fade = (s: number) => clamp01((travel - Math.abs(s)) / 1.2);
  const sa = -travel + 2 * travel * t;
  const sb = travel - 2 * travel * t;
  for (let z = 0; z < 3; z++) {
    items.push({ c: [0, 0, z], o: 1, gold: 0 });
    items.push({ c: [sa + lane / 2, sa - lane / 2, z], o: fade(sa), gold: 1 });
    items.push({ c: [sb - lane / 2, sb + lane / 2, z], o: fade(sb), gold: 1 });
  }
  return items;
}

const BENEFITS = [
  {
    title: "Elimina la repetición",
    body: "Automatiza las tareas rutinarias que consumen tiempo valioso en cada área.",
    scene: lineScene,
    cycleMs: 1400,
  },
  {
    title: "Acelera la operación",
    body: "Mueve información, aprobaciones y tareas por tu empresa con más rapidez.",
    scene: stairsScene,
    cycleMs: 1600,
  },
  {
    title: "Mejora el flujo de trabajo",
    body: "Estandariza los procesos para elevar la calidad y reducir los errores manuales.",
    scene: passScene,
    cycleMs: 2200,
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

// Bucle que corre mientras hay hover. Al salir, termina el ciclo en curso y se
// detiene en la forma en reposo (t = 0).
function useHoverLoop(cycleMs: number) {
  const [t, setT] = useState(0);
  const hovering = useRef(false);
  const frame = useRef(0);

  const start = () => {
    hovering.current = true;
    if (frame.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let origin = performance.now();
    const tick = (now: number) => {
      const p = (now - origin) / cycleMs;
      if (p >= 1) {
        if (!hovering.current) {
          setT(0);
          frame.current = 0;
          return;
        }
        origin += cycleMs * Math.floor(p);
      }
      setT(p % 1);
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };
  const stop = () => {
    hovering.current = false;
  };
  return { t, start, stop };
}

const VIEW_W = 200;
const VIEW_H = 220;

function IsoScene({ items, center }: { items: Item[]; center: [number, number] }) {
  // Pintar de atras hacia adelante para que los cubos de delante tapen a los de atras
  const ordered = items
    .filter((it) => it.o > 0.01)
    .sort((a, b) => a.c[0] + a.c[1] + a.c[2] - (b.c[0] + b.c[1] + b.c[2]));

  return (
    <svg
      aria-hidden
      viewBox={`${center[0] - VIEW_W / 2} ${center[1] - VIEW_H / 2} ${VIEW_W} ${VIEW_H}`}
      className="mx-auto h-auto w-[180px] overflow-visible"
    >
      {ordered.map((it, idx) => (
        <g key={idx} opacity={it.o}>
          {faces(it.c).map((p, i) => (
            <polygon
              key={i}
              points={p}
              fill="var(--color-surface-raised)"
              stroke="rgba(245, 240, 232, 0.2)"
              strokeWidth={0.7}
              strokeLinejoin="bevel"
            />
          ))}
          {it.gold > 0.01 &&
            faces(it.c).map((p, i) => (
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
      ))}
    </svg>
  );
}

// Centro de la forma en reposo, para que cada escena quede centrada en su tarjeta.
function restCenter(scene: (t: number) => Item[]): [number, number] {
  const xs: number[] = [];
  const ys: number[] = [];
  for (const { c, o } of scene(0)) {
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

function BenefitCard({ item, index }: { item: (typeof BENEFITS)[number]; index: number }) {
  const { t, start, stop } = useHoverLoop(item.cycleMs);
  const center = restCenter(item.scene);

  return (
    <motion.article
      variants={staggerItem}
      onMouseEnter={start}
      onMouseLeave={stop}
      className="px-8 py-14 text-center"
    >
      <p className="font-sans text-xs tracking-[0.2em] text-accent [font-variant-numeric:tabular-nums]">
        .{String(index + 1).padStart(2, "0")}.
      </p>
      <div className="mt-8">
        <IsoScene items={item.scene(t)} center={center} />
      </div>
      <h3 className="mt-10 font-sans text-lg font-medium text-fg">{item.title}</h3>
      <p className="mx-auto mt-3 max-w-[34ch] font-sans text-sm leading-relaxed text-fg-muted sm:text-base">
        {item.body}
      </p>
    </motion.article>
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
              <BenefitCard key={item.title} item={item} index={i} />
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
