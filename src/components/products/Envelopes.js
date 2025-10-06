import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const Envelopes = () => {
  const features = [
    'Various size options',
    'Custom printing',
    'Premium paper quality',
    'Matching letterhead sets',
    'Window and non-window options',
    'Security features available',
    'Bulk order discounts'
  ];

  return (
    <div className="product-card">
      <div className="product-header">
        <div className="product-icon">✉️</div>
        <h3>Envelopes</h3>
      </div>
      <p className="product-description">
        Professional envelopes to complement your stationery. High-quality materials that protect and present your correspondence professionally.
      </p>
      <ul className="product-features">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <Link to="/envelopes" className="product-btn">View Options</Link>
    </div>
  );
};

export default Envelopes;
