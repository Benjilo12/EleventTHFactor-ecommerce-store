import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group text-sm rounded-lg overflow-hidden mt-6">
      {/* ✅ Image Wrapper */}
      <div className="bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 overflow-hidden relative">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product.images[0]).url()}
              width={500}
              height={500}
              alt={product?.name || "Product"}
              priority
              className={`w-full h-100 object-contain transition-transform duration-300 ${
                product?.stock === 0 ? "opacity-80" : "group-hover:scale-105"
              }`}
            />

            {/* ✅ Hover Overlay (only if in stock) */}
            {product?.stock !== 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-semibold">
                  Click to View
                </span>
              </div>
            )}
          </Link>
        )}

        {/* ❌ Out of Stock Overlay */}
        {product?.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <p className="text-base text-white font-semibold">Out of Stock</p>
          </div>
        )}
      </div>

      {/* ✅ Product Details */}
      <div className="py-3 px-2 flex flex-col gap-1.5 bg-zinc-50 border border-t-0 rounded-lg rounded-tl-none rounded-tr-none">
        <h2 className="font-semibold line-clamp-1">{product?.name}</h2>
        <p className="line-clamp-1">{product?.intro}</p>
        <PriceView
          className="text-lg"
          price={product?.price}
          discount={product?.discount}
        />
        <AddToCartButton
          product={product}
          className="w-full bg-transparent text-black shadow-none border-black/30 font-semibold tracking-wide hover:text-white hover:bg-black cursor-pointer p-2 rounded-md"
        />
      </div>
    </div>
  );
}
