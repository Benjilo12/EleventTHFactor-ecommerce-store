import Container from "@/components/Container";
import TopBanner from "@/components/TopBanner";
import React from "react";

export default function Aboutpage() {
  return (
    <>
      <div>
        <TopBanner title="About us" />
      </div>
      <Container className=" max-w-5xl lg:px-8 py-16 mb-35 md:mb-0">
        <h1 className="text-3xl font-bold mb-6">About ElventhFactor</h1>
        <p className="mb-4 leading-8">
          At EleventTHFactor, we believe that fashion is more than just
          clothing—it&apos;s a powerful form of self-expression. Founded with a
          vision to blend elegance, comfort, and individuality, our brand
          creates distinctive Kaftans, timeless coats, and effortlessly stylish
          casual wear that celebrate confidence and creativity. Each piece we
          craft is a statement—thoughtfully designed and sewn to elevate your
          everyday wardrobe with a touch of refined authenticity.
        </p>
        <p className="mb-4 leading-8">
          <span className="font-bold">Our Story</span>: Born from a passion for
          design and a commitment to craftsmanship, EleventTHFactor was created
          to bring purposeful fashion to people who value quality, detail, and
          identity. Our founder envisioned a space where tradition meets
          modernity—where a Kaftan could be both classic and contemporary, a
          coat both functional and fiercely stylish. We don&apos;t just follow
          trends; we set our own standards.
        </p>
        <p className="mb-4 leading-8">
          What Makes Us Different? Tailored Craftsmanship Every stitch matters.
          Each garment is individually crafted with precision and love.
          Versatile Aesthetic Our designs are made to move with you—from
          laid-back mornings to luxe evenings. Authenticity First We value
          originality, boldness, and the power of understated elegance. More
          Than Just Fashion We&apos;re here to build a community that embraces
          culture, celebrates diversity, and empowers people to wear their
          stories with pride. Whether you&apos;re slipping into one of our
          signature Kaftans or layering up in a standout coat, know that
          you&apos;re not just wearing a piece of clothing—you&apos;re stepping
          into the EleventTHFactor way of life.
        </p>
      </Container>
    </>
  );
}
