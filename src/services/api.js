// API service for connecting frontend with backend
import config from '../config';

const API_BASE_URL = config.API_BASE_URL;

class ApiService {
  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  // Products API
  async getProducts() {
    return this.request('/products');
  }

  async getProduct(id) {
    return this.request(`/products/${id}`);
  }

  // Orders API
  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrders() {
    return this.request('/orders');
  }

  async getOrder(id) {
    return this.request(`/orders/${id}`);
  }

  async updateUserOrderStatus(id, status) {
    return this.request(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Contact API
  async submitContactForm(contactData) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  async getContactMessages() {
    return this.request('/contact');
  }

  async updateContactMessageStatus(id, status) {
    return this.request(`/contact/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Authentication API
  async login(email, password, phone) {
    const data = { password };
    if (email) data.email = email;
    if (phone) data.phone = phone;
    
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  async updateProfile(profileData) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(currentPassword, newPassword) {
    return this.request('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // Email Authentication API
  async sendOTP(email, phone) {
    const data = {};
    if (email) data.email = email;
    if (phone) data.phone = phone;
    
    return this.request('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async verifyOTP(email, otp, phone) {
    const data = { otp };
    if (email) data.email = email;
    if (phone) data.phone = phone;
    
    return this.request('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async verifyEmailOTP(email, otp) {
    return this.request('/auth/verify-email-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
  }

  async sendVerificationEmail(email) {
    return this.request('/auth/send-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resendVerificationOTP(email) {
    return this.request('/auth/resend-verification-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async verifyEmail(token) {
    return this.request(`/auth/verify-email?token=${token}`);
  }

  async forgotPassword(email) {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(email, otp, newPassword) {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, otp, newPassword }),
    });
  }

  // User Addresses API
  async getUserAddresses() {
    return this.request('/auth/addresses');
  }

  async addAddress(addressData) {
    // Map frontend field names to backend expected field names
    const mappedData = {
      name: addressData.fullName,
      phone: addressData.phone,
      address: addressData.addressLine1,
      city: addressData.city,
      state: addressData.state,
      pincode: addressData.postalCode,
      country: addressData.country,
      is_default: addressData.isDefault
    };
    
    return this.request('/auth/addresses', {
      method: 'POST',
      body: JSON.stringify(mappedData),
    });
  }

  async updateAddress(addressId, addressData) {
    // Map frontend field names to backend expected field names
    const mappedData = {
      name: addressData.fullName,
      phone: addressData.phone,
      address: addressData.addressLine1,
      city: addressData.city,
      state: addressData.state,
      pincode: addressData.postalCode,
      country: addressData.country,
      is_default: addressData.isDefault
    };
    
    return this.request(`/auth/addresses/${addressId}`, {
      method: 'PUT',
      body: JSON.stringify(mappedData),
    });
  }

  async deleteAddress(addressId) {
    return this.request(`/auth/addresses/${addressId}`, {
      method: 'DELETE',
    });
  }

  // User Orders API
  async getUserOrders() {
    return this.request('/auth/orders');
  }

  // Admin Authentication
  async adminLogin(email, password) {
    return this.request('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Admin Orders
  async getAdminOrders() {
    return this.request('/admin/orders');
  }

  async getAdminOrder(orderId) {
    return this.request(`/admin/orders/${orderId}`);
  }

  async updateOrderStatus(orderId, status) {
    return this.request(`/admin/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Contact Management API
  async getAdminContacts() {
    return this.request('/admin/contacts');
  }

  async updateContactStatus(contactId, status) {
    return this.request(`/admin/contacts/${contactId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Admin Delete Operations API
  async deleteOrder(orderId) {
    return this.request(`/admin/orders/${orderId}`, {
      method: 'DELETE',
    });
  }

  async deleteOrdersByStatus(status) {
    return this.request(`/admin/orders/status/${status}`, {
      method: 'DELETE',
    });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;