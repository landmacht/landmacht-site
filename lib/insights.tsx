import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content', 'insights');

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
};

export type BlogPost = {
  slug: string;
  frontmatter: BlogFrontmatter;
};

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, file);
      const source = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(source);

      return {
        slug,
        frontmatter: data as BlogFrontmatter
      };
    })
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const source = fs.readFileSync(fullPath, 'utf8');
  const { content, data } = matter(source);

  return {
    slug,
    frontmatter: data as BlogFrontmatter,
    content
  };
}

type MarkdownRendererProps = {
  content: string;
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const blocks = content
    .split(/\n\s*\n/g)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <>
      {blocks.map((block, index) => {
        if (block.startsWith('## ')) {
          return (
            <h2 key={`${index}-${block.slice(0, 20)}`} className="mt-10 font-heading text-3xl uppercase tracking-wide text-zinc-100">
              {block.replace('## ', '')}
            </h2>
          );
        }

        if (block.startsWith('- ')) {
          const items = block
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line.startsWith('- '))
            .map((line) => line.replace('- ', ''));

          return (
            <ul key={`${index}-${items.length}`} className="mt-4 list-disc space-y-2 pl-5 text-zinc-300">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={`${index}-${block.slice(0, 20)}`} className="mt-4 text-zinc-300">
            {block}
          </p>
        );
      })}
    </>
  );
}
