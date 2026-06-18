"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { FiMinus, FiPlus } from "react-icons/fi";
import SizeChartPopup from "@/components/ui/SizePopupChart";
import colorMap from "@/lib/shopify/colorMap";

export default function ProductPurchaseControls({ product, selectedColor, setSelectedColor }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(
    product.variants[0]?.options.find((o) => o.name?.toLowerCase() === "size")?.value ?? ""
  );
  const colors = [...new Set(
    product.variants.map((v) => v.options.find((o) => o.name?.toLowerCase() === "color")?.value)
    .filter(Boolean)
  )];
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");

  const { addToCart } = useCart();

  const decrement = () => setQuantity(prev => Math.max(1, prev - 1));
  const increment = () => setQuantity(prev => prev + 1);

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(!isNaN(value) && value > 0 ? value : 1);
  };

  console.log("Colors:", colors)
  console.log("variant options:", product.variants[0]?.options)
  console.log("variant image:", product.variants[0]?.image)

  return (
    <>
      {/* Color Selector */}
      <div className="text-sm mt-4">
        <legend>Color:</legend>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {colors.map((color) => (
          <div key={color}>
            <input
              type="radio"
              value={color}
              id={`color-${color}`}
              name="color"
              className="sr-only peer"
              checked={color === selectedColor}
              onChange={() => {
                setSelectedColor(color);
                const sameSize = product.variants.find(
                  (v) =>
                    v.options.find((o) => o.name?.toLowerCase() === "color")?.value === color &&
                    v.options.find((o) => o.name?.toLowerCase() === "size")?.value === selectedSize
                );
                const fallback = product.variants.find(
                  (v) => v.options.find((o) => o.name?.toLowerCase() === "color")?.value === color
                );
                const target = sameSize || fallback;
                if (target) {
                  setVariantId(target.id);
                  setSelectedSize(target.options.find((o) => o.name?.toLowerCase() === "size")?.value);
                }
              }}
            />
          <label
            htmlFor={`color-${color}`}
            className="block relative w-8 h-8 rounded-full border-2 border-gray-300 peer-checked:border-dark-gray cursor-pointer hover:scale-110 transition-all"
            style={{ backgroundColor: colorMap[color] || "#ccc" }}
            title={color}
          />
          </div>
        ))}
      </div>

      {/* Size Selector */}
      <div className="flex justify-between text-sm gap-2 mt-4">
        <legend>Size:</legend>
        <SizeChartPopup />
      </div>
      
      <div className="mt-3 flex">
        {product.variants
          .filter((variant) => 
            variant.options.find((o) => o.name?.toLowerCase() === "color")?.value === selectedColor
          )
          .map((variant) => {
            const sizeValue = variant.options.find((o) => o.name?.toLowerCase() === "size")?.value;
            return (
              <div key={variant.id}>
                <input
                  type="radio"
                  value={sizeValue}
                  id={variant.id}
                  name="size"
                  className="sr-only peer"
                  checked={sizeValue === selectedSize}
                  onChange={() => {
                    setVariantId(variant.id);
                    setSelectedSize(sizeValue);
                  }}
                />
                <label
                  htmlFor={variant.id}
                  className="transition-all border px-3 py-2 text-sm mr-2 text-gray-400 peer-checked:text-white peer-checked:bg-dark-gray peer-checked:hover:text-white peer-checked:hover:bg-hover-gray peer-checked:border-dark-gray hover:bg-gray-300 rounded-sm cursor-pointer"
                >
                  {sizeValue}
                </label>
              </div>
            );
          })}
      </div>

      {/* Quantity */}
      <div className="text-sm mt-6">
        <legend>Qty:</legend>
      </div>

      <div className="border rounded-sm border-gray-400 text-gray-500 mt-2 flex max-w-fit">
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
        className="mt-7 px-6 py-2 bg-dark-gray text-white rounded-lg hover:bg-hover-gray transition w-full cursor-pointer uppercase tracking-wide"
        onClick={() => {
          const variantImage = product.variants.find(
            (v) => v.options.find((o) => o.name?.toLowerCase() === "color")?.value === selectedColor
          )?.image ?? product.image;

          addToCart({ ...product, quantity, selectedSize, variantId, selectedColor, image: variantImage });
        }}
      >
        Add to Cart
      </button>
    </>
  )
}