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

const removeCartItem = (cartItems, product) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === product.id
  );
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== product.id);
  }

  if (existingCartItem.quantity > 1) {
    return cartItems.map(cartItem =>
      cartItem.id === product.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
};

const clearCartItem = (cartItems, product) => {
  return cartItems.filter(cartItem => cartItem.id !== product.id);
};

export const CartContext = React.createContext({
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  total: 0,
  setIsCartOpen() {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = product => {
    setCartItems(addCartItems(cartItems, product));
  };

  const removeItemFromCart = product => {
    setCartItems(removeCartItem(cartItems, product));
  };

  const clearItemFromCart = product => {
    setCartItems(clearCartItem(cartItems, product));
  };

  const value = {
    isCartOpen,
    cartItems,
    cartCount,
    cartTotal,
    addItemToCart,
    setIsCartOpen,
    removeItemFromCart,
    clearItemFromCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
