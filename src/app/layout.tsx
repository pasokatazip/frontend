import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Frontend Template",
  description: "Next.js, Pixi.js, Tailwind CSS, Storybook, and oxlint setup",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      translate="no"
      className={`${inter.variable} h-full antialiased notranslate`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
