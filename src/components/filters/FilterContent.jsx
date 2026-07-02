"use client";
import { useProductContext } from "@/context/ProductContext";

export default function FilterContent({ variant = "chip" }) {
  const {
    productsForPage,
    filteredProducts,
    filters,
    handleFilterChange,
    lastChangedFilter,
  } = useProductContext();

  const allSeries = [...new Set(productsForPage.map((p) => p.metafields.series))].filter(Boolean);
  const visibleSeries = [...new Set(filteredProducts.map((p) => p.metafields.series))].filter(Boolean);
  const seriesOptions = lastChangedFilter === "series" ? allSeries : visibleSeries;

  const allCategories = [...new Set(productsForPage.map((p) => p.metafields.categories))].filter(Boolean);
  const visibleCategories = [...new Set(filteredProducts.map((p) => p.metafields.categories))].filter(Boolean);
  const categoryOptions = lastChangedFilter === "categories" ? allCategories : visibleCategories;

  const isCheckbox = variant === "checkbox";

  // Chip style (existing) vs. real checkbox style
  const inputClassName = isCheckbox
    ? "w-4 h-4 cursor-pointer accent-dark-gray"
    : "appearance-none peer";

  const labelClassName = isCheckbox
    ? "flex items-center text-sm gap-2 cursor-pointer capitalize"
    : "flex items-center uppercase text-sm gap-2 border border-gray-400 rounded-md w-fit py-1 px-2 cursor-pointer peer-checked:bg-gray-300 peer-checked:font-semibold whitespace-nowrap";

  const wrapperClassName = isCheckbox ? "flex items-center gap-2" : "flex items-center";

  return (
    <>
      <div>
        <h3 className="font-medium mb-2 font-semibold">Series</h3>
        <div className={isCheckbox ? "flex flex-col gap-2" : "flex flex-wrap gap-2 items-center"}>
          {seriesOptions.map((series, index) => (
            <div className={wrapperClassName} key={index}>
              <input
                className={inputClassName}
                type="checkbox"
                id={`series-${series}`}
                value={series}
                checked={filters.series.includes(series)}
                onChange={() => handleFilterChange("series", series)}
              />
              <label htmlFor={`series-${series}`} className={labelClassName}>
                {series}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="font-medium mb-2 font-semibold">Categories</h3>
        <div className={isCheckbox ? "flex flex-col gap-2" : "flex flex-wrap gap-2 items-center"}>
          {categoryOptions.map((category, index) => (
            <div className={wrapperClassName} key={index}>
              <input
                className={inputClassName}
                type="checkbox"
                id={`category-${category}`}
                value={category}
                checked={filters.categories.includes(category)}
                onChange={() => handleFilterChange("categories", category)}
              />
              <label htmlFor={`category-${category}`} className={labelClassName}>
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="font-medium mb-2 font-semibold">Price</h3>
        <div className={isCheckbox ? "flex flex-col gap-2" : "flex flex-wrap gap-2 items-center"}>
          {[
            { id: "10-30", label: "$10 - $30", min: 10, max: 30 },
            { id: "30-50", label: "$30 - $50", min: 30, max: 50 },
            { id: "50+", label: "$50+", min: 50, max: Infinity },
          ]
            .filter((range) =>
              filteredProducts.some((product) => {
                const productPrice = product.compare_at_price ?? product.price;
                return productPrice >= range.min && productPrice <= range.max;
              })
            )
            .map((range) => (
              <div className={wrapperClassName} key={range.id}>
                <input
                  className={inputClassName}
                  type="checkbox"
                  id={`price-${range.id}`}
                  value={range.id}
                  checked={filters.priceRanges.includes(range.id)}
                  onChange={() => handleFilterChange("priceRanges", range.id)}
                />
                <label htmlFor={`price-${range.id}`} className={labelClassName}>
                  {range.label}
                </label>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}