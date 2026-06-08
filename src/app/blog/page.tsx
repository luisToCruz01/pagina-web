import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/app/components/sections/Nav";
import { Footer } from "@/app/components/sections/Footer";
import { CtaClosing } from "@/app/components/sections/CtaClosing";
import { Container } from "@/app/components/ui/Container";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { ARTICLES } from "@/app/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog — RDMD & Co.",
  description:
    "Historias y conocimiento sobre automatización, procesos e inteligencia artificial aplicada para empresas en Latinoamérica.",
};

export default function BlogIndexPage() {
  const [featured, ...rest] = ARTICLES;

  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative isolate overflow-hidden border-b border-rule">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 75% 0%, rgba(200,151,59,0.10) 0%, transparent 65%)",
            }}
          />
          <Container className="pb-[clamp(4rem,8vw,7rem)] pt-[clamp(7rem,12vw,10rem)]">
            <div className="max-w-3xl">
              <Eyebrow tone="accent">Blog</Eyebrow>
              <h1
                className="mt-6 font-display font-light leading-[1.04] tracking-[-0.02em] text-fg"
                style={{ fontSize: "var(--text-h1)" }}
              >
                Historias y conocimiento
              </h1>
              <p className="mt-7 max-w-2xl font-sans text-lg leading-relaxed text-fg-muted">
                Lo que aprendemos automatizando empresas en Latinoamérica, sin
                relleno. Procesos, inteligencia artificial aplicada y decisiones
                que hacen más inteligente tu operación.
              </p>
            </div>
          </Container>
        </section>

        {/* Artículo destacado */}
        <section className="border-b border-rule">
          <Container className="py-section">
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid gap-8 md:grid-cols-2 md:gap-12"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  style={{ filter: "brightness(0.78) saturate(1.05) contrast(1.05)" }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(10,10,10,0.10) 0%, rgba(10,10,10,0.45) 80%, var(--color-surface) 100%)",
                  }}
                />
              </div>
              <div className="flex flex-col justify-center">
                <Eyebrow tone="accent">{featured.category}</Eyebrow>
                <h2 className="mt-5 font-display text-3xl font-light leading-tight text-fg sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-5 max-w-lg font-sans text-base leading-relaxed text-fg-muted">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4 font-sans text-sm text-fg-faint">
                  <span>{featured.dateLabel}</span>
                  <span aria-hidden className="h-1 w-1 rounded-full bg-fg-faint" />
                  <span>{featured.readingTime}</span>
                </div>
                <span className="mt-8 inline-flex items-center gap-1.5 font-sans text-sm text-accent transition-transform duration-300 group-hover:translate-x-1">
                  Leer artículo
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          </Container>
        </section>

        {/* Resto de artículos */}
        {rest.length > 0 && (
          <section className="border-b border-rule">
            <Container className="py-section">
              <Eyebrow>Más artículos</Eyebrow>
              <div className="mt-10 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group relative flex flex-col overflow-hidden bg-surface transition-colors duration-500 hover:bg-surface-raised"
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
                ))}
              </div>
            </Container>
          </section>
        )}

        <CtaClosing />
      </main>
      <Footer />
    </>
  );
}
