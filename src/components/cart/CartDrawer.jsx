"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext";
import Image from "next/image";
import { TfiClose, TfiTrash } from 'react-icons/tfi';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useEffect } from "react";
import formatSizeLabel from "@/utils/FormatSizeLabel";

export default function CartDrawer() {
  const { isOpen, toggleCart, cartItems, removeFromCart, decreaseCartQuantity, increaseCartQuantity, getCartTotal } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
          />

          {/* Drawer Panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold text-black">Your Cart <span>({cartItems.length} items)</span></h2>
              
              <button className="text-black cursor-pointer" onClick={toggleCart}>
                <TfiClose />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-gray-900 text-center mt-10">
                  Your cart is empty.
                </p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedSize}`}
                    className="flex items-center border-b pb-2"
                  >
                    <Image 
                      src={item.image}
                      alt={item.title}
                      width={80}
                      height={80}
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between">
                        <p className="font-semibold text-sm text-black">{item.title}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-600 cursor-pointer hover:text-black"
                        >
                          <TfiTrash />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">Size: {formatSizeLabel(item.selectedSize)}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="border rounded-sm border-gray-400 text-gray-500 flex max-w-fit">
                          <button className="p-2 cursor-pointer hover:bg-gray-300" onClick={() => decreaseCartQuantity(item.id, item.selectedSize)}>
                            <span className="sr-only">Decrease quantity</span>
                            <FiMinus />
                          </button>
                          <input
                            type="text"
                            className="max-w-8 text-center"
                            value={item.quantity}
                            readOnly
                          />
                          <button className="p-2 cursor-pointer hover:bg-gray-300" onClick={() => increaseCartQuantity(item.id, item.selectedSize)}>
                            <span className="sr-only">Increase quantity</span>
                            <FiPlus />
                          </button>
                        </div>
                        <div className="flex">
                          {item.compareAtPrice && (
                            <p className="text-gray-500 line-through mr-2">${(item.compareAtPrice * item.quantity).toFixed(2)}</p>
                          )}
                          <p className="text-black">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* Footer  */}
            <div className="border-t p-4">
              <button className="w-full bg-black py-3 font-bold cursor-pointer" disabled={cartItems.length === 0}>
                Checkout <span>(${getCartTotal().toFixed(2)})</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}