import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Button from '../button/Button';
import CartItem from '../cart-item/CartItem';
import './CartDropdown.scss';
import { selectCartItems } from '../../store/cart/cartSelector';

function CartDropdown() {
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  };

  const cartItems = useSelector(selectCartItems);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map(item => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
}
export default CartDropdown;
