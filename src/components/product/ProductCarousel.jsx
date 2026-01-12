"use client";

import { useRef, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export default function ProductCarousel({ product }) {
  const mainRef = useRef(null);
  const thumbnailRef = useRef(null);

  // Carousel syncing
  useEffect(() => {
    if (mainRef.current?.splide && thumbnailRef.current?.splide) {
      thumbnailRef.current.splide.sync(mainRef.current.splide);
    }
  }, []);

  return (
    <div className="mx-auto flex flex-col items-center place-content-between md:w-[600px] md:h-[700px] lg:mr-20 lg:ml-auto">
      <Splide
        options={{
          type: "fade",
          pagination: false,
          arrows: false,
          heightRatio: 1,
        }}
        ref={mainRef}
        aria-label="Main carousel"
      >
        {product.images.map((image, index) => (
          <SplideSlide key={index}>
            <img src={image.url} alt={image.altText} />
          </SplideSlide>
        ))}
      </Splide>

      <Splide
        id="thumbnail-carousel"
        options={{
          rewind: false,
          perPage: 6,
          gap: "1rem",
          pagination: false,
          arrows: true,
          isNavigation: true,
          focus: "center",
        }}
        ref={thumbnailRef}
        aria-label="Product carousel with thumbnails"
        className="justify-end"
      >
        {product.images.map((image, index) => (
          <SplideSlide key={index}>
            <img src={image.url} alt={image.altText} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  )
}