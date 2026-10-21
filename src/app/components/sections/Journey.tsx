"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { cn } from "@/app/lib/cn";

// Seccion copiada del codigo de "Journey Section" de la referencia Xirex (plantilla con licencia).
// Valores de Xirex: contenedor de 1200px; bloque fijo (sticky) de 800px con padding superior 80;
// izquierda de 620px (icono 72px, gap 64, etiqueta "# año" + titulo, texto grande); derecha de 580px
// con la regla de años, que se desplaza de +400px a -400px de forma lineal durante todo el recorrido.
// Recorrido: 7 etapas de 643px de scroll (514 en tablet, 386 en movil). Al cambiar de etapa las
// palabras entran una a una: opacidad 0 -> 1 y 10px -> 0, 0.4s, 75ms entre palabras.
// Cambios RDMD: textos en español, años 2021-2026 + Hoy, dorado en lugar de rojo, Cormorant/DM Sans.

const STEPS = [
  { year: "2021", title: "Fundación", text: "Empezamos con una idea simple: \"la IA debe resolver problemas reales del negocio, no crear más complejidad\". Ese principio se volvió la base de todo." },
  { year: "2022", title: "Exploración", text: "Trabajamos con los primeros equipos para explorar automatización, datos y nuevas herramientas de IA, y aprender dónde la tecnología cambiaba de verdad la operación." },
  { year: "2023", title: "Reposicionamiento", text: "Creemos que la IA que funciona no se define solo por la tecnología. Se construye con criterio práctico, una implementación cuidadosa y valor real para el negocio a largo plazo." },
  { year: "2024", title: "Implementación", text: "Pasamos de las recomendaciones a construir sistemas de IA conectados directamente con los procesos, herramientas y equipos que nuestros clientes ya usaban." },
  { year: "2025", title: "Expansión", text: "Nuestro trabajo creció hacia estrategia, automatización, soluciones de IA a la medida e integración de sistemas, con un solo camino práctico de la oportunidad a la implementación." },
  { year: "2026", title: "Impacto a escala", text: "Ayudamos a empresas a pasar de pilotos aislados de IA a capacidades que se repiten, con mejor adopción, reglas más claras y resultados medibles en el negocio." },
  { year: "Hoy", title: "Listos para lo que viene", text: "Hoy, RDMD ayuda a empresas con ambición a encontrar las oportunidades correctas, implementar IA con confianza y mejorar de forma continua cómo generan valor en toda la organización." },
];

// Icono de Xirex (cruz de puntos 72x72), usado como mascara sobre el color de acento
const ICON_MASK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 72 72'%3E%3Cpath d='M 35 2 L 35 0 L 37 0 L 37 2 Z M 35 10 L 35 8 L 37 8 L 37 10 Z M 35 18 L 35 16 L 37 16 L 37 18 Z M 16 18 L 16 16 L 18 16 L 18 18 Z M 54 37 L 54 35 L 56 35 L 56 37 Z M 62 37 L 62 35 L 64 35 L 64 37 Z M 70 37 L 70 35 L 72 35 L 72 37 Z M 16 37 L 16 35 L 18 35 L 18 37 Z M 8 37 L 8 35 L 10 35 L 10 37 Z M 0 37 L 0 35 L 2 35 L 2 37 Z M 16 56 L 16 54 L 18 54 L 18 56 Z M 54 56 L 54 54 L 56 54 L 56 56 Z M 35 37 L 35 35 L 37 35 L 37 37 Z M 54 18 L 54 16 L 56 16 L 56 18 Z M 35 56 L 35 54 L 37 54 L 37 56 Z M 35 64 L 35 62 L 37 62 L 37 64 Z M 35 72 L 35 70 L 37 70 L 37 72 Z' fill='white'/%3E%3C/svg%3E\")";

const TICK = "h-px bg-fg/40";

