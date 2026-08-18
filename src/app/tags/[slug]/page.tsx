import type { Metadata } from "next";
import { api } from "@/lib/api";
import { PostCard } from "@/components/post-card";

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
  const url = `${SITE_URL}/tags/${slug}`;

  return {
    title: `TAG: ${slug.toUpperCase()}`,
    description: `Posts tagged with ${slug}`,
    alternates: { canonical: url },
    openGraph: {
      title: `${slug} — VOLT`,
      description: `Posts tagged with ${slug}`,
      url,
      type: "website",
    },
  };
}

export default async function TagPostsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await api.tagPosts(slug);
  const posts = data.items ?? [];
  const tagName = slug.toUpperCase();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold uppercase tracking-wider mb-10">
        TAG: {tagName}
      </h1>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground uppercase text-sm">
          NO POSTS FOUND
        </p>
      )}
    </div>
  );
}
