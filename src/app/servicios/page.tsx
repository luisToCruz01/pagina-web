import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/app/components/sections/Nav";
import { Footer } from "@/app/components/sections/Footer";
import { CtaClosing } from "@/app/components/sections/CtaClosing";
import { SolutionsGrid } from "@/app/components/sections/SolutionsGrid";
import { Container } from "@/app/components/ui/Container";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { Button } from "@/app/components/ui/Button";
import { SERVICES } from "@/app/lib/services-data";

export const metadata: Metadata = {
  title: "Servicios — RDMD & Co.",
  description:
    "Servicios de automatización y software para empresas en Latinoamérica: gestión de procesos, desarrollo a medida, arquitectura, IA y pruebas de software.",
};

export default function ServicesIndexPage() {
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
              <Eyebrow tone="accent">Servicios</Eyebrow>
              <h1
                className="mt-6 font-display font-light leading-[1.04] tracking-[-0.02em] text-fg"
                style={{ fontSize: "var(--text-h1)" }}
              >
                Lo que construimos para tu empresa
              </h1>
              <p className="mt-7 max-w-2xl font-sans text-lg leading-relaxed text-fg-muted">
                Cada servicio se diseña a medida de tu operación. No vendemos
                plantillas. Diagnosticamos, diseñamos y construimos el sistema que
                tu negocio necesita para operar al nivel siguiente.
              </p>
            </div>
          </Container>
        </section>

        {/* Lista de servicios */}
        <section className="border-b border-rule">
          <Container className="py-section">
            <div className="grid gap-px bg-rule sm:grid-cols-2">
              {SERVICES.map((service, i) => {
                // Si el total es impar, la última card ocupa todo el ancho con
                // layout horizontal, para no dejar una celda vacía en el grid.
                const isLastOdd =
                  i === SERVICES.length - 1 && SERVICES.length % 2 !== 0;
                return (
                  <Link
                    key={service.slug}
                    href={`/servicios/${service.slug}`}
                    className={`group relative overflow-hidden bg-surface p-8 transition-colors duration-500 hover:bg-surface-raised sm:p-12 ${
                      isLastOdd
                        ? "sm:col-span-2 sm:flex sm:items-center sm:justify-between sm:gap-16"
                        : "flex flex-col justify-between"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-y-100"
                    />
                    <div className={isLastOdd ? "sm:max-w-xl" : ""}>
                      <span className="font-sans text-xs font-medium tracking-[0.28em] text-fg-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="mt-6 font-display text-2xl font-light leading-tight text-fg sm:text-3xl">
                        {service.title}
                      </h2>
                      <p
                        className={`mt-4 font-sans text-sm leading-relaxed text-fg-muted ${
                          isLastOdd ? "max-w-xl" : "max-w-md"
                        }`}
                      >
                        {service.subtitle}
                      </p>
                    </div>
                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 font-sans text-sm text-accent transition-transform duration-300 group-hover:translate-x-1 ${
                        isLastOdd ? "mt-8 sm:mt-0" : "mt-8"
                      }`}
                    >
                      Conocer el servicio
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
                );
              })}
            </div>
          </Container>
        </section>

        {/* Soluciones llave en mano (productos con precio) */}
        <section className="relative isolate overflow-hidden border-b border-rule">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 80% 0%, rgba(200, 151, 59, 0.06), transparent 70%)",
            }}
          />
          <Container className="py-section">
            <div className="max-w-3xl">
              <Eyebrow sparkle>Soluciones llave en mano</Eyebrow>
              <h2
                className="mt-6 font-display font-light leading-[1.05] tracking-[-0.02em] text-fg"
                style={{ fontSize: "var(--text-h1)" }}
              >
                Resultados desde el día uno, con precio cerrado
              </h2>
              <p className="mt-6 font-sans text-lg leading-relaxed text-fg-muted">
                Para empresas pequeñas que quieren un sistema funcionando rápido,
                sin un proyecto de consultoría. Pago único, alcance definido,
                entrega en días.
              </p>
            </div>

            <div className="mt-16">
              <SolutionsGrid />
            </div>

            <div className="mt-16 flex flex-col items-start gap-4 border-t border-rule pt-10 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl font-sans text-base text-fg-muted">
                ¿Necesitas algo diferente a lo de arriba? Cuéntanos tu proceso y
                lo construimos a medida.
              </p>
              <Button href="https://cal.com/rdmdco/30min" external variant="secondary">
                Hablemos
              </Button>
            </div>

            <p className="mt-10 font-sans text-xs uppercase tracking-[0.2em] text-fg-faint">
              Todas las soluciones incluyen onboarding guiado y soporte
              post-entrega de 15 días.
            </p>
          </Container>
        </section>

        <CtaClosing />
      </main>
      <Footer />
    </>
  );
}
