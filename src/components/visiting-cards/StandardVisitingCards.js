import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VisitingCardType.css';
import '../shared/ContactButton.css';

const StandardVisitingCards = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact');
  };

  const cardTypes = [
    {
      name: '500 GSM VELVET',
      description: 'Premium velvet finish for luxury feel',
      icon: '✨'
    },
    {
      name: '500 GSM MATT',
      description: 'Professional matt finish for business cards',
      icon: '💼'
    },
    {
      name: '400 GSM DRIP-OFF',
      description: 'Smooth drip-off finish for clean look',
      icon: '🎯'
    }
  ];

  const features = [
    'Various finishing options available',
    'Die Cut options available',
    'Lamination: Matt | Gloss | Soft Touch'
  ];

  return (
    <div className="visiting-card-type-page">
      {/* Header Section */}
      <section className="visiting-card-header">
        <div className="container">
          <h1>Standard Visiting Cards</h1>
          <p>Professional standard visiting cards with various finishes</p>
        </div>
      </section>

      {/* Card Types Section */}
      <section className="card-types-section">
        <div className="container">
          <div className="card-types-grid">
            {cardTypes.map((cardType, index) => (
            <div key={index} className="card-type-item">
              <div className="card-icon">{cardType.icon}</div>
              <h3>{cardType.name}</h3>
              <p>{cardType.description}</p>
              <div className="minimum-quantity">
                <span className="min-qty-text">Minimum Order: </span>
                <span className="min-qty-number">1000</span>
              </div>
            </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="features-section">
            <h2>Available Features</h2>
            <ul className="features-list">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="contact-section">
            <div className="contact-card">
              <h2>Ready to Order?</h2>
              <p>Contact us for custom standard visiting cards with your specifications</p>
              <button className="contact-btn" onClick={handleContactUs}>
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StandardVisitingCards;