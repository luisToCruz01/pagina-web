"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/app/components/ui/Container";
import { Sparkle } from "@/app/components/ui/Sparkle";
import {
  IsoScene,
  clamp01,
  easeInOut,
  pulse,
  sceneCenter,
  type Item,
} from "@/app/components/ui/IsoScene";
import { ease } from "@/app/lib/motion";

// Seccion inspirada en "Services" de la referencia Xirex: pestanas que rotan
// solas con barra de progreso, ilustracion isometrica animada y dos cifras.
// Las ilustraciones son propias (en Xirex son videos de la plantilla) y las
// cifras son las que el sitio ya publica en las paginas de servicios y proceso.

const TAB_MS = 5000;
const SCENE_MS = 4000;

// Circuito de 5x5 cubos con dos cubos dorados recorriendolo.
function loopScene(t: number): Item[] {
  const ring: [number, number][] = [];
  for (let i = 0; i < 4; i++) ring.push([i, 0]);
  for (let j = 0; j < 4; j++) ring.push([4, j]);
  for (let i = 4; i > 0; i--) ring.push([i, 4]);
  for (let j = 4; j > 0; j--) ring.push([0, j]);
  const items: Item[] = ring.map(([x, y]) => ({ c: [x, y, 0], o: 1, gold: 0 }));
  items.push({ c: [2, 2, 0], o: 1, gold: 0, glow: 0.35 + 0.35 * pulse(t) });
  for (const offset of [0, ring.length / 2]) {
    const pos = (t * ring.length + offset) % ring.length;
    const i = Math.floor(pos);
    const f = pos - i;
    const [x0, y0] = ring[i];
    const [x1, y1] = ring[(i + 1) % ring.length];
    items.push({ c: [x0 + (x1 - x0) * f, y0 + (y1 - y0) * f, 1], o: 1, gold: 0, glow: 1 });
  }
  return items;
}

// Bloque central de 2x2x2: cuatro columnas llegan desde los lados, se integran
// y el bloque se enciende.
function integrateScene(t: number): Item[] {
  const items: Item[] = [];
  const arrive = 0.6;
  const e = easeInOut(clamp01(t / arrive));
  const glow = t > arrive ? pulse((t - arrive) / (1 - arrive)) : 0;
  for (const x of [0, 1]) for (const y of [0, 1]) for (const z of [0, 1]) {
    items.push({ c: [x, y, z], o: 1, gold: 0, glow });
  }
  const far = 5;
  const s = far - (far - 2) * e;
  const o = clamp01(t / 0.12) * clamp01((arrive + 0.04 - t) / 0.1);
  for (const z of [0, 1]) {
    items.push({ c: [s, 0, z], o, gold: 1 });
    items.push({ c: [1 - s, 1, z], o, gold: 1 });
    items.push({ c: [1, s, z], o, gold: 1 });
    items.push({ c: [0, 1 - s, z], o, gold: 1 });
  }
  return items;
}

// Cubos dispersos que se ordenan en cruz alrededor de una torre dorada.
const SCATTER: [number, number, number][] = [
  [-2.6, -3.4, 1.4], [3.1, -2.2, 0.8], [-3.5, 1.8, 0.6], [2.4, 3.3, 1.6],
  [-1.2, -4.1, 0.4], [4.2, 0.9, 1.1], [-4.0, -0.6, 1.8], [0.7, 4.3, 0.9],
];
const TARGETS: [number, number, number][] = [
  [2, 0, 0], [3, 0, 0], [-2, 0, 0], [-3, 0, 0],
  [0, 2, 0], [0, 3, 0], [0, -2, 0], [0, -3, 0],
];
function roadmapScene(t: number): Item[] {
  const items: Item[] = [
    { c: [0, 0, 0], o: 1, gold: 0, glow: 0.55 + 0.45 * pulse(t) },
    { c: [0, 0, 1], o: 1, gold: 0, glow: 0.55 + 0.45 * pulse(t) },
  ];
  const e = easeInOut(clamp01(t / 0.55));
  const o = clamp01(t / 0.1) * clamp01((1 - t) / 0.15);
  SCATTER.forEach((from, k) => {
    const to = TARGETS[k];
    items.push({
      c: [from[0] + (to[0] - from[0]) * e, from[1] + (to[1] - from[1]) * e, from[2] + (to[2] - from[2]) * e],
      o,
      gold: 1 - e,
    });
  });
  return items;
}

