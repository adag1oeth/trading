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
  title: "Soul Agents Chat - AI Trading Assistant",
  description:
    "Advanced AI trading assistant powered by GIGABRAIN technology. Get real-time market insights, trading signals and A.I. Agent trading execution, powered by Brian AI.",
  keywords:
    "AI trading, crypto trading, trading signals, Soul Agents, GIGABRAIN, Brian AI, trading assistant, market analysis, crypto AI, automated trading",
  openGraph: {
    title: "Soul Agents Chat - AI Trading Assistant",
    description:
      "Advanced AI trading assistant powered by GIGABRAIN technology. Experience real-time market insights, precise trading signals, and intelligent trade execution through our cutting-edge Brian AI system.",
    url: "https://chat.soulagents.io",
    siteName: "Soul Agents Chat",
    images: [
      {
        url: "/Soul-Agents.png",
        width: 800,
        height: 600,
        alt: "Soul Agents Chat - AI Trading Assistant",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soul Agents Chat - AI Trading Assistant",
    description:
      "Advanced AI trading assistant powered by GIGABRAIN technology. Get real-time market insights and AI-powered trading execution.",
    images: ["/Soul-Agents.png"],
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  robots: "index, follow",
  themeColor: "#000033",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <head>
        <link rel="icon" type="image/png" href="/Soul-Agents.png" />
      </head>
      <body
        className={`${inter.className} bg-dark-navy min-h-screen antialiased`}
      >
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
