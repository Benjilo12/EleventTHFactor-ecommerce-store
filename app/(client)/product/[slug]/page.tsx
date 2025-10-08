import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import ProductXtics from "@/components/ProductXtics";
import { getProductBySlug } from "@/sanity/lib/helpers/queries";
import {
  BoxIcon,
  FileQuestion,
  ListOrderedIcon,
  Share,
  Phone,
} from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function SingleProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params promise first
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  // Use environment variable for domain or fallback
  const domain = process.env.NEXT_PUBLIC_SITE_URL || "www.eleventhfactor.com";
  const productUrl = `${domain}/product/${slug}`;
  const whatsappMessage = `Hi, I'm interested in the product "${product.name}". Here's the link: ${productUrl}`;
  const whatsappLink = `https://wa.me/233265056031?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <Container className="py-10 flex flex-col md:flex-row gap-10 overflow-hidden">
      {product?.images && <ImageView images={product?.images} />}
      <div className="w-full md:w-1/2 flex flex-col gap-5">
        <div>
          <h2 className="md:text-4xl font-bold mb-2 text-3xl">
            {product?.name}
          </h2>
          <PriceView
            price={product?.price}
            discount={product?.discount}
            className="text-lg font-bold"
          />
        </div>

        {product?.stock && (
          <p className="bg-green-100 w-24 text-center text-green-600 text-sm py-2.5 font-semibold rounded-lg">
            In Stock
          </p>
        )}

        <p className="text-md text-gray-600 tracking-wide">
          {product?.description}
        </p>

        <div className="flex items-center justify-center w-full">
          <AddToCartButton
            product={product}
            className="bg-black/80 md:w-[80%] w-full text-white py-3 rounded-full hover:bg-black hoverEffect"
          />
        </div>

        {/* WhatsApp Button */}
        <Link
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition-colors w-full md:w-[80%] font-semibold"
        >
          <Phone className="w-5 h-5" />
          Chat on WhatsApp
        </Link>

        <ProductXtics product={product} />

        <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 -mt-2">
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect cursor-pointer">
            <BoxIcon className="w-5 h-5" />
            <p>Compare color</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect cursor-pointer">
            <FileQuestion className="w-5 h-5" />
            <p>Ask a question</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect cursor-pointer">
            <ListOrderedIcon className="w-5 h-5" />
            <p>Delivery & return</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect cursor-pointer">
            <Share className="w-5 h-5" />
            <p>Share</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <div className="border border-black/20 text-center p-3 hover:border-black/90 rounded-md hoverEffect transition-colors">
            <p className="text-base font-semibold text-black">Free Delivery</p>
            <p className="text-sm text-gray-500">On orders over 400GHS</p>
          </div>
          <div className="border border-black/20 text-center p-3 hover:border-black/90 rounded-md hoverEffect transition-colors">
            <p className="text-base font-semibold text-black">Pay with Momo</p>
            <p className="text-sm text-gray-500">+233552532423</p>
          </div>
          <div className="border border-black/20 text-center p-3 hover:border-black/90 rounded-md hoverEffect transition-colors">
            <p className="text-base font-semibold text-black">
              Pay with Credit Card
            </p>
            <p className="text-sm text-gray-500">Visa, MasterCard</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
