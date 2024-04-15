import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = () => {
    const product = {
      id: item.id,
      nombre: item.nombre,
      precio: item.precio,
      cantidad: quantity,
      stock: item.stock
    };
    addToCart(product);
    if(item.stock - quantity === 0) {
      setQuantity(1);
    }
  };

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex !== -1) {
      const updatedCart = [ ...cart ];
      const quantityToAdd = product.cantidad || 0;

      if ((updatedCart[existingProductIndex].cantidad + quantityToAdd) > product.stock) {
        updatedCart[existingProductIndex].cantidad = product.stock;
        setCart(updatedCart);
        alert(`Solamente contamos con ${product.stock} unidad/es de este producto`);
      } else {
        updatedCart[existingProductIndex].cantidad += quantityToAdd;
        setCart(updatedCart);
        alert("Cantidad del articulo actualizada en el carrito");
      }
    } else {
      const updatedCart = [ ...cart, product ];
      setCart(updatedCart);
      alert("Producto agregado al carrito");
    }
  };

  

  return (
    <CartContext.Provider
      value={{ handleAddToCart, addToCart, cart }}
    >
      {children}
    </CartContext.Provider>
  );
};
