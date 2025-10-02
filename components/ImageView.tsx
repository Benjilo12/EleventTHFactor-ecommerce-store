"use client";

import {
  internalGroqTypeReferenceTo,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity.types";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Props {
  images?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
  }>;
}

export default function ImageView({ images = [] }: Props) {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="w-full md:w-1/2 space-y-2 md:space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={active?._key}
          className="w-full max-h-[950px] min-h-[450px] border border-black/10 rounded-md overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={urlFor(active).url()}
            alt="productImage"
            width={700}
            height={700}
            priority
            className="w-full max-h-[850px] min-h-[500px] object-contain group-hover:scale-110 hoverEffect rounded-md"
          />
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-6 gap-2 h-20 md:h-28">
        {images?.map((image) => (
          <button
            onClick={() => setActive(image)}
            key={image?._key || urlFor(image).url()}
            className={`border rounded-md overflow-hidden ${active?._key === image?._key ? "ring-1" : "ring-black/10"}`}
          >
            <Image
              src={urlFor(image).url()}
              alt="productImage"
              width={150}
              height={150}
              className="w-full h-auto object-contain cursor-pointer"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
