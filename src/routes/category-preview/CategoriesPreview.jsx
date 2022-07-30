import './CategoriesPreview.scss';

import { Fragment, useEffect } from 'react';
import CategoryPreview from '../../components/categories-preview/CategoryPreview';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { fetchCategoriesStart } from '../../store/category/categorySlice';
import {
  selectCategories,
  selectIsLoadingCategories,
} from '../../store/category/categoriesSelector';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Spinner from '../../components/spinner/Spinner';

function CategoriesPreview() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, [dispatch]);
  const categories = useSelector(selectCategories);
  const isLoadingCategories = useSelector(selectIsLoadingCategories);

  return (
    <Fragment>
      {isLoadingCategories && <Spinner />}
      {!isLoadingCategories &&
        categories.map(category => {
          const { title, items } = category;
          return <CategoryPreview key={title} title={title} products={items} />;
        })}
    </Fragment>
  );
}
export default CategoriesPreview;
