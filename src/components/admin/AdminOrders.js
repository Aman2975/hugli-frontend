import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import apiService from '../../services/api';
import './AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    status: searchParams.get('status') || 'all',
    search: ''
  });
  const { showError, showSuccess } = useNotification();
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAdminOrders();
      
      if (response.success) {
        console.log('Orders loaded:', response.orders);
        console.log('First order ID type:', typeof response.orders[0]?.id);
        console.log('First order ID value:', response.orders[0]?.id);
        setOrders(response.orders || []);
      } else {
        showError('Failed to load orders');
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      showError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await apiService.updateOrderStatus(orderId, newStatus);
      
      if (response.success) {
        showSuccess(`Order status updated to ${newStatus}`);
        // Update the order in the local state
        setOrders(orders.map(order => 
          order.id === orderId 
            ? { ...order, status: newStatus }
            : order
        ));
      } else {
        showError('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      showError('Failed to update order status');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await apiService.deleteOrder(orderId);
      if (response.success) {
        showSuccess('Order deleted successfully');
        loadOrders(); // Reload orders to reflect changes
      } else {
        showError(response.message || 'Failed to delete order');
      }
    } catch (error) {
      console.error('Delete order error:', error);
      showError('Error deleting order');
    }
  };

  const handleBulkDeleteByStatus = async (status) => {
    if (!window.confirm(`Are you sure you want to delete ALL orders with status "${status}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await apiService.deleteOrdersByStatus(status);
      if (response.success) {
        showSuccess(response.message);
        loadOrders(); // Reload orders to reflect changes
      } else {
        showError(response.message || 'Failed to delete orders');
      }
    } catch (error) {
      console.error('Bulk delete error:', error);
      showError('Error deleting orders');
    }
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    // Update URL params
    if (filterType === 'status') {
      if (value === 'all') {
        searchParams.delete('status');
      } else {
        searchParams.set('status', value);
      }
      setSearchParams(searchParams);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filters.status === 'all' || order.status === filters.status;
    const matchesSearch = filters.search === '' || 
      order.customer_name.toLowerCase().includes(filters.search.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(filters.search.toLowerCase()) ||
      order.id.toString().toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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

  const getStatusOptions = (currentStatus) => {
    const allStatuses = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'];
    return allStatuses.filter(status => status !== currentStatus);
  };

  if (loading) {
    return (
      <div className="admin-orders">
        <div className="admin-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-orders">
      <div className="admin-container">
        {/* Header */}
        <div className="admin-header">
          <div className="header-left">
            <Link to="/admin/dashboard" className="back-btn">
              ← Back to Dashboard
            </Link>
            <h1>Orders Management</h1>
            <p>Manage and track all customer orders</p>
          </div>
          <div className="header-right">
            <button onClick={loadOrders} className="refresh-btn">
              🔄 Refresh
            </button>
            <button className="admin-logout-btn" onClick={handleLogout}>
              <span className="logout-icon">🚪</span>
              Logout
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filters-row">
            <div className="filter-group">
              <label htmlFor="status-filter">Status Filter:</label>
              <select
                id="status-filter"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="filter-select"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="search-filter">Search:</label>
              <input
                id="search-filter"
                type="text"
                placeholder="Search by name, email, or order ID..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="filter-input"
              />
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="bulk-actions-section">
          <div className="bulk-actions-header">
            <h3>Bulk Actions</h3>
          </div>
          <div className="bulk-actions-content">
            <div className="bulk-delete-group">
              <label>Delete all orders with status:</label>
              <select
                id="bulk-delete-status"
                className="bulk-delete-select"
                defaultValue=""
              >
                <option value="">Select status...</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button
                onClick={() => {
                  const select = document.getElementById('bulk-delete-status');
                  const status = select.value;
                  if (status) {
                    handleBulkDeleteByStatus(status);
                    select.value = '';
                  } else {
                    showError('Please select a status first');
                  }
                }}
                className="bulk-delete-btn"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="orders-section">
          <div className="section-header">
            <h2>Orders ({filteredOrders.length})</h2>
          </div>

          <div className="orders-table-container">
            {filteredOrders.length > 0 ? (
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Urgency</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="order-id">
                        <Link to={`/admin/orders/${order.id}`}>
                          #{order.id.toString().slice(-8).toUpperCase()}
                        </Link>
                      </td>
                      <td>
                        <div className="customer-info">
                          <strong>{order.customer_name}</strong>
                          <span>{order.customer_email}</span>
                          <span>{order.customer_phone || 'No phone'}</span>
                        </div>
                      </td>
                      <td>
                        <div className="status-cell">
                          <span 
                            className="status-badge"
                            style={{ backgroundColor: getStatusColor(order.status) }}
                          >
                            {getStatusText(order.status)}
                          </span>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className="status-select"
                          >
                            {getStatusOptions(order.status).map(status => (
                              <option key={status} value={status}>
                                {getStatusText(status)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td>{formatDate(order.created_at)}</td>
                      <td>
                        <div className="items-info">
                          <span className="items-count">{order.items ? order.items.length : 0} items</span>
                          {order.items && order.items.length > 0 && (
                            <div className="items-preview">
                              {order.items.slice(0, 2).map((item, index) => (
                                <span key={index} className="item-name">
                                  {item.product_name}
                                </span>
                              ))}
                              {order.items.length > 2 && (
                                <span className="more-items">+{order.items.length - 2} more</span>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`urgency-badge ${order.urgency || 'normal'}`}>
                          {order.urgency === 'urgent' ? 'Urgent' : 
                           order.urgency === 'rush' ? 'Rush' : 'Normal'}
                        </span>
                      </td>
                      <td>
                        <div className="actions-cell">
                          <Link 
                            to={`/admin/orders/${order.id}`}
                            className="view-details-btn"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="delete-btn"
                            title="Delete Order"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-orders">
                <div className="no-orders-icon">📋</div>
                <h3>No orders found</h3>
                <p>No orders match your current filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
