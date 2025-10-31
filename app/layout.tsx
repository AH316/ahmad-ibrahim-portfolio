import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Ahmad Ibrahim | Software Developer",
  description: "Software Developer specializing in test automation and full-stack development. Experienced with Python, React, TypeScript, and Azure cloud services.",
  keywords: ["Software Developer", "Test Automation", "Full Stack", "React", "Python", "TypeScript", "Azure"],
  authors: [{ name: "Ahmad Ibrahim" }],
  openGraph: {
    title: "Ahmad Ibrahim | Software Developer",
    description: "Software Developer specializing in test automation and full-stack development",
    type: "website",
  },
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
