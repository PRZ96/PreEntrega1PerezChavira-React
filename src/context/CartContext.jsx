import { createContext, useState } from "react";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0);

  const addToCart = (product, quantityToAdd) => {
    if (!product.stock) {
      console.error('Stock no definido para el producto:', product);
      return;
    }

    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      
      if (updatedCart[existingProductIndex].cantidad + quantityToAdd > product.stock) {
        updatedCart[existingProductIndex].cantidad = product.stock;
        setCart(updatedCart);
        Swal.fire({
          icon: "info",
          title: `No tenemos suficiente stock para el producto ${product.nombre}`,
          text: "Agregaremos la cantidad total en stock a tu carrito",
        }).then(() => {
          localStorage.setItem("products", JSON.stringify(updatedCart));
        });
      } else {
        updatedCart[existingProductIndex].cantidad += quantityToAdd;
        setCart(updatedCart);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Cantidad de ${product.nombre.toLowerCase()} actualizado en carrito`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          localStorage.setItem("products", JSON.stringify(updatedCart));
        });
      }
    } else {
      const updatedCart = [...cart, { ...product, cantidad: quantityToAdd }];
      setCart(updatedCart);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Producto ${product.nombre.toLowerCase()} agregado al carrito`,
        showConfirmButton: false,
        timer: 1500,
      });
      localStorage.setItem("products", JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = (product) => {
    Swal.fire({
      title: "¿Estás seguro que deseas quitar el articulo de la tienda?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color4)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = cart.filter(
          (elemento) => elemento.id !== product.id
        );
        setCart(updatedCart);
        localStorage.setItem("products", JSON.stringify(updatedCart));
        Swal.fire({
          title: "El articulo se eliminó de la tienda",
          icon: "success",
          confirmButtonColor: "var(--color4)",
          timer: 2000,
        });
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        cart,
        numberOfItemsInCart,
        setNumberOfItemsInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
