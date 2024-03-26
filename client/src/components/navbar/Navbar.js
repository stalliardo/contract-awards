import React from 'react';
import './navbar.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';


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
{/* 
        <Router>
        <Link to="/">Sign Out</Link>
        <Link to="/awards-form">Awards</Link>
        
        <Link to="/">Sign Out</Link>
        </Router>

        <Router>
        <Link to="/awards-totals">Awards Summary</Link>
        </Router> */}
      </div>
    </nav>
  )
}

export default Navbar;