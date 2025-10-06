import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import './AdminHeader.css';

const AdminHeader = () => {
  const { logout } = useAuth();
  const { showSuccess } = useNotification();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    showSuccess('Admin logged out successfully');
    navigate('/admin/login');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <header className="admin-header">
      <div className="admin-header-container">
        <div className="admin-logo">
          <h1>Hugli Printing Press - Admin Panel</h1>
        </div>
        
        {/* Mobile Menu Toggle Button */}
        <button 
          className="admin-mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        
        {/* Desktop Actions */}
        <div className="admin-header-actions desktop-actions">
          <button className="admin-logout-btn" onClick={handleLogout}>
            <span className="logout-icon">🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`admin-mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="admin-mobile-actions">
          <button className="admin-mobile-logout-btn" onClick={handleLogout}>
            <span className="logout-icon">🚪</span>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
