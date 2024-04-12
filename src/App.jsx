import "./App.css";
import { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fakeApiCall } from "./utils/fakeApiCall";
import categories from "./utils/MocksAsync.json";
import { ProductContext, ProductProvider } from "./context/ProductsContext";
import { CartProvider } from "./context/CartContext";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);
  const { setAllProducts, setProductCategories } = useContext(ProductContext);

  useEffect(() => {
    setLoading(true);
    fakeApiCall(categories)
      .then((res) => {
        setProductCategories(res.categorias);
        setAllProducts(res.productos);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Manejo de errores: puedes mostrar un mensaje de error o hacer algo adecuado aquí
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setAllProducts, setProductCategories]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <CartProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<ItemListContainer />} />
              <Route path="/category/:id" element={<ItemListContainer />} />
              <Route path="/item/:id" element={<ItemDetailContainer />} />
            </Routes>
          </Router>
        </CartProvider>
      )}
    </>
  );
}

function AppWithProvider() {
  return (
    <ProductProvider>
      <App />
    </ProductProvider>
  );
}

export default AppWithProvider;
