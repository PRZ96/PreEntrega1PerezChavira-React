import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ItemQuantitySelector from "./ItemQuantitySelector";

const Item = ({ item }) => {
  const [quantity, setQuantity] = useState(1); 
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(item, quantity); // Pasar la cantidad como argumento separado
    if (item.stock - quantity <= 0) {
      setQuantity(1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (item.stock > quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const buttonClass = item.stock > 0 ? "btn-primary" : "btn-danger disabled-button";
  const buttonText = item.stock > 0 ? "Agregar al carrito" : "Agotado";

  return (
    <div className="card product h-100">
      <Link to={`/item/${item.id}`}>
        <div className="aspect-ratio-container">
          <img
            className="card-img-top aspect-ratio-item"
            src={`/src/assets/img/products/${item.imagen}`}
            alt={item.nombre}
          />
        </div>
      </Link>
      <div className="card-body text-center text-white bg-secondary p-5">
        <h3>{item.nombre}</h3>
        <p className="fs-1 fw-bold price">${item.precio}.00</p>
        <div className="d-flex flex-column">
          {item.stock > 0 && (
            <ItemQuantitySelector 
              handleDecreaseQuantity={handleDecreaseQuantity} 
              handleIncreaseQuantity={handleIncreaseQuantity} 
              quantity={quantity} 
            />
          )}

          <button
            className={`btn fs-4 fw-bold py-3 text-uppercase ${buttonClass}`}
            onClick={handleAddToCart}
            disabled={item.stock === 0 || item.stock < quantity} // Usar la cantidad seleccionada
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
