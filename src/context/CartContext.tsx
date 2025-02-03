import React, { createContext, useContext, useEffect, useState } from "react";
import { cartApi } from "../api/client.ts";
import { CartItem } from "../types/types.ts";
import { useAuth } from "./AuthContext.tsx";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (cartItem: CartItem) => void;
  removeFromCart: (cartItemId: number) => void;
  updateQuantity: (cartItemId: number, quantity: number) => void;
  cartCount: number;
  isLoading: boolean;
  error: Error | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCartItems();
    } else {
      setCartItems([]);
      setError(null);
    }
  }, [user]);

  const fetchCartItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await cartApi.getCart();
      setCartItems(data.items || []);
    } catch (err) {
      console.error("Error fetching cart items:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to fetch cart items")
      );
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (cartItem: CartItem) => {
    setError(null);
    try {
      await cartApi.addToCart(cartItem);
      await fetchCartItems();
    } catch (err) {
      console.error("Error adding item to cart:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to add item to cart")
      );
    }
  };

  const removeFromCart = async (productId: number) => {
    setError(null);
    try {
      await cartApi.removeFromCart(productId);
      await fetchCartItems();
    } catch (err) {
      console.error("Error removing item from cart:", err);
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to remove item from cart")
      );
    }
  };

  const updateQuantity = async (cartItemId: number, quantity: number) => {
    setError(null);
    try {
      if (quantity <= 0) {
        await removeFromCart(cartItemId);
      } else {
        await cartApi.updateQuantity(cartItemId, quantity);
        await fetchCartItems();
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to update quantity")
      );
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
        isLoading,
        error,
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
