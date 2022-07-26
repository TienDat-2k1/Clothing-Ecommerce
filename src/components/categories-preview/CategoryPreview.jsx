import { Link } from 'react-router-dom';
import ProductCard from '../product-card/ProductCard';
import './CategoryPreview.scss';

function CategoryPreview({ title, products }) {
  return (
    <div className="category-preview-container">
      <Link to={title}>
        <span className="title">{title.toUpperCase()}</span>
      </Link>
      <div className="preview">
        {products
          .filter((_, index) => index < 4)
          .map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}
export default CategoryPreview;
