"use client"
import React, { useState } from "react";
import ProductGrid from "@/components/product/ProductGrid";
import mockProducts from "@/data/mockProducts.json"
import FilterDropdown from "@/components/filters/FilterDropdown";

export default function Apparel() {
  const defaultSort = "popularity";
  
  const [sortBy, setSortBy] = useState(defaultSort);
  const [products, setProducts] = useState(mockProducts, defaultSort);

  function sortProducts(items, sortKey) {
    let sorted = [...items];

    switch (sortKey) {
      case "popularity":
        sorted.sort((a, b) => b.popularity - a.popularity);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "priceLowHigh":
        sorted.sort((a, b) => (a.sale ?? a.price) - (b.sale ?? b.price));
        break;
      case "priceHighLow":
        sorted.sort((a, b) => (b.sale ?? b.price) - (a.sale ?? a.price));
        break;
      default:
        break;
    }
    return sorted;
  }

  const handleSort = (value) => {
    setSortBy(value);
    setProducts(sortProducts(products, value));
  };

  return (
    <>
      <FilterDropdown onChange={handleSort} value={sortBy} />
      <ProductGrid products={products}/>
    </>
  )
}
