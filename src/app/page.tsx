import { Nav } from "./components/sections/Nav";
import { Hero } from "./components/sections/Hero";
import { Benefits } from "./components/sections/Benefits";
import { Audience } from "./components/sections/Audience";
import { Expertise } from "./components/sections/Expertise";
import { Services } from "./components/sections/Services";
import { Newsletter } from "./components/sections/Newsletter";
import { UseCases } from "./components/sections/UseCases";
import { HowItWorks } from "./components/sections/HowItWorks";
import { CaseStudies } from "./components/sections/CaseStudies";
import { Journey } from "./components/sections/Journey";
import { Faq } from "./components/sections/Faq";
// import { Trust } from "./components/sections/Trust";
import { BlogPreview } from "./components/sections/BlogPreview";
import { CtaClosing } from "./components/sections/CtaClosing";
import { Footer } from "./components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Benefits />
        <Audience />
        <Expertise />
        <Services />
        <Newsletter />
        <UseCases />
        <HowItWorks />
        <CaseStudies />
        <Journey />
        {/* Oculta (Por qué RDMD + casos viejos). Reactivar quitando el comentario */}
        {/* <Trust /> */}
        <BlogPreview />
        <Faq />
        <CtaClosing />
      </main>
      <Footer />
    </>
  );
}
