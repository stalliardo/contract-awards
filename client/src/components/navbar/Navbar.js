import React from 'react';
import './navbar.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated } from '../../redux/features/auth/authSlice';
import { removeTokenFromStorage } from '../../utils/localStorageUtils';

const Navbar = () => {

  const auth = useSelector(state => state.auth);
  const authenticatedUser = useSelector(state => state.users.authenticatedUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    // TODO
    console.log('log out clicked');
    dispatch(setIsAuthenticated(false));
    removeTokenFromStorage();
    navigate("/auth");
  }

  return (
    <nav className='navbar-container'>
      <div className='nav-end-container'>
        {
          auth.isAuthenticated &&
          <>
            <a onClick={handleSignOut}>Sign Out</a>
            <Link to="/admin">Admin</Link>
            <Link to="/awards-form">Awards</Link>
            <Link to="/awards-summary">Awards Summary</Link>
            <Link to="/dev">Dev</Link>
            <a>{authenticatedUser?.name}</a>
          </>
        }
        {/* // TODO only visible if has role  */}

      </div>
    </nav>
  )
}

export default Navbar;