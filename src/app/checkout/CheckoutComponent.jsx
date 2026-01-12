import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

export default function CheckoutComponent({ cartItems = [] }) {
  const [code, setCode] = useState("");

  return (
    <main className="flex flex-col max-w-6xl mx-auto">
    {/* Progress nav */}
    <nav className="ml-10 pt-8 pb-2">
        <ol className="flex">
          <li className="flex items-center">
            <Link href="/cart" className="text-sm mr-1 text-blue-600 hover:text-blue-800">
              Cart
            </Link>
            <span className="text-l text-gray-500"><MdKeyboardArrowRight /></span>
          </li>
          <li className="flex items-center">
            <p href="/cart" className="text-sm mx-1 font-bold">
              Information
            </p>
            <span className="text-l text-gray-500"><MdKeyboardArrowRight /></span>
          </li>
          <li className="flex items-center">
            <p href="/cart" className="text-sm mx-1 text-gray-500">
              Shipping
            </p>
            <span className="text-l text-gray-500"><MdKeyboardArrowRight /></span>
          </li>
          <li className="flex items-center">
            <p href="/cart" className="text-sm mx-1 text-gray-500">
              Payment
            </p>
            <span className="text-l text-gray-500"><MdKeyboardArrowRight /></span>
          </li>
        </ol>
      </nav>

      <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white">  
        {/* Left: Customer Info */}
        <div className="bg-gray-50 rounded-2xl shadow p-6 space-y-6">
          <h2 className="text-xl font-bold">Contact</h2>

          <div className="space-y-4">
            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg border-gray-300"
            />
            <input 
              type="checkbox"
              id="newsletter"
              defaultChecked
              className="cursor-pointer"
            />
            <label className="ml-2" htmlFor="newsletter">Email me with news and discount offers</label>

            <h2 className="text-xl font-bold pt-4">Shipping Address</h2>
            
            {/* State */}
            <div className="relative">
                <select 
                  className="peer w-full pt-6 pb-2 px-3 border rounded-lg border-gray-300 bg-transparent appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  id="country"
                  defaultValue="CA"
                >
                  <option value="USA">United States</option>
                </select>
                <label 
                  htmlFor="country" 
                  className="absolute left-3 top-3 text-gray-500 transition-all peer-focus:-top--1 peer-focus:text-xs peer-valid:-top--1 peer-valid:text-xs">
                  Country/Region
                </label>
                <div>
                  <span className="absolute right-3 bottom-5 text-xs text-gray-400"><FaChevronDown /></span>
                </div>
            </div>

            {/* Name */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-3 border rounded-lg border-gray-300"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-3 border rounded-lg border-gray-300"
              />
            </div>

            {/* Address */}
            <input
              type="text"
              placeholder="Address"
              className="w-full p-3 border rounded-lg border-gray-300"
            />
            <input
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
              className="w-full p-3 border rounded-lg border-gray-300"
            />

            <div className="grid grid-cols-3 gap-4">
              {/* City */}
              <input
                type="text"
                placeholder="City"
                className="p-3 border rounded-lg border-gray-300"
              />
              {/* State */}
              <div className="relative">
                <select 
                  className="peer w-full pt-6 pb-2 px-3 border rounded-lg border-gray-300 bg-transparent appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  id="state"
                  defaultValue="CA"
                >
                  <option value="" disabled hidden></option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
                <label 
                  htmlFor="state" 
                  className="absolute left-3 top-3 text-gray-500 transition-all peer-focus:-top--1 peer-focus:text-xs peer-valid:-top--1 peer-valid:text-xs">
                  State
                </label>
                <div>
                  <span className="absolute right-3 bottom-5 text-xs text-gray-400"><FaChevronDown /></span>
                </div>
              </div>
              {/* Zip */}
              <input
                type="text"
                placeholder="ZIP Code"
                className="p-3 border rounded-lg border-gray-300"
              />
            </div>
            <div className="flex justify-between mt-10 items-center">
              <Link href="/cart" className="text-blue-600 hover:text-blue-800">
                <span className="flex">
                  <MdOutlineKeyboardArrowLeft className="text-2xl mr-1"/>
                  <p>Return to cart</p>
                </span>
              </Link>
              <button className="bg-blue-500 text-white rounded-lg p-5 cursor-pointer hover:bg-blue-800 font-semibold">Continue to shipping</button>
            </div>
          </div>
        </div>

        {/* Right: Cart Summary */}
        <div className="bg-gray-100 rounded-2xl shadow p-6 space-y-6 flex flex-col">
          <Image src="/Level up logo.png" width="200" height="200" alt="Level up logo" className="self-center"/>
          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-gray-500 text-sm">Size: {item.selectedSize}</p>
                      <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))
            )}
          </div>

          {/* Discount Code */}
          <div className="flex">
            <div className="relative w-full mr-5">
              <input 
                type="text"  
                id="discount"
                placeholder=" "
                className="peer border border-gray-400 bg-white px-3 pt-5 pb-1 rounded-lg w-full top-3"
                onChange={(e) => setCode(e.target.value)}
              />
              <label 
                htmlFor="discount" 
                className="
                  absolute left-3 top-2 text-gray-500 transition-all duration-200 
                  peer-placeholder-shown:top-3 peer-placeholder-shown-text-base 
                  peer-focus:top-1 peer-focus:text-sm 
                  peer-not-placeholder-shown:top-1 peer-not-placeholder-show:text-xs
                "
              >
                Discount code or gift card
              </label>
            </div>
            <button 
              disabled={!code.trim()}
              className={`
                border border-gray-400 rounded-lg font-semibold px-3
                ${!code.trim()
                  ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                  : "text-white bg-blue-600 hover:bg-blue-800 cursor-pointer"}
              `}
            >Apply</button>
          </div>

          {/* Total */}
          <div className="pt-4 border-t border-gray-400">
            <div className="flex justify-between text-sm pb-2">
              <span>Subtotal &#8226; {cartItems.length} items</span>
              <span>$
                {cartItems
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm pb-2">
              <span>Shipping</span>
              <span className="text-gray-500">Calculated at the next step</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>
                $
                {cartItems
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
