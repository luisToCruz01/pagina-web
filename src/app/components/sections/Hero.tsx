"use client";

import * as motion from "motion/react-client";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/app/components/ui/Container";
import { Button } from "@/app/components/ui/Button";
import { ScrollIndicator } from "@/app/components/ui/ScrollIndicator";
import { ease, wordContainer, wordItem } from "@/app/lib/motion";

const HEADLINE_LINES: string[][] = [
  ["Recupera", "tu", "tiempo."],
  ["Automatiza", "tu", "agencia."],
  ["Crece", "sin", "contratar", "más."],
];

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    const onLeave = () => setCursor(null);

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden"
    >
      {/* Ambient radial gradient — subtle gold light from top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(200, 151, 59, 0.10), transparent 60%)",
        }}
      />

      {/* Cursor follow light — desktop only, very subtle */}
      {cursor && (
        <div
          aria-hidden
          className="pointer-events-none absolute h-[480px] w-[480px] rounded-full opacity-60 blur-3xl transition-opacity duration-300"
          style={{
            left: cursor.x - 240,
            top: cursor.y - 240,
            background:
              "radial-gradient(circle, rgba(200, 151, 59, 0.10), transparent 65%)",
          }}
        />
      )}

      <Container className="relative pt-[clamp(6rem,12vw,9rem)] pb-[clamp(7rem,12vw,10rem)]">
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
                const isMutedLine = lineIdx === 1; // "Automatiza tu agencia" en muted
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
          Diseñamos flujos de automatización con IA para agencias de marketing
          en LATAM que quieren operar más rápido, con menos errores y sin
          depender de procesos manuales.
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

      {/* Bottom fade to surface — softens transition into Audience */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface to-transparent"
      />
    </section>
  );
}
