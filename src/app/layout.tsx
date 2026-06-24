import type { Metadata, Viewport } from "next";
import "./globals.css";

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
    <html lang="ja" translate="no" className="h-full antialiased notranslate">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
