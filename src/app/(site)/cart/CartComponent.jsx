import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from "@/components/cart/CartContext";

export default function CartComponent() {
  const { cartItems, removeFromCart, decreaseCartQuantity, increaseCartQuantity, getCartTotal } = useCart();
  console.log(cartItems, "cartItems:")
  return (
    <main className="mx-auto max-w-7xl">
      <h1 className="flex justify-center text-3xl font-semibold uppercase py-10">Cart</h1>
      {cartItems.length === 0 ? (
        <p className="flex justify-center">Your cart is empty.</p>
      ) : (
        <div className="pb-10 mx-4 md:mx-8">
          <div>
            {/* Table Heading */}
            <div className="hidden md:grid border-b border-gray-300 grid-cols-5 gap-4 text-gray-500 uppercase text-sm pb-3">
              <p className="mr-auto font-normal">Product</p>
              <p className="col-start-4 mx-auto font-normal">Quantity</p>
              <p className="col-start-5 ml-auto font-normal">Total</p>
            </div>

            <div>
              {cartItems.map((item, index) => (
                <div key={index} className="border-b border-gray-300 md:grid grid-cols-5 gap-4">
                  <div className="flex mx-auto col-start-1 col-end-3">
                    <Link href={`/products/${item.handle}`} className="flex self-center w-[70px] h-[70px] md:w-[200px] md:h-[200px] shrink-0">
                      <Image src={item.image} width={200} height={200} alt={item.title}/>
                    </Link>
                    <div className="flex flex-col space-y-2 my-auto">
                      <Link href={`/collections/${item.metafields.series}`}>
                        <p className="text-xs hover:underline pt-2 md:pt-0">{item.metafields.series}</p>
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
                      {item.selectedSize && (
                        <p className="text-xs text-gray-600">Size: {item.selectedSize}</p>
                      )}
                      {/* QUANTITY FOR MOBILE */}
                      <div className="md:hidden flex items-center col-start-4 mr-auto">
                        <div className="border rounded-sm border-gray-400 text-gray-500 flex mb-2">
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
                          className="text-gray-600 cursor-pointer hover:text-black underline text-xs pl-4 mb-2"
                        >Remove</p>
                      </div>
                    </div>
                  </div>


                  <div className="hidden md:flex flex-col items-center col-start-4 my-auto">
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
                  </div>

                  <div className="hidden md:block my-auto ml-auto">
                    <p className="text-gray-700">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ml-auto py-4 md:text-right">
            <div>
              <span className="pr-2">Total:</span>
              <span>${getCartTotal().toFixed(2)} USD</span>
            </div>
            <p className="text-xs text-gray-500 pt-2">Taxes and shipping calculated at checkout</p>
          </div>

          <div className="md:flex md:justify-end">
            <Link href="/checkout">
              <button className="text-white py-3 px-5 bg-black rounded-lg uppercase text-sm cursor-pointer hover:bg-gray-800 w-full text-center md:w-fit">Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}