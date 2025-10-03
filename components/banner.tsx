// components/Banner.tsx

"use client";

import { motion } from "motion/react"
import Link from "next/link";
import Container from "@/components/Container";

export default function Banner() {
  return (
    <div className="relative mt-20 h-[40vh] md:h-[70vh] bg-[#4b2e2e] overflow-hidden rounded-2xl">
      {/* Video background - hidden on mobile */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 md:w-[472] h-full object-cover hidden md:block"
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to darken video */}
      <div className="absolute inset-0 bg-[#4b2e2e]/80 z-10"></div>

      {/* Centered content */}
      <Container className="relative z-20 h-full flex flex-col md:ml-100 items-center justify-center text-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Classic Collection 2025
        </h1>

        <Link href="/category/men">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-6 py-3 bg-white text-[#4b2e2e] font-semibold rounded-full shadow-lg transition-all duration-300 cursor-pointer"
          >
            View More Collection
          </motion.button>
        </Link>
      </Container>
    </div>
  );
}
