import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VisitingCardType.css';
import '../shared/ContactButton.css';

const UltraThickVisitingCards = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact');
  };

  const cardTypes = [
    {
      name: '600 GSM',
      description: 'Extra thick cards for premium feel',
      icon: '📏'
    },
    {
      name: '700 GSM',
      description: 'Ultra thick cards for luxury appeal',
      icon: '💎'
    },
    {
      name: '800 GSM',
      description: 'Maximum thickness for ultimate premium experience',
      icon: '👑'
    }
  ];

  const features = [
    'Ultra-thick construction',
    'Premium luxury feel',
    'Various finishing options',
    'Custom design capabilities'
  ];

  return (
    <div className="visiting-card-type-page">
      {/* Header Section */}
      <section className="visiting-card-header">
        <div className="container">
          <h1>Ultra Thick Visiting Cards</h1>
          <p>Premium ultra-thick cards for the ultimate luxury experience</p>
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
            <h2>Ultra Thick Features</h2>
            <ul className="features-list">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="contact-section">
            <div className="contact-card">
              <h2>Need Ultra Thick Cards?</h2>
              <p>Contact us for premium ultra-thick visiting cards with custom specifications</p>
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

export default UltraThickVisitingCards;