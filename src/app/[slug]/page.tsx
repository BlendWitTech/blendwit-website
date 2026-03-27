import { getPageBySlug, getSeoMeta } from '@/lib/cms';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [page, seo] = await Promise.all([getPageBySlug(slug), getSeoMeta(`/${slug}`)]);
  if (!page) return {};
  return {
    title: seo?.title || page.metaTitle || page.title,
    description: seo?.description || page.metaDescription,
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">{page.title}</h1>
      {page.content && (
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      )}
    </div>
  );
}
