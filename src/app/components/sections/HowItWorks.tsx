"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/app/lib/cn";

// Seccion copiada del codigo de "How It Works" de la referencia Xirex (plantilla con licencia).
// Valores extraidos del DOM/CSS de Xirex: bloque con 32px de margen lateral y 88px arriba;
// marco de min(1392px, 100vw - 224px) x 696px a 50px del borde superior; encabezado de 220px;
// filas de 58px (padding 16/24) y activa de 244px (padding 24); lineas de 1px; linea activa de 2px;
// iconos y esquinas como mascaras SVG; ilustracion de 5 capas PNG (358x233) que bajan 400px cada
// una durante 540px de scroll, en secuencia, con un recorrido fijo total de 2900px.
// Cambios RDMD: crema en lugar de blanco, dorado en lugar de rojo, Cormorant/DM Sans, capas
// recoloreadas (public/como-funciona), el logo de RDMD sobre la capa superior y textos propios.

const TRAVEL = 2900; // px de scroll con la seccion fija
const LAYER_SCROLL = 540; // px de scroll que tarda cada capa en bajar
const LAYER_DROP = 400; // px que baja cada capa
const LAYER_OFFSET = 85; // la primera capa empieza a bajar 85px antes de fijarse

// Colores: equivalentes RDMD de los de Xirex
const C = {
  bg: "#F5F0E8", // blanco de Xirex
  panel: "#EAE3D6", // #E6E6E6
  line: "#D9D0C0", // #CCCCCC
  dot: "#9A9080", // #999999
  ink: "#0A0A0A", // #0F0F0F
  eyebrow: "#3A352E", // #3D3D3D
  muted: "#6B6458", // #666666
  body: "#3A352E", // #333333
  accent: "#C8973B", // #FF5843
  accentText: "#8A6420", // dorado oscuro legible sobre crema para textos activos
  corner: "#C9BEAA",
};

