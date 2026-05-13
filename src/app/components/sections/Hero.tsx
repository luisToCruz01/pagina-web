"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
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
  const sectionRef = useRef<HTMLElement | null>(null);

  // Scroll-driven exit (lesanimals.digital pattern)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Hero content scales + fades + blurs as you scroll out of it
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.5, 0]);
  const contentBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(8px)"]);
  // Background video moves up faster (parallax) and dims slightly
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const videoOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >

      {/* === SVG color filter — vira naranja a gold y aplasta azul a gris oscuro === */}
      <svg
        aria-hidden
        width="0"
        height="0"
        className="absolute"
        style={{ pointerEvents: "none" }}
      >
        <defs>
          <filter
            id="hero-gold-grade"
            colorInterpolationFilters="sRGB"
          >
            <feColorMatrix type="hueRotate" values="22" />
            <feColorMatrix
              type="matrix"
              values="
                1.00  0.10 -0.20  0 0
                0.20  0.80 -0.55  0 0
               -0.10 -0.10  0.15  0 0
                0     0     0     1 0"
            />
          </filter>
        </defs>
      </svg>

      {/* === Background video — fills the viewport, parallax === */}
      <motion.video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
        style={{
          objectPosition: "center 35%",
          filter:
            "brightness(0.82) saturate(1.15) contrast(1.15) url(#hero-gold-grade)",
          y: videoY,
          opacity: videoOpacity,
        }}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_230229_7c9bc431-46cf-489a-948d-e8144d8eb5d4.mp4"
          type="video/mp4"
        />
      </motion.video>

      {/* === Subtle warm tint to bind video to brand palette === */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 mix-blend-overlay"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 50%, rgba(200, 151, 59, 0.18), transparent 70%)",
        }}
      />

      {/* === Subtle darken behind text for legibility === */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[60%]"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.30) 45%, transparent 100%)",
        }}
      />

      {/* === Hero content with scroll-driven exit (scale + fade + blur) === */}
      <motion.div
        style={{
          scale: contentScale,
          opacity: contentOpacity,
          filter: contentBlur,
        }}
        className="relative z-10 flex flex-1 flex-col"
      >
        <Container className="flex flex-1 flex-col justify-end pb-[clamp(3.5rem,7vw,5.5rem)] pt-16">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={wordContainer}
            className="max-w-[18ch] font-display font-light leading-[1] tracking-[-0.02em] text-fg"
            style={{ fontSize: "var(--text-display)" }}
          >
            {HEADLINE_LINES.map((line, lineIdx) => (
              <span key={lineIdx} className="block">
                {line.map((word, wordIdx) => {
                  const isMutedLine = lineIdx === 1;
                  const notLast = wordIdx < line.length - 1;
                  return (
                    <motion.span
                      key={`${lineIdx}-${wordIdx}`}
                      variants={wordItem}
                      className={`inline-block ${notLast ? "mr-[0.25em]" : ""} ${isMutedLine ? "text-fg-muted" : ""}`}
                    >
                      {word}
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
            className="mt-6 max-w-[52ch] font-sans text-base leading-relaxed text-fg-muted sm:text-lg"
          >
            Diseñamos flujos de automatización para empresas en LATAM
            que quieren operar más rápido, con menos errores y sin depender de
            procesos manuales.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: ease.outCinematic, delay: 1.15 }}
            className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <Button href="https://cal.com/rdmdco/30min" external variant="primary">
              Agenda tu diagnóstico
            </Button>
            <Button href="#soluciones" variant="secondary">
              Ver soluciones
            </Button>
          </motion.div>

        </Container>
      </motion.div>

      {/* === Scroll indicator pinned bottom-center === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.7 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
