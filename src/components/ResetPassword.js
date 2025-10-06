import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import apiService from '../services/api';
import OTPInput from './OTPInput';
import './ResetPassword.css';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  // Get email from location state
  const email = location.state?.email;

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    console.log('ResetPassword component mounted');
    console.log('Location state:', location.state);
    console.log('Email from state:', email);
    
    if (!email) {
      console.log('No email found, redirecting to forgot password');
      showError('Email not found. Please try the forgot password process again.');
      navigate('/forgot-password');
    }
  }, [email, showError, navigate, location.state]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleOTPComplete = (otpValue) => {
    setOtp(otpValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      showError('Please enter a valid 6-digit OTP');
      return;
    }

    if (!formData.newPassword || !formData.confirmPassword) {
      showError('Please fill in all fields');
      return;
    }

    if (formData.newPassword.length < 6) {
      showError('Password must be at least 6 characters long');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      showError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Reset password request data:', {
        email: email,
        otp: otp,
        newPassword: formData.newPassword
      });
      
      const result = await apiService.resetPassword(email, otp, formData.newPassword);
      console.log('Reset password API response:', result);
      
      if (result.message === 'Password reset successfully') {
        setIsPasswordReset(true);
        showSuccess('Password reset successfully!');
      } else {
        showError(result.error || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      console.error('Error response:', error.response?.data);
      showError('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email) {
      showError('Email not found. Please try the forgot password process again.');
      return;
    }

    setIsResending(true);
    try {
      console.log('Resending OTP for email:', email);
      const result = await apiService.forgotPassword(email);
      console.log('Resend OTP API response:', result);
      
      if (result.requiresOTP) {
        showSuccess('OTP sent successfully!');
        setCountdown(60); // 60 seconds countdown
      } else {
        showError(result.error || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      console.error('Error response:', error.response?.data);
      showError('Failed to send OTP. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  if (!email) {
    return (
      <div className="reset-password-container">
        <div className="reset-password-card">
          <div className="invalid-token">
            <div className="error-icon">✗</div>
            <h2>Email Not Found</h2>
            <p>Please try the forgot password process again.</p>
            <Link to="/forgot-password" className="forgot-password-link">
              Go to Forgot Password
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isPasswordReset) {
    return (
      <div className="reset-password-container">
        <div className="reset-password-card">
          <div className="password-reset-success">
            <div className="success-icon">✓</div>
            <h2>Password Reset Successfully!</h2>
            <p>Your password has been updated. You can now login with your new password.</p>
            <Link to="/login" className="login-btn">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <div className="reset-password-header">
          <h2>Reset Your Password</h2>
          <p>We've sent a 6-digit verification code to:</p>
          <p className="email-display">{email}</p>
        </div>

        <div className="otp-input-section">
          <label htmlFor="otp">Enter OTP</label>
          <OTPInput
            length={6}
            onComplete={handleOTPComplete}
            disabled={isLoading}
          />
        </div>

        <form onSubmit={handleSubmit} className="reset-password-form">
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              required
              disabled={isLoading}
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              required
              disabled={isLoading}
              minLength="6"
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading || otp.length !== 6}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <div className="resend-section">
          <p>Didn't receive the code?</p>
          <button
            type="button"
            className="resend-btn"
            onClick={handleResendOTP}
            disabled={isResending || countdown > 0}
          >
            {isResending ? 'Sending...' : countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
          </button>
        </div>

        <div className="reset-password-footer">
          <p>Remember your password?</p>
          <Link to="/login" className="login-link">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