// Iconos: paths copiados de Xirex (24x24, usados como mascara)
const ICONS = [
  { d: "M 1.5 4.5 L 0 4.5 L 0 2.75 C 0.003 1.232 1.232 0.003 2.75 0 L 4.5 0 L 4.5 1.5 L 2.75 1.5 C 2.06 1.5 1.5 2.06 1.5 2.75 Z M 4.5 18 L 2.75 18 C 1.232 17.997 0.003 16.768 0 15.25 L 0 14 L 1.5 14 L 1.5 15.25 C 1.5 15.94 2.06 16.5 2.75 16.5 L 4.5 16.5 Z M 13.5 16.5 L 15.25 16.5 C 15.94 16.5 16.5 15.94 16.5 15.25 L 16.5 13.5 L 18 13.5 L 18 15.25 C 17.997 16.768 16.768 17.997 15.25 18 L 13.5 18 Z M 18 4.5 L 16.5 4.5 L 16.5 2.75 C 16.5 2.06 15.94 1.5 15.25 1.5 L 13.5 1.5 L 13.5 0 L 15.25 0 C 16.768 0.003 17.997 1.232 18 2.75 Z M 9 3 C 14.345 3 17.52 8.4 17.65 8.63 L 17.65 8.625 L 17.85 8.975 L 17.67 9.335 C 17.56 9.565 14.8 15 9 15 C 3.2 15 0.445 9.565 0.33 9.335 L 0.165 9 L 0.33 8.67 C 0.44 8.44 3.195 3 9 3 Z M 6 9 C 6 10.655 7.345 12 9 12 C 10.655 12 12 10.655 12 9 C 12 7.345 10.655 6 9 6 C 7.345 6 6 7.345 6 9 Z", t: "translate(3 3)" },
  { d: "M 1.125 0 L 9.675 0 C 10.296 0 10.799 0.497 10.8 1.111 L 10.8 2.889 C 10.799 3.503 10.296 4 9.675 4 L 1.125 4 C 0.504 4 0 3.502 0 2.889 L 0 1.111 C 0 0.498 0.504 0 1.125 0 Z M 18 7.111 L 18 8.889 C 18 9.502 17.496 10 16.875 10 L 6.075 10 C 5.453 10 4.95 9.502 4.95 8.889 L 4.95 7.111 C 4.95 6.498 5.453 6 6.074 6 L 16.874 6 C 17.496 6 17.999 6.497 18 7.111 Z M 7.65 13.111 L 7.65 14.889 C 7.65 15.502 7.147 16 6.526 16 L 1.126 16 C 0.505 16 0.001 15.502 0.001 14.889 L 0.001 13.111 C 0.001 12.498 0.505 12 1.126 12 L 6.526 12 C 7.147 12 7.65 12.498 7.65 13.111 Z", t: "translate(3.5 4.5)" },
  { d: "M 17.53 14.505 C 16.98 14.505 16.47 14.69 16.056 14.995 L 13.226 12.92 C 13.421 12.485 13.526 12.01 13.526 11.505 C 13.526 11.085 13.446 10.685 13.311 10.31 L 15.921 8.655 C 16.356 9.02 16.911 9.25 17.521 9.25 C 18.902 9.25 20.021 8.131 20.021 6.75 C 20.021 5.369 18.902 4.25 17.521 4.25 C 16.14 4.25 15.021 5.369 15.021 6.75 C 15.021 6.97 15.061 7.18 15.111 7.385 L 12.501 9.035 C 12.027 8.555 11.425 8.224 10.766 8.08 L 10.766 4.87 C 11.804 4.546 12.512 3.587 12.516 2.5 C 12.516 1.119 11.397 0 10.016 0 C 8.635 0 7.516 1.119 7.516 2.5 C 7.516 3.615 8.256 4.55 9.266 4.87 L 9.266 8.08 C 8.607 8.224 8.005 8.555 7.531 9.035 L 4.92 7.385 C 4.975 7.18 5.01 6.97 5.01 6.75 C 5.01 5.369 3.891 4.25 2.51 4.25 C 1.129 4.25 0.01 5.369 0.01 6.75 C 0.01 8.131 1.129 9.25 2.51 9.25 C 3.125 9.25 3.675 9.02 4.11 8.655 L 6.72 10.31 C 6.58 10.693 6.507 11.097 6.505 11.505 C 6.505 12.01 6.615 12.485 6.805 12.92 L 3.975 14.995 C 3.549 14.678 3.032 14.506 2.5 14.505 C 1.119 14.505 0 15.624 0 17.005 C 0 18.386 1.119 19.505 2.5 19.505 C 3.881 19.505 5 18.386 5 17.005 C 5 16.725 4.945 16.46 4.855 16.205 L 7.69 14.125 C 8.327 14.69 9.149 15.001 10 15 C 10.885 15 11.69 14.665 12.31 14.125 L 15.145 16.205 C 15.06 16.455 15 16.725 15 17.005 C 15 18.386 16.119 19.505 17.5 19.505 C 18.881 19.505 20 18.386 20 17.005 C 20 15.624 18.881 14.505 17.5 14.505 Z", t: "translate(2 2)" },
  { d: "M 0.76 4.745 L 9 0 L 17.24 4.745 L 9 9.5 Z M 8.25 2.115 L 8.25 7.365 L 9.75 7.365 L 9.75 2.115 Z M 0 6.035 L 8.25 10.8 L 8.25 20.3 L 0 15.55 Z M 1.48 13.84 L 2.23 15.14 L 6.775 12.515 L 6.025 11.215 Z M 9.75 10.8 L 18 6.035 L 18 15.55 L 9.75 20.3 Z M 16.52 13.84 L 11.975 11.215 L 11.225 12.515 L 15.77 15.14 Z", t: "translate(3 1.5)" },
  { d: "M 18.114 12.161 L 17.204 11.636 C 17.314 11.106 17.374 10.561 17.374 10.001 C 17.374 9.441 17.314 8.896 17.204 8.366 L 18.114 7.841 C 18.644 7.536 18.884 6.891 18.664 6.321 C 18.306 5.411 17.816 4.558 17.209 3.791 C 16.829 3.311 16.149 3.201 15.619 3.506 L 14.699 4.036 C 13.881 3.301 12.919 2.744 11.874 2.401 L 11.874 1.346 C 11.874 0.721 11.409 0.196 10.789 0.106 C 9.851 -0.035 8.897 -0.035 7.959 0.106 C 7.339 0.196 6.874 0.721 6.874 1.346 L 6.874 2.401 C 5.819 2.751 4.864 3.311 4.049 4.036 L 3.129 3.506 C 2.599 3.201 1.919 3.311 1.539 3.791 C 0.93 4.557 0.439 5.41 0.084 6.321 C -0.141 6.886 0.104 7.536 0.634 7.841 L 1.544 8.366 C 1.434 8.896 1.374 9.441 1.374 10.001 C 1.374 10.561 1.434 11.106 1.544 11.636 L 0.634 12.161 C 0.104 12.466 -0.136 13.111 0.084 13.681 C 0.444 14.601 0.939 15.451 1.539 16.211 C 1.919 16.691 2.599 16.801 3.129 16.496 L 4.049 15.966 C 4.866 16.702 5.828 17.259 6.874 17.601 L 6.874 18.656 C 6.874 19.281 7.339 19.806 7.959 19.896 C 8.897 20.038 9.851 20.038 10.789 19.896 C 11.408 19.81 11.87 19.282 11.874 18.656 L 11.874 17.601 C 12.917 17.254 13.878 16.698 14.699 15.966 L 15.619 16.496 C 16.149 16.801 16.829 16.691 17.209 16.211 C 17.809 15.451 18.304 14.601 18.664 13.681 C 18.889 13.116 18.644 12.466 18.114 12.161 Z M 9.374 13.501 C 8.445 13.502 7.554 13.134 6.898 12.477 C 6.241 11.82 5.873 10.93 5.874 10.001 C 5.874 8.066 7.439 6.501 9.374 6.501 C 11.309 6.501 12.874 8.066 12.874 10.001 C 12.874 11.936 11.309 13.501 9.374 13.501 Z", t: "translate(2.626 1.999)" },
];

