import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const GarmentTags = () => {
  const features = [
    'Minimum order quantity: 2000',
    'Various material options',
    'Custom shapes and sizes',
    'Waterproof materials',
    'Custom die-cutting',
    'Brand-specific designs',
    'Bulk production rates'
  ];

  return (
    <div className="product-card">
      <div className="product-header">
        <div className="product-icon">🏷️</div>
        <h3>Garment Tags</h3>
      </div>
      <p className="product-description">
        Professional tags for your clothing line that reflect your brand quality. Durable materials suitable for various applications and environments.
      </p>
      <ul className="product-features">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <Link to="/garment-tags" className="product-btn">View Options</Link>
    </div>
  );
};

export default GarmentTags;
