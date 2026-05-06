"use client";

import * as motion from "motion/react-client";
import { Container } from "@/app/components/ui/Container";
import { Button } from "@/app/components/ui/Button";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { ease } from "@/app/lib/motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Container className="pt-[clamp(6rem,12vw,9rem)] pb-[clamp(5rem,10vw,8rem)]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: ease.outExpo }}
        >
          <Eyebrow>Para fundadores de agencias</Eyebrow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: ease.outCinematic, delay: 0.15 }}
          className="mt-10 max-w-[18ch] font-display font-light leading-[1.02] tracking-[-0.02em] text-fg"
          style={{ fontSize: "var(--text-display)" }}
        >
          Recupera tu tiempo.
          <br />
          <span className="text-fg-muted">Automatiza tu agencia.</span>
          <br />
          Crece sin contratar más.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: ease.outCinematic, delay: 0.4 }}
          className="mt-10 max-w-[52ch] font-sans text-lg leading-relaxed text-fg-muted sm:text-xl"
        >
          Diseñamos flujos de automatización con IA para agencias de marketing
          en LATAM que quieren operar más rápido, con menos errores y sin
          depender de procesos manuales.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
        >
          <Button
            href="https://cal.com/rdmdco/30min"
            external
            variant="primary"
          >
            Agenda tu diagnóstico
          </Button>
          <Button href="#soluciones" variant="secondary">
            Ver soluciones
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 flex items-center gap-3 font-sans text-xs uppercase tracking-[0.2em] text-fg-faint"
        >
          <span className="h-px w-8 bg-fg-faint" />
          México · Colombia · Argentina · República Dominicana
        </motion.div>
      </Container>
    </section>
  );
}
