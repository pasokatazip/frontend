import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { MobileScaleLayout } from "@/components/layout/MobileScaleLayout";
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
      <body className="flex min-h-full flex-col font-sans">
        <MobileScaleLayout>{children}</MobileScaleLayout>
        <PwaRegistration />
      </body>
    </html>
  );
}
