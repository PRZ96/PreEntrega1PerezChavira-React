const ItemQuantitySelector = ({handleDecreaseQuantity, handleIncreaseQuantity, quantity}) => {
  return (
    <>
        <div className="d-flex align-items-center justify-content-center my-3">
              <button
                className="btn btn-secondary me-2"
                onClick={handleDecreaseQuantity}
              >
                -
              </button>
              <input
                type="number"
                className="form-control text-center me-2"
                value={quantity}
                min="1"
                readOnly
              />
              <button
                className="btn btn-secondary me-2"
                onClick={handleIncreaseQuantity}
              >
                +
              </button>
        </div>
    </>
  )
}

export default ItemQuantitySelector