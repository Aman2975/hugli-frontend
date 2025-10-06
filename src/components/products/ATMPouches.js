import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ATMPouches = () => {
  const features = [
    'Minimum order: 1000',
    'Durable materials',
    'Custom printing',
    'RFID protection available',
    'Innovative design',
    'Premium quality',
    'Bulk production rates'
  ];

  return (
    <div className="product-card">
      <div className="product-header">
        <div className="product-icon">💳</div>
        <h3>ATM Pouches</h3>
      </div>
      <p className="product-description">
        Innovative alternative to traditional business cards. Premium quality pouches that protect and present your cards professionally.
      </p>
      <ul className="product-features">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <Link to="/atm-pouches" className="product-btn">View Options</Link>
    </div>
  );
};

export default ATMPouches;
