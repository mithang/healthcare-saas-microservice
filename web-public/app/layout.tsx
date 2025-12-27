import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/store/CartContext";
import { ApolloProvider } from "@/lib/apollo-client";
import { AuthProvider } from "@/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Healthcare Management System",
  description: "Comprehensive healthcare management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloProvider>
          <AuthProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </AuthProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
