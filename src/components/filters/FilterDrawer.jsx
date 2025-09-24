import { useState } from "react";

export default function FilterDrawer( {products} ) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className="px-4 py-1 border text-black rounded-lg"
        onClick={() => setOpen(true)}
      >
        Filters
      </button>

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
          <button onClick={() => setOpen(false)}>X</button>
        </div>
        <div className="px-5 mt-10">
          <h3 className="font-medium mb-2 font-semibold">Series</h3>
          <div className="flex gap-2 items-center">
            {[...new Set(products.map((product) => product.series))].map((series) => (
              <div className="flex items-center" key={series}>
                <input className="appearance-none peer " type="checkbox" id={series} value={series} />
                <label htmlFor={series} className="flex items-center gap-2 border border-gray-400 rounded-md w-fit py-1 px-2 cursor-pointer peer-checked:bg-gray-300 peer-checked:font-semibold">
                  {series}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="px-5 mt-10">
          <h3 className="font-medium mb-2 font-semibold">Categories</h3>
          <div className="flex gap-2 items-center">
            {[...new Set(products.map((product) => product.category))].map((category) => (
              <div className="flex items-center" key={category}>
                <input className="appearance-none peer " type="checkbox" id={category} value={category} />
                <label htmlFor={category} className="flex items-center gap-2 border border-gray-400 rounded-md w-fit py-1 px-2 cursor-pointer peer-checked:bg-gray-300 peer-checked:font-semibold">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}