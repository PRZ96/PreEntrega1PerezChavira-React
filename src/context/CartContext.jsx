import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex !== -1) {
      const updatedCart = [ ...cart ];
      const quantityToAdd = product.cantidad || 0;
      console.log(updatedCart[existingProductIndex].cantidad);
      console.log(quantityToAdd);
      updatedCart[existingProductIndex].cantidad += quantityToAdd;
      setCart(updatedCart);
    } else {
      const updatedCart = [ ...cart, product ];
      setCart(updatedCart);
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
