import React, { useState } from 'react';
import './Nav.css';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  

  const navigateToRegistrationForm = () => {
    navigate('/');
    setMobileMenuOpen(false); // Close the mobile menu after navigation
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
     
        <div className="nav-menu">
          <button className="hamburger" onClick={toggleMobileMenu}>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          </button>
          <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <button  onClick={navigateToRegistrationForm}>לעמוד ההרשמה</button>
          </div>
        </div>

        <button className="desktop-button" onClick={navigateToRegistrationForm}>
          לעמוד ההרשמה
        </button>
        <div className="nav-logo">
          <h1>החתונה של קציצי ומיכה!</h1>
          <span className="heart">❤️</span>
        </div>
       
      
      </div>
    </nav>
  );
};

export default Nav;
