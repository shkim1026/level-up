"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as Sentry from "@sentry/nextjs";
import { ProductProvider } from "@/context/ProductContext";
import ProductListing from "@/components/product/ProductListing";
import { fetchAllShopifyProducts } from "@/data/fetchAllShopifyProducts";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchAllShopifyProducts();
        setProducts(data);
      } catch (error) {
        console.log("Error fetching products:", error);
        Sentry.captureException(error);
      }
    }
    loadProducts();
  }, []);

  const lowerQuery = query ? query.toLowerCase().trim() : "";
  const searchResults = lowerQuery
    ? products.filter((p) => {
        const titleMatch = p.title?.toLowerCase().includes(lowerQuery);
        const tagMatch = p.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery));
        const seriesMatch = p.metafields?.series?.toLowerCase().includes(lowerQuery);
        const categoryMatch = p.metafields?.categories?.toLowerCase().includes(lowerQuery);
        return titleMatch || tagMatch || seriesMatch || categoryMatch;
      })
    : [];

  return (
      <ProductProvider>
        {query ? (
          <>
            {searchResults.length > 0 ? (
              <ProductListing products={searchResults} query={query}/>
            ): (
              <p className="text-gray-500">No products found.</p>
            )}
          </>
        ) : (
          <p className="text-gray-500">Please enter a search term.</p>
        )}
      </ProductProvider>
  );
}

export default function SearchPage() {
   return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
   );
}