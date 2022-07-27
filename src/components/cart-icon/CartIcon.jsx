import { useContext } from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../context/cartContext';

import './CartIcon.scss';

function CartIcon() {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  const toggedCartDropdownHandler = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <div className="cart-icon-container" onClick={toggedCartDropdownHandler}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
}
export default CartIcon;
