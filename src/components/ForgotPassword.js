import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import apiService from '../services/api';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      showError('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      const result = await apiService.forgotPassword(email);
      console.log('Forgot password API response:', result);
      
      if (result.requiresOTP) {
        console.log('Navigating to reset-password with email:', email);
        showSuccess('Password reset OTP sent successfully!');
        navigate('/reset-password', { 
          state: { 
            email: email,
            message: 'Please check your email for the OTP to reset your password.'
          }
        });
      } else {
        console.log('No OTP required, showing email sent message');
        setIsEmailSent(true);
        showSuccess('Password reset email sent successfully!');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      showError('Failed to send reset OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="forgot-password-container">
        <div className="forgot-password-card">
          <div className="email-sent-success">
            <div className="success-icon">✓</div>
            <h2>Check Your Email</h2>
            <p>We've sent a password reset link to:</p>
            <p className="email-display">{email}</p>
            <p className="instruction-text">
              Click the link in the email to reset your password. The link will expire in 1 hour.
            </p>
            <div className="success-actions">
              <button 
                className="resend-btn"
                onClick={() => {
                  setIsEmailSent(false);
                  setEmail('');
                }}
              >
                Send to Different Email
              </button>
              <Link to="/login" className="back-to-login">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <div className="forgot-password-header">
          <h2>Forgot Password?</h2>
          <p>Enter your email address and we'll send you an OTP to reset your password.</p>
        </div>

        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset OTP'}
          </button>
        </form>

        <div className="forgot-password-footer">
          <p>Remember your password?</p>
          <Link to="/login" className="login-link">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
