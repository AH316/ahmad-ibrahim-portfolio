import type { Metadata, Viewport } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import { seoMetadata } from "@/lib/content";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Viewport Configuration (Next.js 15+)
 * Separated from metadata export as required by Next.js 15
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1a1a1a",
};

/**
 * Complete SEO & Social Media Metadata
 *
 * Test your metadata with these tools:
 * - Open Graph (Facebook): https://developers.facebook.com/tools/debug/
 * - Twitter Cards: https://cards-dev.twitter.com/validator
 * - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
 */
export const metadata: Metadata = {
  // Metadata Base URL (required for proper OG image URLs)
  metadataBase: new URL(seoMetadata.siteUrl),

  // Basic Metadata
  title: seoMetadata.title,
  description: seoMetadata.description,
  keywords: seoMetadata.keywords,
  authors: [{ name: seoMetadata.author }],
  creator: seoMetadata.author,
  publisher: seoMetadata.author,

  // Icons
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  // Open Graph Metadata (Facebook, LinkedIn, Discord, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: seoMetadata.siteUrl,
    siteName: "Ahmad Ibrahim Portfolio",
    title: seoMetadata.title,
    description: seoMetadata.description,
    images: [
      {
        url: seoMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: "Ahmad Ibrahim - Software Developer & Test Automation Engineer",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter Card Metadata
  twitter: {
    card: "summary_large_image",
    title: seoMetadata.title,
    description: seoMetadata.description,
    images: [seoMetadata.ogImage],
    creator: "@ahmadibrahim316", // Optional: Update if you have a Twitter handle
  },

  // Additional Metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (uncomment when you have verification codes)
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body
        className={`${cinzel.variable} ${inter.variable} font-inter antialiased bg-gondor-dark text-gondor-silver overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
