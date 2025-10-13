"use client";

import { CATEGORIES_QUERYResult, Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { client } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "./ProductCard";
import NoProduct from "./NoProduct";

interface Props {
  categories: CATEGORIES_QUERYResult;
  slug: string;
}

const PRODUCTS_PER_PAGE = 12;

export default function CategoryProduct({ categories, slug }: Props) {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchProducts = async (categorySlug: string, page: number) => {
    try {
      setLoading(true);
      const start = (page - 1) * PRODUCTS_PER_PAGE;

      const query = `
        *[_type == 'product' && references(*[_type == 'category' && slug.current == $categorySlug][0]._id)]
        | order(name asc)
        [$start...$end]
      `;
      const data = await client.fetch(query, {
        categorySlug,
        start,
        end: start + PRODUCTS_PER_PAGE,
      });
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1); // Reset to first page when slug changes
  }, [currentSlug]);

  useEffect(() => {
    fetchProducts(currentSlug, page);
  }, [currentSlug, page]);

  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5">
      {/* Sidebar Categories */}
      <div className="flex flex-col md:min-w-40 border">
        {categories?.map((item) => (
          <Button
            key={item?._id}
            onClick={() => setCurrentSlug(item?.slug?.current as string)}
            className={`bg-transparent border-0 rounded-none text-black cursor-pointer shadow-none hover:bg-black/80 hover:text-white font-semibold hoverEffect border-b last:border-b-0 ${
              item?.slug?.current === currentSlug &&
              "bg-black text-white border-black"
            }`}
          >
            {item?.title}
          </Button>
        ))}
      </div>

      {/* Product Listing */}
      <div className="flex-1 w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
            <div className="flex items-center space-x-2 text-blue-700">
              <Loader2 className="animate-spin" />
              <span className="text-lg font-semibold">
                Product is loading......
              </span>
            </div>
          </div>
        ) : products.length ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
              {products.map((product: Product) => (
                <AnimatePresence key={product?._id}>
                  <motion.div
                    layout
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                </AnimatePresence>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-8">
              <Button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="cursor-pointer"
              >
                Previous
              </Button>
              <span className="font-semibold text-gray-700">Page {page}</span>
              <Button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={products.length < PRODUCTS_PER_PAGE}
                className="cursor-pointer"
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          <NoProduct selectedTab={currentSlug} className="mt-0 w-full" />
        )}
      </div>
    </div>
  );
}
