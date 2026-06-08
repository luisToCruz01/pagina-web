import { Nav } from "./components/sections/Nav";
import { Hero } from "./components/sections/Hero";
import { Audience } from "./components/sections/Audience";
import { Services } from "./components/sections/Services";
import { Process } from "./components/sections/Process";
import { Solutions } from "./components/sections/Solutions";
import { Sectors } from "./components/sections/Sectors";
import { Trust } from "./components/sections/Trust";
import { CtaClosing } from "./components/sections/CtaClosing";
import { Footer } from "./components/sections/Footer";
import { MarqueeStrip } from "./components/ui/MarqueeStrip";

const MARQUEE_ITEMS = [
  "Operaciones",
  "Reportes",
  "Atención al cliente",
  "Documentos",
  "Reactivación",
  "Seguimiento",
  "Integraciones",
  "Agentes IA",
];

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Audience />
        <MarqueeStrip items={MARQUEE_ITEMS} />
        <Services />
        <Solutions />
        <Process />
        <Sectors />
        <Trust />
        <CtaClosing />
      </main>
      <Footer />
    </>
  );
}
