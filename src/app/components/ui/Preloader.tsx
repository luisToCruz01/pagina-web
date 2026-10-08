"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// Pantalla de carga al entrar o refrescar. Vive en el root layout, asi que no
// reaparece en navegaciones internas. Logica de progreso adaptada del
// "Logo Fill Preloader" de la referencia Xirex (referencias-web/xirex).
const MIN_DURATION_MS = 2000;
const EXIT_DELAY_MS = 250;
// Tope: si un recurso externo retrasa el evento load, no bloquear el sitio.
const MAX_WAIT_MS = 5000;

function Wordmark() {
  return (
    <>
      RDMD <span className="text-accent">&amp;</span> Co.
    </>
  );
}

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    loaded.current = document.readyState === "complete";
    const onLoad = () => {
      loaded.current = true;
    };
    if (!loaded.current) window.addEventListener("load", onLoad);

    let start: number | null = null;
    let current = 0;
    let frame = 0;
    const tick = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start;
      // Sube con ease-out hasta 92% durante la duracion minima; el resto
      // se completa solo cuando la pagina termino de cargar.
      const eased = (1 - (1 - Math.min(elapsed / MIN_DURATION_MS, 1)) ** 3) * 92;
      if ((loaded.current && elapsed >= MIN_DURATION_MS) || elapsed >= MAX_WAIT_MS) {
        current += (100 - current) * 0.35;
        if (current > 99.5) current = 100;
      } else if (eased > current) {
        current = eased;
      }
      setProgress(current);
      if (current >= 100) {
        setDone(true);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setHidden(true), EXIT_DELAY_MS);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          key="preloader"
          aria-hidden
          exit={{ y: "100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black"
        >
          {/* El logo sale de la oscuridad: opacidad cuadratica, casi negro al inicio y nitido al 100% */}
          <div
            className="font-display text-5xl leading-none font-medium tracking-tight whitespace-nowrap text-fg sm:text-6xl"
            style={{ opacity: (progress / 100) ** 2 }}
          >
            <Wordmark />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
