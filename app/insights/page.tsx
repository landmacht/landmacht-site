import Link from 'next/link';

import { buildMetadata } from '@/lib/metadata';
import { getAllPosts } from '@/lib/insights';

export const metadata = buildMetadata(
  'Security Insights for Franschhoek, Paarl and Wellington',
  'Operational security insights and practical guidance for estate, rural, commercial, and access-control environments in Franschhoek, Paarl, and Wellington.'
);

export default function InsightsPage() {
  const posts = getAllPosts();

  return (
    <section className="section-shell py-16">
      <h1 className="section-title">Insights</h1>
      <p className="mt-4 max-w-3xl text-zinc-300">
        Practical guidance from field operations and security planning experience across Franschhoek, Paarl, and Wellington.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="card-shell">
            <h2 className="font-heading text-3xl font-semibold uppercase tracking-[0.03em] text-zinc-100">{post.frontmatter.title}</h2>
            <p className="mt-3 text-sm text-zinc-300">{post.frontmatter.description}</p>
            <Link
              href={`/insights/${post.slug}`}
              className="link-accent mt-5 inline-flex"
            >
              Read insight
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}


