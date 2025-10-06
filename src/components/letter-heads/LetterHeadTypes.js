import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import './LetterHeadTypes.css';

const LetterHeadTypes = () => {
  const [selectedPaperType, setSelectedPaperType] = useState('premium');
  const [selectedSize, setSelectedSize] = useState('a4');
  const [quantity, setQuantity] = useState(500);
  const { addToCart } = useCart();
  const { showSuccess, showError } = useNotification();

  const paperTypes = [
    { id: 'premium', label: 'Premium Paper', description: 'High-quality 100 GSM paper with professional finish' },
    { id: 'standard', label: 'Standard Paper', description: '80 GSM paper suitable for everyday business use' },
    { id: 'luxury', label: 'Luxury Paper', description: '120 GSM premium paper with watermark options' },
    { id: 'eco-friendly', label: 'Eco-Friendly', description: 'Recycled paper options for sustainable business' }
  ];

  const sizes = [
    { id: 'a4', label: 'A4 Size (8.3" x 11.7")', value: 'a4' },
    { id: 'legal', label: 'Legal Size (8.5" x 14")', value: 'legal' },
    { id: 'executive', label: 'Executive Size (7.25" x 10.5")', value: 'executive' },
    { id: 'custom', label: 'Custom Size', value: 'custom' }
  ];

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (quantity < 250) {
      showError('Minimum order quantity is 250 pieces');
      return;
    }

    const selectedPaper = paperTypes.find(paper => paper.id === selectedPaperType);
    const selectedSizeObj = sizes.find(size => size.id === selectedSize);

    const product = {
      id: 'letter-heads',
      name: 'Letter Heads',
      description: selectedPaper ? selectedPaper.description : 'Professional letterheads for business use',
      icon: '📄',
      options: {
        paperType: selectedPaper ? selectedPaper.label : 'Premium Paper',
        size: selectedSizeObj ? selectedSizeObj.label : 'A4 Size',
        quantity: quantity
      }
    };

    addToCart(product);
    showSuccess('Letter Heads added to cart successfully!');
  };

  return (
    <div className="letter-head-type">
      <div className="letter-header">
        <div className="letter-icon">📄</div>
        <h2>LETTER HEADS</h2>
        <span className="professional-tag">Professional</span>
        <p className="standard-quantity">Minimum Order: 500 sheets</p>
      </div>

      <div className="letter-content">
        <div className="product-image">
          <div className="image-placeholder">
            <div className="letter-head-mockup">
              <div className="letter-examples">
                <div className="letter-premium">
                  <div className="letter-header-mockup">
                    <div className="company-logo">COMPANY LOGO</div>
                    <div className="company-name">Your Company Name</div>
                    <div className="company-details">Address | Phone | Email</div>
                  </div>
                  <div className="letter-body">
                    <div className="date-line">Date: _______________</div>
                    <div className="to-line">To: _______________</div>
                    <div className="subject-line">Subject: _______________</div>
                    <div className="content-lines">
                      <div className="line"></div>
                      <div className="line"></div>
                      <div className="line"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-details">
          <h3>Professional letterheads for your business correspondence</h3>
          
          <div className="options-section">
            <h4>Choose Paper Type:</h4>
            <div className="paper-type-grid">
              {paperTypes.map((type) => (
                <label key={type.id} className="paper-type-option">
                  <input
                    type="radio"
                    name="paper-type"
                    value={type.id}
                    checked={selectedPaperType === type.id}
                    onChange={(e) => setSelectedPaperType(e.target.value)}
                  />
                  <div className="paper-type-content">
                    <div className="paper-type-label">{type.label}</div>
                    <div className="paper-type-description">{type.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="size-section">
            <h4>Select Size:</h4>
            <div className="size-options">
              {sizes.map((size) => (
                <label key={size.id} className="size-option">
                  <input
                    type="radio"
                    name="letter-size"
                    value={size.value}
                    checked={selectedSize === size.value}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  />
                  <span className="size-label">{size.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="quantity-section">
            <label htmlFor="letter-quantity">Quantity:</label>
            <input
              type="number"
              id="letter-quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="500"
              step="250"
              className="quantity-input"
            />
          </div>

          <button className="order-now-btn" onClick={handleAddToCart}>
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LetterHeadTypes;
