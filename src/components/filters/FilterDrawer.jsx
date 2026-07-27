"use client";
import { useState, useEffect } from "react";
import { TfiClose } from 'react-icons/tfi';
import { useProductContext } from "@/context/ProductContext";

export default function FilterDrawer() {
  const [open, setOpen] = useState(false);

  const {
    productsForPage,
    filteredProducts,
    filters,
    handleFilterChange,
    handleFilterRemove,
    lastChangedFilter,
  } = useProductContext();
  
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const allSeries = [...new Set(productsForPage.map((p) => p.metafields.series))].filter(Boolean);
  const visibleSeries = [...new Set(filteredProducts.map((p) => p.metafields.series))].filter(Boolean);
  const seriesOptions = lastChangedFilter === "series" ? allSeries : visibleSeries;

  const allCategories = [...new Set(productsForPage.map((p) => p.metafields.categories))].filter(Boolean);
  const visibleCategories = [...new Set(filteredProducts.map((p) => p.metafields.categories))].filter(Boolean);
  const categoryOptions = lastChangedFilter === "categories" ? allCategories : visibleCategories;

  return (
    <div className="flex items-center">
      <button
        className="px-4 py-1 border text-dark-gray rounded-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-dark-gray"
        onClick={() => setOpen(true)}
        aria-expanded={open}
      >
        Filters
      </button>

      <p className="mx-3 font-[500]" aria-live="polite">
        {filteredProducts.length} {filteredProducts.length === 1 ? "result" : "results"}
      </p>

      <div className="flex flex-wrap gap-1">
        {[...filters.series, ...filters.categories, ...filters.priceRanges].map((filter) => (
          <div 
            className="flex items-center border rounded-lg px-2 py-1 uppercase text-sm"
            key={filter}
          >
            {filter}
            <button 
              type="button" 
              aria-label={`Remove ${filter} filter`} 
              className="text-[10px] pl-2 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-dark-gray" 
              onClick={() => handleFilterRemove(filter)}
            >
              <TfiClose />
            </button>
          </div>
        ))}
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-dark-gray/40 bg-opacity-10 z-50 cursor-pointer"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-drawer-title"
        className={`fixed top-0 left-0 h-full w-125 max-w-[90vw] bg-white shadow-lg z-60 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 id="filter-drawer-title" className="text-lg font-semibold">Filters</h2>
          <button 
            type="button" 
            aria-label="Close filters" 
            className="cursor-pointer p-1 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-dark-gray" 
            onClick={() => setOpen(false)}
          >
            <TfiClose />
          </button>
        </div>
        <div className="px-5 mt-10">
          <h3 className="font-medium mb-2 font-semibold">Series</h3>
          <div className="flex flex-wrap gap-2 items-center">
            {seriesOptions.map((series, index) => (
              <div className="flex items-center" key={series || index}>
                <input 
                  className="appearance-none peer" 
                  type="checkbox" 
                  id={`filter-series-${series}`} 
                  value={series} 
                  checked={filters.series.includes(series)}
                  onChange={() => handleFilterChange("series", series)}
                />
                <label 
                  htmlFor={`filter-series-${series}`} 
                  className="flex items-center uppercase text-sm gap-2 border border-gray-400 rounded-md w-fit py-1 px-2 cursor-pointer peer-checked:bg-gray-300 peer-checked:font-semibold peer-focus-visible:ring-2 peer-focus-visible:ring-dark-gray whitespace-nowrap"
                >
                  {series}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="px-5 mt-10">
          <h3 className="font-medium mb-2 font-semibold">Categories</h3>
          <div className="flex flex-wrap gap-2 items-center">
            {categoryOptions.map((category, index) => (
              <div className="flex items-center" key={category || index}>
                <input 
                  className="appearance-none peer"
                  type="checkbox"
                  id={`filter-category-${category}`}
                  value={category}
                  checked={filters.categories.includes(category)}
                  onChange={() => handleFilterChange("categories", category)}
                />
                <label htmlFor={`filter-category-${category}`} className="flex items-center uppercase text-sm gap-2 border border-gray-400 rounded-md w-fit py-1 px-2 cursor-pointer peer-checked:bg-gray-300 peer-checked:font-semibold peer-focus-visible:ring-2 peer-focus-visible:ring-dark-gray whitespace-nowrap">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="px-5 mt-10">
          <h3 className="font-medium mb-2 font-semibold">Price</h3>
          <div className="flex flex-wrap gap-2 items-center">
            {[
              { id: "10-30", label: "$10 - $30", min: 10, max: 30 },
              { id: "30-50", label: "$30 - $50", min: 30, max: 50 },
              { id: "50+", label: "$50+", min: 50, max: Infinity },
            ]
              .filter((range) => 
                filteredProducts.some((product) => {
                  const productPrice = product.compare_at_price ?? product.price;
                  return productPrice >= range.min && productPrice <= range.max
                })
              )
              .map((range) => (
                <div className="flex items-center" key={range.id}>
                  <input 
                    className="appearance-none peer " 
                    type="checkbox" 
                    id={`filter-price-${range.id}`} 
                    value={range.id} 
                    checked={filters.priceRanges.includes(range.id)}
                    onChange={() => handleFilterChange("priceRanges", range.id)}
                  />
                  <label htmlFor={`filter-price-${range.id}`} className="flex items-center text-sm gap-2 border border-gray-400 rounded-md w-fit py-1 px-2 cursor-pointer peer-checked:bg-gray-300 peer-checked:font-semibold peer-focus-visible:ring-2 peer-focus-visible:ring-dark-gray whitespace-nowrap">
                    {range.label}
                  </label>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}