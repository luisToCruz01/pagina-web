"use client";

import * as motion from "motion/react-client";
import { Container } from "@/app/components/ui/Container";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { fadeUp, stagger, staggerItem } from "@/app/lib/motion";

const PROFILES = [
  {
    title: "Empresas que quieren escalar",
    body: "Sin contratar más personal operativo. Empresas de 3 a 15 personas que facturan entre $50K y $150K USD al año y quieren crecer sin que el equipo se rompa.",
  },
  {
    title: "Negocios con procesos repetitivos",
    body: "Operaciones que consumen horas valiosas cada día y que se pueden delegar a un sistema.",
  },
  {
    title: "E-commerce en crecimiento",
    body: "Que necesita automatizar atención, logística y seguimiento sin perder calidad.",
  },
];

export function Audience() {
  return (
    <section className="border-t border-rule">
      <Container className="py-section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center"
        >
          <h2
            className="font-display font-light leading-[1.05] tracking-[-0.02em] text-fg"
            style={{ fontSize: "var(--text-h1)" }}
          >
            ¿Tu negocio está listo para automatizar?
          </h2>
          <div className="mt-8 flex justify-center">
            <Eyebrow tone="accent">Para quien construimos</Eyebrow>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mt-16 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROFILES.map((profile, i) => (
            <motion.article
              key={i}
              variants={staggerItem}
              className="relative bg-surface p-8 sm:p-10"
            >
              <h3 className="font-display text-2xl font-light leading-tight text-fg">
                {profile.title}
              </h3>
              <p className="mt-4 font-sans text-sm leading-relaxed text-fg-muted">
                {profile.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
