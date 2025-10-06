import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const LetterHeads = () => {
  const features = [
    'Premium quality paper',
    'Custom designs',
    'Quick turnaround',
    'Brand integration',
    'Professional appearance',
    'Various paper weights',
    'Logo placement options'
  ];

  return (
    <div className="product-card">
      <div className="product-header">
        <div className="product-icon">📝</div>
        <h3>Letter Heads</h3>
      </div>
      <p className="product-description">
        Professional stationery that represents your brand with elegance. High-quality letterheads that make a lasting impression.
      </p>
      <ul className="product-features">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <Link to="/letter-heads" className="product-btn">View Options</Link>
    </div>
  );
};

export default LetterHeads;
