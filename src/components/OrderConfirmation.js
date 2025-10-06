import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { showError } = useNotification();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // In a real app, you would fetch the order details from the backend
        // For now, we'll simulate the order data
        const orderData = {
          id: orderId,
          status: 'pending',
          createdAt: new Date().toISOString(),
          customerInfo: {
            name: user?.name || 'Customer',
            email: user?.email || 'customer@example.com',
            phone: user?.phone || 'N/A'
          },
          items: [
            {
              name: 'Sample Product',
              description: 'This is a sample product',
              icon: '📄',
              quantity: 1,
              options: {}
            }
          ],
          totalItems: 1,
          deliveryInfo: {
            deliveryType: 'pickup',
            deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          }
        };
        
        setOrder(orderData);
      } catch (error) {
        console.error('Error fetching order:', error);
        showError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId, user, showError]);

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

  if (loading) {
    return (
      <div className="order-confirmation-page">
        <div className="container">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-confirmation-page">
        <div className="container">
          <div className="error-state">
            <div className="error-icon">❌</div>
            <h2>Order Not Found</h2>
            <p>The order you're looking for doesn't exist or has been removed.</p>
            <Link to="/products" className="btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-confirmation-page">
      <div className="container">
        <div className="confirmation-header">
          <div className="success-icon">✅</div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your order. We'll contact you soon with pricing and delivery details.</p>
        </div>

        <div className="order-details">
          <div className="order-info-card">
            <h2>Order Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Order ID</label>
                <span className="order-id">#{order.id}</span>
              </div>
              <div className="info-item">
                <label>Status</label>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <div className="info-item">
                <label>Order Date</label>
                <span>{formatDate(order.createdAt)}</span>
              </div>
              <div className="info-item">
                <label>Total Items</label>
                <span>{order.totalItems}</span>
              </div>
            </div>
          </div>

          <div className="customer-info-card">
            <h2>Customer Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Name</label>
                <span>{order.customerInfo.name}</span>
              </div>
              <div className="info-item">
                <label>Email</label>
                <span>{order.customerInfo.email}</span>
              </div>
              <div className="info-item">
                <label>Phone</label>
                <span>{order.customerInfo.phone}</span>
              </div>
            </div>
          </div>

          <div className="delivery-info-card">
            <h2>Delivery Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Delivery Type</label>
                <span>{order.deliveryInfo.deliveryType === 'pickup' ? 'Pickup' : 'Delivery'}</span>
              </div>
              <div className="info-item">
                <label>Preferred Date</label>
                <span>{new Date(order.deliveryInfo.deliveryDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="order-items-card">
            <h2>Order Items</h2>
            <div className="items-list">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-icon">{item.icon}</div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <div className="item-quantity">Quantity: {item.quantity}</div>
                    {item.options && Object.keys(item.options).length > 0 && (
                      <div className="item-options">
                        {Object.entries(item.options).map(([key, value]) => (
                          <span key={key} className="option">
                            {key}: {value}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="next-steps">
          <h2>What's Next?</h2>
          <div className="steps-list">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Order Confirmation</h3>
                <p>We'll review your order and contact you within 24 hours with pricing details.</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Payment & Processing</h3>
                <p>Once you confirm the pricing, we'll process your order and begin production.</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Delivery</h3>
                <p>Your order will be ready for pickup or delivery as per your preference.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-info">
          <h2>Need Help?</h2>
          <p>If you have any questions about your order, please don't hesitate to contact us:</p>
          <div className="contact-methods">
            <div className="contact-method">
              <span className="contact-icon">📞</span>
              <div>
                <strong>Phone</strong>
                <p>+91 7837315102</p>
              </div>
            </div>
            <div className="contact-method">
              <span className="contact-icon">📧</span>
              <div>
                <strong>Email</strong>
                <p>bhavnishgarg94@gmail.com</p>
              </div>
            </div>
            <div className="contact-method">
              <span className="contact-icon">💬</span>
              <div>
                <strong>WhatsApp</strong>
                <p>+91 7837315102</p>
              </div>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <Link to="/products" className="btn-secondary">
            Continue Shopping
          </Link>
          {isAuthenticated && (
            <Link to="/profile" className="btn-primary">
              View My Orders
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;