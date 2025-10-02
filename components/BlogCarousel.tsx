// components/BlogCarousel.tsx
"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { BLOGS_QUERYResult } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
};

type Props = {
  blogs: BLOGS_QUERYResult;
};

const BlogCarousel: React.FC<Props> = ({ blogs }) => {
  return (
    <div className="py-10 px-4 md:px-10">
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Latest Blog Posts
      </h2>
      <Carousel
        responsive={responsive}
        infinite
        itemClass="px-3" // ⬅️ adds spacing between items
        containerClass="-mx-3" // ⬅️ balances the padding
      >
        {blogs.map((blog) => {
          const imgUrl = blog.titleImage?.asset
            ? urlFor(blog.titleImage).width(600).height(300).url()
            : "/placeholder.jpg";

          return (
            <Link key={blog._id} href={`/blog/${blog.slug?.current || "#"}`}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <div className="relative w-full h-52">
                  <Image
                    src={imgUrl}
                    alt={blog.titleImage?.alt || blog.title || "Blog image"}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 duration-300"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 hover:underline underline-offset-2 hover:text-blue-500">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {blog.smallDescription?.slice(0, 100)}...
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 mt-4">
                    {blog.publishedAt &&
                      new Date(blog.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </Carousel>
    </div>
  );
};

export default BlogCarousel;
