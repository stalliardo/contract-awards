import React from 'react';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className='navbar-container'>
        <div className='nav-end-container'>
            <a href='/awards-form'>Awards Form - Single</a>
            <a href='/awards-form-multi'>Awards Form - Mutli</a>
            <a href='/awards-form-select'>Awards Form - Select</a>
            <a href='/awards-totals'>Awards Summary</a>
        </div>
    </nav>
  )
}

export default Navbar