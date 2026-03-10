// ...removed 'use client' to allow metadata export...
import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes'
import Navbar from "./components/Navbar/page";
import { AskScottyProvider } from "./context/AskScottyContext";
import { LoadingProvider } from "./context/LoadingContext";
import PageContent from "./components/PageContent";
import AskScottyWrapper from '@/app/components/AskScottyWrapper';
// import LenisProvider from "./components/LenisProvider";
import Footer from "./components/Footer/page";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scott's Portfolio",
  description: "Full Stack Developer Portfolio",
  keywords: [
    "Swapnil",
    "Scott",
    "Portfolio",
    "Full Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Projects",
    "Software Engineer"
  ],
  authors: [{ name: "Swapnil Bhalerao", url: "https://lilswapnil.me" }],
  creator: "Swapnil Bhalerao",
  openGraph: {
    title: "Swapnil's Portfolio",
    description: "Explore the portfolio of Swapnil, a Full Stack Developer specializing in React, Next.js, and modern web technologies.",
    url: "https://lilswapnil.me",
    siteName: "Swapnil's Portfolio",
    images: [
      {
        url: "https://lilswapnil.me/og-image.png",
        width: 1200,
        height: 630,
        alt: "Swapnil's Portfolio Open Graph Image"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Scott's Portfolio",
    description: "Explore the portfolio of Scott, a Full Stack Developer specializing in React, Next.js, and modern web technologies.",
    creator: "@swapnil_dev",
    images: ["https://lilswapnil.me/og-image.png"]
  },
  metadataBase: new URL("https://lilswapnil.me"),
  alternates: {
    canonical: "/"
  }
  ,
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/logo.svg" as="image" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LoadingProvider>
            <AskScottyProvider>
              {/* <LenisProvider /> Only use LenisProvider on pages without custom scroll logic */}
              <Navbar />
              <PageContent>{children}</PageContent>
                  <Footer />
              <AskScottyWrapper />
            </AskScottyProvider>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
