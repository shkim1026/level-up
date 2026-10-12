"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { getColorForImage } from "@/utils/getColorForImage";

export default function ProductCarousel({ product, selectedColor, setSelectedColor }) {
  const mainRef = useRef(null);
  const thumbnailRef = useRef(null);
  const isProgrammaticMove = useRef(false);

  const selectedColorRef = useRef(selectedColor);
  selectedColorRef.current = selectedColor;

  const productRef = useRef(product);
  productRef.current = product;

  // Carousel syncing and slide move listener
  useEffect(() => {
    const mainSplide = mainRef.current?.splide;
    const thumbSplide = thumbnailRef.current?.splide;

    if (mainSplide && thumbSplide) {
      thumbSplide.sync(mainSplide);
    }

    if (!mainSplide) return;

    const onMove = (newIndex) => {
      if (isProgrammaticMove.current) {
        isProgrammaticMove.current = false;
        return;
      }

      const currentProduct = productRef.current;
      const targetImage = currentProduct?.images?.[newIndex];
      const color = getColorForImage(targetImage, currentProduct);

      if (color && color !== selectedColorRef.current && setSelectedColor) {
        setSelectedColor(color);
      }
    };

    mainSplide.on("move", onMove);

    return () => {
      mainSplide.off("move", onMove);
    };
  }, [setSelectedColor]);

  // When selectedColor changes from outside (e.g. user clicked color swatch)
  useEffect(() => {
    if (!selectedColor || !mainRef.current?.splide) return;

    const variantImage = product.variants.find(
      (v) => v.options.find((o) => o.name?.toLowerCase() === "color")?.value === selectedColor
    )?.image;

    if (!variantImage) return;

    const index = product.images.findIndex((img) => img.url === variantImage);
    if (index !== -1 && mainRef.current.splide.index !== index) {
      isProgrammaticMove.current = true;
      mainRef.current.splide.go(index);
    }
  }, [selectedColor, product]);

  const handleImageClick = (index) => {
    const color = getColorForImage(product.images[index], product);
    if (color && color !== selectedColor && setSelectedColor) {
      setSelectedColor(color);
    }
  };

  return (
    <div className="mx-auto flex flex-col items-center md:w-[600px] md:h-[700px] lg:mr-10 lg:ml-auto shrink-0 gap-[1rem]">
      <Splide
        options={{
          type: "fade",
          pagination: false,
          arrows: false,
          heightRatio: 1,
        }}
        ref={mainRef}
        aria-label="Main carousel"
        className="w-full"
      >
        {product.images.map((image, index) => (
          <SplideSlide key={index}>
            <div 
              className="relative w-full aspect-square overflow-hidden rounded-lg cursor-pointer"
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={image.url}
                alt={image.altText || `${product.title} view ${index + 1}`}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 1200px"
                quality={90}
                priority={index === 0}
                className="object-cover"
              />
            </div>
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
        className="justify-end w-full"
      >
        {product.images.map((image, index) => (
          <SplideSlide key={index}>
            <div 
              className="relative w-full aspect-square overflow-hidden rounded-md cursor-pointer"
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={image.url}
                alt={image.altText || `${product.title} thumbnail ${index + 1}`}
                fill
                unoptimized
                sizes="200px"
                quality={85}
                className="object-cover"
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}