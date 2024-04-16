import { useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartWidget = () => {
    const { cart, numberOfItemsInCart, setNumberOfItemsInCart } = useContext(CartContext);

    useEffect(() => {
      const quantityAdd = cart.reduce(function(quantity, product) {
        return quantity + product.cantidad;
      }, 0);
      setNumberOfItemsInCart(quantityAdd);
    }, [cart]);
    
    return (
      <div className="cart-widget-container text-dark fw-bold">
        <i className="bi bi-cart4 fs-1 cart-image"></i>
        {numberOfItemsInCart > 0 ? (
          <span className="cart-item-count">{numberOfItemsInCart}</span>
        ) : (
          ""
        )}
      </div>
    );
  }
  
  export default CartWidget;
  