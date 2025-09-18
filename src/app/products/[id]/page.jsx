"use client";

import products from "@/data/mockProducts.json";
import Image from "next/image";
import React, { useState, use } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function ProductDetails({ params }) {
  const [quantity, setQuantity] = useState(1);
  const decrement = () => setQuantity(prev => Math.max(1, prev - 1));
  const increment = () => setQuantity(prev => prev + 1);

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else {
      setQuantity(1);
    }
  };

  const { id } = use(params);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <p className="p-8 text-red-500">Product not found. ID: {params.id}</p>
  }

  return (
    <div className="p-8 max-w-2x1 mx-auto flex">
      <div className="relative w-[400px] h-[400px] mx-auto">
        <Image 
            src={product.image}
            alt={product.title}
            fill
            className="rounded-lg object-cover"
        />
      </div>

      <div className="max-w-md">
        <h2 className="mt-6 text-sm text-gray-400">
          {product.series}
        </h2>
        <h1 className="text-2xl font-semibold">{product.title}</h1>

        {product.sale ? (
          <div className="flex items-center mt-2">
              <p className="text-red-500 text-xl mr-2">${product.sale}</p>
              <p className="text-gray-500 line-through">${product.price}</p>
          </div>
        ) : (
          <p className="mt-2 text-xl">${product.price}</p>
        )}
        <hr className="text-gray-300 mt-4"/>
        <div>
          <p className="text-sm mt-5">{product.description.gen}</p>
          <ul>
            {product.description.prop.map((listItem) => (
              <li className="text-sm mt-2 ml-3 list-disc" key={listItem}>{listItem}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex justify-between text-sm gap-2 mt-4">
            <legend>Size:</legend>
            <button className="underline">Size Chart</button>
          </div>
          <div className="mt-3 flex">
            <div>
              <input type="radio" value="S" id="S" name="size" className="sr-only peer" defaultChecked={true}></input>
              <label htmlFor="S" className="transition-all border px-3 py-2 text-sm mr-2 text-gray-400 peer-checked:text-white peer-checked:bg-black peer-checked:border-black hover:bg-gray-300 rounded-sm cursor-pointer">S</label>
            </div>
            <div>
              <input type="radio" value="M" id="M" name="size" className="sr-only peer"></input>
              <label htmlFor="M" className="transition-all border px-3 py-2 text-sm mr-2 text-gray-400 peer-checked:text-white peer-checked:bg-black peer-checked:border-black hover:bg-gray-300 rounded-sm cursor-pointer">M</label>
            </div>
            <div>
              <input type="radio" value="L" id="L" name="size" className="sr-only peer"></input>
              <label htmlFor="L" className="transition-all border px-3 py-2 text-sm mr-2 text-gray-400 peer-checked:text-white peer-checked:bg-black peer-checked:border-black hover:bg-gray-300 rounded-sm cursor-pointer">L</label>
            </div>
            <div>
              <input type="radio" value="XL" id="XL" name="size" className="sr-only peer"></input>
              <label htmlFor="XL" className="transition-all border px-3 py-2 text-sm mr-2 text-gray-400 peer-checked:text-white peer-checked:bg-black peer-checked:border-black hover:bg-gray-300 rounded-sm cursor-pointer">XL</label>
            </div>
            <div>
              <input type="radio" value="XXL" id="XXL" name="size" className="sr-only peer"></input>
              <label htmlFor="XXL" className="transition-all border px-3 py-2 text-sm mr-2 text-gray-400 peer-checked:text-white peer-checked:bg-black peer-checked:border-black hover:bg-gray-300 rounded-sm cursor-pointer">XXL</label>
            </div>
          </div>
        </div>

        <div className="border rounded-sm border-gray-400 text-gray-500 mt-6 flex max-w-fit">
          <button className="p-3 cursor-pointer" onClick={decrement}>
            <span className="sr-only">Decrease quantity</span>
            <FiMinus />
          </button>
          <input type="text" className="max-w-8 text-center" value={quantity} onChange={handleChange}/>
          <button className="p-3 cursor-pointer" onClick={increment}>
            <span className="sr-only">Increase quantity</span>
            <FiPlus />
          </button>
        </div>

        <button className="mt-7 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition w-full">
          Add to Cart
        </button>
      </div>
    </div>
  );
}