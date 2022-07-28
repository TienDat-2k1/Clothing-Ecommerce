import { useContext } from 'react';
import CheckoutItem from '../../components/checkout-item/CheckoutItem';
import { CartContext } from '../../context/cartContext';
import './Checkout.scss';

function Checkout() {
  const { cartItems, cartTotal } = useContext(CartContext);
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Products</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map(cartItem => {
        const { id } = cartItem;
        return <CheckoutItem key={id} cartItem={cartItem} />;
      })}
      <span className="total">Total: {cartTotal}$</span>
    </div>
  );
}
export default Checkout;
