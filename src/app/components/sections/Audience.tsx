"use client";

import * as motion from "motion/react-client";
import { Container } from "@/app/components/ui/Container";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { fadeUp, stagger, staggerItem } from "@/app/lib/motion";

const PROFILES = [
  {
    primary: true,
    label: "Para quien construimos",
    title: "Empresas que quieren escalar",
    body: "Sin contratar más personal operativo. Empresas de 3 a 15 personas que ya facturan bien y quieren crecer sin que el equipo se rompa.",
  },
  {
    primary: false,
    label: "También",
    title: "Negocios con procesos repetitivos",
    body: "Operaciones que consumen horas valiosas cada día y que se pueden delegar a un sistema.",
  },
  {
    primary: false,
    label: "También",
    title: "E-commerce en crecimiento",
    body: "Que necesita automatizar atención, logística y seguimiento sin perder calidad.",
  },
  {
    primary: false,
    label: "También",
    title: "Emprendedores ambiciosos",
    body: "Que quieren operar como una empresa grande antes de tener el equipo de una.",
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
          className="max-w-2xl"
        >
          <Eyebrow>Audiencia</Eyebrow>
          <h2
            className="mt-6 font-display font-light leading-[1.05] tracking-[-0.02em] text-fg"
            style={{ fontSize: "var(--text-h1)" }}
          >
            ¿Tu negocio está listo para automatizar?
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mt-16 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4"
        >
          {PROFILES.map((profile, i) => (
            <motion.article
              key={i}
              variants={staggerItem}
              className={`relative bg-surface p-8 sm:p-10 ${
                profile.primary ? "lg:col-span-2 lg:row-span-1" : ""
              }`}
            >
              <Eyebrow tone={profile.primary ? "accent" : "muted"}>
                {profile.label}
              </Eyebrow>
              <h3
                className={`mt-6 font-display font-light leading-tight text-fg ${
                  profile.primary ? "text-3xl sm:text-4xl" : "text-2xl"
                }`}
              >
                {profile.title}
              </h3>
              <p
                className={`mt-4 font-sans text-fg-muted ${
                  profile.primary ? "text-base" : "text-sm"
                } leading-relaxed`}
              >
                {profile.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
