import type { Metadata } from "next";

import "./globals.css";
import Navbar from "./components/Navbar";
import { Albert_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "Movie Test",
  description: "A movie test",
};

const albertSans = Albert_Sans({ subsets: ["latin"], variable: "--font-albertSans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${albertSans.className} antialiased `}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
