import Link from "next/link";
import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function TagsPage() {
  const tags = (await api.tags()) ?? [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold uppercase tracking-wider mb-10">
        TAGS
      </h1>

      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <Link
            key={tag.id}
            href={`/tags/${tag.slug}`}
            className="border-3 border-foreground px-4 py-2 text-sm font-bold uppercase tracking-wider hover:border-primary hover:bg-primary/10 transition-colors"
          >
            [{tag.name.toUpperCase()}]
          </Link>
        ))}
      </div>
    </div>
  );
}
