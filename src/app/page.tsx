import Link from "next/link";
import type { Metadata } from "next";
import { api } from "@/lib/api";
import { PostHero } from "@/components/post-hero";
import { PostCard } from "@/components/post-card";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://raisfast.com";

export const metadata: Metadata = {
  title: "Blog Volt",
  description: "A bold, brutalist blog powered by RaisFast",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Blog Volt",
    description: "A bold, brutalist blog powered by RaisFast",
    url: SITE_URL,
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = Number((await searchParams).page) || 1;
  const data = await api.posts(page, 13);
  const posts = data.items ?? [];
  const totalPages = Math.ceil((data.total ?? 0) / 13);

  if (posts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center text-muted-foreground">
        No posts yet.
      </div>
    );
  }

  const hero = page === 1 ? posts[0] : null;
  const topThree = page === 1 ? posts.slice(1, 4) : posts.slice(0, 3);
  const remaining = page === 1 ? posts.slice(4) : posts.slice(3);

  const buildUrl = (p: number) => `/?page=${p}`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {hero && <PostHero post={hero} />}

      <hr className="border-t-3 border-foreground my-12" />

      {topThree.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {topThree.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {remaining.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {remaining.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 py-8">
          {page > 1 ? (
            <Link
              href={buildUrl(page - 1)}
              className="border-3 border-foreground px-6 py-3 text-sm font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-colors"
            >
              Previous
            </Link>
          ) : (
            <span className="border-3 border-muted-foreground/30 px-6 py-3 text-sm font-bold uppercase tracking-widest text-muted-foreground/30 cursor-not-allowed">
              Previous
            </span>
          )}
          {page < totalPages ? (
            <Link
              href={buildUrl(page + 1)}
              className="border-3 border-foreground px-6 py-3 text-sm font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-colors"
            >
              Next
            </Link>
          ) : (
            <span className="border-3 border-muted-foreground/30 px-6 py-3 text-sm font-bold uppercase tracking-widest text-muted-foreground/30 cursor-not-allowed">
              Next
            </span>
          )}
        </div>
      )}
    </div>
  );
}
