import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import apiService from '../services/api';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const { items, clearCart, getTotalItems } = useCart();
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [orderData, setOrderData] = useState({
    // Customer Information
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      company: '',
      address: ''
    },
    // Delivery Information
    deliveryInfo: {
      deliveryType: 'pickup', // pickup or delivery
      deliveryAddress: '',
      deliveryDate: '',
      deliveryTime: '',
      specialInstructions: ''
    },
    // Order Preferences
    preferences: {
      urgency: 'normal', // normal, urgent, rush
      contactMethod: 'phone', // phone, email, whatsapp
      preferredContactTime: 'anytime'
    }
  });

  // No authentication required - user fills all details manually

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const handleInputChange = (section, field, value) => {
    setOrderData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };







  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Minimum 1 day from today
    return today.toISOString().split('T')[0];
  };


  // Validation functions
  const validateStep1 = () => {
    const newErrors = {};
    
    if (!orderData.customerInfo.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!orderData.customerInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderData.customerInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!orderData.customerInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?[0-9\s\-()]{10,}$/.test(orderData.customerInfo.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (orderData.deliveryInfo.deliveryType === 'delivery') {
      if (!orderData.deliveryInfo.deliveryAddress.trim()) {
        newErrors.deliveryAddress = 'Delivery address is required';
      }
    }
    
    if (!orderData.deliveryInfo.deliveryDate) {
      newErrors.deliveryDate = 'Delivery date is required';
    } else {
      const selectedDate = new Date(orderData.deliveryInfo.deliveryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.deliveryDate = 'Delivery date cannot be in the past';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    // Special instructions are optional, so no validation needed
    // All other required fields should be validated in previous steps
    
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    return isValid;
  };

  // Address functions removed - no authentication required

  // Step navigation functions
  const handleNext = () => {
    let isValid = false;
    
    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      default:
        isValid = true;
    }
    
    if (isValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Order submission
  const handleSubmitOrder = async () => {
    if (!validateStep3()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Prepare order data
      const orderPayload = {
        items: items.map(item => {
          let options = {};
          try {
            options = typeof item.options === 'string' ? JSON.parse(item.options) : (item.options || {});
          } catch (e) {
            options = {};
          }
          return {
            name: item.name,
            description: item.description,
            icon: item.icon,
            quantity: parseInt(item.quantity) || 1,
            options: options
          };
        }),
        customerInfo: {
          name: orderData.customerInfo.name,
          email: orderData.customerInfo.email,
          phone: orderData.customerInfo.phone,
          company: orderData.customerInfo.company || '',
          address: orderData.customerInfo.address || ''
        },
        deliveryInfo: {
          deliveryType: orderData.deliveryInfo.deliveryType,
          deliveryAddress: orderData.deliveryInfo.deliveryAddress,
          deliveryDate: orderData.deliveryInfo.deliveryDate,
          deliveryTime: orderData.deliveryInfo.deliveryTime || '',
          specialInstructions: orderData.deliveryInfo.specialInstructions
        },
        preferences: {
          urgency: orderData.preferences.urgency,
          contactMethod: orderData.preferences.contactMethod,
          preferredContactTime: orderData.preferences.preferredContactTime
        }
      };

      // Submit order
      const response = await apiService.createOrder(orderPayload);
      
      if (response.success) {
        showSuccess('Order placed successfully!');
        clearCart();
        navigate(`/order-confirmation/${response.orderId}`);
      } else {
        showError(response.message || 'Failed to place order. Please try again.');
      }
    } catch (error) {
      showError('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="place-order-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some items to your cart first</p>
            <Link to="/products" className="btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="place-order-page">
      <div className="container">
        <div className="order-header">
          <h1>Place Your Order</h1>
          <p>Complete your order in 3 simple steps</p>
        </div>

        {/* Progress Steps */}
        <div className="progress-steps">
          <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Customer Info</div>
          </div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Delivery Details</div>
          </div>
          <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">Review & Place</div>
          </div>
        </div>

        <div className="order-content">
          <div className="order-form-section">
            {/* Step 1: Customer Information */}
            {currentStep === 1 && (
              <div className="step-content">
                <h2>Customer Information</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      value={orderData.customerInfo.name}
                      onChange={(e) => handleInputChange('customerInfo', 'name', e.target.value)}
                      placeholder="Enter your full name"
                      className={errors.name ? 'error' : ''}
                      required
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      value={orderData.customerInfo.email}
                      onChange={(e) => handleInputChange('customerInfo', 'email', e.target.value)}
                      placeholder="Enter your email"
                      className={errors.email ? 'error' : ''}
                      required
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      value={orderData.customerInfo.phone}
                      onChange={(e) => handleInputChange('customerInfo', 'phone', e.target.value)}
                      placeholder="Enter your phone number"
                      className={errors.phone ? 'error' : ''}
                      required
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      value={orderData.customerInfo.company}
                      onChange={(e) => handleInputChange('customerInfo', 'company', e.target.value)}
                      placeholder="Enter your company name (optional)"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="address">Address</label>
                    <textarea
                      id="address"
                      value={orderData.customerInfo.address}
                      onChange={(e) => handleInputChange('customerInfo', 'address', e.target.value)}
                      placeholder="Enter your address (optional)"
                      rows="3"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Delivery Information */}
            {currentStep === 2 && (
              <div className="step-content">
                <h2>Delivery Information</h2>
                
                <div className="form-group">
                  <label>Delivery Type *</label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="deliveryType"
                        value="pickup"
                        checked={orderData.deliveryInfo.deliveryType === 'pickup'}
                        onChange={(e) => handleInputChange('deliveryInfo', 'deliveryType', e.target.value)}
                      />
                      <span className="radio-label">
                        <strong>Pickup</strong>
                        <small>Collect from our office</small>
                      </span>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="deliveryType"
                        value="delivery"
                        checked={orderData.deliveryInfo.deliveryType === 'delivery'}
                        onChange={(e) => handleInputChange('deliveryInfo', 'deliveryType', e.target.value)}
                      />
                      <span className="radio-label">
                        <strong>Delivery</strong>
                        <small>We'll deliver to your location</small>
                      </span>
                    </label>
                  </div>
                </div>

                {orderData.deliveryInfo.deliveryType === 'delivery' && (
                  <div className="form-group">
                    <label htmlFor="deliveryAddress">Delivery Address *</label>
                    <div className="address-input">
                      <textarea
                        id="deliveryAddress"
                        value={orderData.deliveryInfo.deliveryAddress}
                        onChange={(e) => handleInputChange('deliveryInfo', 'deliveryAddress', e.target.value)}
                        placeholder="Enter complete delivery address"
                        rows="3"
                        className={errors.deliveryAddress ? 'error' : ''}
                        required
                      />
                      {errors.deliveryAddress && <span className="error-message">{errors.deliveryAddress}</span>}
                    </div>
                  </div>
                )}

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="deliveryDate">Preferred Date *</label>
                    <input
                      type="date"
                      id="deliveryDate"
                      value={orderData.deliveryInfo.deliveryDate}
                      onChange={(e) => handleInputChange('deliveryInfo', 'deliveryDate', e.target.value)}
                      min={getMinDate()}
                      className={errors.deliveryDate ? 'error' : ''}
                      required
                    />
                    {errors.deliveryDate && <span className="error-message">{errors.deliveryDate}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="deliveryTime">Preferred Time</label>
                    <select
                      id="deliveryTime"
                      value={orderData.deliveryInfo.deliveryTime}
                      onChange={(e) => handleInputChange('deliveryInfo', 'deliveryTime', e.target.value)}
                    >
                      <option value="">Any time</option>
                      <option value="morning">Morning (9 AM - 12 PM)</option>
                      <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                      <option value="evening">Evening (5 PM - 8 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="specialInstructions">Special Instructions *</label>
                  <textarea
                    id="specialInstructions"
                    value={orderData.deliveryInfo.specialInstructions}
                    onChange={(e) => handleInputChange('deliveryInfo', 'specialInstructions', e.target.value)}
                    placeholder="Any special requirements or instructions"
                    rows="3"
                    className={errors.specialInstructions ? 'error' : ''}
                    required
                  />
                  {errors.specialInstructions && <span className="error-message">{errors.specialInstructions}</span>}
                </div>

                <div className="form-group">
                  <label>Order Urgency</label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="urgency"
                        value="normal"
                        checked={orderData.preferences.urgency === 'normal'}
                        onChange={(e) => handleInputChange('preferences', 'urgency', e.target.value)}
                      />
                      <span className="radio-label">
                        <strong>Normal</strong>
                        <small>Standard processing time</small>
                      </span>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="urgency"
                        value="urgent"
                        checked={orderData.preferences.urgency === 'urgent'}
                        onChange={(e) => handleInputChange('preferences', 'urgency', e.target.value)}
                      />
                      <span className="radio-label">
                        <strong>Urgent</strong>
                        <small>Faster processing (extra charges may apply)</small>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <div className="step-content">
                <h2>Review Your Order</h2>
                
                <div className="order-review">
                  <div className="review-section">
                    <h3>Customer Information</h3>
                    <div className="review-details">
                      <p><strong>Name:</strong> {orderData.customerInfo.name}</p>
                      <p><strong>Email:</strong> {orderData.customerInfo.email}</p>
                      <p><strong>Phone:</strong> {orderData.customerInfo.phone}</p>
                      {orderData.customerInfo.company && (
                        <p><strong>Company:</strong> {orderData.customerInfo.company}</p>
                      )}
                      {orderData.customerInfo.address && (
                        <p><strong>Address:</strong> {orderData.customerInfo.address}</p>
                      )}
                    </div>
                  </div>

                  <div className="review-section">
                    <h3>Delivery Information</h3>
                    <div className="review-details">
                      <p><strong>Type:</strong> {orderData.deliveryInfo.deliveryType === 'pickup' ? 'Pickup' : 'Delivery'}</p>
                      {orderData.deliveryInfo.deliveryType === 'delivery' && (
                        <p><strong>Address:</strong> {orderData.deliveryInfo.deliveryAddress}</p>
                      )}
                      <p><strong>Date:</strong> {new Date(orderData.deliveryInfo.deliveryDate).toLocaleDateString()}</p>
                      {orderData.deliveryInfo.deliveryTime && (
                        <p><strong>Time:</strong> {orderData.deliveryInfo.deliveryTime}</p>
                      )}
                      <p><strong>Urgency:</strong> {orderData.preferences.urgency}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="step-navigation">
              {currentStep > 1 && (
                <button type="button" className="btn-previous" onClick={handlePrevious}>
                  ← Previous
                </button>
              )}
              
              {currentStep < 3 ? (
                <button type="button" className="btn-next" onClick={handleNext}>
                  Next →
                </button>
              ) : (
                <button 
                  type="button" 
                  className="btn-submit" 
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="order-summary-sidebar">
            <div className="summary-card">
              <h3>Order Summary</h3>
              <div className="order-items">
                {items.map((item, index) => (
                  <div key={index} className="summary-item">
                    <div className="item-icon">{item.icon}</div>
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                      {item.options && (() => {
                        try {
                          const options = typeof item.options === 'string' ? JSON.parse(item.options) : item.options;
                          return Object.keys(options).length > 0 && (
                            <div className="item-options">
                              {Object.entries(options).map(([key, value]) => (
                                <span key={key} className="option">
                                  {key}: {value}
                                </span>
                              ))}
                            </div>
                          );
                        } catch (e) {
                          return null;
                        }
                      })()}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="summary-total">
                <div className="total-items">
                  Total Items: {getTotalItems()}
                </div>
                <div className="total-note">
                  <p>📞 We'll contact you for pricing and delivery details</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlaceOrder;
