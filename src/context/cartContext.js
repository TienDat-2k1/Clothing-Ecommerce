import React, { useEffect, useState } from 'react';

const addCartItems = (cartItems, product) => {
  // find if cartItems contains product
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === product.id
  );
  // if found, increment quantity
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === product.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // return new array with modified cartItems/ new cart item
  return [...cartItems, { ...product, quantity: 1 }];
};

export const CartContext = React.createContext({
  isCartOpen: false,
  setIsCartOpen() {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = product => {
    setCartItems(addCartItems(cartItems, product));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
