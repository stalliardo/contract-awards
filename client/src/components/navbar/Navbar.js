import React from 'react';
import './navbar.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/features/users/usersSlice';
import { ROLES } from '../../utils/constants';

const Navbar = () => {
  const auth = useSelector(state => state.auth);
  const authenticatedUser = useSelector(state => state.users.authenticatedUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logout())
    navigate("/auth");
  }

  return (
    <nav className='navbar-container'>
      <div className='nav-end-container'>
        {
          auth.isAuthenticated ?
            authenticatedUser.locations?.length ?
            <>
              {
                authenticatedUser.role === ROLES.CA01 || authenticatedUser.role === ROLES.CA02 ?
                <Link to="/admin">Admin</Link>
                :
                null
              }
              <Link to="/awards-form">Awards</Link>
              <Link to="/awards-summary">Awards Summary</Link>
              <Link to="/tenders-submitted">Tenders Submitted</Link>
              {/* <Link to="/site-admin">Dev</Link> */}
              <a onClick={handleSignOut}>Sign Out</a>
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
            :
            null
        }
      </div>
    </nav>
  )
}

export default Navbar;