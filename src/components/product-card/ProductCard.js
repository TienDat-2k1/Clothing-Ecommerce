import { useContext } from 'react';
import { CartContext } from '../../context/cartContext';
import Button from '../button/Button';
import './ProductCard.scss';

function ProductCard({ product }) {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);
  const addProductToCartHandler = () => addItemToCart(product);
  return (
    <div className="product-card-container">
      {/* img */}
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCartHandler}>
        Add to Cart
      </Button>
    </div>
  );
}
export default ProductCard;
