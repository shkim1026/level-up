"use client";
import { TfiClose } from 'react-icons/tfi';
import { useProductContext } from "@/context/ProductContext";

export default function FilterChips() {
  const {
    filteredProducts,
    filters,
    handleFilterRemove,
    handleClearFilters,
  } = useProductContext();

  const activeFilters = [...filters.series, ...filters.categories, ...filters.priceRanges];

  return(
    <>
      <div className="flex flex-wrap w-full">
        {activeFilters.map((filter) => (
          <div
            className="flex items-center border rounded-lg cursor-pointer px-2 py-1 m-1 uppercase text-sm"
            key={filter}
          >
            {filter}
            <span className="text-[10px] pl-2" onClick={() => handleFilterRemove(filter)}><TfiClose /></span>
          </div>
        ))}
      </div>
      {activeFilters.length > 0 && (
        <button className="underline font-semibold cursor-pointer text-sm ml-2" onClick={handleClearFilters}>
          Clear All
        </button>
      )}
    </>
  )
}