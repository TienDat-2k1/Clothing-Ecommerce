import './Category.scss';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/productContext';
import ProductCard from '../../components/product-card/ProductCard';

function Category() {
  const { category } = useParams();
  const { products } = useContext(ProductContext);

  const [product, setProduct] = useState([]);

  useEffect(() => {
    setProduct(products[category]);
  }, [products, category]);
  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {product && product.map(pd => <ProductCard key={pd.id} product={pd} />)}
      </div>
    </>
  );
}
export default Category;
