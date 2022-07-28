import React, { useEffect, useState } from 'react';
import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from '../utils/firebase/firebase.js';

import SHOP_DATA from '../shop-data.js';

export const ProductContext = React.createContext({
  products: {},
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState({});

  // useEffect(() => {
  //   console.log('run?');
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // }, []);
  useEffect(() => {
    const getCategories = async () => {
      const categories = await getCategoriesAndDocuments();
      setProducts(categories);
    };

    getCategories();
  }, []);
  const value = { products };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
