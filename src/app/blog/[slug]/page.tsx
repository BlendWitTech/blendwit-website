import { getPostBySlug, cmsImageUrl } from '@/lib/cms';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: post.featuredImage ? { images: [cmsImageUrl(post.featuredImage)] } : undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      {post.featuredImage && (
        <img
          src={cmsImageUrl(post.featuredImage)}
          alt={post.title}
          className="w-full rounded-xl mb-8 object-cover max-h-80"
        />
      )}
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="mt-2 text-sm text-gray-400">
        {post.publishedAt && new Date(post.publishedAt).toLocaleDateString()}
        {post.author?.name && ` · ${post.author.name}`}
      </div>
      {post.content && (
        <div
          className="mt-8 prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}
    </article>
  );
}
