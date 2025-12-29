"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { FiMinus, FiPlus } from "react-icons/fi";
import SizeChartPopup from "@/components/ui/SizePopupChart";
import formatSizeLabel from "@/utils/FormatSizeLabel";

export default function ProductPurchaseControls({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(
    product.variants?.[0]?.options?.[0]?.value || null
  )
  const [variantId, setVariantId] = useState("");

  const { addToCart } = useCart();

  const decrement = () => setQuantity(prev => Math.max(1, prev - 1));
  const increment = () => setQuantity(prev => prev + 1);

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(!isNaN(value) && value > 0 ? value : 1);
  };

  return (
    <>
      {/* Size Selector */}
      <div className="flex justify-between text-sm gap-2 mt-4">
        <legend>Size:</legend>
        <SizeChartPopup />
      </div>
      <div className="mt-3 flex">
        {product.variants.map((variant, index) => {
          const sizeValue = variant.options[0].value;
          const sizeInitial = formatSizeLabel(sizeValue);
          
          return (
            <div key={variant.id}>
              <input
                type="radio"
                value={sizeValue}
                id={variant.id}
                name="size"
                className="sr-only peer"
                defaultChecked={index === 0}
                onChange={() => {
                  setVariantId(variant.id); 
                  setSelectedSize(sizeValue);
                }}
              />
              <label
                htmlFor={variant.id}
                className="transition-all border px-3 py-2 text-sm mr-2 text-gray-400 peer-checked:text-white peer-checked:bg-black peer-checked:hover:text-white peer-checked:hover:bg-gray-800 peer-checked:border-black hover:bg-gray-300 rounded-sm cursor-pointer"
              >
                {sizeInitial}
              </label>
            </div>
          );
        })}
      </div>

      {/* Quantity */}
      <div className="border rounded-sm border-gray-400 text-gray-500 mt-6 flex max-w-fit">
        <button className="p-3 cursor-pointer hover:bg-gray-300" onClick={decrement}>
          <span className="sr-only">Decrease quantity</span>
          <FiMinus />
        </button>
        <input
          type="text"
          className="max-w-8 text-center"
          value={quantity}
          onChange={handleChange}
        />
        <button className="p-3 cursor-pointer hover:bg-gray-300" onClick={increment}>
          <span className="sr-only">Increase quantity</span>
          <FiPlus />
        </button>
      </div>

      {/* Add to Cart */}
      <button 
        className="mt-7 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition w-full cursor-pointer uppercase tracking-wide"
        onClick={() => addToCart({...product, quantity, selectedSize, variantId})}
      >
        Add to Cart
      </button>
    </>
  )
}