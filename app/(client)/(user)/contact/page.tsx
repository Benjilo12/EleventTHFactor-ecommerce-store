import Container from "@/components/Container";
import TopBanner from "@/components/TopBanner";
import { Input } from "@/components/ui/input";

import React from "react";

export default function Contactpage() {
  return (
    <>
      <TopBanner title="Contact Us" />
      <Container className="max-w-3xl px-4 sm:px-6 lg:px-8 py-12 h-[80vh]">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p>
          We&apos;d love to hear from you. Please fill out the form below and
          we&apos;ll get back to you soon as possible
        </p>
        <form className="space-y-4">
          <div className="space-y-0.5">
            <label htmlFor="name">Name</label>
            <Input
              type="text"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="space-y-0.5">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="space-y-0.5">
            <label htmlFor="email">Message</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              cols={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
              required
            />
            <button
              type="submit"
              className="bg-black/80 text-white px-6 p-3 mt-3 rounded-md text-sm font-semibold hover:bg-black cursor-pointer hoverEffect"
            >
              Send Message
            </button>
          </div>
        </form>
      </Container>
    </>
  );
}
