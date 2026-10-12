"use client";

import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("order_complete") === "1") {
      // Confirmed order completion — clear stale local cart instead of loading it
      localStorage.removeItem("cartItems");
      localStorage.removeItem("shopifyCartId");
      setCartItems([]);

      // Strip the param so refreshing/sharing the URL doesn't re-trigger this
      params.delete("order_complete");
      const newSearch = params.toString();
      const newUrl =
        window.location.pathname + (newSearch ? `?${newSearch}` : "") + window.location.hash;
      window.history.replaceState({}, "", newUrl);

      return;
    }

    const saved = localStorage.getItem("cartItems");
    if (saved) setCartItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems]);

  const toggleCart = () => setIsOpen((prev) => !prev);

  const closeCart = () => setIsOpen(false);

  const addToCart = (item) => {
    let nextCart = [];

    setCartItems((prev) => {
      const existingItem = prev.find(
        (cartItem) => 
          cartItem.id === item.id &&
          cartItem.selectedSize === item.selectedSize &&
          cartItem.selectedColor === item.selectedColor
      );

      if (existingItem) {
        nextCart = prev.map((cartItem) => 
          cartItem.id === item.id &&
          cartItem.selectedSize === item.selectedSize &&
          cartItem.selectedColor === item.selectedColor
            ? {...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        nextCart = [...prev, item];
      }
      return nextCart;
    })

    setIsOpen(true);

    // Klaviyo "Added to Cart" Tracking
    if (typeof window !== "undefined") {
      try {
        const _learnq = (window._learnq = window._learnq || []);
        const productUrl = item.handle
          ? `${window.location.origin}/products/${item.handle}`
          : window.location.origin;
        const totalCartValue = nextCart.reduce(
          (total, cartItem) => total + cartItem.price * cartItem.quantity,
          0
        );
  
        _learnq.push([
          "track",
          "Added to Cart",
          {
            $value: totalCartValue,
            AddedItemProductName: item.title,
            AddedItemProductID: item.id,
            AddedItemPrice: item.price,
            AddedItemQuantity: item.quantity,
            AddedItemImage: item.image,
            AddedItemURL: productUrl,
            ItemNames: nextCart.map((i) => i.title),
            CheckoutURL: productUrl,
            Items: nextCart.map((i) => ({
              ProductID: i.id,
              VariantID: i.variantId,
              ProductName: i.title,
              Quantity: i.quantity,
              ItemPrice: i.price,
              RowTotal: i.price * i.quantity,
              ImageURL: i.image,
              URL: i.handle ? `${window.location.origin}/products/${i.handle}` : window.location.origin,
              Variation: `${i.selectedColor} / ${i.selectedSize}`,
            })),
          },
        ]);
      } catch (err) {
        console.warn("Klaviyo tracking error:", err);
      }
    }
  };

  const removeFromCart = (id, selectedSize, selectedColor) => {
    setCartItems((prev) => 
      prev.filter(
        (item) => !(item.id === id && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
      )
    );
  };

  const decreaseCartQuantity = (id, selectedSize, selectedColor) => {
    setCartItems((prev) =>
      prev.map((item) => 
        item.id === id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
          ? {...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
      .filter((item) => item.quantity > 0)
    );
  };

  const increaseCartQuantity = (id, selectedSize, selectedColor) => {
    setCartItems((prev) => 
      prev.map((item) => 
        item.id === id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
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
        closeCart,
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