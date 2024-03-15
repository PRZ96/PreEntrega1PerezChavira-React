const Item = ({ item }) => {
    return (
      <div className="col-lg-3 mb-4">
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
            <a
              className={`btn ${item.stock > 0  ? 'btn-primary' : 'btn-danger disabled-button'} fs-3 fw-bold py-3 text-uppercase d-block`}
              href="#"
            >
              {item.stock > 0 ? "Agregar al carrito" : "Agotado"}
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  export default Item;
  