"use client";

import Image from "next/image";
import * as motion from "motion/react-client";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { Button } from "@/app/components/ui/Button";
import { stagger, staggerItem } from "@/app/lib/motion";
import { SOLUTIONS, WA_BASE } from "@/app/lib/solutions-data";

export function SolutionsGrid() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={stagger}
      className="grid gap-px bg-rule lg:grid-cols-2"
    >
      {SOLUTIONS.map((s, idx) => (
        <motion.article
          key={s.title}
          variants={staggerItem}
          className="group relative flex flex-col overflow-hidden bg-surface transition-colors duration-500 hover:bg-surface-raised"
        >
          <span
            aria-hidden
            className="absolute left-0 top-0 z-10 h-full w-px origin-top scale-y-0 bg-accent transition-transform duration-700 ease-out group-hover:scale-y-100"
          />

          <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
            <Image
              src={s.image}
              alt={s.imageAlt}
              fill
              priority={idx < 2}
              sizes="(min-width: 1024px) 50vw, 100vw"
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

          <div className="flex flex-col p-8 sm:p-10">
            <div className="flex items-center justify-between gap-4">
              <Eyebrow tone={s.featured ? "accent" : "muted"}>{s.badge}</Eyebrow>
              {s.featured && (
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              )}
            </div>

            <h3 className="mt-8 font-display text-3xl font-light leading-tight text-fg">
              {s.title}
            </h3>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-4xl font-light text-fg">
                {s.price}
              </span>
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-fg-faint">
                Pago único
              </span>
            </div>

            <p className="mt-6 font-sans text-base leading-relaxed text-fg-muted">
              {s.hook}
            </p>

            <ul className="mt-8 space-y-3 border-t border-rule pt-8">
              {s.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="grid grid-cols-[16px_1fr] gap-3 font-sans text-sm leading-relaxed text-fg"
                >
                  <span aria-hidden className="pt-2 text-accent">
                    <span className="block h-px w-3 bg-accent" />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-start gap-4 border-t border-rule pt-6">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-fg-faint">
                {s.delivery}
              </span>
              <Button
                href={`${WA_BASE}${s.ctaPath}`}
                external
                variant={s.featured ? "primary" : "secondary"}
              >
                Quiero esta solución
              </Button>
            </div>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}
