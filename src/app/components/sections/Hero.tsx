"use client";

import * as motion from "motion/react-client";
import { Container } from "@/app/components/ui/Container";
import { Button } from "@/app/components/ui/Button";
import { ScrollIndicator } from "@/app/components/ui/ScrollIndicator";
import { ease, wordContainer, wordItem } from "@/app/lib/motion";

const HEADLINE_LINES: string[][] = [
  ["Recupera", "tu", "tiempo."],
  ["Automatiza", "tu", "empresa."],
  ["Crece", "sin", "contratar", "más."],
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">

      {/* === Background video — clockwork macro === */}
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero/clockwork-poster.jpg"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
        style={{
          objectPosition: "center 30%",
          filter: "brightness(0.55) saturate(1.1) contrast(1.05)",
        }}
      >
        <source src="/hero/clockwork.mp4" type="video/mp4" />
      </video>

      {/* === Dark overlay — keeps the typography dominant === */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.40) 40%, rgba(10,10,10,0.65) 100%)",
        }}
      />

      {/* === Vignette — darken corners for cinematic depth === */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 35%, rgba(10, 10, 10, 0.75) 100%)",
        }}
      />

      {/* === Subtle warm tint to bind the video to brand palette === */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 mix-blend-overlay"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 50%, rgba(200, 151, 59, 0.18), transparent 70%)",
        }}
      />

      <Container className="relative pt-[clamp(2.5rem,6vw,5rem)] pb-[clamp(7rem,12vw,10rem)]">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={wordContainer}
          className="max-w-[18ch] font-display font-light leading-[1.02] tracking-[-0.02em] text-fg"
          style={{ fontSize: "var(--text-display)" }}
        >
          {HEADLINE_LINES.map((line, lineIdx) => (
            <span
              key={lineIdx}
              className="block"
            >
              {line.map((word, wordIdx) => {
                const isMutedLine = lineIdx === 1; // "Automatiza tu empresa" en muted
                return (
                  <motion.span
                    key={`${lineIdx}-${wordIdx}`}
                    variants={wordItem}
                    className={`inline-block ${isMutedLine ? "text-fg-muted" : ""}`}
                  >
                    {word}
                    {wordIdx < line.length - 1 && " "}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: ease.outCinematic, delay: 0.95 }}
          className="mt-10 max-w-[52ch] font-sans text-lg leading-relaxed text-fg-muted sm:text-xl"
        >
          Diseñamos flujos de automatización con IA para empresas en LATAM
          que quieren operar más rápido, con menos errores y sin depender de
          procesos manuales.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: ease.outCinematic, delay: 1.15 }}
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
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-16 flex items-center gap-3 font-sans text-xs uppercase tracking-[0.2em] text-fg-faint"
        >
          <span className="h-px w-8 bg-fg-faint" />
          México · Colombia · Argentina · República Dominicana
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.7 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ScrollIndicator />
        </motion.div>
      </Container>

      {/* Bottom fade to surface — softens transition + hides any watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-surface via-surface/85 to-transparent"
      />
    </section>
  );
}
