"use client";

import * as motion from "motion/react-client";
import { Container } from "@/app/components/ui/Container";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { fadeUp, stagger, staggerItem } from "@/app/lib/motion";

const PRINCIPLES = [
  {
    title: "Construimos, no consultamos.",
    body: "No vendemos PowerPoints ni roadmaps. Entregamos sistemas funcionando, con código, con accesos, con documentación.",
  },
  {
    title: "Transparente desde el diagnóstico.",
    body: "Cada propuesta lista alcance, entregables y tiempo. Si el problema no es para nosotros, lo decimos. Sin venta forzada.",
  },
  {
    title: "Soporte post-entrega real.",
    body: "Acompañamos por 15 días después de cada entrega para ajustes y dudas. Después tú decides si continuamos juntos.",
  },
];

export function Trust() {
  return (
    <section className="border-t border-rule">
      <Container className="py-section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="max-w-3xl"
        >
          <Eyebrow>Por qué RDMD</Eyebrow>
          <h2
            className="mt-6 font-display font-light leading-[1.05] tracking-[-0.02em] text-fg"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Trabajamos como nos gustaría que trabajaran con nosotros.
          </h2>
          <p className="mt-6 font-sans text-lg leading-relaxed text-fg-muted">
            RDMD &amp; Co. nace en República Dominicana operando para agencias
            de marketing en LATAM. Pequeño por diseño, no por accidente: cada
            proyecto pasa por las mismas manos que lo cierran en la llamada.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mt-20 grid gap-px bg-rule md:grid-cols-3"
        >
          {PRINCIPLES.map((principle) => (
            <motion.article
              key={principle.title}
              variants={staggerItem}
              className="bg-surface p-8 sm:p-10"
            >
              <h3 className="font-display text-2xl font-light leading-tight text-fg">
                {principle.title}
              </h3>
              <p className="mt-4 font-sans text-base leading-relaxed text-fg-muted">
                {principle.body}
              </p>
            </motion.article>
          ))}
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-16 max-w-xl font-display text-2xl font-light italic leading-snug text-fg-muted"
        >
          Cuando los testimoniales reales lleguen, los publicamos aquí. Hasta
          entonces, preferimos el silencio al adorno.
        </motion.p>
      </Container>
    </section>
  );
}
