import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import {
  selectCartCount,
  selectCartIsOpen,
} from '../../store/cart/cartSelector';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { setCartIsOpen } from '../../store/cart/cartSlice';
import './CartIcon.scss';

function CartIcon() {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectCartIsOpen);
  const cartCount = useSelector(selectCartCount);
  const toggedCartDropdownHandler = () => {
    dispatch(setCartIsOpen(!isCartOpen));
  };
  return (
    <div className="cart-icon-container" onClick={toggedCartDropdownHandler}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
}
export default CartIcon;
