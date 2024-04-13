import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Item from "./Item";
import { ProductContext } from "../context/ProductsContext";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const ItemListContainer = () => {
  const {allProducts} = useContext(ProductContext);
  const { id } = useParams();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const productsByCategory = getProductsByCategory(id);
    setProductList(productsByCategory);
  }, [id, allProducts]);

  useEffect(() => {
    const db = getFirestore();

    const prodRef = doc(db, 'productos', 'bCU1PlCVCsP6eTgKb7iB')
    getDoc(prodRef).then((snapshot) => {
      if(snapshot.exists()) {
        console.log({ ...snapshot.data() })
      }
    });
    
  }, []);

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
            <Link
              className="col-lg-3 mb-4 text-decoration-none"
              key={item.id}
              to={`/item/${item.id}`}
            >
              <Item item={item} />
            </Link>
          ))
        ) : (
          <p>No hay productos disponibles en esta categoría.</p>
        )}
      </div>
    </div>
  );
};

export default ItemListContainer;
