"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  console.log("cart items:", cartItems)

  useEffect(() => {
    const saved = localStorage.getItem("cartItems");
    if (saved) setCartItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems]);

  const toggleCart = () => setIsOpen((prev) => !prev);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (cartItem) => 
          cartItem.id === item.id &&
          cartItem.selectedSize === item.selectedSize
      );

      if (existingItem) {
        return prev.map((cartItem) => 
          cartItem.id === item.id &&
          cartItem.selectedSize === item.selectedSize
            ? {...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prev, item];
    })
    setIsOpen(true);
  };

  const removeFromCart = (id, selectedSize) => {
    setCartItems((prev) => 
      prev.filter(
        (item) => !(item.id === id && item.selectedSize === selectedSize)
      )
    );
  };

  const decreaseCartQuantity = (id, selectedSize) => {
    setCartItems((prev) =>
      prev.map((item) => 
        item.id === id && item.selectedSize === selectedSize
          ? {...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
      .filter((item) => item.quantity > 0)
    );
  };

  const increaseCartQuantity = (id, selectedSize) => {
    setCartItems((prev) => 
      prev.map((item) => 
        item.id === id && item.selectedSize === selectedSize
          ? {...item, quantity: Math.max(item.quantity + 1, 1 ) }
          : item
      )
      .filter((item) => item.quantity > 0)
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{ 
        isOpen, 
        toggleCart, 
        cartItems, 
        addToCart, 
        removeFromCart, 
        decreaseCartQuantity, 
        increaseCartQuantity, 
        getCartTotal 
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext);