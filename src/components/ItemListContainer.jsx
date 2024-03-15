import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ItemDetail from "./ItemDetail";

const ItemListContainer = ({allProducts}) => {
  const { id } = useParams();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const productsByCategory = getProductsByCategory(id);
    setProductList(productsByCategory);
  }, [id]);

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
        {productList.length > 0 &&
          productList.map((item, index) => {
            return (
              <Link
                className="col-lg-3 mb-4 text-decoration-none"
                key={item.id}
                to={`/item/${item.id}`}
              >
                <ItemDetail item={item} />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default ItemListContainer;