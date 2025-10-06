import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import apiService from '../services/api';
import OTPInput from './OTPInput';
import './OTPLogin.css';

const OTPLogin = ({ email, phone, onBack, purpose = 'login' }) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const { otpLogin } = useAuth();
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();

  // Determine display identifier
  const displayIdentifier = email || phone;

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

    setIsLoading(true);
    try {
      let result;
      if (purpose === 'email_verification') {
        // For email verification, use the email verification endpoint
        result = await apiService.verifyEmailOTP(email, otpValue);
      } else {
        // For login OTP, use the regular OTP verification endpoint
        result = await apiService.verifyOTP(email, otpValue, phone);
      }
      
      if (result.message === 'Login successful' && result.token) {
        showSuccess('Login successful!');
        // Update AuthContext with user data and token
        otpLogin(result.user, result.token);
        navigate('/');
      } else if (result.message === 'Email verified successfully! You can now login to your account.') {
        showSuccess('Email verified successfully! Please login again.');
        onBack(); // Go back to login form
      } else {
        showError(result.error || result.message || 'Invalid OTP');
      }
    } catch (error) {
      showError('Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      const result = await apiService.sendOTP(email, phone);
      
      if (result.message === 'OTP sent successfully') {
        showSuccess('OTP sent successfully!');
        setCountdown(60); // 60 seconds countdown
      } else {
        showError(result.message || 'Failed to send OTP');
      }
    } catch (error) {
      showError('Failed to send OTP. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="otp-login-container">
      <div className="otp-login-card">
        <div className="otp-login-header">
          <h2>Enter Verification Code</h2>
          <p>We've sent a 6-digit code to your email</p>
          <p className="email-display">{displayIdentifier}</p>
        </div>

        <div className="otp-input-section">
          <OTPInput
            length={6}
            onComplete={handleOTPComplete}
            disabled={isLoading}
          />
        </div>

        <div className="otp-actions">
          <button
            type="button"
            className="verify-btn"
            onClick={() => handleVerifyOTP()}
            disabled={isLoading || otp.length !== 6}
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
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
            onClick={onBack}
            disabled={isLoading}
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPLogin;
