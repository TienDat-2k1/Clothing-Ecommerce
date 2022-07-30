import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartDropdown from '../../components/cart-dropdown/CartDropdown';
import CartIcon from '../../components/cart-icon/CartIcon';
import { signOutUser } from '../../utils/firebase/firebase';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import './Navigation.scss';
import { userSelector } from '../../store/user/userSelector';
import { selectCartIsOpen } from '../../store/cart/cartSelector';

function Navigation() {
  const isCartOpen = useSelector(selectCartIsOpen);
  const currentUser = useSelector(userSelector);
  return (
    <React.Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Logo />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {!currentUser && (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          {currentUser && (
            <span className="nav-Link" onClick={signOutUser}>
              SIGN OUT
            </span>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>

      <Outlet />
    </React.Fragment>
  );
}
export default Navigation;
