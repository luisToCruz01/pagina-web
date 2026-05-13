"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ease } from "@/app/lib/motion";

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Soluciones", href: "#soluciones" },
];

function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <path d="M6 6l12 12M6 18L18 6" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lastScrollY = useRef(0);
  const menuOpenRef = useRef(false);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      setScrolled(currentY > 32);

      // Mientras el menú móvil esté abierto, nunca esconder
      if (menuOpenRef.current) {
        lastScrollY.current = currentY;
        return;
      }

      // Ignorar micro-scrolls que harían parpadear
      if (Math.abs(delta) < 4) return;

      if (currentY < 32) {
        setHidden(false);
      } else {
        const pastHero = currentY > window.innerHeight * 0.8;
        const goingDown = delta > 0;
        if (goingDown && pastHero) setHidden(true);
        else if (!goingDown) setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: hidden ? "-100%" : 0 }}
      transition={{ duration: 0.35, ease: ease.outCinematic }}
      className={`sticky top-0 z-50 w-full transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "border-b border-rule bg-surface/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-3 sm:px-8">
        {/* Logo — left */}
        <a
          href="#"
          className="justify-self-start font-display text-xl font-medium tracking-tight text-fg transition-opacity duration-300 hover:opacity-80"
        >
          RDMD <span className="text-accent">&amp;</span> Co.
        </a>

        {/* Centered pill — desktop only */}
        <nav className="liquid-glass hidden items-center gap-1 rounded-xl px-1.5 py-1.5 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1 text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA — desktop right */}
        <a
          href="https://cal.com/rdmdco/30min"
          target="_blank"
          rel="noreferrer"
          className="hidden justify-self-end rounded-full bg-fg px-4 py-2 text-sm font-medium text-surface transition-colors duration-200 hover:bg-fg/90 md:inline-flex"
        >
          Conversemos
        </a>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="liquid-glass justify-self-end rounded-lg p-2 text-fg md:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: ease.outCinematic }}
            className="liquid-glass absolute left-4 right-4 top-[60px] z-40 flex flex-col gap-1 rounded-2xl p-4 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm text-fg-muted transition-colors duration-200 hover:bg-fg/5 hover:text-fg"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 border-t border-rule pt-3">
              <a
                href="https://cal.com/rdmdco/30min"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
                className="block w-full rounded-full bg-fg py-2.5 text-center text-sm font-medium text-surface transition-colors duration-200 hover:bg-fg/90"
              >
                Conversemos
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
