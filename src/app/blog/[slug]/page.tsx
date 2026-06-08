import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/app/components/sections/Nav";
import { Footer } from "@/app/components/sections/Footer";
import { ArticleTemplate } from "@/app/components/sections/ArticleTemplate";
import { getArticle, ARTICLE_SLUGS } from "@/app/lib/blog-data";

export function generateStaticParams() {
  return ARTICLE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Artículo — RDMD & Co." };
  return {
    title: `${article.title} — RDMD & Co.`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <Nav />
      <main className="flex-1">
        <ArticleTemplate article={article} />
      </main>
      <Footer />
    </>
  );
}
