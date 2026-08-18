import { marked } from "marked";
import { jsxStyleToCss } from "@/lib/jsx-html";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { api } from "@/lib/api";
import { PostNav } from "@/components/post-nav";
import type { PostResponse } from "@raisfast/sdk";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://raisfast.com";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await api.post(slug);
  if (!post) return { title: "NOT FOUND" };

  const url = `${SITE_URL}/posts/${slug}`;
  const description = post.excerpt || post.title;

  return {
    title: post.title.toUpperCase(),
    description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description,
      url,
      type: "article",
      ...(post.cover_image && { images: [{ url: post.cover_image }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      ...(post.cover_image && { images: [post.cover_image] }),
    },
  };
}

function ArticleJsonLd({ post }: { post: PostResponse }) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.title,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    ...(post.cover_image && { image: post.cover_image }),
    ...(post.author_name && {
      author: { "@type": "Person", name: post.author_name },
    }),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function PostContent({ content }: { content: string }) {
  const isHtml = /<[a-z][\s\S]*>/i.test(content.substring(0, 500));
  const src = jsxStyleToCss(content);
  const raw = isHtml ? src : (marked.parse(src) as string);
  const html = raw.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, "</table></div>");
  return (
    <div
      className="prose-volt max-w-3xl mx-auto"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await api.post(slug);
  if (!post) notFound();

  const tags = post.tags ?? [];

  return (
    <article>
      <ArticleJsonLd post={post} />
      <header className="border-b-3 border-foreground px-4 py-8 max-w-4xl mx-auto">
        {post.category_name && (
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
            [{post.category_name.toUpperCase()}]
          </span>
        )}
        <h1 className="text-4xl font-bold uppercase cursor-blink mb-4">
          {post.title}
        </h1>
        <div className="text-sm text-muted-foreground uppercase tracking-wider">
          {post.author_name ?? "UNKNOWN"} {"//"} {formatDate(post.created_at)}
        </div>
      </header>

      {post.cover_image && (
        <div className="border-b-3 border-foreground">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-auto block"
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-12">
        <PostContent content={post.content} />
      </div>

      {tags.length > 0 && (
        <div className="max-w-3xl mx-auto px-4 pb-12 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/tags/${tag.slug}`}
              className="border-2 border-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
            >
              [{tag.name.toUpperCase()}]
            </Link>
          ))}
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 pb-12">
        <PostNav prev={null} next={null} />
      </div>
    </article>
  );
}
