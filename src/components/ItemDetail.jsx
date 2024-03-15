const ItemDetail = ({ item }) => {
    return (
        <div className="card product h-100">
          <div className="aspect-ratio-container">
            <img
              className="card-img-top aspect-ratio-item"
              src={`/src/assets/img/products/${item.imagen}`}
              alt={item.nombre}
            />
          </div>
          <div className="card-body text-center text-white bg-secondary p-5">
            <h3>{item.nombre}</h3>
            <p className="mt-4">{item.descripcion}</p>
            <p className="fs-1 fw-bold price">${item.precio}.00</p>
            <span
              className={`btn ${item.stock > 0  ? 'btn-primary' : 'btn-danger disabled-button'} fs-3 fw-bold py-3 text-uppercase d-block`}
              href="#"
            >
              {item.stock > 0 ? "Agregar al carrito" : "Agotado"}
            </span>
          </div>
        </div>
    );
  };
  
  export default ItemDetail;
  