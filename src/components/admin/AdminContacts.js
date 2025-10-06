import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/api';
import './AdminContacts.css';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { logout } = useAuth();
  const { showError } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchContacts = async () => {
    try {
      const response = await apiService.getAdminContacts();
      if (response.success) {
        setContacts(response.contacts);
      } else {
        showError('Failed to load contact messages');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      showError('Failed to load contact messages');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      const response = await apiService.updateContactStatus(contactId, newStatus);
      if (response.success) {
        setContacts(contacts.map(contact => 
          contact.id === contactId ? { ...contact, status: newStatus } : contact
        ));
      } else {
        showError('Failed to update contact status');
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
      showError('Failed to update contact status');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { text: 'New', class: 'status-new' },
      read: { text: 'Read', class: 'status-read' },
      replied: { text: 'Replied', class: 'status-replied' }
    };
    
    const config = statusConfig[status] || statusConfig.new;
    return <span className={`status-badge ${config.class}`}>{config.text}</span>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="admin-contacts">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading contact messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-contacts">
      {/* Header */}
      <div className="admin-header">
        <div className="header-content">
          <h1>Contact Messages</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, email, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="status-filter">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
        </div>
      </div>

      {/* Contacts List */}
      <div className="contacts-container">
        {filteredContacts.length === 0 ? (
          <div className="no-contacts">
            <p>No contact messages found</p>
          </div>
        ) : (
          <div className="contacts-table-wrapper">
            <table className="contacts-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact Info</th>
                  <th>Subject</th>
                  <th>Service</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map(contact => (
                  <tr key={contact.id} className="contact-row">
                    <td className="contact-name">
                      <strong>{contact.name}</strong>
                    </td>
                    <td className="contact-info">
                      <div className="contact-details">
                        {contact.email && (
                          <div className="contact-email">📧 {contact.email}</div>
                        )}
                        {contact.phone && (
                          <div className="contact-phone">📞 {contact.phone}</div>
                        )}
                        {contact.company && (
                          <div className="contact-company">🏢 {contact.company}</div>
                        )}
                        {!contact.email && !contact.phone && !contact.company && (
                          <div className="no-contact">No contact info</div>
                        )}
                      </div>
                    </td>
                    <td className="contact-subject">
                      {contact.subject || '-'}
                    </td>
                    <td className="contact-service">
                      {contact.service_type || '-'}
                    </td>
                    <td className="contact-message">
                      {contact.message ? (
                        <div className="message-preview" title={contact.message}>
                          {contact.message.length > 50 
                            ? `${contact.message.substring(0, 50)}...` 
                            : contact.message
                          }
                        </div>
                      ) : '-'}
                    </td>
                    <td className="contact-date">
                      {formatDate(contact.created_at)}
                    </td>
                    <td className="contact-status">
                      {getStatusBadge(contact.status)}
                    </td>
                    <td className="contact-actions">
                      <select
                        value={contact.status}
                        onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                        className="status-select"
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="contacts-summary">
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-number">{contacts.length}</span>
            <span className="stat-label">Total Messages</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{contacts.filter(c => c.status === 'new').length}</span>
            <span className="stat-label">New Messages</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{contacts.filter(c => c.status === 'read').length}</span>
            <span className="stat-label">Read Messages</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{contacts.filter(c => c.status === 'replied').length}</span>
            <span className="stat-label">Replied Messages</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContacts;
