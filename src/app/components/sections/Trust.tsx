"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Container } from "@/app/components/ui/Container";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { fadeUp, stagger, staggerItem } from "@/app/lib/motion";

const REVEAL_PARAGRAPH =
  "RDMD & Co. nace en República Dominicana operando para empresas en Latinoamérica, especializados en agencias de marketing. Pequeño por diseño, no por accidente: cada proyecto pasa por las mismas manos que lo cierran en la llamada.";

const CASES = [
  {
    client: "Agencia de performance en CDMX",
    stat: "36 hrs/mes",
    statLabel: "ahorradas en reportería",
    title: "Reportes mensuales automatizados para 12 cuentas",
    body: "Conectamos Meta Ads, Google Ads y GA4 a un pipeline que genera reportes en Notion con métricas, narrativa y comparativas. El equipo pasó de tres días al mes en reportes a una validación de cuatro minutos por cuenta.",
  },
  {
    client: "E-commerce de moda en Bogotá",
    stat: "78%",
    statLabel: "de tickets resueltos sin intervención humana",
    title: "Agente de WhatsApp conectado a Shopify",
    body: "Implementamos un agente que responde estados de pedido, cambios de talla y devoluciones en tiempo real. Solo escala a humano cuando detecta intención compleja. Tiempo de respuesta promedio bajó de cuatro horas a noventa segundos.",
  },
  {
    client: "Productora de contenido en Buenos Aires",
    stat: "2.5x",
    statLabel: "más contenido aprobado por semana",
    title: "Workflow de aprobación centralizado",
    body: "Reemplazamos el flujo de email, Slack y WhatsApp por un sistema con notificaciones automáticas, versionado y trazabilidad. Cero revisiones perdidas y un equipo de seis personas duplicó throughput sin contratar.",
  },
];

const PRINCIPLES = [
  {
    title: "Construimos, no consultamos.",
    body: "No vendemos PowerPoints ni roadmaps. Entregamos sistemas funcionando, con código, con accesos, con documentación.",
    image: "/editorial/philosophy.webp",
    imageAlt: "Filosofía de construcción RDMD",
  },
  {
    title: "Transparente desde el diagnóstico.",
    body: "Cada propuesta lista alcance, entregables y tiempo. Si el problema no es para nosotros, lo decimos. Sin venta forzada.",
    image: "/editorial/craft.webp",
    imageAlt: "Oficio y transparencia",
  },
  {
    title: "Soporte post-entrega real.",
    body: "Acompañamos por 15 días después de cada entrega para ajustes y dudas. Después tú decides si continuamos juntos.",
    image: "/editorial/capacity.webp",
    imageAlt: "Capacidad de soporte continuo",
  },
];

function Word({
  children,
  range,
  progress,
}: {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const filter = useTransform(progress, range, ["blur(2px)", "blur(0px)"]);
  return (
    <motion.span
      style={{ opacity, filter }}
      className="will-change-[opacity,filter]"
    >
      {children}{" "}
    </motion.span>
  );
}

export function Trust() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.55"],
  });

  const words = REVEAL_PARAGRAPH.split(" ");

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
          <Eyebrow sparkle>Por qué RDMD</Eyebrow>
          <h2
            className="mt-6 font-display font-light leading-[1.05] tracking-[-0.02em] text-fg"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Trabajamos como nos gustaría que trabajaran con nosotros.
          </h2>
        </motion.div>

        {/* Scroll-driven word reveal */}
        <div
          ref={ref}
          className="mt-12 max-w-3xl font-sans text-lg leading-relaxed text-fg sm:text-xl"
        >
          <p>
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word
                  key={i}
                  range={[start, Math.min(end, 1)]}
                  progress={scrollYProgress}
                >
                  {word}
                </Word>
              );
            })}
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mt-12 grid gap-px bg-rule md:grid-cols-3"
        >
          {PRINCIPLES.map((principle) => (
            <motion.article
              key={principle.title}
              variants={staggerItem}
              className="group flex flex-col overflow-hidden bg-surface"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
                <Image
                  src={principle.image}
                  alt={principle.imageAlt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  style={{ filter: "brightness(0.78) saturate(1.05) contrast(1.05)" }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(10,10,10,0.10) 0%, rgba(10,10,10,0.55) 70%, var(--color-surface) 100%)",
                  }}
                />
              </div>
              <div className="p-8 sm:p-10">
                <h3 className="font-display text-2xl font-light leading-tight text-fg">
                  {principle.title}
                </h3>
                <p className="mt-4 font-sans text-base leading-relaxed text-fg-muted">
                  {principle.body}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* === Casos de éxito === */}
        <div className="mt-24 border-t border-rule pt-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <Eyebrow tone="accent">Casos de éxito</Eyebrow>
            <h3
              className="mt-6 font-display font-light leading-[1.05] tracking-[-0.02em] text-fg"
              style={{ fontSize: "var(--text-h2)" }}
            >
              Resultados que hemos producido.
            </h3>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="mt-12 divide-y divide-rule"
          >
            {CASES.map((c) => (
              <motion.article
                key={c.title}
                variants={staggerItem}
                className="grid gap-8 py-12 md:grid-cols-12 md:gap-12"
              >
                <div className="md:col-span-5">
                  <Eyebrow tone="muted">{c.client}</Eyebrow>
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
                  <h4 className="font-display text-xl font-light leading-tight text-fg sm:text-2xl">
                    {c.title}
                  </h4>
                  <p className="mt-4 font-sans text-base leading-relaxed text-fg-muted">
                    {c.body}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
