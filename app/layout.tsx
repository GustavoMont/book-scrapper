import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Layout/Footer";
import { Header } from "@/components/Layout/Header";
import Head from "next/head";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "BookScrapper",
  description: "Um dos scrappers já feitos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${poppins.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="px-8 py-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
