"use client";

import React from "react";
import Link from "next/link";

import { Raleway } from "next/font/google";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductCarousel from "@/components/product/ProductCarousel";
import ProductPurchaseControls from "@/components/product/ProductPurchaseControls";
import { formatPrice } from "@/utils/FormatPrice";
import { slugify } from "@/utils/Slugify";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronUp } from "react-icons/fa";
import { TbWashTemperature1, TbWashTumbleDry, TbIroning1, TbWashDrycleanOff } from "react-icons/tb";
import * as Sentry from "@sentry/nextjs";

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function ProductDetails({ product, allProducts }) {
  const [selectedColor, setSelectedColor] = useState(
    product.variants[0]?.options.find((o) => o.name?.toLowerCase() === "color")?.value ?? ""
  );
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [isFabricCareOpen, setIsFabricCareOpen] = useState(false);
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (hasTrackedView.current) return;
    hasTrackedView.current = true;

    const sessionKey = `viewedProduct:${product.id}`;

    let alreadyViewed = false;
    try {
      alreadyViewed = ! !sessionStorage.getItem(sessionKey);
    } catch (err) {
      console.error("sessionStorage unavailable, skipping dedup:", err);
      Sentry.captureException(err);
    }

    if (alreadyViewed) return;

    fetch("/api/track-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id }),
    })
      .then(() => {
        sessionStorage.setItem(sessionKey, "1");
      })
      .catch((err) => {
      console.error("Error tracking product view:", err)
      Sentry.captureException(err);
    });
  }, [product.id]);

  return (
    <>
      <div className="px-8 mx-auto w-full lg:max-w-[1200px] lg:flex lg:items-start lg:pt-5">
      
        {/* --- Image Gallery --- */}
        <ProductCarousel product={product} selectedColor={selectedColor} />

        {/* --- Product Info --- */}
        <div className="mr-auto lg:w-[28rem] min-w-0">
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

          {/* Variant select, Quantity, Add to Cart */}
          <ProductPurchaseControls 
              product={product} 
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />

          {/* Product Details Dropdown */}
          <div className="mt-5 pb-2">
            <button
              onClick={() => {
                setIsDescOpen((prev) => !prev)
                setIsFabricCareOpen(false);
              }}
              aria-expanded={isDescOpen}
              className="flex w-full items-center justify-between gap-4 text-left focus:outline-none cursor-pointer"
            >
              <span className="text-sm font-semibold uppercase tracking-wide">Product Details</span>
              <motion.span
                animate={{ rotate: isDescOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-xl leading-none text-dark-gray"
                aria-hidden="true"
              >
                <FaChevronUp />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isDescOpen && (
                <motion.div
                  key="description-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="text-sm pt-3 description-html">
                    <div dangerouslySetInnerHTML={{ __html: product.description }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Fabric Care Dropdown */}
          <div className="mt-5 pb-2">
            <button
              onClick={() => {
                setIsFabricCareOpen((prev) => !prev); 
                setIsDescOpen(false)
              }}
              aria-expanded={isFabricCareOpen}
              className="flex w-full items-center justify-between gap-4 text-left focus:outline-none cursor-pointer"
            >
              <span className="text-sm font-semibold uppercase tracking-wide">Fabric Care</span>
              <motion.span
                animate={{ rotate: isFabricCareOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-xl leading-none text-dark-gray"
                aria-hidden="true"
              >
                <FaChevronUp />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isFabricCareOpen && (
                <motion.div
                  key="description-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="text-sm pt-3 description-html">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-2xl"><TbWashTemperature1 /></span>
                        Machine wash cold, inside-out, gentle cycle with mild detergent and similar colors. Use non-chlorine bleach, only when necessary. No fabric softeners.
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-2xl"><TbWashTumbleDry /></span>
                        Tumble dry low, or hang-dry for longest life.
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-2xl"><TbIroning1 /></span>
                        Cool iron inside-out if necessary. Do not iron decoration.
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-2xl"><TbWashDrycleanOff /></span>
                        Do not dry clean.
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts currentProduct={product} allProducts={allProducts} />
    </>
  );
}
