import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const existingCartItem = state.cartItems.find(
        item => item.id === action.payload.id
      );

      if (existingCartItem) {
        state.cartItems.map(
          cartItem => cartItem.id === action.payload.id && cartItem.quantity++
        );
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCartItem: (state, action) => {
      const existingCartItem = state.cartItems.find(
        item => item.id === action.payload.id
      );
      if (existingCartItem.quantity !== 1) {
        state.cartItems.map(
          cartItem => cartItem.id === existingCartItem.id && cartItem.quantity--
        );
      } else {
        state.cartItems = state.cartItems.filter(
          cartItem => cartItem.id !== existingCartItem.id
        );
      }
    },
    clearItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        cartItem => cartItem.id !== action.payload.id
      );
    },
    setCartIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setCartIsOpen, addCartItem, removeCartItem, clearItemFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
