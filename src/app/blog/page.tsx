import { getPublishedPosts } from '@/lib/cms';
import Link from 'next/link';

export default async function BlogPage() {
  const { data: posts } = await getPublishedPosts({ limit: 20 });

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-10">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
      ) : (
        <div className="grid gap-8">
          {posts.map((post) => (
            <article key={post.id} className="border-b pb-8">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                <h2 className="text-xl font-bold">{post.title}</h2>
              </Link>
              {post.excerpt && <p className="mt-2 text-gray-600">{post.excerpt}</p>}
              <div className="mt-3 text-sm text-gray-400">
                {post.publishedAt && new Date(post.publishedAt).toLocaleDateString()}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
