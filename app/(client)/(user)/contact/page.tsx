// app/(client)/contact/page.tsx
import type { Metadata } from "next";
import Container from "@/components/Container";
import TopBanner from "@/components/TopBanner";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us - EleventhFactor",
  description:
    "We'd love to hear from you. Reach out to EleventhFactor for inquiries, support, or feedback. Get in touch via our contact form.",
  keywords: ["contact", "support", "inquiry", "feedback", "EleventhFactor"],
  openGraph: {
    title: "Contact Us - EleventhFactor",
    description: "Get in touch with EleventhFactor for inquiries and support",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <TopBanner title="Contact Us" />
      <Container className="flex justify-center items-center">
        <ContactForm />
      </Container>
    </>
  );
}
