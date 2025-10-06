import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import apiService from '../services/api';
import OTPLogin from './OTPLogin';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPLogin, setShowOTPLogin] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState(''); // Store email for OTP verification
  
  const { login } = useAuth();
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the page they were trying to access before login
  const from = location.state?.from || '/';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isPhone = (value) => /^[+]?[0-9\s\-()]{10,}$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const identifier = formData.identifier.trim();

    // Basic validation
    if (!identifier || !formData.password) {
      showError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Determine identifier type and validate
    let email = null;
    let phone = null;
    if (isEmail(identifier)) {
      email = identifier;
    } else if (isPhone(identifier)) {
      phone = identifier.replace(/\s|\(|\)|-/g, '');
    } else {
      showError('Please enter a valid email address or phone number');
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(email || phone, formData.password, phone);
      
      if (result.success) {
        showSuccess(`Welcome back, ${result.user.name}!`);
        navigate(from, { replace: true });
      } else {
        if (result.requiresVerification) {
          // Show OTP verification for email verification
          showSuccess('OTP sent to your email for verification!');
          setVerificationEmail(result.email || email); // Store the email for OTP verification
          setShowOTPLogin(true);
        } else {
          showError(result.error);
        }
      }
    } catch (error) {
      showError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPLogin = async () => {
    const identifier = formData.identifier.trim();

    if (!identifier) {
      showError('Please enter your email address or phone number first');
      return;
    }

    let email = null;
    let phone = null;
    if (isEmail(identifier)) {
      email = identifier;
    } else if (isPhone(identifier)) {
      phone = identifier.replace(/\s|\(|\)|-/g, '');
    } else {
      showError('Please enter a valid email address or phone number');
      return;
    }

    setIsLoading(true);
    try {
      const result = await apiService.sendOTP(email, phone);
      
      if (result.message === 'OTP sent successfully') {
        setShowOTPLogin(true);
        showSuccess('OTP sent to your email!');
      } else {
        showError(result.message || 'Failed to send OTP');
      }
    } catch (error) {
      showError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToPasswordLogin = () => {
    setShowOTPLogin(false);
    setVerificationEmail(''); // Clear verification email
    setFormData({ identifier: formData.identifier, password: '' });
  };

  // Show OTP login component if OTP login is selected
  if (showOTPLogin) {
    const identifier = formData.identifier.trim();
    const email = verificationEmail || (isEmail(identifier) ? identifier : '');
    const phone = isPhone(identifier) ? identifier.replace(/\s|\(|\)|-/g, '') : '';
    // Use 'login' purpose for OTP login button, 'email_verification' for password login with unverified email
    const purpose = verificationEmail ? 'email_verification' : 'login';
    return <OTPLogin email={email} phone={phone} onBack={handleBackToPasswordLogin} purpose={purpose} />;
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your Hugli Printing Press account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="identifier">Email or Phone</label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="Enter your email or phone number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="auth-btn login-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button 
          type="button"
          className="auth-btn otp-btn"
          onClick={handleOTPLogin}
          disabled={isLoading || !formData.identifier.trim()}
        >
          {isLoading ? 'Sending OTP...' : 'Login with OTP'}
        </button>

        <div className="auth-footer">
          <p>
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot your password?
            </Link>
          </p>
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="auth-link">
              Sign up here
            </Link>
          </p>
          <Link to="/" className="back-home-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
