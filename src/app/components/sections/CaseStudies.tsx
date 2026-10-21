"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { CASES } from "@/app/lib/cases-data";
import { cn } from "@/app/lib/cn";

// Seccion copiada del codigo de "Case Studies" de la referencia Xirex (plantilla con licencia).
// Valores de Xirex: carrusel horizontal fijado al borde inferior (stage 760px, perView 1.2, gap 12,
// holdEnd 200, padding inferior 20); tarjeta de 1155x686 con padding 24; panel inferior de 257px con
// backdrop blur 60px dividido en cifra (277px, borde punteado), datos (537px) y marca (293px, color de
// acento, logo de 159px); barra de progreso de 4px y contador ".01.[03]" + etiqueta.
// Cambios RDMD: casos reales de cases-data, fotos propias generadas con SDXL local en monocromo dorado
// y animadas en codigo, marcas animadas en SVG, Cormorant/DM Sans y dorado en lugar de rojo.

const STAGE = 760;
const PER_VIEW = 1.2;
const GAP = 12;
const HOLD_END = 200;

type Mark = "bars" | "signal" | "play";

const CARDS: {
  image: string;
  number: string;
  numberLabel: string;
  tags: string[];
  brand: string;
  mark: Mark;
}[] = [
  { image: "/casos/caso-1.jpg", number: "36h", numberLabel: "Ahorradas al mes en reportería", tags: ["Agencias", "Reportes"], brand: "Agencia CDMX", mark: "bars" },
  { image: "/casos/caso-2.jpg", number: "78%", numberLabel: "Tickets resueltos sin intervención humana", tags: ["E-commerce", "Atención 24/7"], brand: "Moda Bogotá", mark: "signal" },
  { image: "/casos/caso-3.jpg", number: "2.5x", numberLabel: "Más contenido aprobado por semana", tags: ["Contenido", "Aprobaciones"], brand: "Productora BA", mark: "play" },
];

// ---------- Marcas animadas (159px, crema sobre dorado) ----------
function BrandMark({ kind }: { kind: Mark }) {
  const c = "#F5F0E8";
  if (kind === "bars")
    return (
      <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={18 + i * 18} y={20} width={12} height={60} rx={6} fill={c} style={{ transformOrigin: `${24 + i * 18}px 80px`, animation: `brandBars 2.4s ${i * 0.18}s ease-in-out infinite` }} />
        ))}
      </svg>
    );
  if (kind === "signal")
    return (
      <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden fill="none" stroke={c} strokeWidth={6} strokeLinecap="round">
        <circle cx={50} cy={50} r={8} fill={c} stroke="none" />
        {[22, 34, 46].map((r, i) => (
          <circle key={r} cx={50} cy={50} r={r} style={{ animation: `brandPulse 2.4s ${i * 0.3}s ease-in-out infinite` }} />
        ))}
      </svg>
    );
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      <circle cx={50} cy={50} r={44} fill="none" stroke={c} strokeWidth={5} strokeDasharray="10 8" style={{ transformOrigin: "50px 50px", animation: "brandSpin 9s linear infinite" }} />
      <path d="M42 34 L68 50 L42 66 Z" fill={c} style={{ transformOrigin: "50px 50px", animation: "brandBeat 2.4s ease-in-out infinite" }} />
    </svg>
  );
}

