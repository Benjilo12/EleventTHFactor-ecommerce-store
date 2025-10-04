"use client";

import React from "react";

import Title from "./Title";
import Image from "next/image";
import Coates2 from "./Images/Coates2.jpeg";
import Kaftan1 from "./Images/Kaftan1.jpeg";
import { motion } from "framer-motion";

export default function HomeBanner() {
  return (
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
      <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8 mt-6">
        <div className="mb-8 flex  flex-wrap justify-between md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.47, 0, 0.745, 0.715] }}
            viewport={{ once: true, margin: "-300px 0px" }}
            className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48"
          >
            <Title className="mb-4 text-4xl font-bold text-black sm:text-4xl md:mb-8 md:text-5xl">
              Top Fashion for a top price!
            </Title>
            <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg italic">
              We sell only the most exclusive and high quality products for you.
              We are the best so come and shop with us
            </p>
          </motion.div>

          <motion.div
            className="mb-12 flex w-full md:mb-16 lg:w-2/3 "
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-2xl md:left-16 md:top-16 lg:ml-0">
              <Image
                src={Coates2}
                alt="picture"
                className="h-full w-full object-cover object-center"
                priority
                placeholder="blur"
                width={500}
                height={500}
              />
            </div>
            <div className="overflow-hidden rounded-lg bg-gray-100 shadow-2xl">
              <Image
                src={Kaftan1}
                alt="Photo"
                className="h-full w-full object-cover object-center "
                priority
                placeholder="blur"
                width={500}
                height={500}
              />
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Title className="text-3xl md:text-3xl uppercase font-bold text-center mt-30 flex justify-center items-center">
            Best Clothing Collection
          </Title>
          <p className="text-sm flex justify-center items-center text-gray-600 font-medium  text-center mt-3 max-w-6xl">
            Find everything you need to look and feel your best, and shop the
            latest mens&apos;s fashion and lifestyle products
          </p>
        </motion.div>
      </section>
    </div>
  );
}
