"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Check } from "lucide-react";
import { Container } from "@/app/components/ui/Container";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { Button } from "@/app/components/ui/Button";
import { cn } from "@/app/lib/cn";

// Seccion inspirada en "Use Cases" de la referencia Xirex: la seccion se queda
// fija mientras haces scroll y recorre seis areas de la empresa. Las figuras
// son propias (lineas doradas que se dibujan al cambiar de area).

type Shape =
  | { kind: "poly"; pts: [number, number][]; closed?: boolean; fill?: boolean }
  | { kind: "ellipse"; cx: number; cy: number; rx: number; ry: number; rot: number };

const hexPoint = (k: number, r = 88): [number, number] => {
  const a = ((-90 + 60 * k) * Math.PI) / 180;
  return [100 + r * Math.cos(a), 100 + r * Math.sin(a)];
};
const H = [0, 1, 2, 3, 4, 5].map((k) => hexPoint(k));

const SHAPES: Shape[][] = [
  // Ventas: poliedro (hexagono con triangulo interior)
  [
    { kind: "poly", pts: H, closed: true },
    { kind: "poly", pts: [[58, 78], [142, 78], [100, 150]], closed: true },
    { kind: "poly", pts: [H[5], [58, 78], H[0], [142, 78], H[1]] },
    { kind: "poly", pts: [H[4], [58, 78]] },
    { kind: "poly", pts: [H[2], [142, 78]] },
    { kind: "poly", pts: [H[4], [100, 150], H[2]] },
    { kind: "poly", pts: [[100, 150], H[3]] },
  ],
  // Marketing: tres orbitas cruzadas
  [0, 60, 120].map((rot) => ({ kind: "ellipse" as const, cx: 100, cy: 100, rx: 88, ry: 34, rot })),
  // Finanzas: tres capas isometricas apiladas (de abajo hacia arriba, con relleno
  // para que cada capa tape a la de abajo)
  [2, 1, 0].map((i) => {
    const y = 60 + i * 36;
    return {
      kind: "poly" as const,
      pts: [[100, y - 28], [176, y + 10], [100, y + 48], [24, y + 10]] as [number, number][],
      closed: true,
      fill: true,
    };
  }),
  // Operaciones: octaedro
  [
    { kind: "poly", pts: [[100, 12], [26, 100], [100, 188], [174, 100]], closed: true },
    { kind: "poly", pts: [[26, 100], [82, 122], [174, 100]] },
    { kind: "poly", pts: [[100, 12], [82, 122], [100, 188]] },
    { kind: "poly", pts: [[26, 100], [118, 80], [174, 100]] },
    { kind: "poly", pts: [[100, 12], [118, 80], [100, 188]] },
  ],
  // Recursos humanos: cuadrados anidados que giran
  [0, 1, 2].map((i) => {
    const r = 86 - i * 20;
    const a0 = (i * 15 * Math.PI) / 180;
    return {
      kind: "poly" as const,
      pts: [0, 1, 2, 3].map((k) => {
        const a = a0 + (k * Math.PI) / 2 + Math.PI / 4;
        return [100 + r * Math.cos(a), 100 + r * Math.sin(a)] as [number, number];
      }),
      closed: true,
    };
  }),
  // Atencion al cliente: prisma alargado
  [
    { kind: "poly", pts: [[18, 82], [96, 36], [182, 86], [182, 130], [104, 176], [18, 126]], closed: true },
    { kind: "poly", pts: [[18, 82], [104, 132], [182, 86]] },
    { kind: "poly", pts: [[104, 132], [104, 176]] },
  ],
];

