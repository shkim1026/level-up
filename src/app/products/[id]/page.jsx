"use client";

import products from "@/data/mockProducts.json";
import React, { useState, use, useRef, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { FiMinus, FiPlus } from "react-icons/fi";
import "@splidejs/react-splide/css";
import { Raleway } from "next/font/google";
import RelatedProducts from "@/components/product/RelatedProducts";
// import { formattedPrice } from "@/utils/FormatPrice";

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function ProductDetails({ params }) {

  const { id } = use(params);
  const product = products.find((p) => p.handle === id);

  if (!product) {
    return <p className="p-8 text-red-500">Product not found. ID: {id}</p>
  }

  const [quantity, setQuantity] = useState(1);
  const decrement = () => setQuantity(prev => Math.max(1, prev - 1));
  const increment = () => setQuantity(prev => prev + 1);

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else {
      setQuantity(1);
    }
  };

  const mainRef = useRef(null);
  const thumbnailRef = useRef(null);

  useEffect(() => {
    if (mainRef.current && thumbnailRef.current && mainRef.current.splide && thumbnailRef.current.splide) {
      thumbnailRef.current.splide.sync(mainRef.current.splide);
    }
  }, []);

  return (
    <>
      <div className="px-8 mx-auto lg:w-[1200px] lg:flex lg:pt-5">
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
                <img src={image.src} alt={`Main ${index + 1}`} />
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
                <img src={image.src} alt={`Thumbnail ${index + 1}`} />
              </SplideSlide>
            ))}
          </Splide>
        </div>

        <div className="mr-auto lg:max-w-md">
          <h2 className="mt-6 mb-2 text-sm text-gray-400">
            {product.metafields.series}
          </h2>
          <h1 className={`text-2xl font-semibold ${raleway.className} tracking-wide uppercase`}>{product.title}</h1>

          {product.compare_at_price ? (
            <div className="flex items-center mt-2">
                <p className="text-red-500 text-xl mr-2">{formattedPrice(product.compare_at_price)}</p>
                <p className="text-gray-500 line-through">{formattedPrice(product.price)}</p>
            </div>
          ) : (
            <p className="mt-2 text-xl">{formattedPrice(product.price)}</p>
          )}
          <hr className="text-gray-300 mt-4"/>
          <div>
            <p className="text-sm mt-5">{product.body_html}</p>
            <ul>
              {product.metafields["product-features"].map((listItem) => (
                <li className="text-sm mt-2 ml-3 list-disc" key={listItem}>{listItem}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex justify-between text-sm gap-2 mt-4">
              <legend>Size:</legend>
              <button className="underline">Size Chart</button>
            </div>
            <div className="mt-3 flex">
              {product.variants.map((variant, index) => {
                const sizeInitial = variant.title
                  .split(" ")
                  .map((word) => word[0])
                  .join("");
                
                return (
                  <div key={variant.id}>
                    <input type="radio" value={variant.title} id={variant.id} name="size" className="sr-only peer" defaultChecked={index === 0}></input>
                    <label htmlFor={variant.id} className="transition-all border px-3 py-2 text-sm mr-2 text-gray-400 peer-checked:text-white peer-checked:bg-black peer-checked:hover:text-white peer-checked:hover:bg-gray-800 peer-checked:border-black hover:bg-gray-300 rounded-sm cursor-pointer">{sizeInitial}</label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border rounded-sm border-gray-400 text-gray-500 mt-6 flex max-w-fit">
            <button className="p-3 cursor-pointer hover:bg-gray-300" onClick={decrement}>
              <span className="sr-only">Decrease quantity</span>
              <FiMinus />
            </button>
            <input type="text" className="max-w-8 text-center" value={quantity} onChange={handleChange}/>
            <button className="p-3 cursor-pointer hover:bg-gray-300" onClick={increment}>
              <span className="sr-only">Increase quantity</span>
              <FiPlus />
            </button>
          </div>

          <button className="mt-7 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition w-full cursor-pointer uppercase tracking-wide">
            Add to Cart
          </button>
        </div>
      </div>

      <RelatedProducts currentProduct={product} allProducts={products} />
    </>
  );
}