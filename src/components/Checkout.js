import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import apiService from '../services/api';
import './Checkout.css';

const Checkout = () => {
  const { items, clearCart, getTotalItems } = useCart();
  const { showSuccess, showError } = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!customerInfo.name.trim()) {
      showError('Please enter your name');
      return;
    }
    
    if (!customerInfo.email.trim()) {
      showError('Please enter your email');
      return;
    }
    
    if (!customerInfo.phone.trim()) {
      showError('Please enter your phone number');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) {
      showError('Please enter a valid email address');
      return;
    }

    // Phone validation
    const phoneRegex = /^[+]?[0-9\s\-()]{10,}$/;
    if (!phoneRegex.test(customerInfo.phone)) {
      showError('Please enter a valid phone number');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare order data
      const orderData = {
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
        customerInfo: customerInfo
      };

      // Submit order to backend
      const order = await apiService.createOrder(orderData);
      
      // Show success message
      showSuccess(`Order placed successfully! Order ID: ${order.id}`);
      
      // Clear cart
      clearCart();
      
      // Reset form
      setCustomerInfo({
        name: '',
        email: '',
        phone: '',
        company: ''
      });
      
    } catch (error) {
      console.error('Error placing order:', error);
      showError('Failed to place order. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="checkout-header">
            <h1>Checkout</h1>
            <p>Your cart is empty</p>
          </div>
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>No items to checkout</h2>
            <p>Add some items to your cart first</p>
            <Link to="/products" className="btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>Review your order and provide your details</p>
        </div>

        <div className="checkout-content">
          <div className="checkout-form-section">
            <form className="checkout-form" onSubmit={handleSubmit}>
              <h2>Customer Information</h2>
              
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="company">Company Name</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={customerInfo.company}
                  onChange={handleInputChange}
                  placeholder="Enter your company name (optional)"
                />
              </div>

              <button 
                type="submit" 
                className="submit-order-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          <div className="order-summary-section">
            <h2>Order Summary</h2>
            <div className="order-items">
              {items.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-icon">{item.icon}</div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
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
                    <div className="item-quantity">Quantity: {item.quantity}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-total">
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
  );
};

export default Checkout;