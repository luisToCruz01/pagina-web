"use client";

import Link from "next/link";
import * as motion from "motion/react-client";
import { Container } from "@/app/components/ui/Container";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { fadeUp, stagger, staggerItem } from "@/app/lib/motion";
import { SERVICES } from "@/app/lib/services-data";

export function Services() {
  return (
    <section
      id="servicios"
      className="relative isolate overflow-hidden border-t border-rule"
    >
      {/* === Background video === */}
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4"
          type="video/mp4"
        />
      </video>

      {/* === Legibility overlay === */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.55) 35%, rgba(10,10,10,0.70) 100%)",
        }}
      />

      <Container className="relative py-section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="max-w-2xl"
        >
          <Eyebrow sparkle>Servicios</Eyebrow>
          <h2
            className="mt-6 font-display font-light leading-[1.05] tracking-[-0.02em] text-fg"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Lo que construimos para tu empresa
          </h2>
          <p className="mt-6 font-sans text-lg leading-relaxed text-fg-muted">
            Cada servicio se diseña a medida de tu operación. Diagnosticamos,
            diseñamos y construimos el sistema que necesitas.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mt-20 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service, i) => (
            <motion.div key={service.slug} variants={staggerItem}>
              <Link
                href={`/servicios/${service.slug}`}
                className="group relative flex h-full flex-col justify-between overflow-hidden bg-surface p-8 transition-colors duration-500 hover:bg-surface-raised sm:p-10"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-y-100"
                />
                <div>
                  <span className="font-sans text-xs font-medium tracking-[0.28em] text-fg-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-light leading-tight text-fg sm:text-[1.625rem]">
                    {service.title}
                  </h3>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-fg-muted">
                    {service.subtitle}
                  </p>
                </div>
                <span className="mt-8 inline-flex items-center gap-1.5 font-sans text-sm text-accent transition-transform duration-300 group-hover:translate-x-1">
                  Conocer el servicio
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}

          {/* Card-CTA que completa el grid (6ta celda) */}
          <motion.div variants={staggerItem}>
            <Link
              href="/servicios"
              className="group relative flex h-full flex-col justify-center overflow-hidden bg-surface-raised/40 p-8 transition-colors duration-500 hover:bg-surface-raised sm:p-10"
            >
              <Eyebrow tone="accent">Todos los servicios</Eyebrow>
              <h3 className="mt-6 font-display text-2xl font-light leading-tight text-fg">
                Mira el catálogo completo
              </h3>
              <span className="mt-8 inline-flex items-center gap-1.5 font-sans text-sm text-accent transition-transform duration-300 group-hover:translate-x-1">
                Ver servicios
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
