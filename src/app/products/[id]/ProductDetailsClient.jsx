"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { FiMinus, FiPlus } from "react-icons/fi";
import "@splidejs/react-splide/css";
import { Raleway } from "next/font/google";
import RelatedProducts from "@/components/product/RelatedProducts";
import SizeChartPopup from "@/components/ui/SizePopupChart";
import formatSizeLabel from "@/utils/FormatSizeLabel";
import { slugify } from "@/utils/Slugify";
import { useCart } from "@/components/cart/CartContext";
import PageTitle from "@/utils/PageTitle";

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function ProductDetailsClient({ product, allProducts }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(
    product.variants?.[0]?.options?.[0]?.value || null
  )
  const mainRef = useRef(null);
  const thumbnailRef = useRef(null);
  const { addToCart } = useCart();

  const decrement = () => setQuantity(prev => Math.max(1, prev - 1));
  const increment = () => setQuantity(prev => prev + 1);

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(!isNaN(value) && value > 0 ? value : 1);
  };

  // Carousel syncing
  useEffect(() => {
    if (mainRef.current?.splide && thumbnailRef.current?.splide) {
      thumbnailRef.current.splide.sync(mainRef.current.splide);
    }
  }, []);

  return (
    <>
      <PageTitle title={product.title} />

      <div className="px-8 mx-auto lg:w-[1200px] lg:flex lg:pt-5">
        {/* --- Image Gallery --- */}
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

        {/* --- Product Info --- */}
        <div className="mr-auto lg:max-w-md">
          <Link href={`/collections/${slugify(product.metafields.series)}`}>
            <h2 className="mt-6 mb-2 text-sm text-gray-400 hover:text-gray-600">
              {product.metafields.series}
            </h2>
          </Link>
          <h1
            className={`text-2xl font-semibold ${raleway.className} tracking-wide uppercase`}
          >
            {product.title}
          </h1>

          {/* Prices */}
          {product.compareAtPrice? (
            <div className="flex items-center mt-2">
              <p className="text-red-500 text-xl mr-2">
                ${product.price}
              </p>
              <p className="text-gray-500 line-through">
                ${product.compareAtPrice}
              </p>
            </div>
          ) : (
            <p className="mt-2 text-xl">${product.price}</p>
          )}

          <hr className="text-gray-300 mt-4" />

          {/* Description */}
          <div>
            <p className="text-sm mt-5">{product.description}</p>
            <ul>
              {product.metafields["product-features"]?.map((listItem) => (
                <li
                  className="text-sm mt-2 ml-3 list-disc"
                  key={listItem}
                >
                  {listItem}
                </li>
              ))}
            </ul>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex justify-between text-sm gap-2 mt-4">
              <legend>Size:</legend>
              <SizeChartPopup />
            </div>
            <div className="mt-3 flex">
              {product.variants.map((variant, index) => {
                const sizeValue = variant.options[0].value;
                const sizeInitial = formatSizeLabel(sizeValue);
                
                return (
                  <div key={variant.id}>
                    <input
                      type="radio"
                      value={sizeValue}
                      id={variant.id}
                      name="size"
                      className="sr-only peer"
                      defaultChecked={index === 0}
                      onChange={() => setSelectedSize(sizeValue)}
                    />
                    <label
                      htmlFor={variant.id}
                      className="transition-all border px-3 py-2 text-sm mr-2 text-gray-400 peer-checked:text-white peer-checked:bg-black peer-checked:hover:text-white peer-checked:hover:bg-gray-800 peer-checked:border-black hover:bg-gray-300 rounded-sm cursor-pointer"
                    >
                      {sizeInitial}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="border rounded-sm border-gray-400 text-gray-500 mt-6 flex max-w-fit">
            <button className="p-3 cursor-pointer hover:bg-gray-300" onClick={decrement}>
              <span className="sr-only">Decrease quantity</span>
              <FiMinus />
            </button>
            <input
              type="text"
              className="max-w-8 text-center"
              value={quantity}
              onChange={handleChange}
            />
            <button className="p-3 cursor-pointer hover:bg-gray-300" onClick={increment}>
              <span className="sr-only">Increase quantity</span>
              <FiPlus />
            </button>
          </div>

          <button 
            className="mt-7 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition w-full cursor-pointer uppercase tracking-wide"
            onClick={() => addToCart({...product, quantity, selectedSize})}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts currentProduct={product} allProducts={allProducts} />
    </>
  );
}
