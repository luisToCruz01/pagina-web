"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Container } from "@/app/components/ui/Container";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { fadeUp, stagger, staggerItem } from "@/app/lib/motion";

const REVEAL_PARAGRAPH =
  "RDMD & Co. nace en República Dominicana operando para empresas en LATAM, especializados en agencias de marketing. Pequeño por diseño, no por accidente: cada proyecto pasa por las mismas manos que lo cierran en la llamada.";

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
      className="inline-block transition-[opacity,filter] will-change-[opacity,filter]"
    >
      {children}{" "}
    </motion.span>
  );
}

export function Trust() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.15"],
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
          <Eyebrow>Por qué RDMD</Eyebrow>
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
