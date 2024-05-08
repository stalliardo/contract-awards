import React, { useEffect, useState } from 'react';
import './navbar.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
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

  const [showWarningModal, setShowWarningModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const showSelectMenu = location.pathname === "/admin" && authenticatedUser.role === ROLES.CA01;

  const handleSignOut = () => {
    dispatch(logout())
    navigate("/auth");
  }

  const onFinancialYearSelected = (year) => {

    setselectedYear(year);
    setShowWarningModal(true);
  }
  
  const onProceed = () => {
    setShowWarningModal(false);
    dispatch(setSelectedFinancialYear(removeSlashFromyearString(selectedYear.value)));
    dispatch(resetState());
    dispatch(resetTenderState());

    navigate("/admin");
  }

  const onClose = () => {
    setSelectedFinancialYear()
    setShowWarningModal(false)
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
                  {
                    showSelectMenu &&
                    <>  
                      <SelectMenu allSettingPlaceholder={false} placeholder={addSlashToYearString(selectedFinancialYear)} menuItems={menuItems} handleItemSelection={onFinancialYearSelected} />
                    </>
                  }
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
        <YearChangeWarningModal onClose={onClose} onProceed={onProceed}/>
      }
    </nav>
  )
}

export default Navbar;