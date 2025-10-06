import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import apiService from '../services/api';
import './Profile.css';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { showSuccess, showError } = useNotification();
  
  // State for different sections
  const [activeTab, setActiveTab] = useState('personal');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Personal details state
  const [personalData, setPersonalData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Address management state
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    addressType: 'home',
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    phone: '',
    isDefault: false
  });
  
  // Orders state
  const [orders, setOrders] = useState([]);

  // Handle tab change and close mobile menu
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  // Load user data on component mount
  useEffect(() => {
    if (user) {
      setPersonalData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        company: user.company || ''
      });
      loadAddresses();
      loadOrders();
    }
  }, [user]);

  const loadAddresses = async () => {
    try {
      const addressesData = await apiService.getUserAddresses();
      setAddresses(addressesData);
      } catch (error) {
        // Error loading addresses
      }
  };

  const loadOrders = async () => {
    try {
      const response = await apiService.getUserOrders();
      
      // Handle the response structure properly
      if (response && response.success && Array.isArray(response.orders)) {
        setOrders(response.orders);
      } else if (Array.isArray(response)) {
        // Fallback: if response is directly an array
        setOrders(response);
      } else {
        setOrders([]);
      }
    } catch (error) {
      setOrders([]);
    }
  };

  // Personal details handlers
  const handlePersonalChange = (e) => {
    setPersonalData({
      ...personalData,
      [e.target.name]: e.target.value
    });
  };

  const handlePersonalSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await updateProfile(personalData);
      if (result.success) {
        showSuccess('Profile updated successfully!');
      } else {
        showError(result.error);
      }
    } catch (error) {
      showError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Password change handlers
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showError('New passwords do not match');
      setIsLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showError('New password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const result = await apiService.changePassword(passwordData.currentPassword, passwordData.newPassword);
      if (result.success) {
        showSuccess('Password changed successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        showError(result.error);
      }
    } catch (error) {
      showError('Failed to change password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Address handlers
  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm({
      ...addressForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Client-side validation
      if (!addressForm.fullName.trim()) {
        showError('Full name is required');
        return;
      }
      if (!addressForm.addressLine1.trim()) {
        showError('Address is required');
        return;
      }
      if (!addressForm.city.trim()) {
        showError('City is required');
        return;
      }
      if (!addressForm.state.trim()) {
        showError('State is required');
        return;
      }
      if (!addressForm.postalCode.trim()) {
        showError('Postal code is required');
        return;
      }
      if (!addressForm.country.trim()) {
        showError('Country is required');
        return;
      }
      if (!addressForm.phone.trim()) {
        showError('Phone number is required');
        return;
      }

      if (editingAddress) {
        await apiService.updateAddress(editingAddress.id, addressForm);
        showSuccess('Address updated successfully!');
      } else {
        await apiService.addAddress(addressForm);
        showSuccess('Address added successfully!');
      }
      
      setShowAddressForm(false);
      setEditingAddress(null);
      setAddressForm({
        addressType: 'home',
        fullName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'India',
        phone: '',
        isDefault: false
      });
      loadAddresses();
    } catch (error) {
      console.error('Address submission error:', error);
      showError(error.message || 'Failed to save address. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setAddressForm({
      addressType: 'home', // Default type since we don't have address_type in DB
      fullName: address.name,
      addressLine1: address.address,
      addressLine2: '', // Not available in current DB structure
      city: address.city,
      state: address.state,
      postalCode: address.pincode,
      country: address.country,
      phone: address.phone || '',
      isDefault: address.is_default
    });
    setShowAddressForm(true);
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await apiService.deleteAddress(addressId);
        showSuccess('Address deleted successfully!');
        loadAddresses();
      } catch (error) {
        showError('Failed to delete address. Please try again.');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'processing': return '#3b82f6';
      case 'completed': return '#10b981';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>Manage your personal information, addresses, and view your orders</p>
      </div>

      <div className="profile-content">
        <div className="profile-sidebar">
          {/* Mobile Dropdown Menu */}
          <div className="mobile-nav-dropdown">
            <button 
              className="mobile-nav-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="nav-icon">📋</span>
              {activeTab === 'personal' && 'Personal Details'}
              {activeTab === 'password' && 'Change Password'}
              {activeTab === 'addresses' && 'Addresses'}
              {activeTab === 'orders' && 'Order History'}
              <span className="dropdown-arrow">{isMobileMenuOpen ? '▲' : '▼'}</span>
            </button>
            
            {isMobileMenuOpen && (
              <div className="mobile-nav-menu">
                <button 
                  className={`mobile-nav-item ${activeTab === 'personal' ? 'active' : ''}`}
                  onClick={() => handleTabChange('personal')}
                >
                  <span className="nav-icon">👤</span>
                  Personal Details
                </button>
                <button 
                  className={`mobile-nav-item ${activeTab === 'password' ? 'active' : ''}`}
                  onClick={() => handleTabChange('password')}
                >
                  <span className="nav-icon">🔒</span>
                  Change Password
                </button>
                <button 
                  className={`mobile-nav-item ${activeTab === 'addresses' ? 'active' : ''}`}
                  onClick={() => handleTabChange('addresses')}
                >
                  <span className="nav-icon">📍</span>
                  Addresses
                </button>
                <button 
                  className={`mobile-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => handleTabChange('orders')}
                >
                  <span className="nav-icon">📦</span>
                  Order History
                </button>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="profile-nav desktop-nav">
            <button 
              className={`nav-item ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              <span className="nav-icon">👤</span>
              Personal Details
            </button>
            <button 
              className={`nav-item ${activeTab === 'password' ? 'active' : ''}`}
              onClick={() => setActiveTab('password')}
            >
              <span className="nav-icon">🔒</span>
              Change Password
            </button>
            <button 
              className={`nav-item ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              <span className="nav-icon">📍</span>
              Addresses
            </button>
            <button 
              className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <span className="nav-icon">📦</span>
              Order History
            </button>
          </nav>
        </div>

        <div className="profile-main">
          {/* Personal Details Tab */}
          {activeTab === 'personal' && (
            <div className="profile-section">
              <h2>Personal Details</h2>
              <form onSubmit={handlePersonalSubmit} className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={personalData.name}
                      onChange={handlePersonalChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={personalData.email}
                      disabled
                      className="disabled-input"
                    />
                    <small>Email cannot be changed</small>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={personalData.phone}
                      onChange={handlePersonalChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={personalData.company}
                      onChange={handlePersonalChange}
                    />
                  </div>
                </div>
                <button type="submit" className="save-btn" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          )}

          {/* Change Password Tab */}
          {activeTab === 'password' && (
            <div className="profile-section">
              <h2>Change Password</h2>
              <form onSubmit={handlePasswordSubmit} className="profile-form">
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="save-btn" disabled={isLoading}>
                  {isLoading ? 'Changing...' : 'Change Password'}
                </button>
              </form>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="profile-section">
              <div className="section-header">
                <h2>My Addresses</h2>
                <button 
                  className="add-btn"
                  onClick={() => {
                    setShowAddressForm(true);
                    setEditingAddress(null);
                    setAddressForm({
                      addressType: 'home',
                      fullName: '',
                      addressLine1: '',
                      addressLine2: '',
                      city: '',
                      state: '',
                      postalCode: '',
                      country: 'India',
                      phone: '',
                      isDefault: false
                    });
                  }}
                >
                  + Add Address
                </button>
              </div>

              {showAddressForm && (
                <div className="address-form-modal">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h3>{editingAddress ? 'Edit Address' : 'Add New Address'}</h3>
                      <button 
                        className="close-btn"
                        onClick={() => {
                          setShowAddressForm(false);
                          setEditingAddress(null);
                        }}
                      >
                        ×
                      </button>
                    </div>
                    <form onSubmit={handleAddressSubmit} className="address-form">
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="addressType">Address Type</label>
                          <select
                            id="addressType"
                            name="addressType"
                            value={addressForm.addressType}
                            onChange={handleAddressChange}
                          >
                            <option value="home">Home</option>
                            <option value="work">Work</option>
                            <option value="billing">Billing</option>
                            <option value="shipping">Shipping</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="fullName">Full Name</label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={addressForm.fullName}
                            onChange={handleAddressChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="addressLine1">Address Line 1</label>
                        <input
                          type="text"
                          id="addressLine1"
                          name="addressLine1"
                          value={addressForm.addressLine1}
                          onChange={handleAddressChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="addressLine2">Address Line 2</label>
                        <input
                          type="text"
                          id="addressLine2"
                          name="addressLine2"
                          value={addressForm.addressLine2}
                          onChange={handleAddressChange}
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="city">City</label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={addressForm.city}
                            onChange={handleAddressChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="state">State</label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={addressForm.state}
                            onChange={handleAddressChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="postalCode">Postal Code</label>
                          <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={addressForm.postalCode}
                            onChange={handleAddressChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="country">Country</label>
                          <input
                            type="text"
                            id="country"
                            name="country"
                            value={addressForm.country}
                            onChange={handleAddressChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone">Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={addressForm.phone}
                            onChange={handleAddressChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group checkbox-group">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            name="isDefault"
                            checked={addressForm.isDefault}
                            onChange={handleAddressChange}
                          />
                          Set as default address
                        </label>
                      </div>
                      <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={() => setShowAddressForm(false)}>
                          Cancel
                        </button>
                        <button type="submit" className="save-btn" disabled={isLoading}>
                          {isLoading ? 'Saving...' : editingAddress ? 'Update Address' : 'Add Address'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <div className="addresses-list">
                {addresses.length === 0 ? (
                  <div className="empty-state">
                    <p>No addresses added yet. Add your first address to get started.</p>
                  </div>
                ) : (
                  addresses.map((address) => (
                    <div key={address.id} className="address-card">
                      <div className="address-header">
                        <div className="address-type">
                          <span className="type-badge">Address</span>
                          {address.is_default && <span className="default-badge">Default</span>}
                        </div>
                        <div className="address-actions">
                          <button 
                            className="edit-btn"
                            onClick={() => handleEditAddress(address)}
                          >
                            Edit
                          </button>
                          <button 
                            className="delete-btn"
                            onClick={() => handleDeleteAddress(address.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="address-details">
                        <p><strong>{address.name}</strong></p>
                        <p>{address.address}</p>
                        <p>{address.city}, {address.state} {address.pincode}</p>
                        <p>{address.country}</p>
                        {address.phone && <p>Phone: {address.phone}</p>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="profile-section">
              <h2>Order History</h2>
              <div className="orders-list">
                {orders.length === 0 ? (
                  <div className="empty-state">
                    <p>No orders found. Start shopping to see your orders here.</p>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <div className="order-info">
                          <h3>Order #{order.id.toString().slice(-8)}</h3>
                          <p className="order-date">{formatDate(order.created_at)}</p>
                        </div>
                        <div className="order-status">
                          <span 
                            className="status-badge"
                            style={{ backgroundColor: getStatusColor(order.status) }}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="order-items">
                        {order.items.map((item, index) => (
                          <div key={index} className="order-item">
                            <span className="item-icon">{item.product_icon}</span>
                            <div className="item-details">
                              <h4>{item.product_name}</h4>
                              <p>Quantity: {item.quantity}</p>
                              {Object.keys(item.options).length > 0 && (
                                <div className="item-options">
                                  {Object.entries(item.options).map(([key, value]) => (
                                    <span key={key} className="option-tag">
                                      {key}: {value}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="order-footer">
                        <div className="order-total">
                          <strong>Total: Contact for pricing</strong>
                        </div>
                        <div className="order-actions">
                          <Link to={`/order-details/${order.id}`} className="view-details-btn">
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
