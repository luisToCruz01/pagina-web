"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/app/components/ui/Container";
import { Sparkle } from "@/app/components/ui/Sparkle";
import { ease } from "@/app/lib/motion";

// Seccion inspirada en "Services" de la referencia Xirex: pestanas que rotan
// solas con barra de progreso, ilustracion isometrica animada y dos cifras.
// Los videos son los de la plantilla Xirex (licencia pagada por Luis),
// recoloreados a dorado RDMD con ffmpeg (hue +34, fondo llevado a #0A0A0A).
// Las cifras son las que el sitio ya publica en servicios y proceso.

const TAB_MS = 5000;

const TABS = [
  {
    title: ["Automatización", "de procesos"],
    tag: "Optimización de procesos",
    body: "Automatizamos los flujos repetitivos para ganar eficiencia, reducir el trabajo manual y lograr una operación consistente.",
    href: "/servicios/gestion-procesos",
    video: "/expertise/automatizacion.mp4",
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
    video: "/expertise/integracion.mp4",
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
    video: "/expertise/estrategia.mp4",
    stats: [
      { value: "30 min", label: "Diagnóstico gratuito" },
      { value: "4 pasos", label: "Del diagnóstico al soporte" },
    ],
  },
];

export function Expertise() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const tabStart = useRef(0);

  // Un solo bucle mueve la barra de progreso y la rotacion de pestanas.
  // Se pausa cuando la seccion no esta en pantalla.
  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    let last = performance.now();
    let elapsed = tabStart.current;
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      elapsed += dt;
      if (elapsed >= TAB_MS) {
        elapsed = 0;
        setActive((a) => (a + 1) % TABS.length);
      }
      tabStart.current = elapsed;
      setProgress(elapsed / TAB_MS);
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

            <div className="relative aspect-square overflow-hidden border-t border-fg-faintest lg:aspect-auto lg:border-l lg:border-t-0">
              <AnimatePresence>
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: ease.outCinematic }}
                  className="absolute inset-0"
                >
                  <video
                    src={tab.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden
                    className="h-full w-full object-cover"
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
