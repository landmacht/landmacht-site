import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { buildMetadata } from '@/lib/metadata';
import { getAllPosts, getPostBySlug, MarkdownRenderer } from '@/lib/insights';

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return buildMetadata('Insight Not Found', 'The requested insight could not be found.');
  }

  return buildMetadata(
    `${post.frontmatter.title}`,
    `${post.frontmatter.description} Coverage focus: Franschhoek, Paarl, Wellington.`
  );
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="section-shell py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-tactical-oliveLight">{post.frontmatter.date}</p>
        <h1 className="mt-3 font-heading text-4xl uppercase tracking-wide text-zinc-100 sm:text-5xl">{post.frontmatter.title}</h1>
        <p className="mt-4 text-zinc-300">{post.frontmatter.description}</p>

        <div className="mt-10">
          <MarkdownRenderer content={post.content} />
        </div>
      </div>
    </article>
  );
}
