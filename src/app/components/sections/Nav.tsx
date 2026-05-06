import { Container } from "@/app/components/ui/Container";
import { Button } from "@/app/components/ui/Button";

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Soluciones", href: "#soluciones" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-rule bg-surface/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <a
          href="#"
          className="font-display text-xl font-medium tracking-tight text-fg"
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
