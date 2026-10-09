"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import * as motion from "motion/react-client";
import { Container } from "@/app/components/ui/Container";
import { fadeUp, stagger, staggerItem } from "@/app/lib/motion";
import {
  IsoScene,
  clamp01,
  easeInOut,
  pulse,
  sceneCenter,
  type Item,
} from "@/app/components/ui/IsoScene";

// Seccion inspirada en "Benefits" de la referencia Xirex. Los cubos se dibujan
// en codigo (proyeccion isometrica) y se animan en bucle mientras el mouse
// esta encima de la tarjeta.


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
// opuestos, en diagonal siguiendo las lineas de los cubos (eje x), una en el
// carril de atras (y = -1) y otra en el de adelante (y = 1).
function passScene(t: number): Item[] {
  const items: Item[] = [];
  const travel = 2.4;
  const fade = (x: number) => clamp01((travel - Math.abs(x)) / 1.1);
  const a = -travel + 2 * travel * t;
  const b = travel - 2 * travel * t;
  for (let z = 0; z < 3; z++) {
    items.push({ c: [0, 0, z], o: 1, gold: 0 });
    items.push({ c: [a, -1, z], o: fade(a), gold: 1 });
    items.push({ c: [b, 1, z], o: fade(b), gold: 1 });
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

// Bucle que corre mientras hay hover (o mientras se ve en pantalla en tactiles). Al salir, termina el ciclo en curso y se
// detiene en la forma en reposo (t = 0).
function useHoverLoop(cycleMs: number) {
  const [t, setT] = useState(0);
  const hovering = useRef(false);
  const frame = useRef(0);

  const start = useCallback(() => {
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
  }, [cycleMs]);
  const stop = useCallback(() => {
    hovering.current = false;
  }, []);
  return { t, start, stop };
}

const VIEW_W = 200;
const VIEW_H = 220;

function BenefitCard({ item, index }: { item: (typeof BENEFITS)[number]; index: number }) {
  const { t, start, stop } = useHoverLoop(item.cycleMs);
  const [cx, cy] = sceneCenter(item.scene(0));
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.6 });

  // En pantallas tactiles no hay hover: la animacion corre mientras la tarjeta esta en pantalla
  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    if (inView) start();
    else stop();
  }, [inView, start, stop]);

  return (
    <motion.article
      ref={ref}
      variants={staggerItem}
      onMouseEnter={start}
      onMouseLeave={stop}
      className="px-8 py-14 text-center"
    >
      <p className="font-sans text-xs tracking-[0.2em] text-accent [font-variant-numeric:tabular-nums]">
        .{String(index + 1).padStart(2, "0")}.
      </p>
      <div className="mt-8">
        <IsoScene
          items={item.scene(t)}
          viewBox={[cx - VIEW_W / 2, cy - VIEW_H / 2, VIEW_W, VIEW_H]}
          className="mx-auto h-auto w-[180px] overflow-visible"
        />
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
