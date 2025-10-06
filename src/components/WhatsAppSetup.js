import React, { useState, useEffect } from 'react';
import './WhatsAppSetup.css';

const WhatsAppSetup = () => {
  const [status, setStatus] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkStatus = async () => {
    try {
      const response = await fetch('/api/whatsapp/status');
      const data = await response.json();
      
      if (data.success) {
        setStatus(data);
        if (data.hasQRCode) {
          fetchQRCode();
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to check WhatsApp status');
    } finally {
      setLoading(false);
    }
  };

  const fetchQRCode = async () => {
    try {
      const response = await fetch('/api/whatsapp/qr');
      const data = await response.json();
      
      if (data.success && data.qrCode) {
        setQrCode(data.qrCode);
      }
    } catch (err) {
      console.error('Failed to fetch QR code:', err);
    }
  };

  useEffect(() => {
    checkStatus();
    
    // Check status every 5 seconds
    const interval = setInterval(checkStatus, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusMessage = () => {
    if (!status) return 'Checking status...';
    
    switch (status.status) {
      case 'ready':
        return '✅ WhatsApp is ready and connected!';
      case 'waiting_for_scan':
        return '📱 Please scan the QR code with your WhatsApp mobile app';
      case 'initializing':
        return '⏳ WhatsApp service is initializing...';
      default:
        return '❓ Unknown status';
    }
  };

  const getStatusColor = () => {
    if (!status) return '#6b7280';
    
    switch (status.status) {
      case 'ready':
        return '#10b981';
      case 'waiting_for_scan':
        return '#f59e0b';
      case 'initializing':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className="whatsapp-setup">
        <div className="setup-container">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading WhatsApp status...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="whatsapp-setup">
        <div className="setup-container">
          <div className="error">
            <h2>❌ Error</h2>
            <p>{error}</p>
            <button onClick={checkStatus} className="retry-btn">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="whatsapp-setup">
      <div className="setup-container">
        <div className="setup-header">
          <h1>📱 WhatsApp Setup</h1>
          <p>Configure WhatsApp integration for contact forms</p>
        </div>

        <div className="status-section">
          <div className="status-indicator">
            <div 
              className="status-dot" 
              style={{ backgroundColor: getStatusColor() }}
            ></div>
            <span className="status-text">{getStatusMessage()}</span>
          </div>
          
          {status.isReady && (
            <div className="success-info">
              <p>🎉 WhatsApp is connected and ready to receive contact form messages!</p>
            </div>
          )}
        </div>

        {status.hasQRCode && qrCode && (
          <div className="qr-section">
            <h3>📱 Scan QR Code</h3>
            <div className="qr-instructions">
              <ol>
                <li>Open WhatsApp on your phone</li>
                <li>Go to Settings → Linked Devices</li>
                <li>Tap "Link a Device"</li>
                <li>Scan the QR code below</li>
              </ol>
            </div>
            
            <div className="qr-container">
              <div className="qr-code">
                <pre>{qrCode}</pre>
              </div>
            </div>
            
            <p className="qr-note">
              The QR code will refresh automatically. Keep this page open while scanning.
            </p>
          </div>
        )}

        {status.status === 'ready' && (
          <div className="ready-info">
            <h3>✅ Setup Complete</h3>
            <p>WhatsApp integration is now active. Contact form submissions will be automatically sent to your WhatsApp.</p>
            
            <div className="test-section">
              <h4>Test the Integration</h4>
              <p>Go to the <a href="/contact">Contact Page</a> and submit a test message to verify everything is working.</p>
            </div>
          </div>
        )}

        <div className="refresh-section">
          <button onClick={checkStatus} className="refresh-btn">
            🔄 Refresh Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppSetup;
