import "./App.css";
import { useContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductContext, ProductProvider } from "./context/ProductsContext";
import { CartProvider, CartContext } from "./context/CartContext";
import Loader from "./components/Loader";
import Checkout from "./components/Checkout";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";

function App() {
  const { setAllProducts, setProductCategories, loading, setLoading } = useContext(ProductContext);
  const { cart, setCart} = useContext(CartContext);

  useEffect(() => {
    setLoading(true);

    const cartStorage = JSON.parse(localStorage.getItem("cart"));

    if(cartStorage) {
      setCart(cartStorage)
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  
    const db = getFirestore();
    const prodQueryRef = query(collection(db, 'productos'));
    const catQueryRef = query(collection(db, 'categorias'));
  
    Promise.all([getDocs(prodQueryRef), getDocs(catQueryRef)])
      .then(([prodSnapshot, catSnapshot]) => {
        const productArray = [];
        const categoriesArray = [];
  
        if (prodSnapshot.size === 0) {
          console.log("No hay resultados de productos");
        } else {
          prodSnapshot.forEach((item) => {
            productArray.push(item.data());
          });
        }
  
        if (catSnapshot.size === 0) {
          console.log("No hay resultados de categorías");
        } else {
          catSnapshot.forEach((item) => {
            categoriesArray.push(item.data());
          });
        }
  
        setAllProducts(productArray);
        setProductCategories(categoriesArray);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setAllProducts]);
  

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<ItemListContainer />} />
              <Route path="/category/:id" element={<ItemListContainer />} />
              <Route path="/item/:id" element={<ItemDetailContainer />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </Router>
      )}
    </>
  );
}

function AppWithProvider() {
  return (
    <ProductProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductProvider>
  );
}

export default AppWithProvider;
