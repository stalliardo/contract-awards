import React from 'react';
import './navbar.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated } from '../../redux/features/auth/authSlice';
import { removeTokenFromStorage } from '../../utils/localStorageUtils';
import { clearAuthenticatedUserData } from '../../redux/features/users/usersSlice';
import { ROLES } from '../../utils/constants';

const Navbar = () => {

  const auth = useSelector(state => state.auth);
  const authenticatedUser = useSelector(state => state.users.authenticatedUser);

  console.log('authenticated user from nav = ', authenticatedUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(setIsAuthenticated(false));
    dispatch(clearAuthenticatedUserData())
    removeTokenFromStorage();
    navigate("/auth");
  }

  return (
    <nav className='navbar-container'>
      <div className='nav-end-container'>
        {
          auth.isAuthenticated &&
            authenticatedUser.locations.length ? 
            <>
            <a onClick={handleSignOut}>Sign Out</a>
            <Link to="/admin">Admin</Link>
            <Link to="/awards-form">Awards</Link>
            <Link to="/awards-summary">Awards Summary</Link>
            <Link to="/dev">Dev</Link>
            <a>{authenticatedUser?.name}</a>
          </>
          :
          <>
            <a onClick={handleSignOut}>Sign Out</a>
            {
              authenticatedUser.role === ROLES.CA01 ?
              <Link to="/admin">Admin</Link>
              : null
            }
          </>
          
        }
        {/* // TODO only visible if has role  */}

      </div>
    </nav>
  )
}

export default Navbar;