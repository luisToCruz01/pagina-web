import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/app/components/sections/Nav";
import { Footer } from "@/app/components/sections/Footer";
import { ServiceTemplate } from "@/app/components/sections/ServiceTemplate";
import { getService, SERVICE_SLUGS } from "@/app/lib/services-data";

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Servicio — RDMD & Co." };
  return {
    title: `${service.title} — RDMD & Co.`,
    description: service.metaDescription,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <Nav />
      <main className="flex-1">
        <ServiceTemplate service={service} />
      </main>
      <Footer />
    </>
  );
}
