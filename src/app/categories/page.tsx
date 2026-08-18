import Link from "next/link";
import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = (await api.categories()) ?? [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold uppercase tracking-wider mb-10">
        CATEGORIES
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="border-3 border-foreground p-6 hover:border-primary transition-colors block"
          >
            <h2 className="text-lg font-bold uppercase tracking-wider mb-2">
              {cat.name.toUpperCase()}
            </h2>
            {cat.description && (
              <p className="text-sm text-muted-foreground">{cat.description}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
