"use client";

import { useEffect, useState } from "react";
import { Container } from "@/app/components/ui/Container";
import { Button } from "@/app/components/ui/Button";
import { cn } from "@/app/lib/cn";

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Soluciones", href: "#soluciones" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[border-color,background-color,backdrop-filter] duration-500",
        scrolled
          ? "border-b border-rule bg-surface/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container
        className={cn(
          "flex items-center justify-between transition-[height] duration-500",
          scrolled ? "h-14" : "h-16",
        )}
      >
        <a
          href="#"
          className="font-display text-xl font-medium tracking-tight text-fg transition-opacity duration-300 hover:opacity-80"
        >
          RDMD <span className="text-accent">&amp;</span> Co.
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button
          href="https://cal.com/rdmdco/30min"
          external
          variant="primary"
          className="h-10 px-6 text-[13px]"
        >
          Conversemos
        </Button>
      </Container>
    </header>
  );
}
