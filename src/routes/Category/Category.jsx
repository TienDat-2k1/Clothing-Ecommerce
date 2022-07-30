import './Category.scss';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/productContext';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import ProductCard from '../../components/product-card/ProductCard';
import {
  selectCategories,
  selectIsLoadingCategories,
} from '../../store/category/categoriesSelector';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { fetchCategoriesStart } from '../../store/category/categorySlice';
import Spinner from '../../components/spinner/Spinner';

function Category() {
  const { category } = useParams();
  const dispatch = useDispatch();
  // const { products } = useContext(ProductContext);

  const [product, setProduct] = useState([]);

  const categories = useSelector(selectCategories);
  const isLoadingCategories = useSelector(selectIsLoadingCategories);

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, [dispatch]);

  useEffect(() => {
    categories.map(ctg =>
      ctg.title === category ? setProduct(ctg.items) : ctg
    );
    if (categories.title === category) {
      setProduct(categories.items);
    }
  }, [categories, category]);
  return (
    <>
      {isLoadingCategories && <Spinner />}
      {!isLoadingCategories && (
        <>
          <h2 className="category-title">{category.toUpperCase()}</h2>
          <div className="category-container">
            {product &&
              product.map(pd => <ProductCard key={pd.id} product={pd} />)}
          </div>
        </>
      )}
    </>
  );
}
export default Category;
