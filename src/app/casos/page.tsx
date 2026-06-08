import type { Metadata } from "next";
import { Nav } from "@/app/components/sections/Nav";
import { Footer } from "@/app/components/sections/Footer";
import { CtaClosing } from "@/app/components/sections/CtaClosing";
import { Container } from "@/app/components/ui/Container";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { CASES } from "@/app/lib/cases-data";

export const metadata: Metadata = {
  title: "Casos de éxito — RDMD & Co.",
  description:
    "Resultados reales de automatización para empresas en Latinoamérica: reportería, atención al cliente y flujos de trabajo.",
};

export default function CasosPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative isolate overflow-hidden border-b border-rule">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 75% 0%, rgba(200,151,59,0.10) 0%, transparent 65%)",
            }}
          />
          <Container className="pb-[clamp(4rem,8vw,7rem)] pt-[clamp(7rem,12vw,10rem)]">
            <div className="max-w-3xl">
              <Eyebrow tone="accent">Casos de éxito</Eyebrow>
              <h1
                className="mt-6 font-display font-light leading-[1.04] tracking-[-0.02em] text-fg"
                style={{ fontSize: "var(--text-h1)" }}
              >
                Resultados que hemos producido
              </h1>
              <p className="mt-7 max-w-2xl font-sans text-lg leading-relaxed text-fg-muted">
                Proyectos reales, números reales. Así se ve la automatización
                cuando se diseña a medida de la operación de cada empresa.
              </p>
            </div>
          </Container>
        </section>

        {/* Casos */}
        <section className="border-b border-rule">
          <Container className="py-section">
            <div className="divide-y divide-rule border-t border-rule">
              {CASES.map((c) => (
                <article
                  key={c.title}
                  className="grid gap-8 py-12 md:grid-cols-12 md:gap-12"
                >
                  <div className="md:col-span-5">
                    <Eyebrow tone="muted">{c.sector}</Eyebrow>
                    <p
                      className="mt-5 font-display font-light leading-none tracking-[-0.02em] text-accent"
                      style={{ fontSize: "var(--text-stat)" }}
                    >
                      {c.stat}
                    </p>
                    <p className="mt-3 max-w-xs font-sans text-sm leading-snug text-fg-muted">
                      {c.statLabel}
                    </p>
                  </div>
                  <div className="md:col-span-7">
                    <p className="font-sans text-xs uppercase tracking-[0.24em] text-fg-faint">
                      {c.client}
                    </p>
                    <h2 className="mt-4 font-display text-2xl font-light leading-tight text-fg sm:text-3xl">
                      {c.title}
                    </h2>
                    <p className="mt-5 font-sans text-base leading-relaxed text-fg-muted">
                      {c.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-12 max-w-2xl font-sans text-sm leading-relaxed text-fg-faint">
              Los nombres de los clientes se mantienen reservados por acuerdo.
              Cuando un cliente autoriza, publicamos el caso completo con su
              nombre y testimonio.
            </p>
          </Container>
        </section>

        <CtaClosing />
      </main>
      <Footer />
    </>
  );
}
