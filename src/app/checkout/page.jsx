"use client";

import CheckoutComponent from "./CheckoutComponent";
import { useContext } from "react";
import { CartContext } from "@/components/cart/CartContext";

export default function CheckoutPage() {
  const { cartItems } = useContext(CartContext);

  return <CheckoutComponent cartItems={cartItems} />
}