const USE_CASES = [
  {
    area: "Ventas",
    help: "Ayudamos a los equipos de ventas a atender leads más rápido, dar seguimiento a tiempo y ordenar la información de cada cliente.",
    get: ["Seguimiento de leads con IA", "Reactivación de base de datos", "CRM conectado"],
  },
  {
    area: "Marketing",
    help: "Ayudamos a los equipos de marketing a producir contenido más rápido, ejecutar campañas y entender mejor a sus clientes.",
    get: ["Secuencias de nutrición", "Reportes automáticos de campañas", "Asistente de contenido con IA"],
  },
  {
    area: "Finanzas",
    help: "Reducimos el trabajo manual en reportes, procesamiento de documentos y operación financiera.",
    get: ["Procesamiento de documentos", "Reportes automáticos", "Asistente financiero con IA"],
  },
  {
    area: "Operaciones",
    help: "Agilizamos la operación diaria con flujos automáticos, respuestas más rápidas y procesos conectados.",
    get: ["Automatización de flujos", "Integración de sistemas", "Tableros de operación"],
  },
  {
    area: "Recursos humanos",
    help: "Simplificamos los procesos de personas con atención rápida al equipo, onboarding ordenado e información centralizada.",
    get: ["Asistente interno con IA", "Onboarding automatizado", "Base de conocimiento"],
  },
  {
    area: "Atención al cliente",
    help: "Ayudamos a tu equipo de soporte a responder más rápido, resolver con eficiencia y dar una experiencia consistente.",
    get: ["Agente de atención 24/7", "Escalamiento a humano", "Base de conocimiento"],
  },
];

const CTA_HREF = "https://cal.com/rdmdco/30min";

function ShapeArt({ index, className }: { index: number; className?: string }) {
  const draw = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  };
  return (
    <svg aria-hidden viewBox="0 0 200 200" fill="none" className={cn("text-accent", className)}>
      {SHAPES[index].map((s, i) =>
        s.kind === "ellipse" ? (
          <motion.ellipse
            key={i}
            {...draw}
            cx={s.cx}
            cy={s.cy}
            rx={s.rx}
            ry={s.ry}
            transform={`rotate(${s.rot} ${s.cx} ${s.cy})`}
            stroke="currentColor"
            strokeWidth={2}
          />
        ) : (
          <motion.path
            key={i}
            {...draw}
            d={`M${s.pts.map((p) => p.join(" ")).join(" L")}${s.closed ? " Z" : ""}`}
            fill={s.fill ? "var(--color-surface)" : "none"}
            stroke="currentColor"
            strokeWidth={2}
            strokeLinejoin="round"
          />
        ),
      )}
    </svg>
  );
}

// Divisor con "+" al inicio, como en la referencia (posicion absoluta en px)
function DividerRule({ top }: { top: number }) {
  return (
    <div className="absolute left-0 right-0 flex items-center text-fg-faint" style={{ top: top - 6 }}>
      <span aria-hidden className="w-5 font-sans text-xs leading-3">+</span>
      <span className="h-px flex-1 bg-fg-faintest" />
    </div>
  );
}