// ---------- Foto con desenfoque de movimiento animado ----------
function MotionPhoto({ src }: { src: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover motion-safe:animate-[photoZoom_18s_ease-in-out_infinite_alternate]" draggable={false} />
      {/* Estela: la misma foto desenfocada que se desliza en horizontal */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45 mix-blend-screen [filter:blur(14px)_saturate(0.15)] motion-safe:animate-[photoTrail_7s_ease-in-out_infinite]" draggable={false} />
    </div>
  );
}

// ---------- Tarjeta ----------
// compact (<1280px): foto arriba y panel apilado debajo, porque las 3 columnas de 1107px no caben
function CaseCard({ i, width, compact = false }: { i: number; width?: number; compact?: boolean }) {
  const card = CARDS[i];
  const data = CASES[i];
  return (
    <article
      className={cn("relative shrink-0 overflow-hidden bg-[#0F0F0F]", !compact && "p-6")}
      style={{ width: width ?? "100%", height: compact ? undefined : 686 }}
    >
      {compact ? (
        <div className="relative h-[300px] md:h-[440px]">
          <MotionPhoto src={card.image} />
        </div>
      ) : (
        <MotionPhoto src={card.image} />
      )}
      <div
        className={cn(
          "flex bg-[rgba(30,30,30,0.1)] backdrop-blur-[60px]",
          compact ? "relative flex-col md:flex-row" : "absolute inset-x-6 bottom-6 h-[257px]",
        )}
      >
        {/* Cifra */}
        <div className={cn("relative flex shrink-0 flex-col justify-between gap-6 p-6", compact ? "md:w-[240px]" : "w-[277px]")}>
          <span aria-hidden className={cn("absolute border-dashed border-white/20", compact ? "inset-x-6 bottom-0 border-b md:inset-x-auto md:inset-y-0 md:right-0 md:border-b-0 md:border-r" : "inset-y-0 right-0 border-r")} />
          <span className="font-display text-[88px] font-light leading-[88px] tracking-[-0.03em] text-fg [font-variant-numeric:lining-nums]">
            {card.number}
          </span>
          <span className="max-w-[160px] font-sans text-base leading-[20.8px] text-fg/80">{card.numberLabel}</span>
        </div>
        {/* Datos */}
        <div className="flex flex-1 flex-col justify-between gap-8 p-6">
          <div>
            <div className="flex flex-wrap gap-2">
              {card.tags.map((t) => (
                <span key={t} className="bg-white/10 px-2 font-sans text-xs uppercase leading-[18px] tracking-[0.08em] text-fg">
                  <span className="mr-1 text-fg/40">#</span>
                  {t}
                </span>
              ))}
            </div>
            <h3 className="mt-3 max-w-[400px] font-display text-[32px] font-normal leading-[35.2px] tracking-[-0.01em] text-fg">
              {data.title}
            </h3>
          </div>
          <div className={cn("flex", compact ? "gap-8" : "gap-12")}>
            <div>
              <p className="font-sans text-xs font-medium uppercase leading-[18px] tracking-[0.08em] text-fg/40">Cliente</p>
              <p className="font-sans text-base leading-[20.8px] text-fg">{data.client}</p>
            </div>
            <div>
              <p className="font-sans text-xs font-medium uppercase leading-[18px] tracking-[0.08em] text-fg/40">Sector</p>
              <p className="font-sans text-base leading-[20.8px] text-fg">{data.sector}</p>
            </div>
          </div>
        </div>
        {/* Marca */}
        <div
          className={cn(
            "flex shrink-0 items-center bg-accent p-6",
            compact ? "flex-row gap-4 md:w-[200px] md:flex-col md:justify-center" : "w-[293px] flex-col justify-between",
          )}
        >
          <div className={compact ? "h-12 w-12 md:h-[110px] md:w-[110px]" : "h-[159px] w-[159px]"}>
            <BrandMark kind={card.mark} />
          </div>
          <span className="font-sans text-xl font-medium leading-[26px] text-fg">{card.brand}</span>
        </div>
      </div>
    </article>
  );
}

// ---------- Boton "Ver todos" (mismo estilo y animacion que Suscribirme) ----------
const VIEW_ALL = "Ver todos";
function ViewAllButton() {
  return (
    <Link href="/casos" className="group inline-block bg-surface p-[2px]">
      <span className="flex items-center gap-4 rounded-tl-lg bg-fg py-2.5 pl-3 pr-4 transition-colors duration-300 group-hover:bg-[#e6dfd2]">
        <span className="flex h-6 w-6 items-center justify-center bg-accent text-fg transition-transform duration-300 ease-out group-hover:rotate-90">
          <ArrowUpRight size={14} strokeWidth={1.75} className="transition-transform duration-300 ease-out group-hover:-rotate-90" />
        </span>
        <span aria-label={VIEW_ALL} className="font-sans text-base font-bold uppercase tracking-[0.08em] text-surface transition-colors duration-300 group-hover:text-[#8a6420]">
          {VIEW_ALL.split("").map((ch, i) => (
            <span key={i} aria-hidden className="inline-block group-hover:animate-[letterFlicker_420ms_ease-out_both]" style={{ animationDelay: `${(i * 53) % 260}ms` }}>
              {ch === " " ? " " : ch}
            </span>
          ))}
        </span>
      </span>
    </Link>
  );
}

// ---------- Seccion ----------
export function CaseStudies() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [dims, setDims] = useState({ card: 1155, maxScroll: 2101 });
  const [active, setActive] = useState(0);

  // Ancho de tarjeta y recorrido igual que el slider de Xirex: card = (W - gap*(perView-1)) / perView
  useLayoutEffect(() => {
    const measure = () => {
      const W = viewportRef.current?.clientWidth ?? 1388;
      const card = (W - GAP * (PER_VIEW - 1)) / PER_VIEW;
      const total = card * CARDS.length + GAP * (CARDS.length - 1);
      setDims({ card, maxScroll: Math.max(0, total - W) });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const travel = dims.maxScroll + HOLD_END;
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "end end"] });
  // El carrusel avanza mientras el escenario esta fijo abajo; los ultimos 200px son pausa
  const pinnedProgress = useTransform(scrollYProgress, (v) => {
    const el = wrapRef.current;
    if (!el) return 0;
    const total = el.offsetHeight; // stage + travel
    const scrolledInside = v * total - STAGE;
    return Math.min(1, Math.max(0, scrolledInside / Math.max(1, travel - HOLD_END)));
  });
  const x = useTransform(pinnedProgress, (p) => -p * dims.maxScroll);
  const barWidth = useTransform(pinnedProgress, (p) => `${((p * (CARDS.length - 1) + 1) / CARDS.length) * 100}%`);
  useMotionValueEvent(pinnedProgress, "change", (p) => setActive(Math.round(p * (CARDS.length - 1))));

  return (
    <section id="casos" className="border-t border-rule py-section">
      {/* Encabezado */}
      <div className="mx-auto flex w-[min(1228px,calc(100vw-48px))] flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="font-display font-light leading-[1] tracking-[-0.03em] text-fg" style={{ fontSize: "clamp(3rem, 6.1vw, 88px)" }}>
          <span className="block">Transformaciones</span>
          <span className="block italic text-accent">reales</span>
        </h2>
        <div className="flex max-w-[400px] flex-col gap-6 lg:pl-10">
          <div>
            <ViewAllButton />
          </div>
          <p className="max-w-[360px] font-sans text-base leading-[20.8px] text-fg/60">
            Cada proyecto empieza con un reto del negocio y termina con mejoras concretas en la operación.
          </p>
        </div>
      </div>

      {/* Escritorio (>=1280px): carrusel horizontal fijado abajo */}
      <div ref={wrapRef} className="relative mt-20 hidden xl:block" style={{ height: STAGE + travel }}>
        <div className="sticky" style={{ top: `calc(100vh - ${STAGE}px)`, height: STAGE }}>
          <div ref={viewportRef} className="mx-auto h-full w-[min(1388px,calc(100vw-52px))] overflow-hidden pb-5">
            <motion.div className="flex" style={{ x, gap: GAP }}>
              {CARDS.map((_, i) => (
                <CaseCard key={i} i={i} width={dims.card} />
              ))}
            </motion.div>
            {/* Barra de progreso (4px, a 24px de las tarjetas) */}
            <div className="mt-6 h-1 w-full bg-[#333]">
              <motion.div className="h-full bg-accent" style={{ width: barWidth }} />
            </div>
            {/* Contador y etiqueta */}
            <div className="mt-3 flex pl-24 font-sans text-xs leading-[14.4px] tracking-[0.02em]">
              <span className="text-accent">.{String(active + 1).padStart(2, "0")}.</span>
              <span className="text-[#999]">[{String(CARDS.length).padStart(2, "0")}]</span>
              <span className="ml-[144px] text-[#999]">CASOS DE ÉXITO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tablet y movil: tarjetas apiladas */}
      <div className="mx-auto mt-14 flex w-[calc(100vw-32px)] flex-col gap-3 xl:hidden">
        {CARDS.map((_, i) => (
          <CaseCard key={i} i={i} compact />
        ))}
      </div>
    </section>
  );
}
