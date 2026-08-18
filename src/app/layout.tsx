import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://raisfast.com";

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VOLT",
    template: "%s — VOLT",
  },
  description: "A bold, brutalist blog powered by RaisFast",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Blog Volt",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="canonical" href={SITE_URL} />
      </head>
      <body className="min-h-full flex flex-col font-mono">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
