import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PamphletsPosters.css';
import '../shared/ContactButton.css';

const Pamphlets = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact');
  };

  const paperOptions = [
    {
      name: '70 GSM Maplitho Paper',
      description: 'Standard quality for everyday use',
      icon: '📄'
    },
    {
      name: '90 GSM Art Paper',
      description: 'Better quality for professional use',
      icon: '✨'
    },
    {
      name: '115 GSM Art Paper',
      description: 'Premium quality for marketing materials',
      icon: '💎'
    },
    {
      name: '170 GSM Art Paper',
      description: 'Luxury quality for high-end pamphlets',
      icon: '👑'
    }
  ];

  return (
    <div className="pamphlets-section">
      <div className="section-header">
        <div className="section-icon">📄</div>
        <h2>PAMPHLETS</h2>
        <p>High-quality pamphlets for marketing and information distribution</p>
      </div>

      <div className="paper-options">
        <h3>Available Paper Options</h3>
        <div className="options-grid">
          {paperOptions.map((option, index) => (
            <div key={index} className="option-item">
              <div className="option-icon">{option.icon}</div>
              <h4>{option.name}</h4>
              <p>{option.description}</p>
              <div className="minimum-quantity">
                <span className="min-qty-text">Minimum Order: </span>
                <span className="min-qty-number">1000</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="contact-section">
        <div className="contact-card">
          <h3>Need Custom Pamphlets?</h3>
          <p>Contact us for custom pamphlet designs and pricing</p>
          <button className="contact-btn" onClick={handleContactUs}>
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pamphlets;