"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ProductGrid from "@/components/product/ProductGrid";
import FilterDrawer from "@/components/filters/FilterDrawer";
import dynamic from "next/dynamic";
import { useProductContext } from "@/context/ProductContext";

export default function ProductListing({ products: externalProducts, query }) {
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
  const [scopedProducts, setScopedProducts] = useState(externalProducts ?? []);

  const FilterDropdown = dynamic(() => import("@/components/filters/FilterDropdown"), { ssr: false });

  // Sort logic
  function sortProducts(items, sortKey) {
    const sorted = [...items];
    switch (sortKey) {
      case "popularity":
        return sorted.sort((a, b) => (b.metafields?.popularity ?? 0) - (a.metafields.popularity ?? 0));
      case "rating":
        return sorted.sort((a, b) => (b.metafields?.rating ?? 0) - (a.metafields?.rating ?? 0));
      case "priceLowHigh":
        return sorted.sort(
          (a, b) => (a.price ?? 0) - (b.price ?? 0)
        );
      case "priceHighLow":
        return sorted.sort(
          (a, b) => (b.price ?? 0) - (a.price ?? 0)
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
    if (!externalProducts?.length) return;

    let products = [...externalProducts];

    if (pathname.includes("/apparel")) {
      // products = products.filter((p) => p.type === "Apparel");
    } else if (pathname.includes("/new-arrivals")) {
      products = products.filter((p) => p.metafields.new === true);
    } else if (pathname.includes("/best-sellers")) {
      products = products.filter((p) => p.metafields.popularity >= 80);
    }

    setScopedProducts(products);
    setProductsForPage(products);
  }, [pathname, externalProducts, setProductsForPage]);

  // Sort the filtered products
  const displayedProducts = sortProducts(filteredProducts?.length ? filteredProducts : scopedProducts, sortBy);

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
        {query && <h1 className="flex items-center font-medium">Results for: {query}</h1>}
        <FilterDropdown onChange={handleSort} value={sortBy} />
      </div>
      <ProductGrid products={displayedProducts} />
    </>
  );
}
