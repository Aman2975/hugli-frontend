import React, { useState } from 'react';
import './VisitingCardType.css';

const RegularVisitingCards = () => {
  const [selectedFinishType, setSelectedFinishType] = useState('');

  const finishTypes = [
    'MATT LAMINATION',
    'MATT LAMINATION TEXTURE',
    'GLOSS COATED TEXTURE',
    'GLOSS LAMINATION',
    'GLOSS COATED',
    'GLOSS COATED SMALL',
    'WITHOUT LAMINATION',
    'WITHOUT LAMINATION SMALL'
  ];

  const features = [
    'Cost-effective solution',
    'Quick turnaround time',
    'Standard quality finish'
  ];

  return (
    <div className="visiting-card-type">
      <div className="card-header">
        <div className="card-icon">💼</div>
        <h2>REGULAR VISITING CARDS</h2>
        <span className="economical-tag">Economical</span>
        <p className="standard-quantity">Standard Quantity: 1000 cards</p>
      </div>

      <div className="card-content">
        <div className="product-image">
          <div className="image-placeholder">
            <div className="regular-card-mockup">
              <div className="card-front">
                <div className="name">Name Fullname</div>
                <div className="designation">Designation</div>
                <div className="qr-code">📱</div>
                <div className="nfc-icon">📡</div>
              </div>
              <div className="card-back">
                <div className="logo-circle">CA</div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-details">
          <h3>Affordable cards for everyday business needs</h3>
          
          <ul className="features-list">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <div className="selection-section">
            <label htmlFor="finish-type-select">Select Finish Type</label>
            <select 
              id="finish-type-select" 
              className="type-dropdown"
              value={selectedFinishType}
              onChange={(e) => setSelectedFinishType(e.target.value)}
            >
              <option value="">Select Finish Type</option>
              {finishTypes.map((type, index) => (
                <option key={index} value={type.toLowerCase().replace(/ /g, '-')}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <button className="order-btn">ORDER REGULAR CARDS</button>
        </div>
      </div>
    </div>
  );
};

export default RegularVisitingCards;
