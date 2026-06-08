"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  FileText,
  Users,
  GitMerge,
  MessageSquare,
  Gauge,
  RefreshCw,
  Plus,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/app/components/ui/Container";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { Button } from "@/app/components/ui/Button";
import { ease } from "@/app/lib/motion";
import type { Sector } from "@/app/lib/sectors-data";

const ICON_MAP: Record<string, LucideIcon> = {
  "file-text": FileText,
  users: Users,
  "git-merge": GitMerge,
  "message-square": MessageSquare,
  gauge: Gauge,
  "refresh-cw": RefreshCw,
};

const CAL_URL = "https://cal.com/rdmdco/30min";

export function SectorTemplate({ sector }: { sector: Sector }) {
  return (
    <article>
      {/* === HERO === */}
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: ease.outCinematic }}
            className="max-w-3xl"
          >
            <Eyebrow tone="accent">{sector.eyebrow}</Eyebrow>
            <h1
              className="mt-6 font-display font-light leading-[1.04] tracking-[-0.02em] text-fg"
              style={{ fontSize: "var(--text-h1)" }}
            >
              {sector.title}
            </h1>
            <p className="mt-7 max-w-2xl font-sans text-lg leading-relaxed text-fg-muted">
              {sector.subtitle}
            </p>
            <div className="mt-9">
              <Button href={CAL_URL} external variant="primary">
                Agenda tu diagnóstico
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* === INTRO + RETOS === */}
      <section className="border-b border-rule">
        <Container className="py-section">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: ease.outCinematic }}
            className="max-w-3xl font-display text-2xl font-light leading-snug text-fg sm:text-[1.75rem]"
          >
            {sector.intro}
          </motion.p>

          <div className="mt-16">
            <Eyebrow>Lo que enfrentan</Eyebrow>
            <div className="mt-10 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
              {sector.challenges.map((c, i) => {
                const Icon = ICON_MAP[c.icon] ?? Plus;
                return (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: ease.outCinematic }}
                    className="bg-surface p-8 sm:p-10"
                  >
                    <Icon size={26} strokeWidth={1.4} className="text-accent" />
                    <h3 className="mt-6 font-display text-xl font-light leading-tight text-fg">
                      {c.title}
                    </h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-fg-muted">
                      {c.body}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* === SOLUCIONES === */}
      <section className="border-b border-rule">
        <Container className="py-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: ease.outCinematic }}
            className="max-w-2xl"
          >
            <Eyebrow sparkle>Cómo lo resolvemos</Eyebrow>
            <h2
              className="mt-6 font-display font-light leading-[1.05] tracking-[-0.02em] text-fg"
              style={{ fontSize: "var(--text-h2)" }}
            >
              Tus servicios, traducidos a tu operación
            </h2>
          </motion.div>

          <div className="mt-14 divide-y divide-rule border-t border-rule">
            {sector.solutions.map((sol, i) => (
              <motion.div
                key={sol.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: ease.outCinematic }}
                className="grid gap-6 py-10 md:grid-cols-12 md:gap-12"
              >
                <div className="md:col-span-5">
                  <h3 className="font-display text-2xl font-light leading-tight text-fg">
                    {sol.title}
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="font-sans text-base leading-relaxed text-fg-muted">
                    {sol.body}
                  </p>
                  {sol.serviceSlug && (
                    <Link
                      href={`/servicios/${sol.serviceSlug}`}
                      className="mt-4 inline-flex items-center gap-1.5 font-sans text-sm text-accent transition-transform duration-300 hover:translate-x-1"
                    >
                      Ver el servicio
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* === STAT === */}
      <section className="border-b border-rule">
        <Container className="py-[clamp(4rem,9vw,7rem)]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: ease.outCinematic }}
            className="mx-auto max-w-3xl text-center"
          >
            <p
              className="font-display font-light leading-none tracking-[-0.02em] text-accent"
              style={{ fontSize: "var(--text-stat)" }}
            >
              {sector.stat.value}
            </p>
            <p className="mx-auto mt-6 max-w-xl font-sans text-lg leading-relaxed text-fg-muted">
              {sector.stat.label}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* === CTA CIERRE === */}
      <section>
        <Container className="py-[clamp(5rem,11vw,9rem)] text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: ease.outCinematic }}
          >
            <h2
              className="mx-auto max-w-[20ch] font-display font-light leading-[1.02] tracking-[-0.02em] text-fg"
              style={{ fontSize: "var(--text-display)" }}
            >
              ¿Listo para operar al nivel siguiente?
            </h2>
            <p className="mx-auto mt-7 max-w-xl font-sans text-lg leading-relaxed text-fg-muted">
              Agenda una llamada de 30 minutos. Sin costo. Si tu caso no es para
              nosotros, te lo decimos.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href={CAL_URL} external variant="primary">
                Agenda tu diagnóstico gratuito
              </Button>
              <Button href="/servicios" variant="secondary">
                Ver todos los servicios
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </article>
  );
}
