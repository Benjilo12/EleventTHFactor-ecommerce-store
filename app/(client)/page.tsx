import Banner from "@/components/banner";
import { getAllBlogs } from "@/sanity/lib/helpers/queries";
import BlogCarousel from "@/components/BlogCarousel";
import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/ProductGrid";
import ClientRewiew from "@/components/review/ClientReview";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ProductShowcase from "@/components/ProductShowcase";

export default async function Home() {
  const blogs = await getAllBlogs();
  return (
    <div>
      <Container className="py-10 mx-auto">
        <HomeBanner />
        <ProductGrid />
        <Banner />
        <ProductShowcase />
        <ClientRewiew />
        <WhatsAppWidget />
        <BlogCarousel blogs={blogs} />
      </Container>
    </div>
  );
}
