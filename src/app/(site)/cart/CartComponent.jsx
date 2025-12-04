import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from "@/components/cart/CartContext";

export default function CartComponent() {
  const { cartItems, removeFromCart, decreaseCartQuantity, increaseCartQuantity, getCartTotal } = useCart();
  console.log(cartItems, "cartItems:")
  return (
    <main className="mx-auto max-w-6xl">
      <h1 className="flex justify-center text-3xl font-semibold uppercase py-10">Cart</h1>
      {cartItems.length === 0 ? (
        <p className="flex justify-center">Your cart is empty.</p>
      ) : (
        <div className="pb-10">
          <table>
            <thead>
              <tr className="border-b border-gray-300 grid grid-cols-5 gap-4 text-gray-500 uppercase text-sm pb-3">
                <th className="mr-auto font-normal">Product</th>
                <th className="col-start-4 mx-auto font-normal">Quantity</th>
                <th className="col-start-5 ml-auto font-normal">Total</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index} className="border-b border-gray-300 grid grid-cols-5 gap-4">
                  <td className="flex mx-auto col-start-1 col-end-3">
                    <Image src={item.image} width={200} height={200} alt={item.title} />
                    <div className="flex flex-col space-y-2 my-auto">
                      <Link href={`/collections/${item.metafields.series}`}>
                        <p className="text-xs hover:underline">{item.metafields.series}</p>
                      </Link>
                      <Link href={`/products/${item.handle}`}>
                        <p className="font-semibold hover:underline">{item.title}</p>
                      </Link>
                      {item.compareAtPrice ? (
                        <div className="flex">
                          <p className="text-gray-600">${item.price}</p>
                          <p className="line-through text-gray-400 pl-2">${item.compareAtPrice}</p>
                        </div>
                      ) : (
                        <p className="text-gray-600">${item.price}</p>
                      )}
                      <p className="text-xs text-gray-600">{item.selectedSize}</p>
                    </div>
                  </td>


                  <td className="flex flex-col items-center col-start-4 my-auto">
                    <div className="border rounded-sm border-gray-400 text-gray-500 flex">
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
                    <p
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-gray-600 cursor-pointer hover:text-black underline text-xs"
                    >Remove</p>
                  </td>

                  <td className="my-auto ml-auto">
                    <p className="text-gray-700">${(item.price * item.quantity).toFixed(2)}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="ml-auto py-4 text-right">
            <div>
              <span className="pr-2">Total:</span>
              <span>${getCartTotal().toFixed(2)} USD</span>
            </div>
            <p className="text-xs text-gray-500 pt-2">Taxes and shipping calculated at checkout</p>
          </div>

          <Link href="/checkout">
            <button className="flex text-white py-3 px-5 bg-black rounded-lg uppercase text-sm cursor-pointer hover:bg-gray-800 ml-auto">Checkout</button>
          </Link>
        </div>
      )}
    </main>
  )
}