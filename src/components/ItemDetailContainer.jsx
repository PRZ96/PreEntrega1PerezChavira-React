import { useContext,useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductsContext";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const {allProducts} = useContext(ProductContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const productById = getProductById(id);
    if (productById) {
      setProduct(productById);
    }
  }, [id, allProducts]);

  const getProductById = (prodId) => {
    if (prodId && allProducts) {
      return allProducts.find((product) => product.id === parseInt(prodId));
    }
    return null;
  };

  return (
    <div className="container-xl">
      {product ? (
        <div className="row products-detail-container d-flex justify-content-center my-5">
          <div className="col-lg-6">
            <ItemDetail item={product} />
          </div>
        </div>
      ) : (
        <p>Cargando producto...</p>
      )}
    </div>
  );
};

export default ItemDetailContainer;
