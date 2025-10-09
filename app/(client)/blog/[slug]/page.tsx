// app/(client)/blog/[slug]/page.tsx

import { getBlogBySlug } from "@/sanity/lib/helpers/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>; // ✅ Fix: params is a Promise
};

// ✅ Fix: Await params
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) return { title: "Not Found" };

  return {
    title: blog.title || "Blog Details",
    description:
      blog.smallDescription || "Fashion blog article from EleventhFactor",
    openGraph: {
      images: blog.titleImage
        ? [urlFor(blog.titleImage).width(1200).height(630).url()]
        : [],
    },
  };
}

// ✅ Fix: Await params in the component
export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) return notFound();

  const blocks = Array.isArray(blog.content) ? blog.content : [];

  const wordCount = blocks.reduce((acc: number, block: any) => {
    if (block._type === "block" && block.children) {
      const text =
        block.children
          ?.map((child: any) =>
            typeof child.text === "string" ? child.text : ""
          )
          .join(" ") || "";
      return acc + text.trim().split(/\s+/).length;
    }
    return acc;
  }, 0);

  const readTime = Math.ceil(wordCount / 200);

  return (
    <>
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-600 mb-2">
          {blog.publishedAt &&
            new Date(blog.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
          • {readTime} min read
        </p>
        <p className="text-lg text-gray-700 mb-6">{blog.smallDescription}</p>
      </div>

      {blog.titleImage?.asset && (
        <div className="relative max-w-5xl mx-auto h-[500px] mt-4">
          <Image
            src={urlFor(blog.titleImage).width(1600).height(800).url()}
            alt="blogImage"
            fill
            className="object-cover rounded-md"
            priority
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 pb-20">
        <div
          className="
            text-gray-700 dark:text-gray-300 
            leading-relaxed text-lg
            [&>p]:mb-6
            [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-6
            [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-4
            [&>ul]:list-disc [&>ul]:mb-6 [&>ul]:pl-6 [&>ul]:space-y-2
            [&>ol]:list-decimal [&>ol]:mb-6 [&>ol]:pl-6 [&>ol]:space-y-2
            [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-6
            [&>a]:text-blue-600 [&>a]:hover:text-blue-800 [&>a]:underline
            [&>strong]:font-bold [&>strong]:text-gray-900 dark:[&>strong]:text-white
            [&>em]:italic
          "
        >
          {blog.content &&
          Array.isArray(blog.content) &&
          blog.content.length > 0 ? (
            <PortableText value={blog.content} />
          ) : (
            <p className="text-gray-500 italic">No content available.</p>
          )}
        </div>
      </div>
    </>
  );
}
