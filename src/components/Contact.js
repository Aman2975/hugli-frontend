import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import apiService from '../services/api';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    serviceType: ''
  });

  const { showSuccess, showError } = useNotification();

  const serviceTypes = [
    'Visiting Cards',
    'Pamphlets & Posters',
    'Garment Tags',
    'Files',
    'Letter Heads',
    'Envelopes',
    'Digital Paper Printing',
    'ATM Pouches',
    'Bill Books',
    'Stickers',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Only name is required
    if (!formData.name.trim()) {
      showError('Please enter your name');
      return;
    }

    // Email validation (only if provided)
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        showError('Please enter a valid email address');
        return;
      }
    }

    // Phone validation (only if provided)
    if (formData.phone.trim()) {
      const phoneRegex = /^[+]?[0-9\s\-()]{10,}$/;
      if (!phoneRegex.test(formData.phone)) {
        showError('Please enter a valid phone number');
        return;
      }
    }

    try {
      // Submit form to backend
      await apiService.submitContactForm(formData);
      
      // Show success message
      showSuccess('Thank you for your message! We will get back to you within 24 hours.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        serviceType: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      showError('Failed to submit your message. Please try again or contact us directly.');
    }
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Address',
      details: [
        'Handiaya Bazaar Rd',
        'Barnala, Punjab 148101',
        'India'
      ]
    },
    {
      icon: '📞',
      title: 'Phone',
      details: [
        '+91 78373 15102',
        '+91 78373 15102'
      ]
    },
    {
      icon: '✉️',
      title: 'Email',
      details: [
        'bhavnishgarg94@gmail.com',
        'bhavnishgarg94@gmail.com'
      ]
    },
    {
      icon: '🕒',
      title: 'Business Hours',
      details: [
        'Monday - Friday: 9:00 AM - 7:00 PM',
        'Saturday: 9:00 AM - 5:00 PM',
        'Sunday: Closed'
      ]
    }
  ];

  return (
    <div className="contact-page">
      {/* Header Section */}
      <section className="contact-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with our team for all your printing needs</p>
        </div>
      </section>

      {/* Breadcrumb Section */}
      <section className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">Contact</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <div className="form-header">
                <h2>Send us a Message</h2>
                <p>Fill out the form below and we'll get back to you as soon as possible. Only your name is required.</p>
              </div>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="serviceType">Service Required</label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a service</option>
                      {serviceTypes.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Enter subject"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your printing requirements..."
                    rows="6"
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <div className="info-header">
                <h2>Get in Touch</h2>
                <p>We're here to help with all your printing needs.</p>
              </div>

              <div className="contact-info-grid">
                {contactInfo.map((info, index) => (
                  <div key={index} className="info-card">
                    <div className="info-icon">{info.icon}</div>
                    <div className="info-content">
                      <h3>{info.title}</h3>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex}>{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="quick-contact">
                <h3>Quick Contact</h3>
                <div className="quick-buttons">
                  <a href="tel:+917837315102" className="quick-btn phone">
                    📞 Call Now
                  </a>
                  <a href="mailto:bhavnishgarg94@gmail.com" className="quick-btn email">
                    ✉️ Email Us
                  </a>
                  <a href="https://wa.me/917837315102" className="quick-btn whatsapp" target="_blank" rel="noopener noreferrer">
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <h2>Find Us</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.379523252459!2d75.54478614575096!3d30.37337159499353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3910f376559490b9%3A0x2edc362fa9ff6bd4!2sHugli%20Printing%20Press!5e0!3m2!1sen!2sin!4v1757612424262!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hugli Printing Press Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