const TABS = [
  {
    title: ["Automatización", "de procesos"],
    tag: "Optimización de procesos",
    body: "Automatizamos los flujos repetitivos para ganar eficiencia, reducir el trabajo manual y lograr una operación consistente.",
    href: "/servicios/gestion-procesos",
    scene: loopScene,
    stats: [
      { value: "36 hrs/mes", label: "Ahorradas en reportería" },
      { value: "90 seg", label: "Tiempo de respuesta" },
    ],
  },
  {
    title: ["Soluciones", "a la medida"],
    tag: "Integración con tu negocio",
    body: "Desarrollamos sistemas adaptados a los procesos, retos y metas de largo plazo de tu empresa.",
    href: "/servicios/desarrollo-software",
    scene: integrateScene,
    stats: [
      { value: "2.5x", label: "Más capacidad, mismo equipo" },
      { value: "78%", label: "Consultas resueltas solas" },
    ],
  },
  {
    title: ["Consultoría", "y estrategia"],
    tag: "Diagnóstico de automatización",
    body: "Identificamos oportunidades concretas y armamos una hoja de ruta clara para automatizar con éxito.",
    href: "#proceso",
    scene: roadmapScene,
    stats: [
      { value: "30 min", label: "Diagnóstico gratuito" },
      { value: "4 pasos", label: "Del diagnóstico al soporte" },
    ],
  },
];

const VIEW_W = 470;
const VIEW_H = 390;

export function Expertise() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [sceneT, setSceneT] = useState(0);
  const tabStart = useRef(0);

  // Un solo bucle mueve la barra de progreso, la rotacion de pestanas y la
  // ilustracion. Se pausa cuando la seccion no esta en pantalla.
  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let last = performance.now();
    let elapsed = tabStart.current;
    let sceneClock = 0;
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      elapsed += dt;
      sceneClock += dt;
      if (elapsed >= TAB_MS) {
        elapsed = 0;
        setActive((a) => (a + 1) % TABS.length);
      }
      tabStart.current = elapsed;
      setProgress(elapsed / TAB_MS);
      if (!reduced) setSceneT((sceneClock % SCENE_MS) / SCENE_MS);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  const select = (i: number) => {
    tabStart.current = 0;
    setProgress(0);
    setActive(i);
  };

  const tab = TABS[active];
  const [cx, cy] = sceneCenter(tab.scene(0));

  return (
    <section className="border-t border-rule">
      <Container className="py-section">
        <div ref={ref}>
          <div className="grid border border-fg-faintest lg:grid-cols-2">
            <div className="relative flex flex-col bg-surface-raised p-8 sm:p-10 lg:min-h-[600px]">
              {/* Esquinas */}
              <span aria-hidden className="absolute left-0 top-0 h-3 w-3 border-l border-t border-fg-faint" />
              <span aria-hidden className="absolute right-0 top-0 h-3 w-3 border-r border-t border-fg-faint" />
              <span aria-hidden className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-fg-faint" />
              <span aria-hidden className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-fg-faint" />

              <div className="flex gap-2" role="tablist">
                {TABS.map((t, i) => (
                  <button
                    key={t.tag}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={t.title.join(" ")}
                    onClick={() => select(i)}
                    className="flex-1 cursor-pointer py-2"
                  >
                    <span className="block h-[3px] w-full bg-fg-faintest">
                      <span
                        className="block h-full bg-accent"
                        style={{ width: i === active ? `${progress * 100}%` : "0%" }}
                      />
                    </span>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: ease.outCinematic }}
                  className="flex flex-1 flex-col"
                >
                  <h3
                    className="mt-8 font-display font-light leading-[1] tracking-[-0.02em] text-fg"
                    style={{ fontSize: "var(--text-h1)" }}
                  >
                    {tab.title.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>

                  <div className="mt-16 lg:mt-auto">
                    <span className="inline-flex items-center gap-3 border border-fg-faintest px-3 py-2 font-sans text-xs uppercase tracking-[0.18em] text-fg">
                      <span aria-hidden className="h-2 w-2 bg-accent" />
                      {tab.tag}
                    </span>
                    <p className="mt-6 max-w-[46ch] font-sans text-base leading-relaxed text-fg-muted">
                      {tab.body}
                    </p>
                    <Link
                      href={tab.href}
                      className="mt-10 inline-flex items-center gap-2 border-b border-fg pb-3 pr-6 font-sans text-sm font-medium uppercase tracking-[0.12em] text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
                    >
                      <ArrowUpRight size={18} strokeWidth={1.5} />
                      Ver más
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden border-t border-fg-faintest lg:aspect-auto lg:border-l lg:border-t-0">
              <AnimatePresence>
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: ease.outCinematic }}
                  className="absolute inset-0"
                >
                  <IsoScene
                    items={tab.scene(sceneT)}
                    viewBox={[cx - VIEW_W / 2, cy - VIEW_H / 2, VIEW_W, VIEW_H]}
                    preserveAspectRatio="xMidYMid slice"
                    className="h-full w-full"
                    grid
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="grid border-x border-b border-fg-faintest sm:grid-cols-2 sm:divide-x sm:divide-fg-faintest">
            {tab.stats.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-6 border-t border-fg-faintest p-6 first:border-t-0 sm:border-t-0 sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <Sparkle size={12} />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${active}-${i}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: ease.outCinematic }}
                      className="whitespace-nowrap font-display text-3xl font-light text-fg [font-variant-numeric:lining-nums] sm:text-5xl"
                    >
                      {s.value}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-right font-sans text-sm text-fg-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
