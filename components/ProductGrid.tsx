"use client";
import React, { useEffect, useState } from "react";
import HomeTabbar from "./HomeTabbar";
import { productType } from "@/constant";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import ProductCard from "./ProductCard";
import NoProduct from "./NoProduct";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";

export default function ProductGrid() {
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = `*[_type == 'product' && variant ==$variant] | order(name desc)`;
    const params = { variant: selectedTab.toLocaleLowerCase() };

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await client.fetch(query, params);
        setProducts(await response);
      } catch (error) {
        console.log("Product fetching Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedTab]);

  return (
    <div className=" flex-col items-center justify-center">
      <HomeTabbar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
          <div className="flex items-center space-x-2 text-blue-600">
            <Loader2 className=" animate-spin" />
            <span className="text-lg font-semibold">
              Product is loading......
            </span>
          </div>
        </div>
      ) : (
        <>
          {products?.length ? (
            <div className="grid grid-cols md:grid-cols-3 lg:grid-cols-4 gap-8 mt-5 w-full">
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
          ) : (
            <NoProduct
              selectedTab={selectedTab}
              className="flex flex-col justify-center items-center mt-6"
            />
          )}
        </>
      )}
    </div>
  );
}
