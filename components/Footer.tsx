"use client";
import React, { useState } from "react"; // Import useState
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { Input } from "./ui/input";
import { categoriesData, quickLinksData } from "@/constant";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // State for newsletter email
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false); // Optional: track submission

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Here you can send 'email' to a backend or service like Mailchimp
    console.log("Newsletter subscribed:", email);

    // Reset or set submission state
    setSubmitted(true);
    setEmail(""); // Clear the input field if needed
  };

  return (
    <footer className="bg-white border-t">
      <Container>
        <FooterTop />
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo>EleventhFactor</Logo>
            <p className="text-gray-600 text-sm">
              We sell only the most exclusive and high quality products for you.
              We are the best so come and shop with us
            </p>
            <SocialMedia
              className="text-black/60"
              iconClassName="border-black/60 hover:border-black hover:text-black"
              tooltipClassName="bg-black text-white"
            />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-black mb-4">Quick Links</h3>
            <div className="flex flex-col gap-3">
              {quickLinksData?.map((item) => (
                <Link
                  key={item?.title}
                  href={item?.href}
                  className="text-gray-600 hover:text-black text-sm font-medium hoverEffect"
                >
                  {item?.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-black mb-4">Categories</h3>
            <div className="flex flex-col gap-3">
              {categoriesData?.map((item) => (
                <Link
                  key={item?.title}
                  href={`/category${item?.href}`}
                  className="text-gray-600 hover:text-black text-sm font-medium hoverEffect"
                >
                  {item?.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-black mb-4">Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to our newsletter to receive updates and exclusive
              offers
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <button
                type="submit"
                className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Subscribe
              </button>

              {submitted && (
                <p className="text-green-600 text-sm">
                  Subscribed successfully!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} EleventhFactor. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6">
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-black text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 hover:text-black text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/faq"
                className="text-gray-500 hover:text-black text-sm transition-colors"
              >
                FAQs
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
