import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GarmentTags.css';
import './shared/ContactButton.css';

const GarmentTags = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact');
  };

  const products = [
    {
      id: 'woven-tags',
      name: 'Woven Tags',
      description: 'Premium woven tags for clothing and textiles',
      icon: '🏷️',
      features: ['Durable Woven', 'Custom Text', 'Professional Look']
    },
    {
      id: 'printed-tags',
      name: 'Printed Tags',
      description: 'High-quality printed tags with custom designs',
      icon: '🖨️',
      features: ['Custom Design', 'Color Printing', 'Fast Production']
    },
    {
      id: 'leather-tags',
      name: 'Leather Tags',
      description: 'Premium leather tags for high-end garments',
      icon: '🐄',
      features: ['Premium Leather', 'Luxury Feel', 'Long Lasting']
    },
    {
      id: 'fabric-tags',
      name: 'Fabric Tags',
      description: 'Soft fabric tags for comfortable wear',
      icon: '👕',
      features: ['Soft Material', 'Comfortable', 'Wash Resistant']
    }
  ];

  return (
    <div className="garmenttags-page">
      {/* Header Section */}
      <section className="garmenttags-header">
        <div className="container">
          <h1>Garment Tags</h1>
          <p>Custom tags and labels for clothing and textiles</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="garmenttags-products">
        <div className="container">
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-icon">{product.icon}</div>
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <ul className="product-features">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <div className="minimum-quantity">
                  <span className="min-qty-text">Minimum Order: </span>
                  <span className="min-qty-number">1000</span>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="contact-section">
            <div className="contact-card">
              <h2>Custom Garment Tags</h2>
              <p>We can create custom tags to match your brand requirements</p>
              <button className="contact-btn" onClick={handleContactUs}>
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="additional-info">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">🎨</div>
              <h3>Custom Design</h3>
              <p>Create unique tags with your brand logo and colors</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📏</div>
              <h3>Various Sizes</h3>
              <p>Available in different sizes to fit your garment needs</p>
            </div>
            <div className="info-card">
              <div className="info-icon">💪</div>
              <h3>Durable Quality</h3>
              <p>High-quality materials that withstand washing and wear</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GarmentTags;