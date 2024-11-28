/* eslint-disable @typescript-eslint/no-unused-vars */
import { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { MainLayout } from "@/components/layouts/MainLayout";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 2,
  minimumScale: 1,
  userScalable: true,
  themeColor: "#000033",
};

export const metadata: Metadata = {
  title: "Soul Agents - Next Generation AI Agents",
  description: "Empowering communities with intelligent AI agents",
  keywords:
    "AI, marketing, business development, X marketing, Telegram marketing",
  authors: [{ name: "Soul Team" }],
  openGraph: {
    title: "Soul Agents - AI-Powered Business Development",
    description:
      "Revolutionizing business and project growth with AI-powered marketing",
    type: "website",
    locale: "en_US",
    url: "https://soulagents.io",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soul Agents - AI Agents for building of your community on X",
    description: "Revolutionizing business growth with AI-powered marketing",
    creator: "@soul_agents",
  },
  metadataBase: new URL("https://soulagents.io"),
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/cryptobunny.png",
    apple: "/cryptobunny.png",
    shortcut: "/cryptobunny.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body
        className={`${inter.className} bg-dark-navy min-h-screen antialiased`}
      >
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