const svgMask = (inner: string, view = "0 0 24 24") =>
  `url("data:image/svg+xml,${encodeURIComponent(`<svg viewBox='${view}' xmlns='http://www.w3.org/2000/svg'>${inner}</svg>`)}")`;

// Textos propios de RDMD (basados en la antigua seccion Proceso)
const STEPS = [
  {
    title: "Descubrir",
    body: "En un diagnóstico gratuito de 30 minutos analizamos tu operación y detectamos dónde se va el tiempo de tu equipo.",
  },
  {
    title: "Planear",
    body: "Definimos juntos el alcance, los entregables y los tiempos de un plan hecho a la medida de tus procesos.",
  },
  {
    title: "Construir",
    body: "Construimos e integramos los flujos con las herramientas que ya usas. Tú apruebas cada avance.",
  },
  {
    title: "Lanzar",
    body: "Ponemos el sistema en marcha con tu equipo y acompañamos los primeros días de operación.",
  },
  {
    title: "Optimizar",
    body: "Medimos resultados, ajustamos y escalamos el sistema cuando tu operación lo necesita.",
  },
];

function StepIcon({ index, color }: { index: number; color: string }) {
  const ic = ICONS[index];
  const mask = svgMask(`<path d='${ic.d}' transform='${ic.t}'/>`);
  return (
    <span
      aria-hidden
      className="block h-6 w-6 shrink-0 transition-colors duration-300"
      style={{ background: color, maskImage: mask, WebkitMaskImage: mask }}
    />
  );
}

// Esquina exterior del bloque (mascara SVG copiada de Xirex)
const CORNER_MASK = svgMask(
  "<path d='M 0 0 L 0 6 L 6 0 Z' transform='translate(14 14)'/><path d='M 20 0 L 20 0.995 L 8.995 0.995 C 4.577 0.995 0.995 4.577 0.995 8.995 L 0.995 20 L 0 20 L 0 0.099 L 0.099 0.099 L 0.099 0 Z'/>",
  "0 0 20 20",
);

