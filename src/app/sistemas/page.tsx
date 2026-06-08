import type { Metadata } from "next";
import { Nav } from "@/app/components/sections/Nav";
import { Footer } from "@/app/components/sections/Footer";
import { SolutionsGrid } from "@/app/components/sections/SolutionsGrid";
import { CtaClosing } from "@/app/components/sections/CtaClosing";
import { Container } from "@/app/components/ui/Container";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { Button } from "@/app/components/ui/Button";

export const metadata: Metadata = {
  title: "Sistemas llave en mano — RDMD & Co.",
  description:
    "Sistemas de automatización con precio fijo y entrega en días para empresas pequeñas: leads, atención al cliente, reportes, documentos, nutrición y reactivación.",
};

export default function SistemasPage() {
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
              <Eyebrow tone="accent">Sistemas llave en mano</Eyebrow>
              <h1
                className="mt-6 font-display font-light leading-[1.04] tracking-[-0.02em] text-fg"
                style={{ fontSize: "var(--text-h1)" }}
              >
                Resultados desde el día uno, con precio cerrado
              </h1>
              <p className="mt-7 max-w-2xl font-sans text-lg leading-relaxed text-fg-muted">
                Para empresas pequeñas que quieren un sistema funcionando rápido,
                sin un proyecto de consultoría. Pago único, alcance definido,
                entrega en días. Eliges la solución, la construimos, la pones a
                trabajar.
              </p>
              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Button href="https://cal.com/rdmdco/30min" external variant="primary">
                  Habla con nosotros
                </Button>
                <Button href="/servicios" variant="secondary">
                  ¿Necesitas algo a medida?
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Distinción servicios vs sistemas */}
        <section className="border-b border-rule">
          <Container className="py-[clamp(3rem,6vw,5rem)]">
            <div className="grid gap-px bg-rule sm:grid-cols-2">
              <div className="bg-surface p-8 sm:p-10">
                <Eyebrow tone="accent">Sistemas (esta página)</Eyebrow>
                <p className="mt-5 font-sans text-base leading-relaxed text-fg-muted">
                  Producto con precio fijo. Resuelven un problema concreto y
                  entran a operar en días. Ideales si sabes exactamente qué
                  necesitas y lo quieres rápido.
                </p>
              </div>
              <div className="bg-surface p-8 sm:p-10">
                <Eyebrow tone="muted">Servicios a medida</Eyebrow>
                <p className="mt-5 font-sans text-base leading-relaxed text-fg-muted">
                  Consultoría que diseña y construye una solución específica para
                  tu operación. Cotización tras un diagnóstico. Para retos más
                  grandes o particulares.{" "}
                  <a href="/servicios" className="text-accent underline-offset-4 hover:underline">
                    Ver servicios
                  </a>
                  .
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Grid de sistemas */}
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
            <SolutionsGrid />
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
