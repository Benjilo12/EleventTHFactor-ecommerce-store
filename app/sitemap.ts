// app/sitemap.ts
import { MetadataRoute } from "next";
import { getAllProducts } from "@/sanity/lib/helpers/queries";
import { getAllBlogs } from "@/sanity/lib/helpers/queries";
import { getAllCategories } from "@/sanity/lib/helpers/queries";

const baseUrl = "https://www.eleventhfactor.com";

// Updated interfaces based on your actual data structure
interface Product {
  _id: string;
  name: string;
  slug: string | null; // ✅ Changed from { current: string } to string | null
  _updatedAt: string;
  _createdAt: string;
}

interface Blog {
  _id: string;
  title: string;
  slug: { current: string }; // This one is still an object
  _updatedAt?: string;
  publishedAt?: string;
}

interface Category {
  _id: string;
  title: string;
  slug: { current: string }; // This one is still an object
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Fetch dynamic data from Sanity
    const [products, blogs, categories] = await Promise.all([
      getAllProducts(),
      getAllBlogs(),
      getAllCategories(),
    ]);

    // Static routes
    const staticRoutes: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/cart`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: "yearly" as const,
        priority: 0.5,
      },
      {
        url: `${baseUrl}/faq`,
        lastModified: new Date(),
        changeFrequency: "yearly" as const,
        priority: 0.5,
      },
    ];

    // Product routes - filter out products without slugs
    const productRoutes: MetadataRoute.Sitemap =
      (products as Product[])
        ?.filter((product) => product.slug && product.slug !== "undefined") // Filter valid slugs
        ?.map((product) => ({
          url: `${baseUrl}/product/${product.slug}`, // ✅ Directly use product.slug (it's already a string)
          lastModified: product._updatedAt
            ? new Date(product._updatedAt)
            : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        })) || [];

    // Blog routes
    const blogRoutes: MetadataRoute.Sitemap =
      (blogs as Blog[])
        ?.filter((blog) => blog.slug?.current) // Filter out blogs without slugs
        ?.map((blog) => ({
          url: `${baseUrl}/blog/${blog.slug.current}`,
          lastModified: blog._updatedAt
            ? new Date(blog._updatedAt)
            : new Date(blog.publishedAt || new Date()),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })) || [];

    // Category routes
    const categoryRoutes: MetadataRoute.Sitemap =
      (categories as Category[])
        ?.filter((category) => category.slug?.current) // Filter out categories without slugs
        ?.map((category) => ({
          url: `${baseUrl}/category/${category.slug.current}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })) || [];

    return [
      ...staticRoutes,
      ...productRoutes,
      ...blogRoutes,
      ...categoryRoutes,
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return at least static routes if dynamic data fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 1,
      },
    ];
  }
}
