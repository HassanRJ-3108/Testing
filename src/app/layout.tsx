import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "./contexts/CartContext";
import SmoothScrolling from "./SmoothScrolling";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ShopKaro - Your One-Stop E-commerce Destination",
  description: "Discover a wide range of products at ShopKaro. Shop with ease and convenience.",
  keywords: ["ShopKaro", "e-commerce", "online shopping", "products"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Minimal Open Graph tags for link previews */}
        <meta property="og:title" content="ShopKaro - Your One-Stop E-commerce Destination" />
        <meta property="og:description" content="Discover a wide range of products at ShopKaro. Shop with ease and convenience." />
        <meta property="og:image" content="/images/shopkaro.jpg" />
        <meta property="og:url" content="https://shopkaro-hassanrj.vercel.app" />
      </head>
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <Navbar />
          <SmoothScrolling/>
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
