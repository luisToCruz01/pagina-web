"use client";

import Link from "next/link";
import * as motion from "motion/react-client";
import { Container } from "@/app/components/ui/Container";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { fadeUp, stagger, staggerItem } from "@/app/lib/motion";
import { SECTORS } from "@/app/lib/sectors-data";

// Resúmenes breves para la home (los textos completos viven en cada página).
const SECTOR_BLURB: Record<string, string> = {
  "agencias-marketing":
    "El sector donde más casos acumulamos. Conocemos la operación de una agencia por dentro.",
  "servicios-profesionales":
    "Consultoras, despachos y clínicas. Liberamos el tiempo experto de tu equipo.",
  ecommerce:
    "Tiendas en crecimiento donde el volumen empieza a superar lo que un equipo pequeño maneja a mano.",
};

export function Sectors() {
  return (
    <section className="border-t border-rule">
      <Container className="py-section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="max-w-2xl"
        >
          <Eyebrow>Sectores</Eyebrow>
          <h2
            className="mt-6 font-display font-light leading-[1.05] tracking-[-0.02em] text-fg"
            style={{ fontSize: "var(--text-h1)" }}
          >
            A quién servimos
          </h2>
          <p className="mt-6 font-sans text-lg leading-relaxed text-fg-muted">
            Trabajamos con empresas pequeñas en Latinoamérica. Nos especializamos
            en agencias de marketing, pero los mismos sistemas sirven a cualquier
            negocio con procesos que repetir.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mt-16 grid gap-px bg-rule sm:grid-cols-3"
        >
          {SECTORS.map((sector, i) => (
            <motion.div key={sector.slug} variants={staggerItem}>
              <Link
                href={`/sectores/${sector.slug}`}
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
                  <h3 className="mt-6 font-display text-2xl font-light leading-tight text-fg">
                    {sector.title.replace("Automatización para ", "")}
                  </h3>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-fg-muted">
                    {SECTOR_BLURB[sector.slug] ?? sector.subtitle}
                  </p>
                </div>
                <span className="mt-8 inline-flex items-center gap-1.5 font-sans text-sm text-accent transition-transform duration-300 group-hover:translate-x-1">
                  Ver el sector
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
        </motion.div>
      </Container>
    </section>
  );
}
