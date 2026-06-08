"use client";

import * as motion from "motion/react-client";
import { Container } from "@/app/components/ui/Container";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { Button } from "@/app/components/ui/Button";
import { fadeUp } from "@/app/lib/motion";
import { SolutionsGrid } from "./SolutionsGrid";

export function Solutions() {
  return (
    <section id="soluciones" className="relative isolate overflow-hidden border-t border-rule">
      {/* Subtle warm wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 80% 0%, rgba(200, 151, 59, 0.06), transparent 70%)",
        }}
      />
      <Container className="relative py-section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="max-w-3xl"
        >
          <Eyebrow sparkle>Soluciones llave en mano</Eyebrow>
          <h2
            className="mt-6 font-display font-light leading-[1.05] tracking-[-0.02em] text-fg"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Resultados desde el día uno.
          </h2>
          <p className="mt-6 font-sans text-lg leading-relaxed text-fg-muted">
            Empieza con una solución específica, ve los resultados, y escala
            cuando quieras. Pago único. Sin retainer obligatorio.
          </p>
        </motion.div>

        <div className="mt-20">
          <SolutionsGrid />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-16 flex flex-col items-start gap-4 border-t border-rule pt-10 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-xl font-sans text-base text-fg-muted">
            ¿Necesitas algo diferente? Cuéntanos tu proceso y lo construimos a
            medida.
          </p>
          <Button href="https://cal.com/rdmdco/30min" external variant="secondary">
            Hablemos
          </Button>
        </motion.div>

        <p className="mt-10 font-sans text-xs uppercase tracking-[0.2em] text-fg-faint">
          Todas las soluciones incluyen onboarding guiado y soporte post-entrega
          de 15 días.
        </p>
      </Container>
    </section>
  );
}
