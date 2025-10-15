// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/studio/", "/_next/"],
    },
    sitemap: "https://www.eleventhfactor.com/sitemap.xml",
  };
}
