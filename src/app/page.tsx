import { Nav } from "./components/sections/Nav";
import { Hero } from "./components/sections/Hero";
import { Audience } from "./components/sections/Audience";
import { Services } from "./components/sections/Services";
import { Process } from "./components/sections/Process";
import { Solutions } from "./components/sections/Solutions";
import { Trust } from "./components/sections/Trust";
import { CtaClosing } from "./components/sections/CtaClosing";
import { Footer } from "./components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Audience />
        <Services />
        <Process />
        <Solutions />
        <Trust />
        <CtaClosing />
      </main>
      <Footer />
    </>
  );
}
