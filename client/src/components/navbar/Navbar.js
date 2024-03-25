import React from 'react';
import './navbar.css';

const Navbar = () => {

  const handleLogOut = () => {
    // TODO
    console.log('log out clicked');
  }
   
  return (
    <nav className='navbar-container'>
      <div className='nav-end-container'>
        <a href='/' onClick={handleLogOut}>Sign Out</a>
        <a href='/admin'>Admin</a>
        <a href='/awards-form'>Awards</a>
        <a href='/awards-totals'>Awards Summary</a>
        <a href='/tenders-submitted'>Tenders Submitted</a>
      </div>
    </nav>
  )
}

export default Navbar;