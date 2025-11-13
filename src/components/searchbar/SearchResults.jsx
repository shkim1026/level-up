import { createPortal } from "react-dom";
import { useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import { slugify } from "@/utils/Slugify";

export default function SearchResults({ anchorRef, isSearchBarOpen, results, query }) {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0});
  const collections = new Set(results.map((r) => r.metafields.categories))

  // Tracks dropdown position relative to anchor during animation
  useLayoutEffect(() => {
    if (!anchorRef.current || !isSearchBarOpen) return;

    let rafId = null;
    let animationFrameCount = 0;

    const updatePosition = () => {
      if (!anchorRef.current) return;

      const _ = anchorRef.current.offsetHeight;

      const rect = anchorRef.current.getBoundingClientRect();

      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    };

    const smoothTrackPosition = () => {
      updatePosition();
      animationFrameCount++;

      if (animationFrameCount < 10) {
        rafId = requestAnimationFrame(smoothTrackPosition);
      }
    };

    rafId = requestAnimationFrame(smoothTrackPosition);

    const handleScrollOrResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };

  }, [anchorRef, isSearchBarOpen]);

  return createPortal(
    <motion.div 
      className="absolute bg-white z-50 shadow-lg rounded-b-lg overflow-y-auto w-full lg:w-[800px] px-6"
      style={{top: position.top, left: position.left,}}
      initial={{opacity: 0, maxHeight: 0 }}
      animate={{ opacity: 1, maxHeight: 350 }}
      exit={{ opacity: 0, maxHeight: 0 }}
      transition={{ duration: 0.3 }}
    >
      {results?.length ? (
        <>
          <ul>
            <p className="text-black font-medium text-gray-700 text-sm underline">Collections</p>
            <div className="flex flex-column">
            {[...collections].map((category) => (
              <a key={category} href={`/collections/${slugify(category)}`}>
                <li className="p-3 hover:bg-gray-100 cursor-pointer">
                  <p className="text-black">{category}</p>
                </li>
              </a>
            ))}
            </div>
          </ul>
          <hr className="mb-3 text-gray-200"/>
          <ul>
            <p className="text-black font-medium text-gray-700 text-sm underline">Products</p>
            {results.map((r) => (
              <a key={r.id} href={`/products/${r.handle}`}>
                <li className="p-3 hover:bg-gray-100 cursor-pointer flex">
                  {r.image 
                    ? <img src={r.image} className="w-25 h-25"/>
                    : <div className="bg-gray-200 rounded-lg w-25 h-25 flex items-center justify-center text-gray-500">No Image</div>
                  }
                  <div className="flex flex-col ml-5 justify-center">
                    <h4 className="text-black font-medium">{r.title}</h4>
                    {r.compareAtPrice ? (
                      <div className="flex items-center">
                        <p className="text-red-500">${r.price}</p>
                        <p className="text-gray-600 ml-2 line-through">${r.compareAtPrice}</p>
                      </div>
                    ) : (
                      <p className="text-black">${r.price}</p>
                    )}
                  </div>
                </li>
              </a>
            ))}
          </ul>
        </>
      ) : query.trim() ? (
        <div className="p-3 text-gray-500">No results found</div>
      ) : null}
    </motion.div>,
    document.body
  );
}