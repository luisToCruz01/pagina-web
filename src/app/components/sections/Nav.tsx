"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ease } from "@/app/lib/motion";

type DropdownItem = { label: string; href: string };
type NavItem = {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
};

// Labels cortos de navegación (los títulos completos viven en la data de cada
// página; aquí usamos versiones breves para el menú).
const NAV_ITEMS: NavItem[] = [
  {
    label: "Servicios",
    href: "/servicios",
    dropdown: [
      { label: "Gestión de procesos", href: "/servicios/gestion-procesos" },
      { label: "Desarrollo de software", href: "/servicios/desarrollo-software" },
      { label: "Arquitectura tecnológica", href: "/servicios/arquitectura" },
      { label: "Tecnologías emergentes", href: "/servicios/tecnologias-emergentes" },
      { label: "Pruebas de software (QA)", href: "/servicios/pruebas-qa" },
    ],
  },
  {
    label: "Sistemas",
    href: "/sistemas",
  },
  {
    label: "Sectores",
    href: "/sectores",
    dropdown: [
      { label: "Agencias de marketing", href: "/sectores/agencias-marketing" },
      { label: "Servicios profesionales", href: "/sectores/servicios-profesionales" },
      { label: "E-commerce", href: "/sectores/ecommerce" },
    ],
  },
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

function Chevron() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-px"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

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

      if (menuOpenRef.current) {
        lastScrollY.current = currentY;
        return;
      }

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
      animate={{ opacity: hidden ? 0 : 1, y: hidden ? "-100%" : 0 }}
      transition={{ duration: hidden ? 0.85 : 0.55, ease: ease.outExpo }}
      className={`sticky top-0 z-50 w-full transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "border-b border-rule bg-surface/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-3 sm:px-8">
        {/* Logo — left */}
        <Link
          href="/"
          className="justify-self-start font-display text-xl font-medium tracking-tight text-fg transition-opacity duration-300 hover:opacity-80"
        >
          RDMD <span className="text-accent">&amp;</span> Co.
        </Link>

        {/* Centered pill — desktop only */}
        <nav
          className="liquid-glass relative hidden items-center gap-1 rounded-xl px-1.5 py-1.5 md:flex"
          onMouseLeave={() => setOpenDropdown(null)}
        >
          {NAV_ITEMS.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() =>
                item.dropdown ? setOpenDropdown(item.label) : setOpenDropdown(null)
              }
            >
              <Link
                href={item.href}
                className="flex items-center gap-0.5 rounded-md px-3 py-1 text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
              >
                {item.label}
                {item.dropdown && <Chevron />}
              </Link>

              {/* Dropdown panel */}
              {item.dropdown && (
                <AnimatePresence>
                  {openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18, ease: ease.outCinematic }}
                      className="liquid-glass absolute left-1/2 top-[calc(100%+10px)] z-50 w-64 -translate-x-1/2 rounded-xl p-2"
                    >
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block rounded-lg px-3 py-2.5 text-sm text-fg-muted transition-colors duration-200 hover:bg-fg/5 hover:text-fg"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
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
            {NAV_ITEMS.map((item) => (
              <div key={item.href}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 rounded-lg px-4 py-3 text-sm text-fg-muted transition-colors duration-200 hover:bg-fg/5 hover:text-fg"
                  >
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <button
                      type="button"
                      onClick={() =>
                        setMobileExpanded(
                          mobileExpanded === item.label ? null : item.label,
                        )
                      }
                      className="rounded-lg p-3 text-fg-muted"
                      aria-label={`Expandir ${item.label}`}
                    >
                      <span
                        className={`block transition-transform duration-300 ${
                          mobileExpanded === item.label ? "rotate-180" : ""
                        }`}
                      >
                        <Chevron />
                      </span>
                    </button>
                  )}
                </div>
                {item.dropdown && (
                  <AnimatePresence initial={false}>
                    {mobileExpanded === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: ease.outCinematic }}
                        className="overflow-hidden pl-4"
                      >
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setMenuOpen(false)}
                            className="block rounded-lg px-4 py-2.5 text-sm text-fg-faint transition-colors duration-200 hover:bg-fg/5 hover:text-fg"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
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
