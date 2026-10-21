"use client";

import { useState } from "react";
import * as motion from "motion/react-client";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/app/components/ui/Container";
import { Sparkle } from "@/app/components/ui/Sparkle";
import { fadeUp } from "@/app/lib/motion";

// Seccion inspirada en "Newsletter" de la referencia Xirex.
// El formulario envia el correo a /api/newsletter, que lo guarda en Airtable (RDMD CRM, tabla Newsletter).

const SUBMIT_LABEL = "Suscribirme";

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

type Status = "idle" | "sending" | "done" | "error";

export function Newsletter() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), company: data.get("company"), page: window.location.pathname }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

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

              {status === "done" ? (
                <p role="status" className="font-sans text-base leading-relaxed text-surface">
                  Listo. Te llegará el próximo artículo a tu correo.
                </p>
              ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-5">
                {/* Campo trampa para bots: oculto para las personas */}
                <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                <label htmlFor="newsletter-email" className="sr-only">
                  Tu correo
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Tu correo"
                  className="w-full border-b border-surface/40 bg-transparent pb-3 font-sans text-base text-surface placeholder:text-surface/60 focus:border-surface focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group w-full cursor-pointer bg-surface p-[2px] text-left disabled:cursor-wait disabled:opacity-70"
                >
                  {/* Hover como en la referencia Xirex: fondo un tono mas oscuro, cuadro del
                      icono pasa a dorado y gira 90 grados, y el texto parpadea letra por letra */}
                  <span className="flex items-center justify-between rounded-tl-lg bg-fg p-2 pr-6 transition-colors duration-300 group-hover:bg-[#e6dfd2]">
                    <span className="flex h-8 w-8 items-center justify-center bg-surface text-fg transition-[background-color,transform] duration-300 ease-out group-hover:rotate-90 group-hover:bg-accent">
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.75}
                        className="transition-transform duration-300 ease-out group-hover:-rotate-90"
                      />
                    </span>
                    <span
                      aria-label={SUBMIT_LABEL}
                      className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-surface transition-colors duration-300 group-hover:text-[#8a6420]"
                    >
                      {SUBMIT_LABEL.split("").map((ch, i) => (
                        <span
                          key={i}
                          aria-hidden
                          className="inline-block group-hover:animate-[letterFlicker_420ms_ease-out_both]"
                          style={{ animationDelay: `${(i * 53) % 260}ms` }}
                        >
                          {ch === " " ? " " : ch}
                        </span>
                      ))}
                    </span>
                  </span>
                </button>
                {status === "error" && (
                  <p role="alert" className="font-sans text-sm text-surface">
                    No pudimos guardar tu correo. Inténtalo de nuevo en un momento.
                  </p>
                )}
              </form>
              )}
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
