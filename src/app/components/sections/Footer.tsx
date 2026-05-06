import { Container } from "@/app/components/ui/Container";

const NAV = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Soluciones", href: "#soluciones" },
  { label: "Contacto", href: "#contacto" },
];

const CONTACT = [
  { label: "Agenda diagnóstico", href: "https://cal.com/rdmdco/30min" },
  { label: "WhatsApp", href: "https://wa.me/18299056168" },
];

const SOCIAL = [
  { label: "@rdmd.co", href: "https://www.instagram.com/rdmd.co/" },
];

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-medium tracking-tight text-fg">
              RDMD <span className="text-accent">&amp;</span> Co.
            </p>
            <p className="mt-3 font-display text-base italic text-fg-faint">
              Automation. Redefined.
            </p>
          </div>

          <FooterColumn title="Navegación" links={NAV} />
          <FooterColumn title="Contacto" links={CONTACT} external />
          <FooterColumn title="Síguenos" links={SOCIAL} external />
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-rule pt-8 sm:flex-row sm:items-center">
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-fg-faint">
            © {YEAR} RDMD &amp; Co. — Todos los derechos reservados.
          </p>
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-fg-faint">
            Hecho en LATAM
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  external,
}: {
  title: string;
  links: { label: string; href: string }[];
  external?: boolean;
}) {
  return (
    <div>
      <h4 className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-fg-faint">
        {title}
      </h4>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer noopener" : undefined}
              className="font-sans text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
