"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductProvider } from "@/context/ProductContext";
import ProductListing from "@/components/product/ProductListing";
import { fetchAllShopifyProducts } from "@/data/fetchAllShopifyProducts";

export default function SearchPage() {
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
      }
    }
    loadProducts();
  }, []);

  const searchResults = query
    ? products.filter((p) => p.title.toLowerCase().includes(query))
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