function SectionCorners({ color }: { color: string }) {
  return (
    <>
      {["-left-2 -top-2", "-right-2 -top-2 rotate-90", "-bottom-2 -right-2 rotate-180", "-bottom-2 -left-2 -rotate-90"].map((pos) => (
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

// Esquinas del marco interior: cuadro de 6px del color del fondo + punto de 4px centrado en la esquina
function FrameDots() {
  const spots = [
    { box: "left-0 top-0", dot: "-left-[2px] -top-[2px]" },
    { box: "right-0 top-0", dot: "-right-[2px] -top-[2px]" },
    { box: "bottom-0 left-0", dot: "-bottom-[2px] -left-[2px]" },
    { box: "bottom-0 right-0", dot: "-bottom-[2px] -right-[2px]" },
  ];
  return (
    <>
      {spots.map((s) => (
        <span key={s.box} aria-hidden>
          <span className={cn("absolute z-10 h-[6px] w-[6px]", s.box)} style={{ background: C.bg }} />
          <span className={cn("absolute z-10 h-1 w-1", s.dot)} style={{ background: C.dot }} />
        </span>
      ))}
    </>
  );
}

// ---------- Ilustracion: 5 capas que bajan en secuencia ----------
// Posicion final de cada capa (de abajo hacia arriba) dentro del area de 358x334
const LAYERS = [
  { src: "/como-funciona/capa-1.png", top: 102, h: 232 },
  { src: "/como-funciona/capa-2.png", top: 75, h: 232 },
  { src: "/como-funciona/capa-3.png", top: 50, h: 233 },
  { src: "/como-funciona/capa-4.png", top: 25, h: 233 },
  { src: "/como-funciona/capa-5.png", top: 0, h: 233 },
];

function Layer({ index, scrolled }: { index: number; scrolled: MotionValue<number> }) {
  const start = index * LAYER_SCROLL - LAYER_OFFSET;
  const y = useTransform(scrolled, [start, start + LAYER_SCROLL], [0, LAYER_DROP], { clamp: true });
  const L = LAYERS[index];
  return (
    <motion.div className="absolute left-0 w-[358px]" style={{ top: L.top - LAYER_DROP, height: L.h, y }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={L.src} alt="" className="block h-full w-full" draggable={false} />
      {index === LAYERS.length - 1 && <TopLogo />}
    </motion.div>
  );
}

// Logo RDMD proyectado sobre la cara superior (isometrica) de la ultima capa
function TopLogo() {
  return (
    <svg aria-hidden viewBox="0 0 358 233" className="absolute inset-0 h-full w-full">
      <g transform="matrix(0.866 0.5 -0.866 0.5 179 103.2)">
        <text
          x="0"
          y="0"
          textAnchor="middle"
          dominantBaseline="central"
          className="font-display"
          style={{ fontSize: 30, fontWeight: 500, letterSpacing: "-0.01em" }}
          fill={C.bg}
        >
          RDMD <tspan fill={C.accent}>&amp;</tspan> Co.
        </text>
      </g>
    </svg>
  );
}

function Illustration({ scrolled }: { scrolled: MotionValue<number> }) {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: C.panel }}>
      {/* Guias punteadas: area central de 358px con lineas a ambos lados y una al centro */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-1/2 w-[358px] -translate-x-1/2 border-x border-dashed"
        style={{ borderColor: C.line }}
      >
        <div className="absolute inset-y-0 left-0 w-1/2 border-r border-dashed" style={{ borderColor: C.line }} />
      </div>
      <div className="absolute left-1/2 top-[71px] h-[334px] w-[358px] -translate-x-1/2">
        {LAYERS.map((_, i) => (
          <Layer key={i} index={i} scrolled={scrolled} />
        ))}
      </div>
    </div>
  );
}

// ---------- Seccion ----------
export function HowItWorks() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scrolled = useTransform(scrollYProgress, (v) => v * TRAVEL);

  // El paso activo cambia cada vez que aterriza una capa (igual que en Xirex)
  useMotionValueEvent(scrolled, "change", (s) => {
    setActive(Math.min(STEPS.length - 1, Math.max(0, Math.floor((s + LAYER_OFFSET) / LAYER_SCROLL))));
  });

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + i * LAYER_SCROLL - LAYER_OFFSET + LAYER_SCROLL / 2, behavior: "smooth" });
  };

  const header = (
    <div className="flex flex-col items-center text-center">
      <span
        className="px-1 font-sans text-xs uppercase leading-[18px] tracking-[0.16em]"
        style={{ background: C.panel, color: C.eyebrow }}
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
      {/* Escritorio (>=1280px) */}
      <div
        ref={ref}
        className="relative mx-8 hidden xl:block"
        style={{ height: `calc(100vh + ${TRAVEL}px)`, background: C.bg }}
      >
        <SectionCorners color={C.corner} />
        <div className="sticky top-0 h-screen overflow-hidden">
          <div
            className="absolute left-1/2 top-[50px] h-[696px] w-[min(1392px,calc(100vw-224px))] -translate-x-1/2"
          >
            {/* Bordes sin ocupar espacio, como el ::after de Framer */}
            <span aria-hidden className="pointer-events-none absolute inset-0 z-[5] border" style={{ borderColor: C.line }} />
            <FrameDots />
            <div className="h-[220px] pt-[40px]">{header}</div>

            <div className="relative grid h-[476px] grid-cols-2">
              <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-px" style={{ background: C.line }} />
              <div className="flex flex-col">
                {STEPS.map((step, i) => {
                  const isActive = i === active;
                  const color = isActive ? C.accentText : C.muted;
                  return (
                    <button
                      key={step.title}
                      type="button"
                      onClick={() => goTo(i)}
                      className="relative flex cursor-pointer flex-col overflow-hidden text-left transition-[height,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        height: isActive ? 476 - 58 * (STEPS.length - 1) : 58,
                        padding: isActive ? 24 : "16px 24px",
                        background: C.bg,
                      }}
                    >
                      {/* Linea activa de 2px */}
                      <span
                        aria-hidden
                        className="absolute inset-y-0 left-0 w-[2px] origin-top transition-transform duration-500"
                        style={{ background: C.accent, transform: `scaleY(${isActive ? 1 : 0})` }}
                      />
                      {/* Linea inferior de 1px */}
                      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={{ background: C.line }} />
                      <span className="flex items-center justify-between">
                        <span className="flex items-center gap-3">
                          <StepIcon index={i} color={color} />
                          <span
                            className="font-sans text-[20px] leading-[26px] tracking-[-0.03em] transition-colors duration-300"
                            style={{ color, fontWeight: isActive ? 500 : 400 }}
                          >
                            {step.title}
                          </span>
                        </span>
                        <span className="font-sans text-xs leading-[18px] tracking-[0.04em] transition-colors duration-300" style={{ color }}>
                          .{String(i + 1).padStart(2, "0")}.
                        </span>
                      </span>
                      <span
                        className="mt-auto max-w-[480px] font-sans text-base leading-[20.8px] tracking-[-0.03em] transition-opacity duration-500"
                        style={{ color: C.body, opacity: isActive ? 1 : 0 }}
                      >
                        {step.body}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="relative">
                <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-px" style={{ background: C.line }} />
                <Illustration scrolled={scrolled} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tablet y movil: pasos apilados */}
      <div className="relative mx-4 py-16 sm:mx-8 xl:hidden" style={{ background: C.bg }}>
        <SectionCorners color={C.corner} />
        <div className="px-6">{header}</div>
        <div className="mt-10 border-t" style={{ borderColor: C.line }}>
          {STEPS.map((step, i) => (
            <div key={step.title} className="border-b px-6 py-6" style={{ borderColor: C.line }}>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <StepIcon index={i} color={C.accentText} />
                  <span className="font-sans text-lg font-medium" style={{ color: C.ink }}>
                    {step.title}
                  </span>
                </span>
                <span className="font-sans text-xs tracking-[0.04em]" style={{ color: C.muted }}>
                  .{String(i + 1).padStart(2, "0")}.
                </span>
              </div>
              <p className="mt-3 font-sans text-base leading-relaxed" style={{ color: C.body }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
