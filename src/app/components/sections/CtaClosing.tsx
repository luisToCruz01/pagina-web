"use client";

import * as motion from "motion/react-client";
import { Container } from "@/app/components/ui/Container";
import { Button } from "@/app/components/ui/Button";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { fadeUp, ease } from "@/app/lib/motion";

export function CtaClosing() {
  return (
    <section id="contacto" className="border-t border-rule">
      <Container className="py-[clamp(6rem,12vw,10rem)] text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <Eyebrow>Última parada</Eyebrow>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: ease.outCinematic, delay: 0.1 }}
          className="mx-auto mt-8 max-w-[20ch] font-display font-light leading-[1.02] tracking-[-0.02em] text-fg"
          style={{ fontSize: "var(--text-display)" }}
        >
          ¿Listo para dejar de hacerlo todo manual?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: ease.outCinematic, delay: 0.3 }}
          className="mx-auto mt-8 max-w-xl font-sans text-lg leading-relaxed text-fg-muted"
        >
          Agenda una llamada de 30 minutos. Sin costo. Sin compromiso. Si tu
          caso no es para nosotros, te lo decimos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            href="https://cal.com/rdmdco/30min"
            external
            variant="primary"
          >
            Agenda tu diagnóstico gratuito
          </Button>
          <Button
            href="https://wa.me/18299056168"
            external
            variant="secondary"
          >
            Escríbenos en WhatsApp
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 font-sans text-xs uppercase tracking-[0.2em] text-fg-faint"
        >
          Cupos limitados por mes
        </motion.p>
      </Container>
    </section>
  );
}
