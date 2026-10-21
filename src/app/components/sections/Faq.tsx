"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/app/lib/cn";

// Seccion copiada del codigo de "FAQs Section" de la referencia Xirex (plantilla con licencia).
// Valores de Xirex: padding 120px, contenedor 1200px en dos columnas de 600px. Izquierda (pr 40,
// space-between): titulo de 2 lineas a 64px arriba; abajo descripcion de 440px (16/20.8, 60%) y
// boton "talk to our team" (padding 12/16, gap 8, subrayado de 1px, linea de acento que crece y
// flecha doble que se desliza). Derecha: preguntas con padding 20/16, linea inferior #1f1f1f;
// la activa lleva numero en acento (RDMD quito el borde de la abierta y el icono "+");
// respuesta de 440px (14/18.2, 60%) con 40px de espacio arriba. La primera viene abierta.
// Cambios RDMD: textos y respuestas propias, dorado, Cormorant/DM Sans, boton a Cal.com.

const FAQS = [
  {
    q: "¿Con qué tipo de empresas trabajan?",
    a: "Con empresas pequeñas y medianas, de 12 a 50 personas, donde el fundador ya carga con demasiada operación. Nos especializamos en clínicas privadas, pero cualquier negocio con procesos manuales y repetitivos puede aprovecharlo.",
  },
  {
    q: "¿Necesitamos experiencia previa con automatización?",
    a: "No. Hacemos el diagnóstico, construimos el sistema y capacitamos a tu equipo para usarlo. Solo necesitas saber qué tarea les quita más tiempo, y si no lo tienes claro, lo encontramos juntos en el diagnóstico.",
  },
  {
    q: "¿Se conectan con los sistemas que ya usamos?",
    a: "Sí. Conectamos las herramientas que tu equipo ya usa: CRM, WhatsApp, correo, hojas de cálculo, Shopify, plataformas de anuncios y más. No hace falta cambiar de herramientas para empezar.",
  },
  {
    q: "¿Cuánto tarda un proyecto?",
    a: "Entre 3 y 15 días laborales, según el alcance. El plazo exacto queda definido en el diagnóstico antes de empezar.",
  },
  {
    q: "¿Qué servicios ofrecen?",
    a: "Automatizaciones de procesos, soluciones a la medida, y consultoría y estrategia.",
  },
];

// Flecha de Xirex (viewBox 24x24)
const ARROW_MASK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath transform='translate(3.97 4)' fill='white' d='M 14.78 0 L 5.53 0 L 5.53 1.5 L 13.47 1.5 L 0 14.97 L 1.06 16.03 L 14.53 2.56 L 14.53 10.5 L 16.03 10.5 L 16.03 1.25 C 16.03 0.56 15.47 0 14.78 0 Z'/%3E%3C/svg%3E\")";

function maskStyle(url: string) {
  return { maskImage: url, WebkitMaskImage: url, maskSize: "100% 100%", WebkitMaskSize: "100% 100%" };
}

const EASE = "duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

function TalkButton() {
  return (
    <a
      href="https://cal.com/rdmdco/30min"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center gap-2 border-b border-fg px-4 py-3"
    >
      <span aria-hidden className={cn("absolute -bottom-px left-0 h-px w-0 bg-accent transition-[width] group-hover:w-full", EASE)} />
      <span aria-hidden className="relative h-4 w-4 overflow-hidden">
        <span className={cn("absolute inset-0 bg-fg transition-transform group-hover:translate-x-4 group-hover:-translate-y-4", EASE)} style={maskStyle(ARROW_MASK)} />
        <span className={cn("absolute inset-0 -translate-x-4 translate-y-4 bg-accent transition-transform group-hover:translate-x-0 group-hover:translate-y-0", EASE)} style={maskStyle(ARROW_MASK)} />
      </span>
      <span className={cn("font-sans text-base font-bold uppercase leading-[20.8px] tracking-[0.04em] text-fg transition-colors group-hover:text-accent", EASE)}>
        Habla con nuestro equipo
      </span>
    </a>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="preguntas" className="flex flex-col items-center px-4 py-20 md:px-10 xl:py-[120px]">
      <div className="flex w-full max-w-[1200px] flex-col gap-12 lg:flex-row lg:justify-between lg:gap-0">
        {/* Izquierda */}
        <div className="flex flex-col justify-between gap-12 lg:w-[600px] lg:pr-10">
          <h2 className="font-display font-light leading-none tracking-[-0.03em] text-fg" style={{ fontSize: "clamp(2.75rem, 4.5vw, 64px)" }}>
            <span className="block italic text-accent">Preguntas</span>
            <span className="block">frecuentes</span>
          </h2>
          <div className="flex flex-col gap-6">
            <div className="flex max-w-[440px] flex-col gap-4 font-sans text-base leading-[20.8px] text-fg/60">
              <p>
                Respuestas a las dudas más comunes sobre nuestros servicios, cómo trabajamos y cómo ayudamos a las empresas
                a automatizar con confianza.
              </p>
              <p>¿Todavía tienes dudas?</p>
            </div>
            <div>
              <TalkButton />
            </div>
          </div>
        </div>

        {/* Derecha: preguntas */}
        <div className="flex flex-col lg:w-[600px]">
          {FAQS.map((f, i) => {
            const active = open === i;
            return (
              <div key={f.q} className="group relative border-b border-[#1f1f1f]">
                {/* Borde: visible en la activa y al pasar el mouse */}
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -inset-px border transition-[opacity,border-color]",
                    EASE,
                    active ? "opacity-0" : "border-fg/60 opacity-0 group-hover:opacity-100",
                  )}
                />
                <button
                  type="button"
                  aria-expanded={active}
                  onClick={() => setOpen(active ? null : i)}
                  className="flex w-full cursor-pointer items-start gap-10 px-4 py-5 text-left"
                >
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className={cn("font-sans text-xs font-medium leading-[18px] tracking-[0.02em] transition-colors", EASE, active ? "text-accent" : "text-fg/40")}>
                      .{String(i + 1).padStart(2, "0")}.
                    </span>
                    <span className="font-display text-[22px] font-normal leading-[26px] tracking-[-0.01em] text-fg">{f.q}</span>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ height: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }, opacity: { duration: 0.45, ease: "easeOut" } }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[440px] px-4 pb-5 pt-5 font-sans text-sm leading-[18.2px] text-fg/60">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
