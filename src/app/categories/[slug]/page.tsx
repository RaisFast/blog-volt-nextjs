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
  const categories = await api.categories();
  const categoryName = categories.find((c) => c.slug === slug)?.name ?? slug;
  const url = `${SITE_URL}/categories/${slug}`;

  return {
    title: `CATEGORY: ${categoryName.toUpperCase()}`,
    description: `Posts in the ${categoryName} category`,
    alternates: { canonical: url },
    openGraph: {
      title: `${categoryName} — VOLT`,
      description: `Posts in the ${categoryName} category`,
      url,
      type: "website",
    },
  };
}

export default async function CategoryPostsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await api.categoryPosts(slug);
  const posts = data.items ?? [];
  const categories = await api.categories();
  const categoryName = categories.find((c) => c.slug === slug)?.name ?? slug;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold uppercase tracking-wider mb-10">
        CATEGORY: {categoryName.toUpperCase()}
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
