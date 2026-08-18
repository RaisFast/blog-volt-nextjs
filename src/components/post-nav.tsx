import Link from "next/link";
import type { PostResponse } from "@raisfast/sdk";

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  return text.slice(0, max) + "...";
}

export function PostNav({ prev, next }: { prev: PostResponse | null; next: PostResponse | null }) {
  if (!prev && !next) return null;

  return (
    <div className="flex border-3 border-foreground">
      {prev ? (
        <Link
          href={`/posts/${prev.slug}`}
          className="flex-1 p-4 hover:bg-primary/10 hover:border-primary transition-colors uppercase text-sm border-r-3 border-foreground [&:only-child]:border-r-0 [&:only-child]:w-full"
        >
          <div className="text-xs text-muted-foreground mb-1 font-bold">
            &larr; PREV
          </div>
          <div className="font-bold truncate">
            {truncate(prev.title, 40)}
          </div>
        </Link>
      ) : (
        <div className="flex-1 p-4 opacity-30" />
      )}

      {prev && next && (
        <div className="border-r-3 border-foreground" />
      )}

      {next ? (
        <Link
          href={`/posts/${next.slug}`}
          className="flex-1 p-4 text-right hover:bg-primary/10 hover:border-primary transition-colors uppercase text-sm [&:only-child]:w-full"
        >
          <div className="text-xs text-muted-foreground mb-1 font-bold">
            NEXT &rarr;
          </div>
          <div className="font-bold truncate">
            {truncate(next.title, 40)}
          </div>
        </Link>
      ) : (
        <div className="flex-1 p-4 opacity-30" />
      )}
    </div>
  );
}
