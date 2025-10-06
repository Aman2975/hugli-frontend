import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import apiService from '../services/api';
import './OrderDetails.css';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { showError } = useNotification();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrderDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get all orders and find the specific one
      const response = await apiService.getUserOrders();
      
      if (response && response.success && Array.isArray(response.orders)) {
        const foundOrder = response.orders.find(o => o.id === orderId);
        
        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          setError('Order not found');
        }
      } else {
        setError('Failed to load order details');
      }
    } catch (error) {
      console.error('Error loading order details:', error);
      setError('Failed to load order details');
      showError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  }, [orderId, showError]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    loadOrderDetails();
  }, [orderId, isAuthenticated, navigate, loadOrderDetails]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateOnly = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f59e0b',
      confirmed: '#3b82f6',
      in_progress: '#8b5cf6',
      completed: '#10b981',
      cancelled: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const getStatusText = (status) => {
    const statusTexts = {
      pending: 'Pending',
      confirmed: 'Confirmed',
      in_progress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled'
    };
    return statusTexts[status] || status;
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      normal: '#10b981',
      urgent: '#f59e0b',
      rush: '#ef4444'
    };
    return colors[urgency] || '#6b7280';
  };

  const getUrgencyText = (urgency) => {
    const urgencyTexts = {
      normal: 'Normal (3-5 business days)',
      urgent: 'Urgent (1-2 business days)',
      rush: 'Rush (Same day)'
    };
    return urgencyTexts[urgency] || urgency;
  };

  if (loading) {
    return (
      <div className="order-details-page">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="order-details-page">
        <div className="container">
          <div className="error-state">
            <div className="error-icon">❌</div>
            <h2>Order Not Found</h2>
            <p>{error || 'The order you are looking for does not exist or you do not have permission to view it.'}</p>
            <div className="error-actions">
              <Link to="/profile" className="btn-primary">Back to Profile</Link>
              <Link to="/products" className="btn-secondary">Browse Products</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-details-page">
      <div className="container">
        {/* Header */}
        <div className="order-header">
          <div className="header-left">
            <Link to="/profile" className="back-btn">
              ← Back to Profile
            </Link>
            <h1>Order Details</h1>
            <p className="order-id">Order #{order.id.toString().slice(-8).toUpperCase()}</p>
          </div>
          <div className="header-right">
            <div className="order-status">
              <span 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(order.status) }}
              >
                {getStatusText(order.status)}
              </span>
            </div>
            <div className="order-date">
              <p>Placed on {formatDate(order.created_at)}</p>
            </div>
          </div>
        </div>

        <div className="order-content">
          {/* Order Summary */}
          <div className="order-summary-card">
            <h2>Order Summary</h2>
            <div className="summary-grid">
              <div className="summary-item">
                <label>Order ID</label>
                <span>{order.id}</span>
              </div>
              <div className="summary-item">
                <label>Status</label>
                <span 
                  className="status-text"
                  style={{ color: getStatusColor(order.status) }}
                >
                  {getStatusText(order.status)}
                </span>
              </div>
              <div className="summary-item">
                <label>Urgency</label>
                <span 
                  className="urgency-text"
                  style={{ color: getUrgencyColor(order.urgency) }}
                >
                  {getUrgencyText(order.urgency)}
                </span>
              </div>
              <div className="summary-item">
                <label>Total Items</label>
                <span>{order.items ? order.items.length : 0}</span>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="info-card">
            <h2>Customer Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Name</label>
                <span>{order.customer_name}</span>
              </div>
              <div className="info-item">
                <label>Email</label>
                <span>{order.customer_email}</span>
              </div>
              <div className="info-item">
                <label>Phone</label>
                <span>{order.customer_phone || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>Company</label>
                <span>{order.customer_company || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="info-card">
            <h2>Delivery Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Delivery Type</label>
                <span className="delivery-type">
                  {order.delivery_type === 'pickup' ? '🏢 Pickup from Store' : '🚚 Home Delivery'}
                </span>
              </div>
              {order.delivery_type === 'delivery' && (
                <div className="info-item full-width">
                  <label>Delivery Address</label>
                  <span className="address-text">{order.delivery_address || 'N/A'}</span>
                </div>
              )}
              <div className="info-item">
                <label>Preferred Date</label>
                <span>{formatDateOnly(order.delivery_date)}</span>
              </div>
              <div className="info-item">
                <label>Preferred Time</label>
                <span>{order.delivery_time || 'Any time'}</span>
              </div>
              {order.special_instructions && (
                <div className="info-item full-width">
                  <label>Special Instructions</label>
                  <span className="instructions-text">{order.special_instructions}</span>
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="items-card">
            <h2>Order Items</h2>
            <div className="items-list">
              {order.items && order.items.length > 0 ? (
                order.items.map((item, index) => (
                  <div key={index} className="item-card">
                    <div className="item-header">
                      <div className="item-icon">{item.product_icon}</div>
                      <div className="item-info">
                        <h3>{item.product_name}</h3>
                        {item.product_description && (
                          <p className="item-description">{item.product_description}</p>
                        )}
                      </div>
                      <div className="item-quantity">
                        <span className="quantity-badge">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    
                    {item.options && Object.keys(item.options).length > 0 && (
                      <div className="item-options">
                        <h4>Options:</h4>
                        <div className="options-grid">
                          {Object.entries(item.options).map(([key, value]) => (
                            <div key={key} className="option-item">
                              <span className="option-key">{key}:</span>
                              <span className="option-value">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="no-items">
                  <p>No items found in this order.</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Preferences */}
          <div className="info-card">
            <h2>Contact Preferences</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Preferred Contact Method</label>
                <span className="contact-method">
                  {order.contact_method === 'phone' ? '📞 Phone Call' : 
                   order.contact_method === 'email' ? '📧 Email' : 
                   order.contact_method === 'whatsapp' ? '💬 WhatsApp' : 
                   order.contact_method}
                </span>
              </div>
              <div className="info-item">
                <label>Preferred Contact Time</label>
                <span>
                  {order.preferred_contact_time === 'morning' ? 'Morning (9 AM - 12 PM)' :
                   order.preferred_contact_time === 'afternoon' ? 'Afternoon (12 PM - 5 PM)' :
                   order.preferred_contact_time === 'evening' ? 'Evening (5 PM - 8 PM)' :
                   'Anytime'}
                </span>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="timeline-card">
            <h2>Order Timeline</h2>
            <div className="timeline">
              <div className="timeline-item completed">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>Order Placed</h4>
                  <p>{formatDate(order.created_at)}</p>
                </div>
              </div>
              
              {order.status === 'confirmed' && (
                <div className="timeline-item completed">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Order Confirmed</h4>
                    <p>Your order has been confirmed and is being processed.</p>
                  </div>
                </div>
              )}
              
              {order.status === 'in_progress' && (
                <div className="timeline-item completed">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>In Progress</h4>
                    <p>Your order is currently being processed.</p>
                  </div>
                </div>
              )}
              
              {order.status === 'completed' && (
                <div className="timeline-item completed">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Completed</h4>
                    <p>Your order has been completed and is ready for pickup/delivery.</p>
                  </div>
                </div>
              )}
              
              {order.status === 'cancelled' && (
                <div className="timeline-item cancelled">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Cancelled</h4>
                    <p>This order has been cancelled.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="actions-card">
            <div className="actions-content">
              <div className="actions-info">
                <h3>Need Help?</h3>
                <p>If you have any questions about this order, please contact us.</p>
              </div>
              <div className="actions-buttons">
                <Link to="/contact" className="btn-primary">
                  Contact Support
                </Link>
                <Link to="/products" className="btn-secondary">
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
