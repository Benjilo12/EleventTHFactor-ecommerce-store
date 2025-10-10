"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function ProductShowcase() {
  return (
    <section className="py-16 bg-white dark:bg-black">
      <motion.div
        initial={{ opacity: 0, y: 50 }} // Start hidden and below
        whileInView={{ opacity: 1, y: 0 }} // Animate to visible and original position
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-[90%] md:w-[85%] mx-auto grid md:grid-cols-2 gap-10 items-center"
      >
        {/* Left Text Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
            Explore EleventhFactor
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-8">
            Step into a world where contemporary fashion meets timeless
            elegance. At EleventTHFactor, every piece is crafted with precision,
            celebrating the art of style through premium kaftans, coats, and
            everyday wear. Discover curated collections designed for the bold
            and fashion-forward.
          </p>
        </div>

        {/* Right Image Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Top Left Text Box */}
          <div className="bg-gray-100 dark:bg-gray-800 flex flex-col justify-center items-center p-6 text-center">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Suit
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Latest Collection
            </p>
          </div>

          {/* Top Right Image */}
          <div className="aspect-square relative">
            <Image
              src="/Coats10.jpeg" // Replace with actual image in /public
              alt="Fashion Accessories"
              fill
              className="object-cover rounded"
            />
          </div>

          {/* Bottom Left Image */}
          <div className="aspect-square relative">
            <Image
              src="/Kaftan6.jpeg" // Replace with actual image in /public
              alt="Model with Bag"
              fill
              className="object-cover rounded"
            />
          </div>

          {/* Bottom Right Text Box */}
          <div className="bg-gray-100 dark:bg-gray-800 flex flex-col justify-center items-center p-6 text-center">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Different Types
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Over 40+ Designs
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
