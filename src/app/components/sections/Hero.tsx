"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Container } from "@/app/components/ui/Container";
import { Button } from "@/app/components/ui/Button";
import { cn } from "@/app/lib/cn";
import { ease, wordContainer, wordItem } from "@/app/lib/motion";

// Estructura tomada del hero de la referencia Xirex: un renglon por linea,
// el renglon central con la palabra destacada en dorado.
type Word = { text: string; accent?: boolean };
const HEADLINE_LINES: Word[][] = [
  [{ text: "Soluciones" }],
  [
    { text: "prácticas", accent: true },
    { text: "para" },
  ],
  [{ text: "empresas" }],
];

const TAGS = ["Simple.", "Práctico.", "Efectivo."];

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
          // Prueba sin filtro dorado (antes: brightness(0.82) saturate(1.15) contrast(1.15) url(#hero-gold-grade))
          filter: "brightness(0.82)",
          y: videoY,
          opacity: videoOpacity,
        }}
      >
        {/* Prueba: video del hero de la plantilla Mercer (antes /hero/hero-pingpong.mp4) */}
        <source src="/hero/hero-mercer.mp4" type="video/mp4" />
      </motion.video>

      {/* === Subtle warm tint to bind video to brand palette === (oculto en la prueba sin filtro dorado) */}
      <div
        hidden
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
        <Container className="flex flex-1 flex-col justify-end pb-[clamp(3.5rem,7vw,5.5rem)] pt-24">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,28.5rem)]">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={wordContainer}
              className="flex flex-col items-start font-display font-light leading-[0.95] tracking-[-0.02em] text-fg"
              style={{ fontSize: "clamp(2.5rem, 5.6vw, 5.6rem)" }}
            >
              {HEADLINE_LINES.map((line, lineIdx) => (
                <span
                  key={lineIdx}
                  className="flex items-center"
                >
                  {line.map((word, wordIdx) => (
                    <motion.span
                      key={`${lineIdx}-${wordIdx}`}
                      variants={wordItem}
                      className={cn(
                        "inline-block",
                        wordIdx < line.length - 1 && "mr-[0.22em]",
                        word.accent && "italic text-accent",
                      )}
                    >
                      {word.text}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: ease.outCinematic, delay: 0.95 }}
              className="flex flex-col items-start lg:pt-4"
            >
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-accent">
                {TAGS.map((tag) => (
                  <span key={tag} className="mr-3 inline-block">
                    / {tag}
                  </span>
                ))}
              </p>
              <p className="mt-4 font-sans text-base leading-relaxed text-fg-muted sm:text-lg">
                Ayudamos a las empresas a agilizar su operación, automatizar el
                trabajo repetitivo e implementar soluciones de IA que generan
                valor medible y crecimiento.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: ease.outCinematic, delay: 1.15 }}
                className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center [&_a]:whitespace-nowrap"
              >
                <Button href="https://cal.com/rdmdco/30min" external variant="primary">
                  Habla con un experto
                </Button>
                <Button href="#casos" variant="secondary">
                  Conoce RDMD
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
