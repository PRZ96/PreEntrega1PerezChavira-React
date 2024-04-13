import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Item from "./Item";
import { ProductContext } from "../context/ProductsContext";

const ItemListContainer = () => {
  const { allProducts } = useContext(ProductContext);
  const { id } = useParams();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const productsByCategory = getProductsByCategory(id);
    setProductList(productsByCategory);
  }, [id, allProducts]);

  const getProductsByCategory = (catId) => {
    if (catId) {
      return allProducts.filter(
        (product) => product.categoria === parseInt(catId)
      );
    } else {
      return allProducts;
    }
  };

  return (
    <div className="container-xl">
      <div className="row products-container my-5">
        {productList && productList.length > 0 ? (
          productList.map((item) => (
            <div
              className="col-lg-3 mb-4 text-decoration-none"
              key={item.id}
            >
              <Item item={item} />
            </div>
          ))
        ) : (
          <p>No hay productos disponibles en esta categoría.</p>
        )}
      </div>
    </div>
  );
};

export default ItemListContainer;
