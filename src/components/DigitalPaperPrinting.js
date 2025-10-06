import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DigitalPaperPrinting.css';

const DigitalPaperPrinting = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact');
  };

  const products = [
    {
      id: 'letter-head-paper',
      name: 'LETTER HEAD PAPER',
      description: 'Professional letterhead paper with custom design',
      icon: '📄',
      features: ['Custom Design', 'Professional Quality', '1 Day Delivery']
    },
    {
      id: 'business-card-paper',
      name: 'BUSINESS CARD PAPER',
      description: 'High-quality business card paper with various finishes',
      icon: '💼',
      features: ['Premium Quality', 'Various Finishes', 'Fast Turnaround']
    },
    {
      id: 'brochure-paper',
      name: 'BROCHURE PAPER',
      description: 'Premium brochure paper for marketing materials',
      icon: '📖',
      features: ['Marketing Grade', 'High Resolution', 'Custom Sizes']
    },
    {
      id: 'poster-paper',
      name: 'POSTER PAPER',
      description: 'Large format poster paper for advertising',
      icon: '🖼️',
      features: ['Large Format', 'High Quality', 'Quick Printing']
    }
  ];

  return (
    <div className="digital-paper-page">
      {/* Header Section */}
      <section className="digital-paper-header">
        <div className="container">
          <h1>Digital Paper Printing</h1>
          <p>High-quality digital printing on various paper types with fast turnaround times</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="digital-paper-products">
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
              <h2>Ready to Order?</h2>
              <p>Contact us for custom digital paper printing solutions</p>
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
              <div className="info-icon">⚡</div>
              <h3>Fast Turnaround</h3>
              <p>Quick processing and delivery for urgent orders</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🎨</div>
              <h3>Custom Designs</h3>
              <p>Tailored designs to match your brand requirements</p>
            </div>
            <div className="info-card">
              <div className="info-icon">💎</div>
              <h3>Premium Quality</h3>
              <p>High-quality materials and printing technology</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalPaperPrinting;