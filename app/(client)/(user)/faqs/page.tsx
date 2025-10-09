// app/(client)/faq/page.tsx
import type { Metadata } from "next";
import Container from "@/components/Container";
import TopBanner from "@/components/TopBanner";
import FaqClient from "@/components/FaqClient";

export const metadata: Metadata = {
  title: "FAQs - EleventhFactor",
  description:
    "Find answers to common questions about EleventhFactor, our products, shipping, returns, payments, and customer support.",
  keywords: [
    "FAQ",
    "frequently asked questions",
    "help",
    "support",
    "shipping",
    "returns",
    "payments",
    "EleventhFactor",
  ],
  openGraph: {
    title: "FAQs - EleventhFactor",
    description:
      "Find answers to common questions about EleventhFactor products and services",
    type: "website",
  },
};

export default function Faqspage() {
  return (
    <>
      <TopBanner title="FAQ" />
      <Container className="flex justify-center items-center">
        <FaqClient />
      </Container>
    </>
  );
}
