import { api } from "@/lib/api";
import { PostCard } from "@/components/post-card";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q ?? "";
  const data = query ? await api.search(query) : { items: [], total: 0, page: 1, page_size: 12 };
  const posts = data.items ?? [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold uppercase tracking-wider mb-10">
        SEARCH
      </h1>

      <form action="/search" method="GET" className="mb-10">
        <div className="flex gap-2">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="SEARCH..."
            className="flex-1 border-3 border-foreground bg-transparent px-4 py-3 text-sm uppercase tracking-wider placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
          />
          <button
            type="submit"
            className="border-3 border-foreground px-6 py-3 text-sm font-bold uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
          >
            GO
          </button>
        </div>
      </form>

      {query && (
        <p className="text-sm text-muted-foreground uppercase tracking-wider mb-6">
          RESULTS FOR &ldquo;{query.toUpperCase()}&rdquo; &mdash;{" "}
          {data.total} FOUND
        </p>
      )}

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        query && (
          <p className="text-muted-foreground uppercase text-sm">
            NO RESULTS FOUND
          </p>
        )
      )}
    </div>
  );
}
