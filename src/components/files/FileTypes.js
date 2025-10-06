import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import './FileTypes.css';

const FileTypes = () => {
  const [selectedFileType, setSelectedFileType] = useState('office');
  const [selectedSize, setSelectedSize] = useState('a4');
  const [quantity, setQuantity] = useState(100);
  const { addToCart } = useCart();
  const { showSuccess, showError } = useNotification();

  const fileTypes = [
    { id: 'office', label: 'Office Files', description: 'Professional files for office use with custom printing' },
    { id: 'hospital', label: 'Hospital Files', description: 'Medical files with color-coded tabs and labels' },
    { id: 'legal', label: 'Legal Files', description: 'Court files with specific formatting requirements' },
    { id: 'student', label: 'Student Files', description: 'Educational files for schools and colleges' }
  ];

  const sizes = [
    { id: 'a4', label: 'A4 Size (8.3" x 11.7")', value: 'a4' },
    { id: 'legal', label: 'Legal Size (8.5" x 14")', value: 'legal' },
    { id: 'a5', label: 'A5 Size (5.8" x 8.3")', value: 'a5' },
    { id: 'custom', label: 'Custom Size', value: 'custom' }
  ];

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (quantity < 25) {
      showError('Minimum order quantity is 25 pieces');
      return;
    }

    const selectedFile = fileTypes.find(file => file.id === selectedFileType);
    const selectedSizeObj = sizes.find(size => size.id === selectedSize);

    const product = {
      id: 'files',
      name: 'Files',
      description: selectedFile ? selectedFile.description : 'Professional files for office use',
      icon: '📁',
      options: {
        fileType: selectedFile ? selectedFile.label : 'Office Files',
        size: selectedSizeObj ? selectedSizeObj.label : 'A4 Size',
        quantity: quantity
      }
    };

    addToCart(product);
    showSuccess('Files added to cart successfully!');
  };

  return (
    <div className="file-type">
      <div className="file-header">
        <div className="file-icon">📁</div>
        <h2>FILES</h2>
        <span className="professional-tag">Professional</span>
        <p className="standard-quantity">Minimum Order: 50 pieces</p>
      </div>

      <div className="file-content">
        <div className="product-image">
          <div className="image-placeholder">
            <div className="file-mockup">
              <div className="file-examples">
                <div className="file-office">
                  <div className="file-tab">OFFICE</div>
                  <div className="file-lines">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                  </div>
                </div>
                <div className="file-hospital">
                  <div className="file-tab red">MEDICAL</div>
                  <div className="file-lines">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                  </div>
                </div>
                <div className="file-legal">
                  <div className="file-tab blue">LEGAL</div>
                  <div className="file-lines">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-details">
          <h3>Professional files for all your organizational needs</h3>
          
          <div className="options-section">
            <h4>Choose File Type:</h4>
            <div className="file-type-grid">
              {fileTypes.map((type) => (
                <label key={type.id} className="file-type-option">
                  <input
                    type="radio"
                    name="file-type"
                    value={type.id}
                    checked={selectedFileType === type.id}
                    onChange={(e) => setSelectedFileType(e.target.value)}
                  />
                  <div className="file-type-content">
                    <div className="file-type-label">{type.label}</div>
                    <div className="file-type-description">{type.description}</div>
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
                    name="file-size"
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
            <label htmlFor="file-quantity">Quantity:</label>
            <input
              type="number"
              id="file-quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="50"
              step="25"
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

export default FileTypes;
