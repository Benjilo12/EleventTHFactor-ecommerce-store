"use client";

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ReviewCard from "./ReviewCard";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1224 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1224, min: 764 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export default function ClientReview() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-black">
      <div className="text-center mb-12">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-800 dark:text-white">
          What People Say About Us
        </h1>
      </div>

      <div className="w-[90%] md:w-[85%] mx-auto">
        <Carousel
          showDots={true}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          transitionDuration={700}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          <ReviewCard
            reviewTitle="Great work!"
            username="Dickson Asare"
            userImage="/c1.png"
            reviewText="The craftsmanship on my custom Kaftan was exceptional! Every stitch felt like it had a purpose. I'll definitely be ordering again for special events."
          />
          <ReviewCard
            reviewTitle="Creative and elegant"
            username="Jane Lewis"
            userImage="/c1.png"
            reviewText="Absolutely loved the bespoke coat I ordered. The design was modern yet timeless. You can tell this designer truly understands fashion."
          />
          <ReviewCard
            reviewTitle="Awesome experience!"
            username="David Peters"
            userImage="/c1.png"
            reviewText="From the online shopping experience to the final fit, everything was smooth. The casual set I got is now my go-to weekend outfit. Super comfy!"
          />
          <ReviewCard
            reviewTitle="Stylish and professional"
            username="Amina Yusuf"
            userImage="/c1.png"
            reviewText="I ordered two Kaftans for a wedding and got so many compliments. The fabric, the finish — everything was on point. Highly recommended!"
          />
        </Carousel>
      </div>
    </section>
  );
}
