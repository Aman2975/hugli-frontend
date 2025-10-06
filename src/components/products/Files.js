import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const Files = () => {
  const features = [
    'Durable materials',
    'Custom printing options',
    'Various size options',
    'Office and hospital use',
    'Professional appearance',
    'Bulk order discounts',
    'Color-coded options'
  ];

  return (
    <div className="product-card">
      <div className="product-header">
        <div className="product-icon">📁</div>
        <h3>Files</h3>
      </div>
      <p className="product-description">
        Professional files for offices, hospitals, and businesses. High-quality materials designed for long-term use and organization.
      </p>
      <ul className="product-features">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <Link to="/files" className="product-btn">View Options</Link>
    </div>
  );
};

export default Files;
