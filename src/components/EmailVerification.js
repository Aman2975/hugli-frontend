import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import apiService from '../services/api';
import './EmailVerification.css';

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('pending'); // pending, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      handleEmailVerification();
    } else {
      setVerificationStatus('error');
      setErrorMessage('Invalid verification link');
    }
  }, [token]);

  const handleEmailVerification = async () => {
    setIsVerifying(true);
    try {
      const result = await apiService.verifyEmail(token);
      if (result.success) {
        setVerificationStatus('success');
        showSuccess('Email verified successfully! You can now login.');
      } else {
        setVerificationStatus('error');
        setErrorMessage(result.error || 'Verification failed');
        showError(result.error || 'Email verification failed');
      }
    } catch (error) {
      console.error('Email verification error:', error);
      setVerificationStatus('error');
      setErrorMessage('Failed to verify email. Please try again.');
      showError('Email verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendVerification = async () => {
    // This would need the user's email, which we don't have in this component
    // In a real app, you might store the email in localStorage or get it from the URL
    showError('Please use the resend option from the login page');
  };

  if (isVerifying) {
    return (
      <div className="email-verification-container">
        <div className="verification-card">
          <div className="verification-loading">
            <div className="spinner"></div>
            <h2>Verifying your email...</h2>
            <p>Please wait while we verify your email address.</p>
          </div>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'success') {
    return (
      <div className="email-verification-container">
        <div className="verification-card">
          <div className="verification-success">
            <div className="success-icon">✓</div>
            <h2>Email Verified!</h2>
            <p>Your email has been successfully verified. You can now login to your account.</p>
            <button 
              className="login-btn"
              onClick={() => navigate('/login')}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'error') {
    return (
      <div className="email-verification-container">
        <div className="verification-card">
          <div className="verification-error">
            <div className="error-icon">✗</div>
            <h2>Verification Failed</h2>
            <p>{errorMessage}</p>
            <div className="error-actions">
              <button 
                className="retry-btn"
                onClick={handleEmailVerification}
              >
                Try Again
              </button>
              <button 
                className="resend-btn"
                onClick={handleResendVerification}
              >
                Resend Verification
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default EmailVerification;
