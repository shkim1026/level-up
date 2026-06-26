"use client";
import { useState } from "react";
import { TfiClose } from 'react-icons/tfi';
import { useProductContext } from "@/context/ProductContext";
import FilterContent from "./FilterContent";

export default function FilterBar() {
  const [open, setOpen] = useState(false);

  const {
    filteredProducts,
    filters,
    handleFilterRemove,
    handleClearFilters,
  } = useProductContext();

  const activeFilters = [...filters.series, ...filters.categories, ...filters.priceRanges];

  return (
    <div className="flex items-center flex-wrap gap-y-2 max-w-md">
      {/* Mobile/tablet trigger only */}
      <button
        className="lg:hidden px-4 py-1 border text-dark-gray rounded-lg cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Filters
      </button>

      <p className="mx-3 font-[500]">{filteredProducts.length} {filteredProducts.length === 1 ? "result" : "results"}</p>

      {/* Mobile/tablet drawer */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-dark-gray/40 bg-opacity-10 z-50 cursor-pointer"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-11/12 md:w-125 bg-white shadow-lg z-60 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button className="cursor-pointer" onClick={() => setOpen(false)}><TfiClose /></button>
        </div>
        <div className="px-5 mt-10">
          <FilterContent />
        </div>
        <div className="px-5 mt-10">
          <button className="underline font-semibold cursor-pointer text-sm" onClick={handleClearFilters}>Clear All</button>
        </div>
      </div>
    </div>
  );
}
