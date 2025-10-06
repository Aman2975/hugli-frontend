import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const VisitingCards = () => {
  const features = [
    'Die-cut options available',
    'Premium materials including metal and velvet',
    'Custom shapes and sizes',
    'Spot UV coating',
    'Embossing and debossing',
    'Same-day printing available',
    'QR code integration'
  ];

  return (
    <div className="product-card">
      <div className="product-header">
        <div className="product-icon">💼</div>
        <h3>Visiting Cards</h3>
      </div>
      <p className="product-description">
        Make a lasting impression with our premium business cards in various finishes and styles. Professional designs that represent your brand perfectly.
      </p>
      <ul className="product-features">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <Link to="/visiting-cards" className="product-btn">View Options</Link>
    </div>
  );
};

export default VisitingCards;
