import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import './StickerTypes.css';

const StickerTypes = () => {
  const [selectedStickerType, setSelectedStickerType] = useState('without-half-cut');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [quantity, setQuantity] = useState(1000);
  const { addToCart } = useCart();
  const { showSuccess, showError } = useNotification();

  const stickerTypes = [
    { id: 'without-half-cut', label: 'Sticker (Without Half Cut)', description: 'Standard stickers without half-cut design' },
    { id: 'with-round-cut', label: 'Sticker (With Round Cut)', description: 'Stickers with rounded corner cutting' },
    { id: 'with-straight-cut', label: 'Sticker (With Straight Cut)', description: 'Stickers with straight edge cutting' }
  ];

  const sizes = [
    { id: 'small', label: 'Small (2" x 2")', value: 'small' },
    { id: 'medium', label: 'Medium (3" x 3")', value: 'medium' },
    { id: 'large', label: 'Large (4" x 4")', value: 'large' },
    { id: 'custom', label: 'Custom Size', value: 'custom' }
  ];

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (quantity < 500) {
      showError('Minimum order quantity is 500 pieces');
      return;
    }

    const selectedSticker = stickerTypes.find(sticker => sticker.id === selectedStickerType);
    const selectedSizeObj = sizes.find(size => size.id === selectedSize);

    const product = {
      id: 'stickers',
      name: 'Stickers',
      description: selectedSticker ? selectedSticker.description : 'Custom stickers for branding and promotions',
      icon: '🏷️',
      options: {
        stickerType: selectedSticker ? selectedSticker.label : 'Sticker (Without Half Cut)',
        cuttingType: selectedSticker ? selectedSticker.label : 'Sticker (Without Half Cut)',
        size: selectedSizeObj ? selectedSizeObj.label : 'Medium',
        quantity: quantity
      }
    };

    addToCart(product);
    showSuccess('Stickers added to cart successfully!');
  };

  return (
    <div className="sticker-type">
      <div className="sticker-header">
        <div className="sticker-icon">🏷️</div>
        <h2>STICKERS</h2>
        <span className="versatile-tag">Versatile</span>
        <p className="standard-quantity">Minimum Order: 1000 pieces</p>
      </div>

      <div className="sticker-content">
        <div className="product-image">
          <div className="image-placeholder">
            <div className="sticker-mockup">
              <div className="sticker-examples">
                <div className="sticker-standard">
                  <div className="sticker-text">STANDARD</div>
                  <div className="sticker-subtext">NO CUT</div>
                </div>
                <div className="sticker-round">
                  <div className="sticker-icon-mock">⭕</div>
                  <div className="sticker-text-small">ROUND</div>
                </div>
                <div className="sticker-straight">
                  <div className="sticker-text-straight">STRAIGHT</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-details">
          <h3>High-quality stickers for all your branding needs</h3>
          
          <div className="options-section">
            <h4>Choose Cutting Type:</h4>
            <div className="sticker-type-grid">
              {stickerTypes.map((type) => (
                <label key={type.id} className="sticker-type-option">
                  <input
                    type="radio"
                    name="sticker-type"
                    value={type.id}
                    checked={selectedStickerType === type.id}
                    onChange={(e) => setSelectedStickerType(e.target.value)}
                  />
                  <div className="sticker-type-content">
                    <div className="sticker-type-label">{type.label}</div>
                    <div className="sticker-type-description">{type.description}</div>
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
                    name="sticker-size"
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
            <label htmlFor="sticker-quantity">Quantity:</label>
            <input
              type="number"
              id="sticker-quantity"
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

export default StickerTypes;
