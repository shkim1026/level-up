"use client";

import { useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Montserrat } from "next/font/google";
import { FaChevronDown } from "react-icons/fa";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
});

const options = [
  { label: "Popularity", value: "popularity" },
  { label: "Rating", value: "rating" },
  { label: "Price: Low to High", value: "priceLowHigh" },
  { label: "Price: High to Low", value: "priceHighLow" },
];

export default function FilterDropdown({ onChange, value }) {
  const [selected, setSelected] = useState(
    options.find((o) => o.value === value) || options[0]
  );

  const handleChange = (opt) => {
    setSelected(opt);
    onChange?.(opt.value);
  };

  return (
    <div className="flex flex-col gap-1 w-full max-w-[10.5rem] mb-1">
      <label className="text-sm font-medium text-gray-700 sr-only">Sort By</label>
      <Listbox value={selected} onChange={handleChange}>
        {({ open }) => (
          <div className="relative">
            {/* Button */}
            <ListboxButton
              className={`${montserrat.className} relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white py-2 pl-3 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm`}
            >
              {selected.label}
              <motion.span 
                className="absolute inset-y-0 right-0 flex items-center mr-3"
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <FaChevronDown />
              </motion.span>
            </ListboxButton>
            <AnimatePresence>
              {open && (
                <ListboxOptions
                  static
                  as={motion.div}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0,  opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  className={`${montserrat.className} z-100 absolute max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm`}
                >
                  {options.map((opt) => (
                    <ListboxOption
                      key={opt.value}
                      value={opt}
                      className={`relative cursor-pointer select-none py-2 pl-3 data-selected:bg-black data-selected:text-white data-active:bg-gray-500 data-active:text-white`}
                    >
                      {opt.label}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              )}
            </AnimatePresence>
          </div>
        )}
      </Listbox>
    </div>
  );
}
