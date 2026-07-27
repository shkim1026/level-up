import { motion } from "framer-motion";
import Link from "next/link";
import { slugify } from "@/utils/Slugify";
import { formatPrice } from "@/utils/FormatPrice";

export default function SearchResults({ results, query, onItemClick }) {
  const collections = new Set(
    results
      .map((r) => r.metafields?.categories)
      .filter(Boolean)
  );

  if (!query.trim()) return null;

  return (
    <motion.div
      data-search-results
      role="region"
      aria-live="polite"
      aria-label="Search results"
      className="absolute top-full left-0 mt-4 bg-white z-50 shadow-lg rounded-b-lg overflow-y-auto w-full lg:w-[800px] px-10 py-4 border border-gray-100 max-h-[350px]"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      {results?.length ? (
        <>
          {/* Collections Section */}
          {collections.size > 0 && (
            <ul>
              <p className="text-dark-gray font-medium text-gray-700 text-sm underline mb-2">Collections</p>
              <div className="flex flex-wrap">
                {[...collections].map((category) => (
                  <li key={category}>
                    <Link
                      href={`/collections/${slugify(category)}`}
                      onClick={onItemClick}
                      className="block p-3 hover:bg-gray-100 cursor-pointer rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-dark-gray"
                    >
                      <p className="text-dark-gray">{category}</p>
                    </Link>
                  </li>
                ))}
              </div>
            </ul>
          )}

          <hr className="my-3 text-gray-200" />

          {/* Products Section */}
          <ul>
            <p className="text-dark-gray font-medium text-gray-700 text-sm underline mb-2">Products</p>
            {results.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/products/${r.handle}`}
                  onClick={onItemClick}
                  className="p-3 hover:bg-gray-100 cursor-pointer flex rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dark-gray"
                >
                  {r.image ? (
                    <img
                      src={r.image}
                      alt={r.title}
                      className="w-24 h-24 object-cover rounded-md flex-shrink-0"
                    />
                  ) : (
                    <div className="bg-gray-200 rounded-lg w-24 h-24 flex items-center justify-center text-gray-500 flex-shrink-0">
                      No Image
                    </div>
                  )}
                  <div className="flex flex-col ml-5 justify-center">
                    <p className="text-gray-600 font-small">{r.metafields?.series}</p>
                    <h4 className="text-dark-gray font-medium">{r.title}</h4>
                    {r.compareAtPrice ? (
                      <div className="flex items-center">
                        <p className="text-red-500 mr-2">
                          <span className="sr-only">Sale price: </span>
                          {formatPrice(r.price)}
                        </p>
                        <p className="text-gray-600 line-through">
                          <span className="sr-only">Original price: </span>
                          {formatPrice(r.compareAtPrice)}
                        </p>
                      </div>
                    ) : (
                      <p className="text-dark-gray">{formatPrice(r.price)}</p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="p-3 text-gray-500">No results found</div>
      )}
    </motion.div>
  );
}