"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import { ChartNoAxesGantt, Network, Package, ScanEye, Settings, type LucideIcon } from "lucide-react";
import { cn } from "@/app/lib/cn";

// Seccion copiada de "How It Works" de la referencia Xirex (plantilla con licencia).
// Medidas de Xirex: bloque claro con 32px de margen lateral; marco de min(1392px, 100vw-224px);
// encabezado de 220px; debajo, dos mitades de 476px (acordeon a la izquierda, ilustracion a la
// derecha). Filas cerradas de 58px; la activa ocupa el resto. Se queda fija y avanza con el scroll.
// En lugar del blanco de Xirex se usa el crema de RDMD; la ilustracion se dibuja en codigo.

const STEPS: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Descubrir",
    body: "En un diagnóstico gratuito de 30 minutos analizamos tu operación y detectamos dónde se va el tiempo de tu equipo.",
    icon: ScanEye,
  },
  {
    title: "Planear",
    body: "Definimos juntos el alcance, los entregables y los tiempos de un plan hecho a la medida de tus procesos.",
    icon: ChartNoAxesGantt,
  },
  {
    title: "Construir",
    body: "Construimos e integramos los flujos con las herramientas que ya usas. Tú apruebas cada avance.",
    icon: Network,
  },
  {
    title: "Lanzar",
    body: "Ponemos el sistema en marcha con tu equipo y acompañamos los primeros días de operación.",
    icon: Package,
  },
  {
    title: "Optimizar",
    body: "Medimos resultados, ajustamos y escalamos el sistema cuando tu operación lo necesita.",
    icon: Settings,
  },
];

// Colores de la version clara (crema RDMD)
const C = {
  bg: "#F5F0E8",
  panel: "#EAE3D6",
  ink: "#0A0A0A",
  muted: "#6B6458",
  body: "#3A352E",
  rule: "#D9D0C0",
  accentText: "#8A6420", // dorado oscuro legible sobre crema
  slab: "#D6CCBA",
  stroke: "#5E574C",
  dash: "#9A9080",
  corner: "#C9BEAA", // equivalente al #CCC de Xirex
};

// ---------- Ilustracion isometrica: plataforma que se construye por capas ----------
const A = 30; // medio ancho de una celda
const B = 17.32; // medio alto de una celda (A * tan 30)
const T = 22; // grosor de una capa en px
const N = 6; // celdas por lado
const P = (x: number, y: number, z: number): [number, number] => [(x - y) * A, (x + y) * B - z];
const pts = (list: [number, number][]) => list.map((p) => p.join(",")).join(" ");

function slabFaces(z: number) {
  // Cara superior y las dos caras visibles de una placa de N x N con grosor T, base en z
  const top = pts([P(0, 0, z + T), P(N, 0, z + T), P(N, N, z + T), P(0, N, z + T)]);
  const left = pts([P(0, N, z), P(N, N, z), P(N, N, z + T), P(0, N, z + T)]);
  const right = pts([P(N, 0, z), P(N, N, z), P(N, N, z + T), P(N, 0, z + T)]);
  return { top, left, right };
}

function Slab({
  z,
  drop,
  style,
}: {
  z: number;
  drop?: MotionValue<number>;
  style: "dashed" | "outline" | "solid";
}) {
  const f = slabFaces(z);
  const stroke = style === "dashed" ? C.dash : C.stroke;
  const common = {
    stroke,
    strokeWidth: 1,
    strokeDasharray: style === "dashed" ? "3 3" : undefined,
    strokeLinejoin: "round" as const,
  };
  return (
    <motion.g style={{ y: drop }}>
      <polygon points={f.left} fill={style === "solid" ? "#C9BEAA" : "none"} {...common} />
      <polygon points={f.right} fill={style === "solid" ? "#BFB39D" : "none"} {...common} />
      <polygon points={f.top} fill={style === "solid" ? C.slab : "none"} {...common} />
    </motion.g>
  );
}

