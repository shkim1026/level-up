import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TfiClose } from 'react-icons/tfi';
import sizeCharts, { defaultSizeChart } from "@/lib/shopify/sizeCharts";

export default function SizeChartPopup({ product }) {
  const [open, setOpen] = useState(false);

  const category = product?.metafields?.categories;
  const chart = sizeCharts[category] ?? defaultSizeChart;

  // Close on Esc key
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="text-sm underline hover:text-gray-700 transition cursor-pointer"
      >
        Size Chart
      </button>

      {/* Popup Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-dark-gray/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full relative p-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <TfiClose size={20} className="cursor-pointer" />
              </button>

              {/* Popup Content */}
              <h2 className="text-xl font-semibold mb-4 text-center">
                Size Chart{category ? ` — ${category}` : ""}
              </h2>

              <div className="overflow-x-auto">
                <table className="min-w-full border text-sm text-left border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      {chart.headers.map((header) => (
                        <th key={header} className="p-2 border">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {chart.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, i) => (
                          <td key={i} className="p-2 border">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                *Measurements are approximate and may vary slightly.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}