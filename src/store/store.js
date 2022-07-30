import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import userSLice from './user/userSLice';
import { rootSaga } from './rootSaga';
import categorySlice from './category/categorySlice';
import cartSlice from './cart/cartSlice';

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: { user: userSLice, categories: categorySlice, cart: cartSlice },
  middleware: [saga],
});

saga.run(rootSaga);
