import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import products from '../utils/MocksAsync.json';
import ItemDetail from "./ItemDetail";
import { fakeApiCall } from "../utils/fakeApiCall";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState([]);

  useEffect(() => {
    setLoading(true);
    fakeApiCall(products).then(res => {setResponse(res); setLoading(false);});
  }, []);

useEffect(() => {
    if (response.productos && response.productos.length > 0){
        const productById = getProductById(id);
        setItem(productById);
    }
}, [response]);

    let getProductById = (prodId) => {
        if(prodId){
            return response.productos.find((product) => product.id === parseInt(prodId));
        }
    }
  
if(loading) return <h2>Loading...</h2>

return (
<div className="container-xl">
    <div className="row products-container my-5">
            <ItemDetail item={item} />
    </div>
</div>
)
}

export default ItemDetailContainer