function CubeGrid({ z, drop }: { z: number; drop: MotionValue<number> }) {
  const cubes: [number, number][] = [];
  for (let s = 0; s <= 2 * (N - 1); s++)
    for (let x = 0; x < N; x++) {
      const y = s - x;
      if (y >= 0 && y < N) cubes.push([x, y]);
    }
  const h = T * 0.7;
  return (
    <motion.g style={{ y: drop }}>
      {cubes.map(([x, y]) => (
        <g key={`${x}-${y}`} stroke={C.stroke} strokeWidth={0.8} strokeLinejoin="round">
          <polygon points={pts([P(x, y + 1, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + h), P(x, y + 1, z + h)])} fill="#CFC4B1" />
          <polygon points={pts([P(x + 1, y, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + h), P(x + 1, y, z + h)])} fill="#C3B7A1" />
          <polygon points={pts([P(x, y, z + h), P(x + 1, y, z + h), P(x + 1, y + 1, z + h), P(x, y + 1, z + h)])} fill="#DDD4C4" />
        </g>
      ))}
    </motion.g>
  );
}

function BuildIllustration({ progress }: { progress: MotionValue<number> }) {
  // Cada capa cae desde arriba del panel y aterriza en su lugar segun el avance del scroll
  const layer1 = useTransform(progress, [0, 0.3], [-520, 0], { clamp: true });
  const layer2 = useTransform(progress, [0.34, 0.62], [-520, 0], { clamp: true });
  const layer3 = useTransform(progress, [0.62, 0.86], [-520, 0], { clamp: true });
  const W = N * A;
  return (
    <svg aria-hidden viewBox={`${-W - 40} -330 ${2 * W + 80} 560`} className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      {/* Guias verticales punteadas */}
      {[-W, 0, W].map((x) => (
        <line key={x} x1={x} x2={x} y1={-600} y2={600} stroke={C.dash} strokeWidth={0.8} strokeDasharray="3 3" opacity={0.7} />
      ))}
      <Slab z={0} style="dashed" />
      <Slab z={T} drop={layer1} style="outline" />
      <Slab z={2 * T} drop={layer2} style="solid" />
      <CubeGrid z={3 * T} drop={layer3} />
    </svg>
  );
}

// Esquina copiada del codigo de Xirex: elemento de 20x20 desplazado 8px hacia afuera,
// pintado con una mascara SVG (corchete de 1px con curva de radio 8 + triangulo de 6x6).
const CORNER_MASK =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 0 L 0 6 L 6 0 Z' transform='translate(14 14)'/%3E%3Cpath d='M 20 0 L 20 0.995 L 8.995 0.995 C 4.577 0.995 0.995 4.577 0.995 8.995 L 0.995 20 L 0 20 L 0 0.099 L 0.099 0.099 L 0.099 0 Z'/%3E%3C/svg%3E\")";

function SectionCorners({ color }: { color: string }) {
  const corners = [
    "-left-2 -top-2",
    "-right-2 -top-2 rotate-90",
    "-bottom-2 -right-2 rotate-180",
    "-bottom-2 -left-2 -rotate-90",
  ];
  return (
    <>
      {corners.map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={cn("pointer-events-none absolute z-10 h-5 w-5", pos)}
          style={{ background: color, maskImage: CORNER_MASK, WebkitMaskImage: CORNER_MASK }}
        />
      ))}
    </>
  );
}

