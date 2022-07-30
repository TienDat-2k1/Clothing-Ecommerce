import { createSelector } from '@reduxjs/toolkit';

const categoriesReducer = state => {
  return state.categories;
};

export const categories = createSelector([categoriesReducer], categories => {
  return categories.categories;
});

export const selectCategories = createSelector([categories], categories => {
  return Object.entries(categories).reduce((acc, curr) => {
    const category = { title: curr[0], items: curr[1] };
    acc.push(category);
    return acc;
  }, []);
});
export const selectIsLoadingCategories = createSelector(
  [categoriesReducer],
  categories => categories.isLoading
);
