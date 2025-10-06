import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const BillBooks = () => {
  const features = [
    'Carbonless options',
    'Custom designs',
    'Various size options',
    'Professional invoice format',
    'Sequential numbering',
    'Multiple copies available',
    'Bulk order discounts'
  ];

  return (
    <div className="product-card">
      <div className="product-header">
        <div className="product-icon">📊</div>
        <h3>Bill Books</h3>
      </div>
      <p className="product-description">
        Professional invoice books for your business needs. High-quality materials with custom designs to match your brand requirements.
      </p>
      <ul className="product-features">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <Link to="/bill-books" className="product-btn">View Options</Link>
    </div>
  );
};

export default BillBooks;
