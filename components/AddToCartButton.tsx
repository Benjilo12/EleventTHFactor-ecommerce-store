"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import QuantityButton from "./QuantityButton";
import { motion } from "framer-motion";
import PriceFormatter from "./PriceFormatter";
import useCartStore from "@/store";
import { toast } from "sonner";
interface Props {
  product: Product;
  className?: string;
}

export default function AddToCartButton({ product, className }: Props) {
  //we get the additem & hetItem... from cartStore
  const { addItem, getItemCount } = useCartStore();
  //we pass in the id into the item Store
  const itemCount = getItemCount(product?._id);

  const isOutOfStock = product?.stock === 0;

  return (
    <div className="w-full h-12 flex items-center">
      {itemCount ? (
        <div className="w-full text-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Quantity</span>

            <QuantityButton product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product?.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <motion.button
          onClick={() => {
            addItem(product);
            toast.success(
              `${product?.name?.substring(0, 12)}... added successfully!`
            );
          }}
          disabled={isOutOfStock}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={
            (cn(
              "w-full bg-transparent text-black shadow-none border-black/30 font-semibold tracking-wide hover:text-white hover:bg-black cursor-pointer "
            ),
            className)
          }
        >
          Add To Cart
        </motion.button>
      )}
    </div>
  );
}
