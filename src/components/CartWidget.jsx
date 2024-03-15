const CartWidget = () => {
    const numberOfItemsInCart = 1;
    
    return (
      <div className="cart-widget-container text-dark fw-bold">
        <i className="bi bi-cart4 fs-1 cart-image"></i>
        <span className="cart-item-count">{numberOfItemsInCart}</span>
      </div>
    );
  }
  
  export default CartWidget;
  