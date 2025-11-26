import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function CheckoutComponent({ cartItems = [] }) {
  return (
    <main className="flex flex-col max-w-6xl mx-auto">
    {/* Progress nav */}
      <nav className="ml-10 pt-8">
        <ol className="flex">
          <li className="flex items-center">
            <Link href="/cart" className="text-sm mr-1">
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

      <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-gray-50">
        {/* Left: Customer Info */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-6">
          <h2 className="text-xl font-bold">Contact</h2>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-xl border-gray-300"
            />
            <input 
              type="checkbox"
              id="newsletter"
              defaultChecked
            />
            <label className="ml-2" htmlFor="newsletter">Email me with news and discount offers</label>

            <h2 className="text-xl font-bold pt-4">Shipping Address</h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-3 border rounded-xl border-gray-300"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-3 border rounded-xl border-gray-300"
              />
            </div>
            <input
              type="text"
              placeholder="Address"
              className="w-full p-3 border rounded-xl border-gray-300"
            />
            <input
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
              className="w-full p-3 border rounded-xl border-gray-300"
            />

            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="City"
                className="p-3 border rounded-xl border-gray-300"
              />
              <select className="p-3 border rounded-xl border-gray-300">
                <option value="">State</option>
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
              <input
                type="text"
                placeholder="ZIP Code"
                className="p-3 border rounded-xl border-gray-300"
              />
            </div>
            <div className="flex justify-between mt-10 items-center">
              <Link href="/cart" className="hover:text-gray-800">
                <span className="flex">
                  <MdOutlineKeyboardArrowLeft className="text-2xl mr-1"/>
                  <p>Return to cart</p>
                </span>
              </Link>
              <button className="bg-black text-white rounded-xl p-5 cursor-pointer hover:bg-gray-800 font-semibold">Continue to shipping</button>
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
                      className="w-16 h-16 object-cover rounded-xl"
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

          {/* Total */}
          <div className="pt-4 border-t flex justify-between text-lg font-bold">
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
    </main>
  );
}
