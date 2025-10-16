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
  metadataBase: new URL(siteUrl),
  title: {
    default: "EleventhFactor",
    template: "%s | EleventhFactor",
  },
  description:
    "Premium fashion brand offering kaftans, suits, and urban style clothing. Unique designs that celebrate individuality and ethical fashion in Ghana.",
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
  robots: {
    index: true,  // ✅ IMPORTANT: Explicitly allow indexing
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "EleventhFactor",
    title: "EleventhFactor",
    description:
      "Premium fashion brand offering kaftans, suits, and urban style clothing",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "EleventhFactor Clothing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EleventhFactor",
    description: "Premium fashion brand offering kaftans, suits, and urban style clothing",
    images: ["/opengraph-image.png"],
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
