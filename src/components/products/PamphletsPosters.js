import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const PamphletsPosters = () => {
  const features = [
    'Multiple paper quality options',
    'Vibrant color printing',
    'Various size options available',
    'Tri-fold and bi-fold designs',
    'High-impact marketing materials',
    'Custom layouts and designs',
    'Bulk printing discounts'
  ];

  return (
    <div className="product-card">
      <div className="product-header">
        <div className="product-icon">📋</div>
        <h3>Pamphlets & Posters</h3>
      </div>
      <p className="product-description">
        High-impact marketing materials to promote your business effectively. Eye-catching designs that capture attention and drive results.
      </p>
      <ul className="product-features">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <Link to="/pamphlets-posters" className="product-btn">View Options</Link>
    </div>
  );
};

export default PamphletsPosters;
