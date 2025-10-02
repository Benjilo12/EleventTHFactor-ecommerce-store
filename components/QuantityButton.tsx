import { Product } from "@/sanity.types";
import React from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import useCartStore from "@/store";
import { toast } from "sonner";

interface Props {
  product: Product;
  className?: string;
}

export default function QuantityButton({ product, className }: Props) {
  //we get the addItem, getItemCount, RemoveItem from useCartStore
  const { addItem, getItemCount, removeItem } = useCartStore();

  //we get the item count
  const itemCount = getItemCount(product?._id);

  //check if product is out of stock
  const isOutOfStock = product?.stock === 0;

  //function to reduce quanity
  const handleRemoveProduct = () => {
    removeItem(product?._id);
    if (itemCount > 1) {
      toast.success("Quantity Decresed successfully!");
    } else {
      toast.success(`${product?.name?.substring(0, 12)} remove succesfully!`);
    }
  };

  return (
    <div
      className={(cn("flex items-center gap-2 text-base pb-1 h-20"), className)}
    >
      <Button
        onClick={handleRemoveProduct}
        disabled={itemCount === 0 || isOutOfStock}
        variant="outline"
        size="icon"
        className="w-6 h-6 cursor-pointer"
      >
        <Minus />
      </Button>
      <span className="font-semibold w-8 md:text-lg text-center text-black">
        {itemCount}
      </span>
      <Button
        onClick={() => {
          addItem(product);
          toast.success(
            `${product?.name?.substring(0, 12)}... added successfully!`
          );
        }}
        variant="outline"
        size="icon"
        className="w-6 h-6 cursor-pointer"
      >
        <Plus />
      </Button>
    </div>
  );
}
