"use client";

import * as motion from "motion/react-client";
import { Container } from "@/app/components/ui/Container";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { fadeUp, stagger, staggerItem } from "@/app/lib/motion";

const SERVICES = [
  {
    n: "01",
    title: "Agentes de IA personalizados",
    body: "Asistentes inteligentes que atienden, responden y ejecutan tareas. Entrenados con tu catálogo, FAQ y voz de marca.",
  },
  {
    n: "02",
    title: "Pipelines de automatización",
    body: "Conectamos tus herramientas para que la información fluya sin intervención manual. CRM, e-commerce, formularios, pagos.",
  },
  {
    n: "03",
    title: "Dashboards de rendimiento",
    body: "Visualiza el impacto de la automatización con métricas claras y en tiempo real. Sin Looker Studio recargados.",
  },
  {
    n: "04",
    title: "Control de acceso inteligente",
    body: "Gestiona permisos y seguridad en todos tus flujos automatizados. Quién hace qué, cuándo, con qué nivel.",
  },
  {
    n: "05",
    title: "Atención al cliente automatizada",
    body: "Chatbots y flujos de respuesta que operan 24/7 sin perder la calidad ni la voz humana de tu marca.",
  },
  {
    n: "06",
    title: "Integraciones a medida",
    body: "Conectamos cualquier plataforma que uses: CRM, e-commerce, contabilidad, herramientas internas, lo que sea.",
  },
];

export function Services() {
  return (
    <section id="servicios" className="border-t border-rule">
      <Container className="py-section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="max-w-2xl"
        >
          <Eyebrow>Servicios</Eyebrow>
          <h2
            className="mt-6 font-display font-light leading-[1.05] tracking-[-0.02em] text-fg"
            style={{ fontSize: "var(--text-h1)" }}
          >
            ¿Qué automatizamos?
          </h2>
          <p className="mt-6 font-sans text-lg leading-relaxed text-fg-muted">
            Soluciones diseñadas para liberar tu tiempo y escalar tu operación.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mt-20 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <motion.article
              key={service.n}
              variants={staggerItem}
              className="group relative bg-surface p-8 sm:p-10 transition-colors duration-300 hover:bg-surface-raised"
            >
              <span className="font-sans text-xs font-medium tracking-[0.28em] text-fg-faint">
                {service.n}
              </span>
              <h3 className="mt-6 font-display text-2xl font-light leading-tight text-fg sm:text-[1.625rem]">
                {service.title}
              </h3>
              <p className="mt-4 font-sans text-sm leading-relaxed text-fg-muted">
                {service.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
