import { useState } from "react";
import { TfiClose } from 'react-icons/tfi';

export default function FilterDrawer({ products, filters, onFilterChange, handleFilterRemove, allProducts, lastChangedFilter }) {
  const [open, setOpen] = useState(false);
  
  const allSeries = [...new Set(allProducts.map((p) => p.metafields.series))];
  const visibleSeries = [...new Set(products.map((p) => p.metafields.series))];
  const seriesOptions = lastChangedFilter === "series" ? allSeries : visibleSeries;

  const allCategories = [...new Set(allProducts.map((p) => p.metafields.category))];
  const visibleCategories = [...new Set(products.map((p) => p.metafields.category))];
  const categoryOptions = lastChangedFilter === "categories" ? allCategories : visibleCategories;
  
  return (
    <div className="flex items-center">
      <button
        className="px-4 py-1 border text-black rounded-lg cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Filters
      </button>

      <p className="mx-3 font-[500]">{products.length} {products.length === 1 ? "result" : "results"}</p>

      <div className="flex">
        {[...filters.series, ...filters.categories, ...filters.priceRanges].map((filter) => (
          <div 
            className="flex items-center space-between border rounded-lg cursor-pointer px-2 py-1 uppercase text-sm"
            key={filter}
          >
            {filter}
            <span className="text-[10px] pl-2" onClick={() => handleFilterRemove(filter)}><TfiClose /></span>
          </div>
        ))}
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 bg-opacity-10 z-50 cursor-pointer"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-125 bg-white shadow-lg z-60 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button className="cursor-pointer" onClick={() => setOpen(false)}><TfiClose /></button>
        </div>
        <div className="px-5 mt-10">
          <h3 className="font-medium mb-2 font-semibold">Series</h3>
          <div className="flex flex-wrap gap-2 items-center">
            {seriesOptions.map((series) => (
              <div className="flex items-center" key={series}>
                <input 
                  className="appearance-none peer" 
                  type="checkbox" 
                  id={series} 
                  value={series} 
                  checked={filters.series.includes(series)}
                  onChange={() => onFilterChange("series", series)}
                />
                <label 
                  htmlFor={series} 
                  className="flex items-center uppercase text-sm gap-2 border border-gray-400 rounded-md w-fit py-1 px-2 cursor-pointer peer-checked:bg-gray-300 peer-checked:font-semibold whitespace-nowrap"
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
            {categoryOptions.map((category) => (
              <div className="flex items-center" key={category}>
                <input 
                  className="appearance-none peer"
                  type="checkbox"
                  id={category}
                  value={category}
                  checked={filters.categories.includes(category)}
                  onChange={() => onFilterChange("categories", category)}
                />
                <label htmlFor={category} className="flex items-center uppercase text-sm gap-2 border border-gray-400 rounded-md w-fit py-1 px-2 cursor-pointer peer-checked:bg-gray-300 peer-checked:font-semibold whitespace-nowrap">
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
              .filter((range) => products.some((product) => product.price >= range.min && product.price <= range.max))
              .map((range) => (
                <div className="flex items-center" key={range.id}>
                  <input 
                    className="appearance-none peer " 
                    type="checkbox" 
                    id={range.id} 
                    value={range.id} 
                    checked={filters.priceRanges.includes(range.id)}
                    onChange={() => onFilterChange("priceRanges", range.id)}
                  />
                  <label htmlFor={range.id} className="flex items-center text-sm gap-2 border border-gray-400 rounded-md w-fit py-1 px-2 cursor-pointer peer-checked:bg-gray-300 peer-checked:font-semibold">
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