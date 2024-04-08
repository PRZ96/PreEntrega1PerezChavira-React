import { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);

  return (
    <ProductContext.Provider
      value={{ allProducts, setAllProducts, productCategories, setProductCategories }}
    >
      {children}
    </ProductContext.Provider>
  );
};