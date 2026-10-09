"use client";

import * as motion from "motion/react-client";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/app/components/ui/Container";
import { Sparkle } from "@/app/components/ui/Sparkle";
import { fadeUp } from "@/app/lib/motion";

// Seccion inspirada en "Newsletter" de la referencia Xirex.
// PENDIENTE antes de publicar: el formulario NO esta conectado a nada.
// Decidir destino del correo (Airtable / herramienta de newsletter) y cablear onSubmit.

const FOOTNOTES = [
  "Blog RDMD",
  "Un artículo por semana",
  "Notas de campo",
  "Para fundadores y directores",
];

function DotCross() {
  // Adorno de puntos en forma de cruz (esquina superior derecha)
  const dots: [number, number][] = [];
  for (let i = -3; i <= 3; i++) {
    if (i === 0) continue;
    dots.push([i * 9, 0], [0, i * 9]);
  }
  return (
    <svg aria-hidden width="72" height="72" viewBox="-36 -36 72 72" className="text-surface/70">
      {dots.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x - 1} y={y - 1} width="2" height="2" fill="currentColor" />
      ))}
    </svg>
  );
}

export function Newsletter() {
  return (
    <section className="border-t border-rule">
      <Container className="py-section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <div className="relative bg-accent p-8 text-surface sm:p-10">
            <div aria-hidden className="pointer-events-none absolute inset-2 border border-dashed border-surface" />
            <div className="absolute right-6 top-6 hidden sm:block">
              <DotCross />
            </div>

            <h2
              className="relative font-display font-light leading-[1] tracking-[-0.02em]"
              style={{ fontSize: "var(--text-h1)" }}
            >
              <span className="block">Mantente un paso</span>
              <span className="block italic">adelante</span>
            </h2>

            <div className="relative mt-16 grid gap-10 lg:mt-32 lg:grid-cols-2 lg:items-end lg:gap-16">
              <div>
                <p className="flex items-center gap-2 font-sans text-sm font-medium">
                  <Sparkle size={12} className="text-surface" />
                  Un artículo nuevo cada semana
                </p>
                <p className="mt-4 max-w-[44ch] font-sans text-base leading-relaxed text-surface/80">
                  Ideas prácticas de automatización, casos de implementación y
                  novedades que ayudan a las empresas a avanzar con confianza.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  // Sin conectar todavia: no se envia nada.
                  e.preventDefault();
                }}
                className="flex flex-col gap-5"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Tu correo
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="Tu correo"
                  className="w-full border-b border-surface/40 bg-transparent pb-3 font-sans text-base text-surface placeholder:text-surface/60 focus:border-surface focus:outline-none"
                />
                <button
                  type="submit"
                  className="group flex w-full cursor-pointer items-center justify-between border border-surface bg-fg p-2 pr-6 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-surface transition-colors duration-300 hover:bg-surface hover:text-fg"
                >
                  <span className="flex h-8 w-8 items-center justify-center bg-surface text-fg transition-colors duration-300 group-hover:bg-accent group-hover:text-surface">
                    <ArrowUpRight size={16} strokeWidth={1.75} />
                  </span>
                  Suscribirme
                </button>
              </form>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-y-2 font-sans text-xs uppercase tracking-[0.16em] text-fg-faint lg:flex lg:justify-between">
            {FOOTNOTES.map((note) => (
              <span key={note}>{note}</span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
