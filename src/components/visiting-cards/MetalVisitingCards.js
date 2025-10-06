import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VisitingCardType.css';
import '../shared/ContactButton.css';

const MetalVisitingCards = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact');
  };

  const cardTypes = [
    {
      name: 'STAINLESS STEEL',
      description: 'Premium stainless steel cards for luxury appeal',
      icon: '🔗'
    },
    {
      name: 'BRASS',
      description: 'Elegant brass cards with warm golden finish',
      icon: '🟨'
    },
    {
      name: 'COPPER',
      description: 'Unique copper cards with distinctive appearance',
      icon: '🟫'
    }
  ];

  const features = [
    'Premium metal construction',
    'Unique and distinctive appearance',
    'Long-lasting durability',
    'Custom engraving options'
  ];

  return (
    <div className="visiting-card-type-page">
      {/* Header Section */}
      <section className="visiting-card-header">
        <div className="container">
          <h1>Metal Visiting Cards</h1>
          <p>Unique metal cards for a distinctive and premium impression</p>
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
            <h2>Metal Card Features</h2>
            <ul className="features-list">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="contact-section">
            <div className="contact-card">
              <h2>Want Metal Cards?</h2>
              <p>Contact us for custom metal visiting cards that make a lasting impression</p>
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

export default MetalVisitingCards;