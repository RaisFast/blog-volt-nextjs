import { api } from "@/lib/api"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://raisfast.com"

export async function GET() {
  const data = await api.posts(1, 20)
  const items = data.items.map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/posts/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/posts/${post.slug}</guid>
      <description><![CDATA[${post.excerpt || post.title}]]></description>
      <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
      ${post.author_name ? `<author>${post.author_name}</author>` : ""}
      ${post.cover_image ? `<enclosure url="${post.cover_image}" type="image/jpeg" />` : ""}
    </item>`).join("")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog Volt</title>
    <link>${SITE_URL}</link>
    <description>A bold, modern blog powered by RaisFast</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  })
}
