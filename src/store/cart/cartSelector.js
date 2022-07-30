import { createSelector } from '@reduxjs/toolkit';

const cartReducer = state => state.cart;

export const selectCartItems = createSelector(
  [cartReducer],
  cart => cart.cartItems
);

export const selectCartIsOpen = createSelector(
  [cartReducer],
  cart => cart.isOpen
);

export const selectCartCount = createSelector([selectCartItems], cartItems =>
  cartItems.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0)
);

export const selectCartTotalPrice = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
);
