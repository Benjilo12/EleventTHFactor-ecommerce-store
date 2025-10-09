// app/(client)/category/[slug]/page.tsx

import CategoryProduct from "@/components/CategoryProduct";
import Container from "@/components/Container";
import Title from "@/components/Title";
import TopBanner from "@/components/TopBanner";
import { getAllCategories } from "@/sanity/lib/helpers/queries";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

// ✅ Dynamic metadata generation - AWAIT params
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // Await params first
  const formattedSlug = slug.replace(/-/g, " ");
  const capitalizedCategory =
    formattedSlug.charAt(0).toUpperCase() + formattedSlug.slice(1);

  return {
    title: `${capitalizedCategory} - Categories `,
    description: `Browse products in the ${capitalizedCategory} category at EleventhFactor. Discover the latest trends and styles.`,
    openGraph: {
      title: `${capitalizedCategory} - EleventhFactor`,
      description: `Browse ${capitalizedCategory} products at EleventhFactor.`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const categories = await getAllCategories();

  return (
    <>
      <TopBanner title="Categories" />
      <Container className="py-15">
        <Title className="text-xl font-bold">
          Products by Category{" "}
          <span className="font-bold text-green-600 capitalize tracking-wide">
            {slug.replace(/-/g, " ")}
          </span>
        </Title>
        <CategoryProduct categories={categories} slug={slug} />
      </Container>
    </>
  );
}
