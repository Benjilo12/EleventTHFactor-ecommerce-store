"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Loader2, SearchIcon, X } from "lucide-react";
import { Input } from "./ui/input";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceView from "./PriceView";

export default function SearchBar() {
  const [Search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const fetchProducts = useCallback(async () => {
    if (!Search) {
      setProducts([]);
      return;
    }
    setLoading(true);
    try {
      const query = `*[_type == "product" && name match $search] | order(name desc)`;
      const params = { search: `${Search}*` };
      const response = await client.fetch(query, params);
      setProducts(response);
    } catch (error) {
      console.error("Error Fetching Products:", error);
    } finally {
      setLoading(false);
    }
  }, [Search]);

  useEffect(() => {
    {
      const debounceTimer = setTimeout(() => {
        fetchProducts();
      }, 300);
      return () => clearTimeout(debounceTimer);
    }
  }, [Search, fetchProducts]);
  return (
    <Dialog open={showSearch} onOpenChange={() => setShowSearch(!showSearch)}>
      <DialogTrigger onClick={() => setShowSearch(!showSearch)} asChild>
        <SearchIcon className="w-5 h-5 hover:text-black hoverEffect" />
      </DialogTrigger>
      <DialogContent className="w-[95vw] sm:w-[80vw] md:max-w-3xl min-h-[80vh] max-h-[90vh] flex flex-col overflow-hidden rounded-md sm:rounded-lg">
        <DialogHeader>
          <DialogTitle className="mb-1">Product Searchbar</DialogTitle>
          <form className="relative" onSubmit={(e) => e.preventDefault()}>
            <Input
              placeholder="Search your product here..."
              className="flex- rounded-md py-5"
              value={Search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {Search && (
              <X
                onClick={() => setSearch("")}
                className="w-4 h-4 absolute top-3 right-11 hover:text-red-600 hoverEffect"
              />
            )}
            <button
              type="submit"
              className={`absolute right-0 top-0  w-10 h-full flex items-center justify-center rounded-tr-md rounded-br-md hover:bg-black hover:text-white hoverEffect ${Search ? "bg-black text-white" : "bg-black/10"}`}
            >
              <SearchIcon className="w-5 h-5" />
            </button>
          </form>
        </DialogHeader>
        <div className="w-full h-full overflow-y-scroll border-black/20 rounded-md">
          <div>
            {loading ? (
              <p className="flex items-center px-6 py-10 gap-1 text-center text-yellow-500 font-semibold">
                <Loader2 className="w-5 h-5 animate-spin" />
                Searching on progress...
              </p>
            ) : products.length ? (
              products?.map((product: Product) => (
                <div
                  key={product?._id}
                  className="bg-white overflow-hidden border-b last:border-b-0"
                >
                  <div className="flex items-center p-1">
                    <Link
                      href={`/product/${product?.slug?.current}`}
                      className="h-15 w-25 md:h-24 md:w-24 flex-shrink-0 border border-black/2 rounded-md overflow-hidden group"
                      onClick={() => setShowSearch(false)}
                    >
                      {product?.images && (
                        <Image
                          width={200}
                          height={200}
                          src={urlFor(product?.images[0]).url()}
                          alt="productImage"
                          className="object-cover w-full h-full group-hover:scale hoverEffect"
                        />
                      )}
                    </Link>
                    <div className="px-4 py-2 flex-grow">
                      <Link
                        href={`/product/${product?.slug?.current}`}
                        onClick={() => setShowSearch(false)}
                      >
                        <h3 className="text-xs md:text-lg font-semibold text-gray-800 ">
                          {product?.name}
                        </h3>
                      </Link>
                      <PriceView
                        price={product?.price}
                        discount={product?.discount}
                        className="text-xs md:text-lg"
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 font-semibold tracking-wide">
                {Search && !loading ? (
                  <p>
                    Nothing match with the{" "}
                    <span className="underline text-red-600">{Search}</span>.
                    Please try something else
                  </p>
                ) : (
                  <p className="text-green-600 flex items=center justify-center gap-1">
                    <SearchIcon className="w-5 h-5" />
                    Search and explore your products from EleventTHFactor
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
