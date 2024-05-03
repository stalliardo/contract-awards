import React from 'react';
import './navbar.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/features/users/usersSlice';
import { ROLES } from '../../utils/constants';
import SelectMenu from '../selectMenu/SelectMenu';
import { generateFinancialYearOptions } from '../../utils/DateUtils';

const menuItems = generateFinancialYearOptions().map((item) => ({value: item}));

const Navbar = () => {
  const auth = useSelector(state => state.auth);
  const authenticatedUser = useSelector(state => state.users.authenticatedUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logout())
    navigate("/auth");
  }

  const onFinancialYearSelected = (year) => {
    console.log('year = ', year);
  }

  return (
    <nav className='navbar-container'>
      <div className='nav-end-container'>
        {
          auth.isAuthenticated ?
            authenticatedUser.locations?.length ?
            <>
              {
                authenticatedUser.role === ROLES.CA01 &&
                <div className='navbar-select-container'>
                  {/* the below menu.items.length wont work, need to get the current financial year and use that as default */}
                  <SelectMenu placeholder={menuItems[menuItems.length - 1].value} menuItems={menuItems} handleItemSelection={onFinancialYearSelected} />
                </div>
              }
              {
                authenticatedUser.role === ROLES.CA01 || authenticatedUser.role === ROLES.CA02 ?
                <Link to="/admin">Admin</Link>
                :
                null
              }
              <Link to="/awards-form">Awards</Link>
              <Link to="/awards-summary">Awards Summary</Link>
              <Link to="/tenders-submitted">Tenders Submitted</Link>

              

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