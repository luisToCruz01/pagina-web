"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Container } from "@/app/components/ui/Container";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { Button } from "@/app/components/ui/Button";
import { ease } from "@/app/lib/motion";
import type { Article } from "@/app/lib/blog-data";
import { ARTICLES } from "@/app/lib/blog-data";

const CAL_URL = "https://cal.com/rdmdco/30min";

export function ArticleTemplate({ article }: { article: Article }) {
  const headings = article.blocks.filter((b) => b.type === "h2") as {
    type: "h2";
    text: string;
    id: string;
  }[];

  const related = article.relatedSlugs
    .map((slug) => ARTICLES.find((a) => a.slug === slug))
    .filter((a): a is Article => Boolean(a));

  return (
    <article>
      {/* === HERO === */}
      <section className="border-b border-rule">
        <Container className="pb-[clamp(3rem,6vw,5rem)] pt-[clamp(7rem,12vw,10rem)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: ease.outCinematic }}
            className="max-w-3xl"
          >
            <Eyebrow tone="accent">{article.category}</Eyebrow>
            <h1
              className="mt-6 font-display font-light leading-[1.04] tracking-[-0.02em] text-fg"
              style={{ fontSize: "var(--text-h1)" }}
            >
              {article.title}
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-sm text-fg-faint">
              <span>{article.author}</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-fg-faint" />
              <span>{article.dateLabel}</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-fg-faint" />
              <span>{article.readingTime}</span>
            </div>
          </motion.div>
        </Container>

        {/* Imagen editorial a sangre */}
        <div className="relative aspect-[16/7] w-full overflow-hidden border-t border-rule">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            style={{ filter: "brightness(0.72) saturate(1.05) contrast(1.05)" }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.30) 70%, var(--color-surface) 100%)",
            }}
          />
        </div>
      </section>

      {/* === CUERPO + TOC === */}
      <section className="border-b border-rule">
        <Container className="py-section">
          <div className="grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
            {/* Tabla de contenidos */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-fg-faint">
                  En este artículo
                </p>
                <nav className="mt-5 flex flex-col gap-3 border-l border-rule">
                  {headings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className="-ml-px border-l-2 border-transparent pl-4 font-sans text-sm leading-snug text-fg-muted transition-colors duration-200 hover:border-accent hover:text-fg"
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Cuerpo */}
            <div className="max-w-[680px]">
              {/* Hook */}
              <p className="font-display text-2xl font-light leading-snug text-fg sm:text-[1.75rem]">
                {article.hook}
              </p>

              <div className="mt-10 flex flex-col gap-6">
                {article.blocks.map((block, i) => {
                  if (block.type === "h2") {
                    return (
                      <h2
                        key={i}
                        id={block.id}
                        className="mt-8 scroll-mt-28 font-display text-3xl font-light leading-tight tracking-[-0.01em] text-fg"
                      >
                        {block.text}
                      </h2>
                    );
                  }
                  if (block.type === "p") {
                    return (
                      <p
                        key={i}
                        className="font-sans text-lg leading-relaxed text-fg-muted"
                      >
                        {block.text}
                      </p>
                    );
                  }
                  if (block.type === "list") {
                    return (
                      <ul key={i} className="flex flex-col gap-3">
                        {block.items.map((item) => (
                          <li
                            key={item}
                            className="grid grid-cols-[16px_1fr] gap-3 font-sans text-lg leading-relaxed text-fg-muted"
                          >
                            <span aria-hidden className="pt-3 text-accent">
                              <span className="block h-px w-3 bg-accent" />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (block.type === "callout") {
                    return (
                      <div
                        key={i}
                        className="my-4 border-l-2 border-accent bg-surface-raised/50 p-7 sm:p-8"
                      >
                        <p className="font-sans text-xs font-medium uppercase tracking-[0.24em] text-accent">
                          {block.title}
                        </p>
                        <p className="mt-4 font-sans text-base leading-relaxed text-fg">
                          {block.body}
                        </p>
                      </div>
                    );
                  }
                  if (block.type === "stat") {
                    return (
                      <div key={i} className="my-6 text-center">
                        <p
                          className="font-display font-light leading-none tracking-[-0.02em] text-accent"
                          style={{ fontSize: "var(--text-stat)" }}
                        >
                          {block.value}
                        </p>
                        <p className="mx-auto mt-4 max-w-md font-sans text-base leading-relaxed text-fg-muted">
                          {block.label}
                        </p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              {/* CTA al final del artículo */}
              <div className="mt-14 border-t border-rule pt-10">
                <h3 className="font-display text-2xl font-light leading-tight text-fg">
                  ¿Quieres aplicar esto en tu empresa?
                </h3>
                <p className="mt-4 font-sans text-base leading-relaxed text-fg-muted">
                  Agenda un diagnóstico de 30 minutos. Sin costo. Si tu caso no
                  es para nosotros, te lo decimos.
                </p>
                <div className="mt-7">
                  <Button href={CAL_URL} external variant="primary">
                    Agenda tu diagnóstico
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* === ARTÍCULOS RELACIONADOS === */}
      {related.length > 0 && (
        <section className="border-b border-rule">
          <Container className="py-section">
            <Eyebrow>Sigue leyendo</Eyebrow>
            <div className="mt-10 grid gap-px bg-rule sm:grid-cols-2">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group relative flex flex-col justify-between overflow-hidden bg-surface p-8 transition-colors duration-500 hover:bg-surface-raised sm:p-10"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-y-100"
                  />
                  <div>
                    <Eyebrow tone="muted">{rel.category}</Eyebrow>
                    <h3 className="mt-5 font-display text-2xl font-light leading-tight text-fg">
                      {rel.title}
                    </h3>
                    <p className="mt-4 font-sans text-sm leading-relaxed text-fg-muted">
                      {rel.excerpt}
                    </p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-1.5 font-sans text-sm text-accent transition-transform duration-300 group-hover:translate-x-1">
                    Leer artículo
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
