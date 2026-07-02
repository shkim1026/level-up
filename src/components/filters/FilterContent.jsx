"use client";
import { useProductContext } from "@/context/ProductContext";

export default function FilterContent({ variant = "checkbox" }) {
  const {
    productsForPage,
    filteredProducts,
    filters,
    handleFilterChange,
    handleClearFilters,
    lastChangedFilter,
  } = useProductContext();

  const isChip = variant === "chip";

  const allSeries = [...new Set(productsForPage.map((p) => p.metafields.series))].filter(Boolean);
  const visibleSeries = [...new Set(filteredProducts.map((p) => p.metafields.series))].filter(Boolean);
  const availableSeries = lastChangedFilter === "series" ? allSeries : visibleSeries;

  const allCategories = [...new Set(productsForPage.map((p) => p.metafields.categories))].filter(Boolean);
  const visibleCategories = [...new Set(filteredProducts.map((p) => p.metafields.categories))].filter(Boolean);
  const availableCategories = lastChangedFilter === "categories" ? allCategories : visibleCategories;

  const priceRangeDefs = [
    { id: "10-30", label: "$10 - $30", min: 10, max: 30 },
    { id: "30-50", label: "$30 - $50", min: 30, max: 50 },
    { id: "50+", label: "$50+", min: 50, max: Infinity },
  ];

  const isPriceRangeAvailable = (range) =>
    filters.priceRanges.includes(range.id) ||
    filteredProducts.some((product) => {
      const productPrice = product.compare_at_price ?? product.price;
      return productPrice >= range.min && productPrice <= range.max;
    });

  // Renders one option as either a checklist row (desktop) or a pill chip (mobile)
  function FilterOption({ idPrefix, value, label, checked, isAvailable, onChange }) {
    const id = `${idPrefix}-${value}`;
    const isDisabled = !isAvailable && !checked;

    if (isChip) {
      return (
        <div className="flex items-center">
          <input
            className="appearance-none peer"
            type="checkbox"
            id={id}
            value={value}
            checked={checked}
            disabled={isDisabled}
            onChange={onChange}
          />
          <label
            htmlFor={id}
            className={`flex items-center uppercase text-sm gap-2 border rounded-md w-fit py-1 px-2 whitespace-nowrap peer-checked:bg-gray-300 peer-checked:font-semibold ${
              isAvailable
                ? "border-gray-400 cursor-pointer"
                : "border-gray-200 text-gray-300 cursor-not-allowed"
            }`}
          >
            {label}
          </label>
        </div>
      );
    }

    return (
      <div className="flex items-center">
        <input
          className={isAvailable ? "cursor-pointer" : "cursor-not-allowed"}
          type="checkbox"
          id={id}
          value={value}
          checked={checked}
          disabled={isDisabled}
          onChange={onChange}
        />
        <label
          htmlFor={id}
          className={`ml-2 text-sm ${
            isAvailable ? "text-dark-gray cursor-pointer" : "text-gray-300 cursor-not-allowed"
          } ${checked ? "font-semibold" : ""}`}
        >
          {label}
        </label>
      </div>
    );
  }

  const listLayout = isChip ? "flex flex-wrap gap-2 items-center" : "flex flex-col gap-3";

  return (
    <>
      <div>
        <h3 className="font-medium mb-2 font-semibold">Series</h3>
        <div className={listLayout}>
          {allSeries.map((series) => (
            <FilterOption
              key={series}
              idPrefix="series"
              value={series}
              label={series}
              checked={filters.series.includes(series)}
              isAvailable={availableSeries.includes(series) || filters.series.includes(series)}
              onChange={() => handleFilterChange("series", series)}
            />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="font-medium mb-2 font-semibold">Categories</h3>
        <div className={listLayout}>
          {allCategories.map((category) => (
            <FilterOption
              key={category}
              idPrefix="category"
              value={category}
              label={category}
              checked={filters.categories.includes(category)}
              isAvailable={availableCategories.includes(category) || filters.categories.includes(category)}
              onChange={() => handleFilterChange("categories", category)}
            />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="font-medium mb-2 font-semibold">Price</h3>
        <div className={listLayout}>
          {priceRangeDefs.map((range) => (
            <FilterOption
              key={range.id}
              idPrefix="price"
              value={range.id}
              label={range.label}
              checked={filters.priceRanges.includes(range.id)}
              isAvailable={isPriceRangeAvailable(range)}
              onChange={() => handleFilterChange("priceRanges", range.id)}
            />
          ))}
        </div>
      </div>
      <button className="underline font-semibold cursor-pointer text-sm mt-10" onClick={handleClearFilters}>
        Clear All
      </button>
    </>
  );
}