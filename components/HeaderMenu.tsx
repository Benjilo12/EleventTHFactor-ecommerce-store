"use client";

import { CATEGORIES_QUERYResult } from "@/sanity.types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function HeaderMenu({
  categories,
}: {
  categories: CATEGORIES_QUERYResult;
}) {
  const pathname = usePathname();
  return (
    <div className="hidden md:inline-flex w-1/2 items-center gap-5 text-md capitalize font-semibold">
      <Link
        className={`hover:text-black hoverEffect relative group ${
          pathname === "/" && "text-fuchsia-500"
        }`}
        href={"/"}
      >
        Home
        <span
          className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-black hoverEffect group-hover:w-1/2 group-hover:left-0 ${
            pathname === "/" && "w-1/2"
          }`}
        />
        <span
          className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-black hoverEffect group-hover:w-1/2 group-hover:right-0 ${
            pathname === "/" && "w-1/2"
          }`}
        />
      </Link>
      {categories?.map((category) => (
        <Link
          key={category?._id}
          href={`/category/${category?.slug?.current}`}
          className={`hover:text-black hoverEffect relative group  ${
            pathname === `/category/${category?.slug?.current}` &&
            "text-fuchsia-500"
          }`}
        >
          {category?.title}
          <span
            className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-black hoverEffect group-hover:w-1/2 group-hover:left-0 ${
              pathname === `/category/${category?.slug?.current}` && "w-1/2"
            }`}
          />
          <span
            className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-black hoverEffect group-hover:w-1/2 group-hover:right-0 ${
              pathname === `/category/${category?.slug?.current}` && "w-1/2"
            }`}
          />
        </Link>
      ))}
    </div>
  );
}
