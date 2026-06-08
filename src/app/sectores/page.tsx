import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/app/components/sections/Nav";
import { Footer } from "@/app/components/sections/Footer";
import { CtaClosing } from "@/app/components/sections/CtaClosing";
import { Container } from "@/app/components/ui/Container";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { SECTORS } from "@/app/lib/sectors-data";

export const metadata: Metadata = {
  title: "Sectores — RDMD & Co.",
  description:
    "Automatización especializada por sector: agencias de marketing, servicios profesionales y e-commerce en Latinoamérica.",
};

export default function SectorsIndexPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
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
              <Eyebrow tone="accent">Sectores</Eyebrow>
              <h1
                className="mt-6 font-display font-light leading-[1.04] tracking-[-0.02em] text-fg"
                style={{ fontSize: "var(--text-h1)" }}
              >
                A quién servimos
              </h1>
              <p className="mt-7 max-w-2xl font-sans text-lg leading-relaxed text-fg-muted">
                Trabajamos con empresas pequeñas en Latinoamérica. Nos
                especializamos en agencias de marketing, pero los mismos sistemas
                sirven a cualquier negocio con procesos manuales que repetir.
              </p>
            </div>
          </Container>
        </section>

        <section className="border-b border-rule">
          <Container className="py-section">
            <div className="grid gap-px bg-rule sm:grid-cols-3">
              {SECTORS.map((sector, i) => (
                <Link
                  key={sector.slug}
                  href={`/sectores/${sector.slug}`}
                  className="group relative flex flex-col justify-between overflow-hidden bg-surface p-8 transition-colors duration-500 hover:bg-surface-raised sm:p-10"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-y-100"
                  />
                  <div>
                    <span className="font-sans text-xs font-medium tracking-[0.28em] text-fg-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-6 font-display text-2xl font-light leading-tight text-fg">
                      {sector.title}
                    </h2>
                    <p className="mt-4 font-sans text-sm leading-relaxed text-fg-muted">
                      {sector.subtitle}
                    </p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-1.5 font-sans text-sm text-accent transition-transform duration-300 group-hover:translate-x-1">
                    Ver el sector
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        <CtaClosing />
      </main>
      <Footer />
    </>
  );
}
