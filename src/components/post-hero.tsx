import Link from "next/link";
import type { PostResponse } from "@raisfast/sdk";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

export function PostHero({ post }: { post: PostResponse }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group block border-3 border-foreground hover:border-primary transition-colors"
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-center md:border-r-3 md:border-foreground group-hover:md:border-primary transition-colors">
          {post.category_name && (
            <span className="text-xs uppercase tracking-wider text-primary font-bold mb-3">
              [{post.category_name}]
            </span>
          )}

          <h2 className="text-4xl font-bold uppercase leading-tight mb-4">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {post.excerpt}
            </p>
          )}

          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            {post.author_name} {"//"} {formatDate(post.created_at)}
          </div>
        </div>

        <div className="md:w-3/5 min-h-64 md:min-h-0">
          {post.cover_image ? (
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-64 md:h-full object-cover"
            />
          ) : (
            <div className="w-full h-64 md:h-full bg-gradient-to-br from-primary/20 via-muted to-primary/10 flex items-center justify-center">
              <span className="text-6xl font-bold uppercase text-foreground/10 select-none">
                VOLT
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
