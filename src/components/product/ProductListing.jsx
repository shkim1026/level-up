"use client"
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import mockProducts from "@/data/mockProducts.json";
import ProductGrid from "@/components/product/ProductGrid";
import FilterDropdown from "@/components/filters/FilterDropdown";
import FilterDrawer from "@/components/filters/FilterDrawer";

export default function ProductListing({ initialProducts = mockProducts }) {
  const pathname = usePathname();
  const defaultSort = "popularity";
  
  const [sortBy, setSortBy] = useState(defaultSort);
  const [products, setProducts] = useState(initialProducts);

  const [filters, setFilters] = useState({
    series: [],
    categories: [],
    priceRanges: [],
  })

  const priceRanges = [
    { id: "10-30", label: "$10 - $30", min: 10, max: 30 },
    { id: "30-50", label: "$30 - $50", min: 30, max: 50 },
    { id: "50+", label: "$50+", min: 50, max: Infinity },
  ]

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

  function applyFiltersAndSort(items, sortKey, activeFilters) {
    let filtered = [...items]

    if (activeFilters.series.length > 0) {
      filtered = filtered.filter((p) => activeFilters.series.includes(p.series));
    }
    if (activeFilters.categories.length > 0) {
      filtered = filtered.filter((p) => activeFilters.categories.includes(p.category));
    }
    if (activeFilters.priceRanges.length > 0) {
      filtered = filtered.filter((p) => 
        activeFilters.priceRanges.some((rangeId) => {
          const range = priceRanges.find((r) => r.id === rangeId);
          const productPrice = p.sale ?? p.price;
          return productPrice >= range.min && productPrice <= range.max;
        })
      );
    }
    return sortProducts(filtered, sortKey);
  } 

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const alreadySelected = prev[type].includes(value);
      const updatedValues = alreadySelected
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: updatedValues }
    });
  };

  const handleFilterRemove = (value) => {
    setFilters((prev) => {
      if (prev.series.includes(value)) {
        return {...prev, series: prev.series.filter((v) => v !== value) };
      }
      if (prev.categories.includes(value)) {
        return {...prev, categories: prev.categories.filter((v) => v !== value) };
      }
      if (prev.priceRanges.includes(value)) {
        return {...prev, priceRanges: prev.priceRanges.filter((v) => v !== value)};
      }
      return prev;
    })
  }

  useEffect(() => {
    let scopedProducts = initialProducts;

    if  (pathname.includes("/apparel")) {
      scopedProducts = scopedProducts.filter((p) => p.type === "apparel")
    } else if (pathname.includes("/new-arrivals")) {
      scopedProducts = scopedProducts.filter((p) => p.new === true )
    } else if (pathname.includes("/best-sellers")) {
      scopedProducts = scopedProducts.filter((p) => p.popularity >= 80 )
    }

    const newProducts = applyFiltersAndSort(scopedProducts, sortBy, filters);
    setProducts(newProducts);
  }, [filters, sortBy, pathname, initialProducts]);

  return (
    <>
      <div className="flex place-content-between mx-6 pt-8">
        <FilterDrawer 
          allProducts={initialProducts}
          products={products} 
          filters={filters} 
          onFilterChange={handleFilterChange} 
          handleFilterRemove={handleFilterRemove}
      />
        <FilterDropdown onChange={handleSort} value={sortBy} />
      </div>

      <ProductGrid products={products} />
    </>
  )
}
