import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import Button from '../button/Button';
import './ProductCard.scss';
import { addCartItem } from '../../store/cart/cartSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { name, price, imageUrl } = product;
  const addProductToCartHandler = () => dispatch(addCartItem(product));
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
