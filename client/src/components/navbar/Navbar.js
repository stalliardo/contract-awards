import React from 'react';
import './navbar.css';
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleLogOut = () => {
    // TODO
    console.log('log out clicked');
  }

  return (
    <nav className='navbar-container'>
      <div className='nav-end-container'>
        <Link to="/">Sign Out</Link>
         {/* // TODO only visible if has role  */}
        <Link to="/admin">Admin</Link>
        <Link to="/awards-form">Awards</Link>
        <Link to="/awards-summary">Awards Summary</Link>
      </div>
    </nav>
  )
}

export default Navbar;