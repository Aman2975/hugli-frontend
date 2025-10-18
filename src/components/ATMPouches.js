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
      name: 'ATM POUCH',
      productCode: '1',
      lamination: 'Matt Lamination',
      features: ['Professional Look', 'Secure Design', 'Durable Material'],
      image: '/images/atm_pouches/1.jpg'
    },
    {
      id: 'atm-pouch-gloss',
      name: 'ATM POUCH',
      productCode: '2',
      lamination: 'Gloss Lamination',
      features: ['Premium Look', 'Shiny Finish', 'High Quality'],
      image: '/images/atm_pouches/2.jpg'
    },
    {
      id: 'atm-pouch-soft-touch',
      name: 'ATM POUCH',
      productCode: '3',
      lamination: 'Soft Touch Finish',
      features: ['Luxury Feel', 'Smooth Texture', 'Premium Quality'],
      image: '/images/atm_pouches/3.jpg'
    },
    {
      id: 'atm-pouch-uv',
      name: 'ATM POUCH',
      productCode: '4',
      lamination: 'UV Coating',
      features: ['Enhanced Protection', 'Long Lasting', 'Weather Resistant'],
      image: '/images/atm_pouches/4.jpg'
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
          <div className="atm-products-grid">
            {products.map((product) => (
              <div key={product.id} className="atm-product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <div className="product-lamination">{product.lamination}</div>
                <div className="product-code">
                  <span className="code-label">Product Code:</span>
                  <span className="code-number">{product.productCode}</span>
                </div>
                <ul className="product-features">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="contact-section">
            <div className="contact-card">
              <h2>Need ATM Pouches?</h2>
              <p>Contact us for custom ATM pouches with your specifications</p>
              <div className="minimum-quantity">
                <span className="min-qty-text">Minimum Order: </span>
                <span className="min-qty-number">1000</span>
              </div>
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