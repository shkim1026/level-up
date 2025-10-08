"use client";
import { createContext, useContext, useState, useMemo } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ initialProducts = [], children }) => {
  const [productsForPage, setProductsForPage] = useState(initialProducts);
  const [filters, setFilters] = useState({ categories: [], series: [], priceRanges:[] });
  const [lastChangedFilter, setLastChangedFilter] = useState(null);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const alreadySelected = prev[type].includes(value);
      const updatedValues = alreadySelected
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: updatedValues };
    });

    setLastChangedFilter(type);
  };

  const handleFilterRemove = (value) => {
    setFilters((prev) => {
      if (prev.series.includes(value)) {
        return { ...prev, series: prev.series.filter((v) => v !== value) };
      }
      if (prev.categories.includes(value)) {
        return { ...prev, categories: prev.categories.filter((v) => v !== value) };
      }
      if (prev.priceRanges.includes(value)) {
        return { ...prev, priceRanges: prev.priceRanges.filter((v) => v !== value) };
      }
      return prev;
    });
  };

  const priceRanges = [
    { id: "10-30", min: 1000, max: 3000 },
    { id: "30-50", min: 3000, max: 5000 },
    { id: "50+", min: 5000, max: Infinity },
  ]

  const filteredProducts = useMemo(() => {
    return productsForPage.filter((p) => {
      const matchesCategory =
        filters.categories.length === 0 || filters.categories.includes(p.metafields.category);
      const matchesSeries = 
        filters.series.length === 0 || filters.series.includes(p.metafields.series);
      const matchesPrice = 
        filters.priceRanges.length === 0 || filters.priceRanges.some((rangeId) => {
          const range = priceRanges.find((r) => r.id === rangeId);
          const price = p.compare_at_price ?? p.price;
          return price >= range.min && price <= range.max;
        });
      return matchesCategory && matchesSeries && matchesPrice;
    });
  }, [productsForPage, filters]);

  return (
    <ProductContext.Provider
      value={{
        productsForPage,
        setProductsForPage,
        filteredProducts,
        filters,
        setFilters,
        handleFilterChange,
        handleFilterRemove,
        lastChangedFilter,
        setLastChangedFilter,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
}