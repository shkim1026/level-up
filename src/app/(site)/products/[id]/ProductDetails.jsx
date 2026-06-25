
"use client";

import React from "react";
import Link from "next/link";

import { Raleway } from "next/font/google";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductCarousel from "@/components/product/ProductCarousel";
import ProductPurchaseControls from "@/components/product/ProductPurchaseControls";
import { formatPrice } from "@/utils/FormatPrice";
import { slugify } from "@/utils/Slugify";
import { useState } from "react";

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function ProductDetails({ product, allProducts }) {
  const [selectedColor, setSelectedColor] = useState(
    product.variants[0]?.options.find((o) => o.name?.toLowerCase() === "color")?.value ?? ""
  );

  return (
    <>
      <div className="px-8 mx-auto lg:w-[1200px] lg:flex lg:pt-5">
      
        {/* --- Image Gallery --- */}
        <ProductCarousel product={product} selectedColor={selectedColor} />

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
                {formatPrice(product.price)}
              </p>
              <p className="text-gray-500 line-through">
                {formatPrice(product.compareAtPrice)}
              </p>
            </div>
          ) : (
            <p className="mt-2 text-xl">{formatPrice(product.price)}</p>
          )}

          <hr className="text-gray-300 mt-4" />

          {/* Description */}
          <div className="text-sm mt-5 description-html">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>

          {/* Variant select, Quantity, Add to Cart */}
          <ProductPurchaseControls 
            product={product} 
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts currentProduct={product} allProducts={allProducts} />
    </>
  );
}
