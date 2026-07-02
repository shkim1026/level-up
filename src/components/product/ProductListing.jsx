"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ProductGrid from "@/components/product/ProductGrid";
import FilterBar from "@/components/filters/FilterBar";
import FilterSidebar from "@/components/filters/FilterSidebar";
import FilterChips from "../filters/FilterChips";
import dynamic from "next/dynamic";
import { useProductContext } from "@/context/ProductContext";
import PageTitle from "@/utils/PageTitle";

const FilterDropdown = dynamic(() => import("@/components/filters/FilterDropdown"), {
  ssr: false,
  loading: () => <div className="w-[168px] h-10" />, //Prevents <h2>{tabTitle}</h2> from shifting on page load
});

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
  const [tabTitle, setTabTitle] = useState("");

  // Sort logic
  function sortProducts(items, sortKey) {
    const sorted = [...items];
    switch (sortKey) {
      case "popularity":
        return sorted.sort((a, b) => (b.metafields?.popularity ?? 0) - (a.metafields?.popularity ?? 0));
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
    let newTabTitle = "";

    if (pathname.includes("/apparel")) {
      newTabTitle = "Shop"
    } else if (pathname.includes("/new-arrivals")) {
      products = products.filter((p) => p.metafields.new === true);
      newTabTitle = "New Arrivals"
    } else if (pathname.includes("/best-sellers")) {
      products = products.filter((p) => p.metafields.popularity >= 80);
      newTabTitle = "Best Sellers"
    }

    setScopedProducts(products);
    setProductsForPage(products);
    setTabTitle(newTabTitle);
  }, [pathname, externalProducts, setProductsForPage]);


  // Sort the filtered products
  const displayedProducts = sortProducts(filteredProducts?.length ? filteredProducts : scopedProducts, sortBy);

  return (
    <>
      <PageTitle title={tabTitle} />
      {query ? (
        <h1 className="block md:hidden text-medium font-bold uppercase pt-6 pb-4 text-center">Results for: {query}</h1>
      ) : (
        <h1 className="block md:hidden text-xl font-bold uppercase pt-6 pb-4 text-center">{tabTitle}</h1>
      )}

      <div className="flex md:px-10 px-4">
        <FilterSidebar />

        <div className="flex-1">
          <div className="flex place-content-between items-center max-w-container md:py-6 lg:px-5">
            <FilterBar />
            {query ? (
              <h1 className="hidden md:flex items-center text-medium uppercase">Results for: {query}</h1>
            ) : (
              <h1 className="hidden md:flex text-2xl font-bold uppercase">{tabTitle}</h1>
            )}
            <FilterDropdown onChange={handleSort} value={sortBy} />
          </div>

          <div className="lg:hidden mt-3">
            <FilterChips />
          </div>

          <ProductGrid products={displayedProducts} />
        </div>
      </div>
    </>
  );
}
