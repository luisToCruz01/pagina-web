"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GitBranch,
  TrendingUp,
  Zap,
  Search,
  ShieldCheck,
  FileText,
  Layout,
  GitMerge,
  BarChart3,
  Cloud,
  Plug,
  Workflow,
  Network,
  MessageSquare,
  Sparkles,
  CheckCircle,
  Gauge,
  MousePointerClick,
  RefreshCw,
  Plus,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/app/components/ui/Container";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { Button } from "@/app/components/ui/Button";
import { ease } from "@/app/lib/motion";
import type { Service } from "@/app/lib/services-data";

const ICON_MAP: Record<string, LucideIcon> = {
  "git-branch": GitBranch,
  "trending-up": TrendingUp,
  zap: Zap,
  search: Search,
  "shield-check": ShieldCheck,
  "file-text": FileText,
  layout: Layout,
  "git-merge": GitMerge,
  "bar-chart-3": BarChart3,
  cloud: Cloud,
  plug: Plug,
  workflow: Workflow,
  network: Network,
  "message-square": MessageSquare,
  sparkles: Sparkles,
  "check-circle": CheckCircle,
  gauge: Gauge,
  "mouse-pointer-click": MousePointerClick,
  "refresh-cw": RefreshCw,
};

const CAL_URL = "https://cal.com/rdmdco/30min";

export function ServiceTemplate({ service }: { service: Service }) {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <article>
      {/* === HERO === */}
      <section className="relative isolate overflow-hidden border-b border-rule">
        {/* warm gold tint, subtle */}
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
            <Eyebrow tone="accent">{service.eyebrow}</Eyebrow>
            <h1
              className="mt-6 font-display font-light leading-[1.04] tracking-[-0.02em] text-fg"
              style={{ fontSize: "var(--text-h1)" }}
            >
              {service.title}
            </h1>
            <p className="mt-7 max-w-2xl font-sans text-lg leading-relaxed text-fg-muted">
              {service.subtitle}
            </p>
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button href={CAL_URL} external variant="primary">
                Agenda tu diagnóstico
              </Button>
              <Button href="#proceso" variant="secondary">
                Ver cómo funciona
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* === SUB-SERVICIOS === */}
      <section className="border-b border-rule">
        <Container className="py-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: ease.outCinematic }}
            className="max-w-2xl"
          >
            <Eyebrow>Qué incluye</Eyebrow>
            <h2
              className="mt-6 font-display font-light leading-[1.05] tracking-[-0.02em] text-fg"
              style={{ fontSize: "var(--text-h2)" }}
            >
              Todo lo que necesitas, en un solo lugar
            </h2>
          </motion.div>

          <div className="mt-16 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {service.subServices.map((sub, i) => {
              const Icon = ICON_MAP[sub.icon] ?? Plus;
              return (
                <motion.div
                  key={sub.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: ease.outCinematic }}
                  className="group relative overflow-hidden bg-surface p-8 transition-colors duration-500 hover:bg-surface-raised sm:p-10"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-y-100"
                  />
                  <Icon
                    size={26}
                    strokeWidth={1.4}
                    className="text-accent transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <h3 className="mt-6 font-display text-xl font-light leading-tight text-fg sm:text-2xl">
                    {sub.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-fg-muted">
                    {sub.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* === VENTAJAS (TABS) === */}
      <section className="border-b border-rule">
        <Container className="py-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: ease.outCinematic }}
            className="max-w-2xl"
          >
            <Eyebrow sparkle>Ventajas</Eyebrow>
            <h2
              className="mt-6 font-display font-light leading-[1.05] tracking-[-0.02em] text-fg"
              style={{ fontSize: "var(--text-h2)" }}
            >
              Por qué se hace bien
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
            {/* Tab list */}
            <div className="flex flex-col gap-1 border-l border-rule">
              {service.advantages.map((adv, i) => (
                <button
                  key={adv.tab}
                  onClick={() => setActiveTab(i)}
                  className={`group relative -ml-px border-l-2 px-6 py-4 text-left font-sans text-base transition-colors duration-300 ${
                    activeTab === i
                      ? "border-accent text-fg"
                      : "border-transparent text-fg-faint hover:text-fg-muted"
                  }`}
                >
                  {adv.tab}
                </button>
              ))}
            </div>

            {/* Tab panel */}
            <div className="relative min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: ease.outCinematic }}
                >
                  <h3 className="max-w-xl font-display text-3xl font-light leading-[1.1] tracking-[-0.01em] text-fg sm:text-4xl">
                    {service.advantages[activeTab].headline}
                  </h3>
                  <p className="mt-6 max-w-lg font-sans text-lg leading-relaxed text-fg-muted">
                    {service.advantages[activeTab].body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </section>

      {/* === PROCESO === */}
      <section id="proceso" className="border-b border-rule">
        <Container className="py-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: ease.outCinematic }}
            className="max-w-2xl"
          >
            <Eyebrow>Cómo trabajamos</Eyebrow>
            <h2
              className="mt-6 font-display font-light leading-[1.05] tracking-[-0.02em] text-fg"
              style={{ fontSize: "var(--text-h2)" }}
            >
              Un proceso claro de principio a fin
            </h2>
          </motion.div>

          <div className="mt-16 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: ease.outCinematic }}
                className="bg-surface p-8 sm:p-10"
              >
                <span className="font-display text-5xl font-light leading-none text-accent">
                  {step.n}
                </span>
                <h3 className="mt-6 font-display text-xl font-light text-fg">
                  {step.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-fg-muted">
                  {step.body}
                </p>
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
              {service.stat.value}
            </p>
            <p className="mx-auto mt-6 max-w-xl font-sans text-lg leading-relaxed text-fg-muted">
              {service.stat.label}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* === FAQ === */}
      <section className="border-b border-rule">
        <Container className="py-section">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: ease.outCinematic }}
            >
              <Eyebrow>Preguntas frecuentes</Eyebrow>
              <h2
                className="mt-6 font-display font-light leading-[1.05] tracking-[-0.02em] text-fg"
                style={{ fontSize: "var(--text-h2)" }}
              >
                Lo que sueles querer saber
              </h2>
            </motion.div>

            <div className="divide-y divide-rule border-t border-rule">
              {service.faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={faq.q}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span className="font-sans text-base font-medium text-fg">
                        {faq.q}
                      </span>
                      <Plus
                        size={20}
                        strokeWidth={1.5}
                        className={`mt-0.5 shrink-0 text-accent transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: ease.outCinematic }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-xl pb-6 font-sans text-base leading-relaxed text-fg-muted">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
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
              ¿Listo para llevar tu operación al nivel siguiente?
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
