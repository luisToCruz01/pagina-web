"use client";

import * as motion from "motion/react-client";
import { Container } from "@/app/components/ui/Container";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { fadeUp, stagger, staggerItem } from "@/app/lib/motion";

const STEPS = [
  {
    n: "01",
    title: "Diagnóstico gratuito",
    body: "30 minutos. Analizamos tu negocio y detectamos dónde estás perdiendo tiempo y dinero. Sin venta forzada.",
  },
  {
    n: "02",
    title: "Propuesta personalizada",
    body: "Plan de automatización hecho a la medida de tus procesos. Alcance claro, entregables claros, tiempo claro.",
  },
  {
    n: "03",
    title: "Implementación",
    body: "Construimos e integramos los flujos. Tú apruebas y ves cómo funciona. Sin intermediarios opacos.",
  },
  {
    n: "04",
    title: "Soporte continuo",
    body: "No desaparecemos. Estamos contigo para ajustar, mejorar y escalar cuando lo necesites.",
  },
];

export function Process() {
  return (
    <section id="proceso" className="border-t border-rule">
      <Container className="py-section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="max-w-2xl"
        >
          <Eyebrow>Proceso</Eyebrow>
          <h2
            className="mt-6 font-display font-light leading-[1.05] tracking-[-0.02em] text-fg"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Simple, claro y sin sorpresas.
          </h2>
        </motion.div>

        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mt-20 space-y-px bg-rule"
        >
          {STEPS.map((step) => (
            <motion.li
              key={step.n}
              variants={staggerItem}
              className="grid gap-6 bg-surface p-8 sm:p-10 md:grid-cols-[140px_1fr_2fr] md:items-start md:gap-12"
            >
              <span className="font-display text-5xl font-light text-accent md:text-6xl">
                {step.n}
              </span>
              <h3 className="font-display text-2xl font-light leading-tight text-fg md:text-3xl">
                {step.title}
              </h3>
              <p className="font-sans text-base leading-relaxed text-fg-muted">
                {step.body}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}
