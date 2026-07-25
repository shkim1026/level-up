"use client";

import React, { useEffect } from "react";

export default function KlaviyoReviewsWidget({ productId, className = "" }) {
  const showReviews = process.env.NEXT_PUBLIC_ENABLE_REVIEWS === "true";

  const cleanId = productId ? String(productId).replace("gid://shopify/Product/", "") : "";

  useEffect(() => {
    if (!showReviews) return;

    const refreshReviews = () => {
      if (typeof window !== "undefined" && window.KlaviyoReviews) {
        try {
          if (typeof window.KlaviyoReviews.init === "function") {
            window.KlaviyoReviews.init();
          } else if (typeof window.KlaviyoReviews.attachToElements === "function") {
            window.KlaviyoReviews.attachToElements();
          }
        } catch (e) {
          // Silent catch
        }
      }
    };

    refreshReviews();

    const interval = setInterval(() => {
      if (typeof window !== "undefined" && window.KlaviyoReviews) {
        refreshReviews();
        clearInterval(interval);
      }
    }, 300);

    const timeout = setTimeout(() => clearInterval(interval), 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [productId, showReviews]);

  return (
    <div
      id="klaviyo-reviews-all"
      className={`klaviyo-reviews-all mt-10 max-w-[1920px] mx-auto px-4 md:px-8 ${!showReviews ? "hidden" : ""} ${className}`}
      data-id={cleanId || productId}
      data-product-id={cleanId || productId}
    />
  );
}
