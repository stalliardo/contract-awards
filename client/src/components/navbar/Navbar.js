import React from 'react';
import './navbar.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/features/users/usersSlice';
import { ROLES } from '../../utils/constants';
import SelectMenu from '../selectMenu/SelectMenu';
import { generateFinancialYearOptions, getFinancialYearString } from '../../utils/DateUtils';
import { removeSlashFromyearString } from '../../utils/stringUtils';

const menuItems = generateFinancialYearOptions().map((item) => ({value: item}));

const yearString = getFinancialYearString();

removeSlashFromyearString(menuItems[0].value)

console.log('ys = ', yearString);

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
                  <SelectMenu placeholder={menuItems[0].value} menuItems={menuItems} handleItemSelection={onFinancialYearSelected} />
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

// Will Load the current year by default
// The selectmenu options will contain all options from 23/24 so 23/24, 24/25, 25/26 etc
// So can set the placeholder as the latest year returned from the generateFinancialYearOptions function
// When a user selects an older year need to:
  // 1 - Display a modal that warns the users that they are about to view historic data and the data cannot be edited. etc
  // 2 - When the user clicks proceed:
    // A - Will get the data via financialYear
    // B - Set the financialYear in state so any page changes where data is reloaded loads the correct data
    // C - Will need to detect if in edit or readOnly mode and disbable certain actions if in readonly mode
    // D - Will need to format the string 23/24 to 2324 so this can be used to filter by financial year - So when user clicks Select menu item - convert using the removeSlashFromyearString this can then be used to query the year in the db
    