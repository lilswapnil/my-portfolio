import './globals.css';
import Navbar from "./components/Navbar/page";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Navbar />
        {children}</body>
    </html>
  );
}
