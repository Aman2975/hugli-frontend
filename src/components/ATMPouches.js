import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ATMPouches.css';
import './shared/ContactButton.css';

const ATMPouches = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact');
  };

  const products = [
    {
      id: 'atm-pouch-matt',
      name: 'ATM Pouch - Matt Lamination',
      description: 'ATM pouch with matt lamination finish for professional appearance',
      icon: '💳',
      features: ['Matt Lamination', 'Professional Look', 'Secure Design']
    },
    {
      id: 'atm-pouch-gloss',
      name: 'ATM Pouch - Gloss Lamination',
      description: 'ATM pouch with glossy finish for premium appearance',
      icon: '✨',
      features: ['Gloss Lamination', 'Premium Look', 'Durable Finish']
    },
    {
      id: 'atm-pouch-soft-touch',
      name: 'ATM Pouch - Soft Touch',
      description: 'ATM pouch with soft touch finish for luxury feel',
      icon: '👆',
      features: ['Soft Touch Finish', 'Luxury Feel', 'High Quality']
    },
    {
      id: 'atm-pouch-uv',
      name: 'ATM Pouch - UV Coating',
      description: 'ATM pouch with UV coating for enhanced protection',
      icon: '🛡️',
      features: ['UV Coating', 'Enhanced Protection', 'Long Lasting']
    }
  ];

  return (
    <div className="atm-pouches-page">
      {/* Header Section */}
      <section className="atm-pouches-header">
        <div className="container">
          <h1>ATM Pouches</h1>
          <p>Secure pouches for ATM cash handling with various finishing options</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="atm-pouches-products">
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
              <h2>Need ATM Pouches?</h2>
              <p>Contact us for custom ATM pouches with your specifications</p>
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
              <div className="info-icon">🔒</div>
              <h3>Secure Design</h3>
              <p>Designed for secure cash handling and transportation</p>
            </div>
            <div className="info-card">
              <div className="info-icon">💎</div>
              <h3>Premium Quality</h3>
              <p>High-quality materials for reliable performance</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📦</div>
              <h3>Bulk Orders</h3>
              <p>Competitive pricing for large quantity orders</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ATMPouches;