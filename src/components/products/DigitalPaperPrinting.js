import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const DigitalPaperPrinting = () => {
  const features = [
    'Xerox 3100 Digital Press',
    'Quick turnaround',
    'Various paper options',
    'High-resolution output',
    'Color and black & white',
    'Small to medium volumes',
    'Custom finishing options'
  ];

  return (
    <div className="product-card">
      <div className="product-header">
        <div className="product-icon">🖨️</div>
        <h3>Digital Paper Printing</h3>
      </div>
      <p className="product-description">
        High-quality digital printing for all your paper needs. State-of-the-art equipment delivering professional results with fast turnaround times.
      </p>
      <ul className="product-features">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <Link to="/digital-paper-printing" className="product-btn">View Options</Link>
    </div>
  );
};

export default DigitalPaperPrinting;
