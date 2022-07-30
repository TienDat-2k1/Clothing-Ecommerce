import { useContext } from 'react';
import { CartContext } from '../../context/cartContext';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import './CheckoutItem.scss';
import {
  addCartItem,
  removeCartItem,
  clearItemFromCart,
} from '../../store/cart/cartSlice';

function CheckoutItem({ cartItem }) {
  const dispatch = useDispatch();
  // const { clearItemFromCart, addItemToCart, removeItemFromCart } =
  //   useContext(CartContext);

  const addItemFromCartHandler = () => {
    dispatch(addCartItem(cartItem));
  };

  const reduceItemFromCartHandler = () => {
    dispatch(removeCartItem(cartItem));
  };
  const clearItemFromCartHandler = () => {
    dispatch(clearItemFromCart(cartItem));
  };

  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={reduceItemFromCartHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemFromCartHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={clearItemFromCartHandler}>
        &#10005;
      </div>
    </div>
  );
}
export default CheckoutItem;
