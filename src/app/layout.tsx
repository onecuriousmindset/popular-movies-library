import type { Metadata } from "next";

import "./globals.css";
import Navbar from "./_components/Navbar";
import { Albert_Sans } from "next/font/google";

export const metadata: Metadata = {
   title: "Popular Movies Library",
   description: "A simple movie library app built with Next.js",
};

const albertSans = Albert_Sans({
   subsets: ["latin"],
   variable: "--font-albertSans",
});

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={`${albertSans.className} antialiased `}>
            <Navbar />
            {children}
         </body>
      </html>
   );
}
