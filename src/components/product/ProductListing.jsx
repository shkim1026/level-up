"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import mockProducts from "@/data/mockProducts.json";
import ProductGrid from "@/components/product/ProductGrid";
import FilterDrawer from "@/components/filters/FilterDrawer";
import dynamic from "next/dynamic";
import { useProductContext } from "@/context/ProductContext";

export default function ProductListing({ products: externalProducts }) {
  const {
    filters,
    handleFilterChange,
    handleFilterRemove,
    lastChangedFilter,
    setLastChangedFilter,
    setProductsForPage,
    filteredProducts,
  } = useProductContext();

  const pathname = usePathname();
  const defaultSort = "popularity";
  const [sortBy, setSortBy] = useState(defaultSort);
  const [scopedProducts, setScopedProducts] = useState(mockProducts);

  const FilterDropdown = dynamic(() => import("@/components/filters/FilterDropdown"), { ssr: false });

  // Sort logic
  function sortProducts(items, sortKey) {
    const sorted = [...items];
    switch (sortKey) {
      case "popularity":
        return sorted.sort((a, b) => b.metafields.popularity - a.metafields.popularity);
      case "rating":
        return sorted.sort((a, b) => b.metafields.rating - a.metafields.rating);
      case "priceLowHigh":
        return sorted.sort(
          (a, b) => (a.compare_at_price ?? a.price) - (b.compare_at_price ?? b.price)
        );
      case "priceHighLow":
        return sorted.sort(
          (a, b) => (b.compare_at_price ?? b.price) - (a.compare_at_price ?? a.price)
        );
      default:
        return sorted;
    }
  }

  const handleSort = (value) => {
    setSortBy(value);
  };

  // Scope products based on the current page
  useEffect(() => {
    let scoped = externalProducts || mockProducts;

    if (!externalProducts) {
      if (pathname.includes("/apparel")) {
        scoped = scoped.filter((p) => p.type === "Apparel");
      } else if (pathname.includes("/new-arrivals")) {
        scoped = scoped.filter((p) => p.metafields.new === true);
      } else if (pathname.includes("/best-sellers")) {
        scoped = scoped.filter((p) => p.metafields.popularity >= 80);
      }
    }

    setScopedProducts(scoped);
    setProductsForPage(scoped); // <-- This updates the context with correct data
  }, [pathname, setProductsForPage]);

  // Sort the filtered products
  const displayedProducts = sortProducts(filteredProducts, sortBy);

  return (
    <>
      <div className="flex place-content-between mx-6 pt-8">
        <FilterDrawer
          allProducts={scopedProducts}
          products={displayedProducts}
          filters={filters}
          onFilterChange={handleFilterChange}
          handleFilterRemove={handleFilterRemove}
          lastChangedFilter={lastChangedFilter}
        />
        <FilterDropdown onChange={handleSort} value={sortBy} />
      </div>

      <ProductGrid products={displayedProducts} />
    </>
  );
}
