# VOLT — RaisFast Blog Template

A brutalist blog template for [RaisFast](https://raisfast.com) — the Rust-powered BaaS & headless CMS. Bold uppercase type, thick borders, high contrast, dark mode, built with Next.js 16 + Tailwind CSS.

![RaisFast](public/logo.png)

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4
- **Content**: RaisFast CMS via [`@raisfast/sdk`](https://www.npmjs.com/package/@raisfast/sdk)
- **Markdown**: marked
- **Package manager**: [bun](https://bun.sh)

## Features

- Home / posts / categories / tags / about / search pages
- Hero post with cover-image gradient fallback
- SEO ready: metadata, Open Graph, JSON-LD, `sitemap.xml`, `robots.txt`, `feed.xml`
- Dark mode (follows system preference, persisted)
- Responsive design

## Getting Started

1. Clone the repo:

```bash
git clone https://github.com/RaisFast/blog-volt-nextjs.git
cd blog-volt-nextjs
```

2. Start your RaisFast server (default `http://localhost:9898`), or use any RaisFast instance. See the [RaisFast docs](https://github.com/RaisFast/raisfast) to get one running.

3. Copy `.env.example` to `.env.local` and point it at your server (see [Configuration](#configuration)).

4. Install and run:

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

5. Seed blog content (posts, categories, tags) from the RaisFast admin panel.


## Configuration

Copy `.env.example` to `.env.local` and adjust:

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | RaisFast API base URL | `http://localhost:9898/api/v1` |
| `NEXT_PUBLIC_SITE_URL` | Site URL for SEO (canonical, OG, sitemap) | `https://raisfast.com` |
| `NEXT_PUBLIC_GITHUB_URL` | GitHub link in header/footer | `https://github.com/raisfast/raisfast` |

## Deploy on Vercel

Import the repo on [Vercel](https://vercel.com/new), set the environment variables above, and deploy. `NEXT_PUBLIC_*` variables are inlined at build time — redeploy after changing them.

## Related

- [RaisFast](https://github.com/RaisFast/raisfast) — the backend
- [blog-foundry-nextjs](https://github.com/RaisFast/blog-foundry-nextjs) / [blog-kanso-nextjs](https://github.com/RaisFast/blog-kanso-nextjs) — other blog templates
- [ecommerce-forge-nextjs](https://github.com/RaisFast/ecommerce-forge-nextjs) — ecommerce template
