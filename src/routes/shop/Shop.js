import { useContext } from 'react';
import ProductCard from '../../components/product-card/ProductCard';
import { ProductContext } from '../../context/productContext';
import './Shop.scss';

function Shop() {
  const { products } = useContext(ProductContext);
  return (
    <div className="products-container">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
export default Shop;
