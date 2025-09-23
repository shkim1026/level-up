import { useState } from "react";

const FilterDropdown = ({ onChange, value }) => {
  const [selected, setSelected] = useState(value || "");

  const options = [
    { label: "Popularity", value: "popularity" },
    { label: "Rating", value: "rating" },
    { label: "Price: Low to High", value: "priceLowHigh" },
    { label: "Price: High to Low", value: "priceHighLow" },
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    onChange?.(value);
  };

  return (
    <div className="flex flex-col gap-1 w-full max-w-[10rem]">
      <label className="text-sm font-medium text-gray-700 sr-only">Sort By</label>
      <select
        value={selected}
        onChange={handleChange}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
