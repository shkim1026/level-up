import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CartComponent({ cartItems = [] }) {
  console.log(cartItems, "cartItems:")
  return (
    <main className="mx-auto max-w-6xl">
      <h1 className="flex justify-center text-3xl font-semibold uppercase py-10">Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className="flex mx-auto border-b border-gray-300">
            <Image src={item.image} width={200} height={200} alt={item.title} />
            <div className="flex flex-col space-y-2 my-auto">
              <p className="text-xs">{item.metafields.series}</p>
              <p className="font-semibold">{item.title}</p>
              
              {item.compareAtPrice ? (
                <div className="flex">
                  <p>${item.price}</p>
                  <p className="line-through text-gray-500 pl-2">${item.compareAtPrice}</p>
                </div>
              ) : (
                <p>${item.price}</p>
              )}
              <p className="text-xs">{item.selectedSize}</p>
            </div>
          </div>
        ))
      )}
    </main>
  )
}