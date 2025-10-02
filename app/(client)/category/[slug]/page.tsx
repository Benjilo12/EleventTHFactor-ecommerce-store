import CategoryProduct from "@/components/CategoryProduct";
import Container from "@/components/Container";
import Title from "@/components/Title";
import TopBanner from "@/components/TopBanner";
import { getAllCategories } from "@/sanity/lib/helpers/queries";
import React from "react";

export default async function Categorypage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categories = await getAllCategories();
  return (
    <>
      <TopBanner title="Category" />
      <Container className="py-15 ">
        <Title className="text-xl font-bold">
          Products by Category{" "}
          <span className="font-bold text-green-600 capitalize tracking-wide">
            {slug && slug}
          </span>
        </Title>
        <CategoryProduct categories={categories} slug={slug} />
      </Container>
    </>
  );
}