function Details({ index }: { index: number }) {
  const uc = USE_CASES[index];
  return (
    <div>
      <div className="flex items-center gap-3 text-fg-faint">
        <span aria-hidden className="font-sans text-sm leading-none">+</span>
        <span className="h-px flex-1 bg-fg-faintest" />
      </div>
      <div className="grid gap-3 py-[min(1.75rem,3vh)] sm:grid-cols-[11rem_1fr] xl:grid-cols-[13rem_1fr]">
        <span className="font-sans text-xs uppercase tracking-[0.18em] text-fg-faint">Cómo ayuda</span>
        <p className="font-sans text-base leading-relaxed text-fg-muted">{uc.help}</p>
      </div>
      <div className="flex items-center gap-3 text-fg-faint">
        <span aria-hidden className="font-sans text-sm leading-none">+</span>
        <span className="h-px flex-1 bg-fg-faintest" />
      </div>
      <div className="grid gap-3 py-[min(1.75rem,3vh)] sm:grid-cols-[11rem_1fr] xl:grid-cols-[13rem_1fr]">
        <span className="font-sans text-xs uppercase tracking-[0.18em] text-fg-faint">Qué recibes</span>
        <ul className="space-y-2.5">
          {uc.get.map((item) => (
            <li key={item} className="flex items-center gap-3 font-sans text-base text-fg-muted">
              <Check size={16} strokeWidth={1.75} className="shrink-0 text-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function UseCases() {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(USE_CASES.length - 1, Math.max(0, Math.floor(v * USE_CASES.length)));
    setActive(i);
  });

  // Clic en un area: baja hasta el tramo de scroll que la activa
  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / USE_CASES.length) * travel, behavior: "smooth" });
  };

  const glow = {
    background:
      "radial-gradient(ellipse 55% 45% at 85% 100%, rgba(200, 151, 59, 0.12), transparent 70%)",
  };

  return (
    <div id="casos-de-uso">
      {/* Escritorio (>=1280px): medidas tomadas de la referencia Xirex.
          Reticula de 1200px (80px de margen por lado si no cabe), columna derecha de 500px
          separada 80px. Figura 200x200 a 80px del borde superior; divisores a 350px y 459px;
          textos a 220px del borde con 400px de ancho; boton y ultima area a 80px del fondo. */}
      <section
        ref={ref}
        className="relative hidden border-t border-rule xl:block"
        style={{ height: `${100 + USE_CASES.length * 55}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden" style={glow}>
          <div className="relative mx-auto h-full w-[min(1200px,calc(100%-160px))]">
            {/* Columna izquierda */}
            <div className="absolute inset-y-0 left-0 w-[calc(100%-580px)]">
              <div className="absolute left-0 top-[80px] h-[200px] w-[200px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, rotate: -12, scale: 0.92 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 10, scale: 1.04 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full w-full"
                  >
                    <ShapeArt index={active} className="h-full w-full" />
                  </motion.div>
                </AnimatePresence>
              </div>

              <DividerRule top={350} />
              <DividerRule top={459} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -6, filter: "blur(6px)" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="absolute left-0 right-0 top-[372px] grid grid-cols-[minmax(0,1fr)_400px]">
                    <span className="font-sans text-xs leading-[18px] uppercase tracking-[0.18em] text-fg-faint">
                      Cómo ayuda
                    </span>
                    <p className="font-sans text-base leading-[20.8px] text-fg-muted">
                      {USE_CASES[active].help}
                    </p>
                  </div>
                  <div className="absolute left-0 right-0 top-[482px] grid grid-cols-[minmax(0,1fr)_400px]">
                    <span className="font-sans text-xs leading-[18px] uppercase tracking-[0.18em] text-fg-faint">
                      Qué recibes
                    </span>
                    <ul className="space-y-2">
                      {USE_CASES[active].get.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 font-sans text-base leading-[20.8px] text-fg-muted">
                          <Check size={16} strokeWidth={1.75} className="shrink-0 text-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-[80px] left-0">
                <Button href={CTA_HREF} external variant="primary">
                  Habla con un experto
                </Button>
              </div>
            </div>

            {/* Columna derecha: 500px, pegada abajo */}
            <div className="absolute bottom-[80px] right-0 w-[500px]">
              <Eyebrow sparkle>Casos de uso</Eyebrow>
              <ul className="mt-8 space-y-2">
                {USE_CASES.map((uc, i) => (
                  <li key={uc.area}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={i === active}
                      className={cn(
                        "relative cursor-pointer whitespace-nowrap text-left font-display text-[64px] font-light leading-[64px] tracking-[-0.02em] transition-colors duration-300",
                        i === active ? "text-accent" : "text-fg hover:text-fg-muted",
                      )}
                    >
                      {uc.area}
                      <span
                        className={cn(
                          "absolute left-full top-0 ml-0.5 font-sans text-base font-medium leading-[20.8px] tracking-normal text-accent transition-opacity duration-300",
                          i === active ? "opacity-100" : "opacity-0",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Movil: las areas apiladas, sin seccion fija */}
      <section className="border-t border-rule xl:hidden" style={glow}>
        <Container className="py-section">
          <Eyebrow sparkle>Casos de uso</Eyebrow>
          <div className="mt-10 space-y-16">
            {USE_CASES.map((uc, i) => (
              <motion.div
                key={uc.area}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-start justify-between gap-6">
                  <h3 className="font-display text-4xl font-light leading-tight text-fg">
                    {uc.area}
                    <sup className="ml-2 font-sans text-xs tracking-[0.1em] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </sup>
                  </h3>
                  <ShapeArt index={i} className="h-16 w-16 shrink-0" />
                </div>
                <div className="mt-6">
                  <Details index={i} />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12">
            <Button href={CTA_HREF} external variant="primary">
              Habla con un experto
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
