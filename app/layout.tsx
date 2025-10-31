import './globals.css';
import Navbar from "./components/Navbar/page";
import type { Metadata } from "next";
import RootLayoutClient from './RootLayoutClient';

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Portfolio website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <RootLayoutClient>
          <Navbar />
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
