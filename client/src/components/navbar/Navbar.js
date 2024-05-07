import React, { useState } from 'react';
import './navbar.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout, setSelectedFinancialYear } from '../../redux/features/users/usersSlice';
import { ROLES } from '../../utils/constants';
import SelectMenu from '../selectMenu/SelectMenu';
import { generateFinancialYearOptions, getFinancialYearString } from '../../utils/DateUtils';
import { addSlashToYearString, removeSlashFromyearString } from '../../utils/stringUtils';
import YearChangeWarningModal from './YearChangeWarningModal';
import { resetState } from '../../redux/features/awards/awardsSlice';
import { resetTenderState } from '../../redux/features/tenders/tenderSlice';

const tempItems = [
  "2122",
  "2223",
  "2324",
  "2425",
  "2526",
  "2627",
]

const menuItems = tempItems.map((item) => ({value: addSlashToYearString(item)}));
// const menuItems = generateFinancialYearOptions().map((item) => ({value: addSlashToYearString(item)}));

const Navbar = () => {
  const auth = useSelector(state => state.auth);
  const authenticatedUser = useSelector(state => state.users.authenticatedUser);
  const selectedFinancialYear = useSelector(state => state.users.selectedFinancialYear);

  const [selectedYear, setselectedYear] = useState("");

  const [showWarningModal, setShowWarningModal] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logout())
    navigate("/auth");
  }

  const onFinancialYearSelected = (year) => {

    // dispatch(setSelectedFinancialYear(removeSlashFromyearString(year.value)));

    // console.log('year = ', year);

    // display a modal
    setselectedYear(year);
    setShowWarningModal(true);
    
  }

  const onProceed = () => {
    console.log('selected = ', selectedYear);
    dispatch(setSelectedFinancialYear(removeSlashFromyearString(selectedYear.value)));
    dispatch(resetState());
    dispatch(resetTenderState());

    // states cleared, now load new data based on the selectedyear
  
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
                  <SelectMenu placeholder={addSlashToYearString(selectedFinancialYear)} menuItems={menuItems} handleItemSelection={onFinancialYearSelected} />
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

      {
        showWarningModal &&
        <YearChangeWarningModal onClose={() => setShowWarningModal(false)} onProceed={onProceed}/>
      }
    </nav>
  )
}

export default Navbar;

// TODOs
  // - Select menu should only be available on the admin page?
  // - Select menu onClick will display a notification modal

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


// Stage 1 - Current year, adding to state and passing year tom fetch api calls:
  // - App Loads, user is authed, then user data is fetched from fetchUsers
  // When loaded the AwardsTable loads the locaiton data via let url = `/api/awards-diary/location?location=${encodedLocation}`
  // When entering awardsSummary route: the data is fetcvhed from two locations
    // 1 - for the awardsData: /api/awards-diary/getAllAwards
    // 2 - for the targets data: /api/targets
  // All that needs to happen is to pass the year "2324" along with any request that gets year dependant data.
  // Frontend needs to know if the year selected from the navbar select memu is the current year or not then set the readOnly flag based on that.

// Stage 2 - Check what edit operations require:
  // When updating / editing an item, will the year be required?
  // If updating / edinting then no ^, the year should already be set

// Next issue is the locations. Say in year 2324 there are 6 locations and data is set to each of these nice
  // Then, five years later there are now 20 locations again, fine, but.. what happends when a user loads the data from 5 years ago there will only be 5 locations saved but there will be 20 locations in the db....


  // And what if an old location no longer exists? It wont be displayed in the table at all