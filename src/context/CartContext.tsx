import React, { createContext, useContext, useEffect, useState } from "react";
import { cartApi } from "../api/client.ts";
import { CartItem } from "../types/types.ts";
import { useAuth } from "./AuthContext.tsx";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Fetch cart items from API when user is logged in
      fetchCartItems();
    } else {
      // Clear cart when user logs out
      setCartItems([]);
    }
  }, [user]);

  const fetchCartItems = async () => {
    try {
      const data = await cartApi.getCart();
      setCartItems(data.items || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const addToCart = async (productId: number) => {
    try {
      await cartApi.addToCart(productId);
      await fetchCartItems();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      await cartApi.removeFromCart(productId);
      await fetchCartItems();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    try {
      if (quantity <= 0) {
        await cartApi.removeFromCart(productId);
      } else {
        await cartApi.addToCart(productId);
      }
      await fetchCartItems();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