// ---------- Seccion ----------
export function HowItWorks() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length))));
  });

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / STEPS.length) * travel, behavior: "smooth" });
  };

  const header = (
    <div className="flex flex-col items-center text-center">
      <span
        className="px-1 font-sans text-xs uppercase leading-[18px] tracking-[0.16em]"
        style={{ background: C.panel, color: C.body }}
      >
        Cómo trabajamos
      </span>
      <h2
        className="mt-4 max-w-[560px] font-display text-[34px] font-normal leading-[38px] tracking-[-0.02em] sm:text-[48px] sm:leading-[52.8px]"
        style={{ color: C.ink }}
      >
        Un método práctico para automatizar tu empresa
      </h2>
    </div>
  );

  return (
    <section id="como-trabajamos" className="pt-[88px]">
      {/* Escritorio (>=1280px): fijo mientras avanza el scroll */}
      <div
        ref={ref}
        className="relative mx-8 hidden xl:block"
        style={{ height: "calc(100vh + 3000px)", background: C.bg }}
      >
        <SectionCorners color={C.corner} />
        <div className="sticky top-0 h-screen overflow-hidden">
          <div
            className="absolute left-1/2 top-[50px] h-[696px] w-[min(1392px,calc(100vw-224px))] -translate-x-1/2 border"
            style={{ borderColor: C.rule }}
          >
            {/* Puntos en las esquinas */}
            {["-left-[3px] -top-[3px]", "-right-[3px] -top-[3px]", "-bottom-[3px] -left-[3px]", "-bottom-[3px] -right-[3px]"].map((pos) => (
              <span key={pos} aria-hidden className={cn("absolute h-[5px] w-[5px]", pos)} style={{ background: C.dash }} />
            ))}

            <div className="h-[220px] pt-[40px]">{header}</div>

            <div className="grid h-[476px] grid-cols-2 border-t" style={{ borderColor: C.rule }}>
              {/* Acordeon */}
              <div className="flex flex-col">
                {STEPS.map((step, i) => {
                  const isActive = i === active;
                  const Icon = step.icon;
                  return (
                    <button
                      key={step.title}
                      type="button"
                      onClick={() => goTo(i)}
                      className={cn(
                        "relative flex cursor-pointer flex-col overflow-hidden text-left transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        i > 0 && "border-t",
                      )}
                      style={{ height: isActive ? 476 - 58 * (STEPS.length - 1) : 58, borderColor: C.rule }}
                    >
                      <span
                        aria-hidden
                        className="absolute inset-y-0 left-0 w-[2px] origin-top transition-transform duration-500"
                        style={{ background: "var(--color-accent)", transform: `scaleY(${isActive ? 1 : 0})` }}
                      />
                      <span className="flex items-center justify-between px-6 pt-6">
                        <span className="flex items-center gap-3">
                          <Icon size={22} strokeWidth={1.75} style={{ color: isActive ? C.accentText : C.muted }} />
                          <span
                            className="font-sans text-[20px] leading-[26px]"
                            style={{ color: isActive ? C.accentText : C.muted, fontWeight: isActive ? 500 : 400 }}
                          >
                            {step.title}
                          </span>
                        </span>
                        <span className="font-sans text-xs leading-[18px] tracking-[0.08em]" style={{ color: isActive ? C.accentText : C.muted }}>
                          .{String(i + 1).padStart(2, "0")}.
                        </span>
                      </span>
                      <span
                        className="mt-auto max-w-[480px] px-6 pb-6 font-sans text-base leading-[20.8px] transition-opacity duration-500"
                        style={{ color: C.body, opacity: isActive ? 1 : 0 }}
                      >
                        {step.body}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Ilustracion */}
              <div className="relative overflow-hidden border-l" style={{ background: C.panel, borderColor: C.rule }}>
                <BuildIllustration progress={scrollYProgress} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tablet y movil: pasos apilados */}
      <div className="relative mx-4 py-16 sm:mx-8 xl:hidden" style={{ background: C.bg }}>
        <SectionCorners color={C.corner} />
        <div className="px-6">{header}</div>
        <div className="mt-10 border-t" style={{ borderColor: C.rule }}>
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="border-b px-6 py-6" style={{ borderColor: C.rule }}>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-3">
                    <Icon size={20} strokeWidth={1.75} style={{ color: C.accentText }} />
                    <span className="font-sans text-lg font-medium" style={{ color: C.ink }}>
                      {step.title}
                    </span>
                  </span>
                  <span className="font-sans text-xs tracking-[0.08em]" style={{ color: C.muted }}>
                    .{String(i + 1).padStart(2, "0")}.
                  </span>
                </div>
                <p className="mt-3 font-sans text-base leading-relaxed" style={{ color: C.body }}>
                  {step.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
