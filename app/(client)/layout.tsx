import type { Metadata } from "next";

import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import { Toaster } from "sonner";

const raleway = localFont({
  src: "../fonts/Raleway.woff2",
  variable: "--font-raleway",
  weight: "100 900",
});

const siteUrl = "https://www.eleventhfactor.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), // ✅ Required to resolve relative OG/Twitter image URLs
  title: {
    default: "EleventhFactor",
    template: "%s | EleventhFactor",
  },
  description:
    "we all cυт ғroм a dιғғerenт cloтн and тo ѕυrvιve ,don'т wear yoυr нearт on yoυr ѕleeve ",
  keywords: [
    "EleventhFactor",
    "fashion",
    "kaftan",
    "suits",
    "Ghana fashion",
    "urban style",
    "ethical fashion",
    "modern wear",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "EleventhFactor",
    title: "EleventhFactor",
    description:
      "We all cut from a different cloth — to survive, don't wear your heart on your sleeve.",
    images: [
      {
        url: "/opengraph-image.png", // ✅ Now safe to use relative path
        width: 1200,
        height: 630,
        alt: "EleventhFactor Clothing",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${raleway.variable} antialiased`}>
          <Header />
          {children}
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: { background: "#000000", color: "#ffffff" },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
