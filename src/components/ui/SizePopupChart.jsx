import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TfiClose } from 'react-icons/tfi';

export default function SizeChartPopup() {
  const [open, setOpen] = useState(false);

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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
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
                Size Chart
              </h2>

              <div className="overflow-x-auto">
                <table className="min-w-full border text-sm text-left border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 border">Size</th>
                      <th className="p-2 border">Chest (in)</th>
                      <th className="p-2 border">Waist (in)</th>
                      <th className="p-2 border">Length (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border">S</td>
                      <td className="p-2 border">34-36</td>
                      <td className="p-2 border">28-30</td>
                      <td className="p-2 border">27</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">M</td>
                      <td className="p-2 border">38-40</td>
                      <td className="p-2 border">32-34</td>
                      <td className="p-2 border">28</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">L</td>
                      <td className="p-2 border">42-44</td>
                      <td className="p-2 border">36-38</td>
                      <td className="p-2 border">29</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">XL</td>
                      <td className="p-2 border">46-48</td>
                      <td className="p-2 border">40-42</td>
                      <td className="p-2 border">30</td>
                    </tr>
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
