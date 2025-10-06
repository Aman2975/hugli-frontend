import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import apiService from '../services/api';
import OTPInput from './OTPInput';
import './EmailVerificationOTP.css';

const EmailVerificationOTP = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get email from location state or URL params
  const email = location.state?.email || new URLSearchParams(location.search).get('email');

  // Countdown timer
  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOTPComplete = async (otpValue) => {
    setOtp(otpValue);
    await handleVerifyOTP(otpValue);
  };

  const handleVerifyOTP = async (otpValue = otp) => {
    if (!otpValue || otpValue.length !== 6) {
      showError('Please enter a valid 6-digit OTP');
      return;
    }

    if (!email) {
      showError('Email not found. Please try signing up again.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await apiService.verifyEmailOTP(email, otpValue);
      
      if (result.success) {
        showSuccess('Email verified successfully! You can now login.');
        navigate('/login', { 
          state: { 
            message: 'Email verified successfully! You can now login.',
            email: email 
          }
        });
      } else {
        showError(result.error || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Email verification error:', error);
      showError('Failed to verify email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email) {
      showError('Email not found. Please try signing up again.');
      return;
    }

    setIsResending(true);
    try {
      console.log('Resending email verification OTP for:', email);
      const result = await apiService.resendVerificationOTP(email);
      console.log('Resend verification OTP API response:', result);
      
      if (result.message === 'OTP sent successfully') {
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
      <div className="email-verification-otp-container">
        <div className="verification-card">
          <div className="verification-error">
            <div className="error-icon">✗</div>
            <h2>Email Not Found</h2>
            <p>Please try signing up again.</p>
            <button 
              className="retry-btn"
              onClick={() => navigate('/signup')}
            >
              Go to Signup
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="email-verification-otp-container">
      <div className="verification-card">
        <div className="verification-header">
          <h2>Verify Your Email</h2>
          <p>We've sent a 6-digit verification code to:</p>
          <p className="email-display">{email}</p>
        </div>

        <div className="otp-input-section">
          <OTPInput
            length={6}
            onComplete={handleOTPComplete}
            disabled={isLoading}
          />
        </div>

        <div className="verification-actions">
          <button
            type="button"
            className="verify-btn"
            onClick={() => handleVerifyOTP()}
            disabled={isLoading || otp.length !== 6}
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </button>

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

          <button
            type="button"
            className="back-btn"
            onClick={() => navigate('/signup')}
            disabled={isLoading}
          >
            ← Back to Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationOTP;
