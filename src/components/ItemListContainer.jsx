import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import products from "../utils/MocksAsync.json";
import ItemDetail from "./ItemDetail";
import { fakeApiCall } from "../utils/fakeApiCall";

const ItemListContainer = () => {
  const { id } = useParams();
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fakeApiCall(products).then((res) => {
      setResponse(res);
      setLoading(false);
    })
    .then();
  }, []);

  const getProductsByCategory = (catId) => {
    if (catId) {
      return response.productos.filter(
        (product) => product.categoria === parseInt(catId)
      );
    } else {
      return response.productos;
    }
  };

  const productsByCategory = getProductsByCategory(id);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="container-xl">
      <div className="row products-container my-5">
        {productsByCategory.length > 0 &&
          productsByCategory.map((item, index) => {
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
