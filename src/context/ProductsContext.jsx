import { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);

  return (
    <ProductContext.Provider
      value={{ allProducts, setAllProducts, productCategories, setProductCategories, loading, setLoading }}
    >
      {children}
    </ProductContext.Provider>
  );
};