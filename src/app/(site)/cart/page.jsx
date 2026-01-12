"use client";

import { useContext } from "react";
import { CartContext } from "@/components/cart/CartContext";
import CartComponent from "./CartComponent";

export default function CartPage() {
    const { cartItems } = useContext(CartContext);

    return (
        <>
            <CartComponent cartItems={cartItems} />
        </>
    )
}