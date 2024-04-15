import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ItemQuantitySelector from "./ItemQuantitySelector";

const ItemDetail = ({ item }) => {
  const [quantity, setQuantity] = useState(1); 
  const { addToCart, cart  } = useContext(CartContext);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
  };

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
        <p className="mt-4">{item.descripcion}</p>
        <p className="fs-1 fw-bold price">${item.precio}.00</p>
        <div className="d-flex flex-column">
          {item.stock > 0 ? (
            <ItemQuantitySelector handleQuantityChange={handleQuantityChange} handleDecreaseQuantity={handleDecreaseQuantity} handleIncreaseQuantity={handleIncreaseQuantity} quantity={quantity} />
          ) : (
            ""
          )}

          <button
            className={`btn ${
              item.stock > 0 ? "btn-primary" : "btn-danger disabled-button"
            } fs-4 fw-bold py-3 text-uppercase`}
            onClick={handleAddToCart}
            disabled={item.stock === 0}
          >
            {item.stock > 0 ? "Agregar al carrito" : "Agotado"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
