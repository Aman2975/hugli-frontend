import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VisitingCardType.css';
import '../shared/ContactButton.css';

const PVCVisitingCards = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact');
  };

  const cardTypes = [
    {
      name: 'PVC TRANSPARENT',
      description: 'Clear transparent PVC cards for unique design',
      icon: '🔍'
    },
    {
      name: 'PVC WHITE',
      description: 'White PVC cards for professional look',
      icon: '⚪'
    },
    {
      name: 'PVC BLACK',
      description: 'Black PVC cards for premium appearance',
      icon: '⚫'
    }
  ];

  const features = [
    'Waterproof and tear resistant',
    'Perfect for frequent use',
    'Custom design options available'
  ];

  return (
    <div className="visiting-card-type-page">
      {/* Header Section */}
      <section className="visiting-card-header">
        <div className="container">
          <h1>PVC Visiting Cards</h1>
          <p>Durable PVC cards for frequent use and professional appearance</p>
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
            <h2>PVC Card Benefits</h2>
            <ul className="features-list">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="contact-section">
            <div className="contact-card">
              <h2>Interested in PVC Cards?</h2>
              <p>Contact us for custom PVC visiting cards with your design</p>
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

export default PVCVisitingCards;