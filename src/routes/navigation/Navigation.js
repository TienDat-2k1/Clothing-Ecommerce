import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import './Navigation.scss';

function Navigation() {
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
          <Link className="nav-link" to="/auth">
            SIGN IN
          </Link>
        </div>
      </div>

      <Outlet />
    </React.Fragment>
  );
}
export default Navigation;