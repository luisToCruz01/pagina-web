"use client";

import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { Container } from "@/app/components/ui/Container";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { fadeUp, stagger, staggerItem } from "@/app/lib/motion";
import { ARTICLES } from "@/app/lib/blog-data";

export function BlogPreview() {
  const latest = ARTICLES.slice(0, 3);

  return (
    <section className="border-t border-rule">
      <Container className="py-section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div className="max-w-2xl">
            <Eyebrow sparkle>Aprende</Eyebrow>
            <h2
              className="mt-6 font-display font-light leading-[1.05] tracking-[-0.02em] text-fg"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Historias y conocimiento
            </h2>
            <p className="mt-6 font-sans text-lg leading-relaxed text-fg-muted">
              Lo que aprendemos automatizando empresas, sin relleno. Procesos,
              IA aplicada y decisiones que hacen más inteligente tu operación.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex shrink-0 items-center gap-1.5 font-sans text-sm text-accent transition-transform duration-300 hover:translate-x-1"
          >
            Ver todo el blog
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mt-16 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3"
        >
          {latest.map((article) => (
            <motion.div key={article.slug} variants={staggerItem}>
              <Link
                href={`/blog/${article.slug}`}
                className="group relative flex h-full flex-col overflow-hidden bg-surface transition-colors duration-500 hover:bg-surface-raised"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                    style={{ filter: "brightness(0.78) saturate(1.05) contrast(1.05)" }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(10,10,10,0.10) 0%, rgba(10,10,10,0.55) 80%, var(--color-surface) 100%)",
                    }}
                  />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <Eyebrow tone="muted">{article.category}</Eyebrow>
                  <h3 className="mt-5 font-display text-xl font-light leading-tight text-fg sm:text-2xl">
                    {article.title}
                  </h3>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-fg-muted">
                    {article.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-3 font-sans text-xs text-fg-faint">
                    <span>{article.dateLabel}</span>
                    <span aria-hidden className="h-1 w-1 rounded-full bg-fg-faint" />
                    <span>{article.readingTime}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