// ---------- Regla de años (variantes "Active" y "Default" de Xirex) ----------
function RulerItem({ label, active, last }: { label: string; active: boolean; last: boolean }) {
  if (last)
    return (
      <div className="flex items-start gap-2">
        <div className="flex w-4 justify-end md:w-10">
          <div className={cn("h-px w-2.5 md:w-[30px]", active ? "bg-accent" : "bg-fg/40")} />
        </div>
        <Label text={label} active={active} />
      </div>
    );
  if (active)
    return (
      <div className="flex items-start gap-2">
        <div className="flex w-4 flex-col items-end gap-10 md:w-8">
          <div className="h-px w-4 bg-accent md:w-8" />
          <div className="h-px w-2.5 bg-accent opacity-50 md:w-4" />
        </div>
        <Label text={label} active />
      </div>
    );
  return (
    <div className="flex items-start gap-2">
      <div className="flex w-4 flex-col items-end gap-10 md:w-8">
        <div className={cn(TICK, "w-2.5 md:w-4")} />
        <div className={cn(TICK, "w-4 md:w-6")} />
        <div className={cn(TICK, "w-2.5 md:w-4")} />
      </div>
      <div className="hidden h-[83px] items-center md:flex">
        <Label text={label} active={false} centered />
      </div>
    </div>
  );
}

// En Xirex el año activo y "NOW" se centran sobre su raya; en los demas va centrado en el bloque de 83px
function Label({ text, active, centered = false }: { text: string; active: boolean; centered?: boolean }) {
  return (
    <span className={cn("hidden md:flex", !centered && "h-px items-center")}>
      <span
        className={cn(
          "font-sans text-sm leading-[18.2px] tracking-[-0.03em] tabular-nums",
          active ? "text-accent" : "text-fg",
        )}
      >
        {text}
      </span>
    </span>
  );
}

// ---------- Seccion ----------
export function Journey() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "end end"] });
  const rulerY = useTransform(scrollYProgress, [0, 1], [400, -400]);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStep(Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length))));
  });
  const s = STEPS[step];

  return (
    <section id="trayectoria" className="flex justify-center px-4 py-4 md:px-10 md:py-10 xl:p-20">
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-2.5">
        {/* Bloque fijo */}
        <div className="sticky top-0 flex h-[650px] w-full pt-20 md:h-[800px]">
          {/* Izquierda */}
          <div className="flex min-w-0 flex-1 flex-col gap-12 pr-4 md:gap-16 md:pr-10 xl:w-[620px] xl:flex-none">
            <div
              aria-hidden
              className="h-16 w-16 shrink-0 bg-accent md:h-[72px] md:w-[72px]"
              style={{ maskImage: ICON_MASK, WebkitMaskImage: ICON_MASK, maskSize: "100% 100%", WebkitMaskSize: "100% 100%" }}
            />
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-2 bg-white/10 p-1 font-sans text-xs leading-[18px] tracking-[-0.03em]">
                  <span className="text-fg/40">#</span>
                  <span className="text-fg tabular-nums">{s.year}</span>
                </span>
                <span className="font-sans text-xl font-medium leading-[1.2] tracking-[-0.03em] text-accent md:text-[22px] xl:text-2xl">
                  {s.title}
                </span>
              </div>
              <p key={step} className="font-display text-[34px] font-normal leading-[1.1] tracking-[-0.02em] text-fg md:text-[44px] xl:text-[52px]">
                {s.text.split(" ").map((w, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.06 + i * 0.075 }}
                  >
                    {w}
                    {" "}
                  </motion.span>
                ))}
              </p>
            </div>
          </div>
          {/* Derecha: regla */}
          <div className="flex h-[570px] w-4 shrink-0 items-center justify-center overflow-hidden md:h-[720px] md:w-[72px] xl:w-[580px]">
            <motion.div style={{ y: rulerY }} className="flex w-4 flex-col items-start gap-10 py-2 md:w-[72px]">
              {STEPS.map((st, i) => (
                <RulerItem key={st.year} label={st.year} active={i === step} last={i === STEPS.length - 1} />
              ))}
            </motion.div>
          </div>
        </div>
        {/* Recorrido de scroll: 7 etapas */}
        <div ref={wrapRef} aria-hidden className="h-[2702px] w-full md:h-[3598px] xl:h-[4500px]" />
      </div>
    </section>
  );
}
