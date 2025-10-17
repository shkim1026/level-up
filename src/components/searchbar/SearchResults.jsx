import { createPortal } from "react-dom";
import { useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import { formattedPrice } from "@/utils/FormatPrice";

export default function SearchResults({ anchorRef, isSearchBarOpen, results, query }) {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0});

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
        width: 850,
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
      className="absolute bg-white z-50 shadow-lg rounded-b-lg overflow-y-auto"
      style={position}
      initial={{opacity: 0, maxHeight: 0 }}
      animate={{ opacity: 1, maxHeight: 350 }}
      exit={{ opacity: 0, maxHeight: 0 }}
      transition={{ duration: 0.3 }}
    >
      {results?.length ? (
        <ul>
          {results.map((r) => (
            <a key={r.id} href={`/products/${r.id}`}>
              <li className="p-3 hover:bg-gray-100 cursor-pointer flex">
                <img src={r.image.src} className="w-25 h-25"/>
                <div className="flex flex-col ml-5">
                  <h4 className="text-black font-medium">{r.title}</h4>
                  {r.compare_at_price ? (
                    <div className="flex items-center">
                      <p className="text-red-500">{formattedPrice(r.compare_at_price)}</p>
                      <p className="text-gray-600 ml-2 line-through">{formattedPrice(r.price)}</p>
                    </div>
                  ) : (
                    <p className="text-black">{formattedPrice(r.price)}</p>
                  )}
                </div>
              </li>
            </a>
          ))}
        </ul>
      ) : query.trim() ? (
        <div className="p-3 text-gray-500">No results found</div>
      ) : null}
    </motion.div>,
    document.body
  );
}