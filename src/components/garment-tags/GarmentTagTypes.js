import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import './GarmentTagTypes.css';

const GarmentTagTypes = () => {
  const [selectedTagType, setSelectedTagType] = useState('woven');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [quantity, setQuantity] = useState(1000);
  const { addToCart } = useCart();
  const { showSuccess, showError } = useNotification();

  const tagTypes = [
    { id: 'woven', label: 'Woven Tags', description: 'High-quality woven labels with custom text and logos' },
    { id: 'printed', label: 'Printed Tags', description: 'Cost-effective printed labels with vibrant colors' },
    { id: 'leather', label: 'Leather Tags', description: 'Premium leather tags for luxury garments' },
    { id: 'hang-tags', label: 'Hang Tags', description: 'Cardboard hang tags with custom designs' }
  ];

  const sizes = [
    { id: 'small', label: 'Small (2" x 1")', value: 'small' },
    { id: 'medium', label: 'Medium (3" x 1.5")', value: 'medium' },
    { id: 'large', label: 'Large (4" x 2")', value: 'large' },
    { id: 'custom', label: 'Custom Size', value: 'custom' }
  ];

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (quantity < 1000) {
      showError('Minimum order quantity is 1000 pieces');
      return;
    }

    const selectedTag = tagTypes.find(tag => tag.id === selectedTagType);
    const selectedSizeObj = sizes.find(size => size.id === selectedSize);

    const product = {
      id: 'garment-tags',
      name: 'Garment Tags',
      description: selectedTag ? selectedTag.description : 'High-quality garment tags',
      icon: '🏷️',
      options: {
        tagType: selectedTag ? selectedTag.label : 'Woven Tags',
        size: selectedSizeObj ? selectedSizeObj.label : 'Medium',
        quantity: quantity
      }
    };

    addToCart(product);
    showSuccess('Garment Tags added to cart successfully!');
  };

  return (
    <div className="garment-tag-type">
      <div className="tag-header">
        <div className="tag-icon">🏷️</div>
        <h2>GARMENT TAGS</h2>
        <span className="professional-tag">Professional</span>
        <p className="standard-quantity">Minimum Order: 1000 pieces</p>
      </div>

      <div className="tag-content">
        <div className="product-image">
          <div className="image-placeholder">
            <div className="garment-tag-mockup">
              <div className="tag-examples">
                <div className="tag-woven">
                  <div className="tag-text">BRAND NAME</div>
                  <div className="tag-subtext">100% Cotton</div>
                </div>
                <div className="tag-printed">
                  <div className="tag-logo">LOGO</div>
                  <div className="tag-details">Made in India</div>
                </div>
                <div className="tag-leather">
                  <div className="leather-text">PREMIUM</div>
                  <div className="leather-brand">LUXURY</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-details">
          <h3>Professional garment tags for your clothing line</h3>
          
          <div className="options-section">
            <h4>Choose Tag Type:</h4>
            <div className="tag-type-grid">
              {tagTypes.map((type) => (
                <label key={type.id} className="tag-type-option">
                  <input
                    type="radio"
                    name="tag-type"
                    value={type.id}
                    checked={selectedTagType === type.id}
                    onChange={(e) => setSelectedTagType(e.target.value)}
                  />
                  <div className="tag-type-content">
                    <div className="tag-type-label">{type.label}</div>
                    <div className="tag-type-description">{type.description}</div>
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
                    name="tag-size"
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
            <label htmlFor="tag-quantity">Quantity:</label>
            <input
              type="number"
              id="tag-quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1000"
              step="500"
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

export default GarmentTagTypes;
