import { Route, Routes } from 'react-router-dom';
import CategoriesPreview from '../category-preview/CategoriesPreview';
import Category from '../Category/Category';
import './Shop.scss';

function Shop() {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
}
export default Shop;
