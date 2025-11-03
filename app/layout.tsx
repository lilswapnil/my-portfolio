import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes'
import Navbar from "./components/Navbar/page";
import { AskScottyProvider } from "./context/AskScottyContext";
import { LoadingProvider } from "./context/LoadingContext";
import PageContent from "./components/PageContent";
import AskScottyWrapper from '@/app/components/AskScottyWrapper';
import Footer from "./components/Footer/page";
import "./globals.css";

export const metadata: Metadata = {
  title: "Swapnil's Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LoadingProvider>
            <AskScottyProvider>
              <Navbar />
              <PageContent>{children}</PageContent>
              <AskScottyWrapper />
              <Footer />
            </AskScottyProvider>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
