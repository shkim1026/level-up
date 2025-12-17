"use client";

import Image from "next/image";
import Link from "next/link";

export default function Login() {
  function handleShopifyLogin() {
    window.location.href =
      "https://level-up-272060.myshopify.com/account/login";
  }

  function handleShopifySignup() {
    window.location.href = 
      "https://level-up-272060.myshopify.com/account/register";
  }

  return (
    <main className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white max-w-lg rounded-lg w-full">
        <div className="flex flex-col w-full px-10 py-8">
          <Link href="/">
            <Image
              className="mx-auto"
              src="/Level up logo.png"
              width={200}
              height={200}
              alt="Level up logo"
            />
          </Link>

          <button
            onClick={handleShopifyLogin}
            className="rounded-lg bg-blue-500 hover:bg-blue-800 text-white font-semibold my-6 py-3 cursor-pointer"
          >
            Sign in with Shopify
          </button>

          <p className="text-sm text-gray-500 text-center">
            You’ll be securely redirected to Shopify to sign in.
          </p>

          <p className="mt-5 text-sm text-center">
            Don’t have an account?
            <button
              onClick={handleShopifySignup}
              className="text-blue-500 font-semibold hover:underline ml-1 cursor-pointer"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}
