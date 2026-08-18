import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AppScaleLayout } from "@/components/layout/AppScaleLayout";
import { PwaRegistration } from "@/components/PwaRegistration";
import "./globals.css";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ぺっとよーよー",
  },
  description: "つぶやきを聞いて成長するペット",
  icons: {
    apple: "/pwa/apple-touch-icon.png",
    icon: "/pwa/icon-192.png",
  },
  title: "ぺっとよーよー",
};

export const viewport: Viewport = {
  initialScale: 1,
  themeColor: "#D2ECFF",
  viewportFit: "cover",
  width: "device-width",
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
      <body className="min-h-full flex flex-col font-sans">
        <AppScaleLayout>{children}</AppScaleLayout>
        <PwaRegistration />
      </body>
    </html>
  );
}
