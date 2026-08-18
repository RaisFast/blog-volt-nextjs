import Link from "next/link";
import type { PostResponse } from "@raisfast/sdk";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

export function PostCard({ post }: { post: PostResponse }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group block border-3 border-foreground hover:border-primary transition-colors"
    >
      {post.cover_image && (
        <div className="aspect-video overflow-hidden border-b-3 border-foreground group-hover:border-b-primary transition-colors">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-4 flex flex-col gap-2">
        {post.category_name && (
          <span className="text-xs uppercase tracking-wider text-primary font-bold">
            [{post.category_name}]
          </span>
        )}

        <h3 className="text-lg font-bold uppercase leading-tight">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {post.excerpt}
          </p>
        )}

        <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
          {post.author_name} &middot; {formatDate(post.created_at)}
        </div>
      </div>
    </Link>
  );
}
