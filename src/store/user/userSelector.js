import { createSelector } from '@reduxjs/toolkit';

const userReducer = state => state.user;

export const userSelector = createSelector(
  [userReducer],
  user => user.currentUser
);
