"use client";

import { useSearchParams } from "next/navigation";
import Products from "@/data/mockProducts.json"
import { ProductProvider } from "@/context/ProductContext";
import ProductListing from "@/components/product/ProductListing";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const searchResults = query
    ? Products.filter((p) => p.title.toLowerCase().includes(query))
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