import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import apiService from '../../services/api';
import './AdminOrderDetails.css';

const AdminOrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { showError, showSuccess } = useNotification();
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadOrderDetails();
  }, [orderId]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadOrderDetails = async () => {
    try {
      setLoading(true);
      console.log('Raw orderId from URL:', orderId);
      console.log('Type of orderId:', typeof orderId);
      
      // Check if orderId is valid
      if (!orderId || orderId === 'undefined' || orderId === 'null') {
        console.error('Invalid orderId:', orderId);
        showError('Invalid order ID');
        return;
      }
      
      // Order IDs are UUIDs (strings), no need to convert to number
      console.log('Order ID (UUID):', orderId);
      
      const response = await apiService.getAdminOrder(orderId);
      console.log('API response:', response);
      
      if (response.success) {
        setOrder(response.order);
        console.log('Order set:', response.order);
        console.log('Order items:', response.order.items);
        if (response.order.items && response.order.items.length > 0) {
          console.log('First item options:', response.order.items[0].options);
        }
      } else {
        console.error('API returned success: false');
        showError('Failed to load order details');
      }
    } catch (error) {
      console.error('Error loading order details:', error);
      showError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setUpdating(true);
      // Order IDs are UUIDs (strings), no need to convert to number
      const response = await apiService.updateOrderStatus(orderId, newStatus);
      
      if (response.success) {
        showSuccess(`Order status updated to ${newStatus}`);
        setOrder({ ...order, status: newStatus });
      } else {
        showError('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      showError('Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

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

  const handleLogout = () => {
    logout();
    showSuccess('Admin logged out successfully');
    navigate('/admin/login');
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
      <div className="admin-order-details">
        <div className="admin-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="admin-order-details">
        <div className="admin-container">
          <div className="error-state">
            <div className="error-icon">❌</div>
            <h2>Order Not Found</h2>
            <p>The order you are looking for does not exist.</p>
            <Link to="/admin/orders" className="btn-primary">Back to Orders</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-order-details">
      <div className="admin-container">
        {/* Header */}
        <div className="admin-header">
          <div className="header-left">
            <Link to="/admin/orders" className="back-btn">
              ← Back to Orders
            </Link>
            <h1>Order Details</h1>
            <p className="order-id">Order #{order.id.toString().slice(-8).toUpperCase()}</p>
          </div>
          <div className="header-right">
            <div className="status-controls">
              <label htmlFor="status-select">Update Status:</label>
              <select
                id="status-select"
                value={order.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={updating}
                className="status-select"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              {updating && <span className="updating-text">Updating...</span>}
            </div>
            <div className="current-status">
              <span 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(order.status) }}
              >
                {getStatusText(order.status)}
              </span>
            </div>
            <button className="admin-logout-btn" onClick={handleLogout}>
              <span className="logout-icon">🚪</span>
              Logout
            </button>
          </div>
        </div>

        <div className="order-content">
          {/* Order Summary */}
          <div className="order-summary-card">
            <h2>Order Summary</h2>
            <div className="summary-grid">
              <div className="summary-item">
                <label>Order ID</label>
                <span className="order-id-full">{order.id}</span>
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
              <div className="summary-item">
                <label>Order Date</label>
                <span>{formatDate(order.created_at)}</span>
              </div>
              <div className="summary-item">
                <label>Delivery Type</label>
                <span className="delivery-type">
                  {order.delivery_type === 'pickup' ? '🏢 Pickup from Store' : '🚚 Home Delivery'}
                </span>
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
                    
                    {item.options && Object.keys(item.options).length > 0 ? (
                      <div className="item-options">
                        <h4>Product Options:</h4>
                        <div className="options-grid">
                          {Object.entries(item.options).map(([key, value]) => (
                            <div key={key} className="option-item">
                              <span className="option-key">
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                              </span>
                              <span className="option-value">
                                {typeof value === 'object' ? JSON.stringify(value) : value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="item-options">
                        <p className="no-options">No additional options specified</p>
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

          {/* Admin Actions */}
          <div className="admin-actions-card">
            <h2>Admin Actions</h2>
            <div className="actions-grid">
              <button 
                className="action-btn primary"
                onClick={() => handleStatusChange('confirmed')}
                disabled={updating || order.status === 'confirmed'}
              >
                Confirm Order
              </button>
              <button 
                className="action-btn secondary"
                onClick={() => handleStatusChange('in_progress')}
                disabled={updating || order.status === 'in_progress'}
              >
                Mark In Progress
              </button>
              <button 
                className="action-btn success"
                onClick={() => handleStatusChange('completed')}
                disabled={updating || order.status === 'completed'}
              >
                Mark Completed
              </button>
              <button 
                className="action-btn danger"
                onClick={() => handleStatusChange('cancelled')}
                disabled={updating || order.status === 'cancelled'}
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
