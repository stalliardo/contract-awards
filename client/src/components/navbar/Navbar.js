import React from 'react';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className='navbar-container'>
        <div className='nav-end-container'>
            <a href='/awards-totals'>Awards Summary</a>
            <a href='/awards-form'>Awards Form</a>
        </div>
    </nav>
  )
}

export default Navbar