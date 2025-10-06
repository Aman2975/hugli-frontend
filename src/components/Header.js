import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <h1>Hugli Printing Press</h1>
        </Link>
        
        {/* Mobile Menu Toggle Button */}
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="nav desktop-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/contact" className="nav-link">Contact Us</Link>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
        <nav className="mobile-nav-links">
          <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>
            <span className="nav-icon">🏠</span>
            Home
          </Link>
          <Link to="/products" className="mobile-nav-link" onClick={closeMobileMenu}>
            <span className="nav-icon">📦</span>
            Products
          </Link>
          <Link to="/about" className="mobile-nav-link" onClick={closeMobileMenu}>
            <span className="nav-icon">ℹ️</span>
            About Us
          </Link>
          <Link to="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>
            <span className="nav-icon">📞</span>
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
