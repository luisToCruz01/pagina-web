import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/app/components/sections/Nav";
import { Footer } from "@/app/components/sections/Footer";
import { SectorTemplate } from "@/app/components/sections/SectorTemplate";
import { getSector, SECTOR_SLUGS } from "@/app/lib/sectors-data";

export function generateStaticParams() {
  return SECTOR_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) return { title: "Sector — RDMD & Co." };
  return {
    title: `${sector.title} — RDMD & Co.`,
    description: sector.metaDescription,
  };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) notFound();

  return (
    <>
      <Nav />
      <main className="flex-1">
        <SectorTemplate sector={sector} />
      </main>
      <Footer />
    </>
  );
}
