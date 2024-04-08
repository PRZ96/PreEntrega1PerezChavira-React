import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    if (cart.length > 0) {
      setCart(...cart, product);
    } else {
      setCart(product);
    }
  };

  return (
    <CartContext.Provider
      value={{ addToCart, cart }}
    >
      {children}
    </CartContext.Provider>
  );
};
