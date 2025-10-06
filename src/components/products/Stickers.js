import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const Stickers = () => {
  const features = [
    'Vinyl stickers for outdoor use',
    'Custom designs and sizes',
    'Weather-resistant materials',
    'Glow-in-dark options',
    'Transparent sticker options',
    'Bulk order discounts',
    'Quick turnaround times'
  ];

  return (
    <div className="product-card">
      <div className="product-header">
        <div className="product-icon">🏷️</div>
        <h3>Stickers</h3>
      </div>
      <p className="product-description">
        High-quality stickers for branding, marketing, and decorative purposes. Perfect for vehicles, products, and promotional materials.
      </p>
      <ul className="product-features">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <Link to="/stickers" className="product-btn">View Options</Link>
    </div>
  );
};

export default Stickers;
