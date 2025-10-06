import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LetterHeads.css';
import './shared/ContactButton.css';

const LetterHeads = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact');
  };

  const products = [
    {
      id: 'standard-letterhead',
      name: 'Standard Letterhead',
      description: 'Professional letterhead with company branding',
      icon: '📄',
      features: ['Company Logo', 'Professional Design', 'A4 Size']
    },
    {
      id: 'premium-letterhead',
      name: 'Premium Letterhead',
      description: 'High-quality letterhead with premium finishes',
      icon: '✨',
      features: ['Premium Quality', 'Custom Design', 'Luxury Feel']
    },
    {
      id: 'business-letterhead',
      name: 'Business Letterhead',
      description: 'Corporate letterhead for business correspondence',
      icon: '💼',
      features: ['Corporate Design', 'Professional Look', 'Brand Consistency']
    },
    {
      id: 'custom-letterhead',
      name: 'Custom Letterhead',
      description: 'Fully customized letterhead to match your brand',
      icon: '🎨',
      features: ['Fully Custom', 'Unique Design', 'Brand Identity']
    }
  ];

  return (
    <div className="letterheads-page">
      {/* Header Section */}
      <section className="letterheads-header">
        <div className="container">
          <h1>Letter Heads</h1>
          <p>Professional letterhead designs for business correspondence</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="letterheads-products">
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
              <h2>Custom Letterhead Design</h2>
              <p>We can create custom letterheads to match your brand identity</p>
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
              <p>Create unique letterheads with your brand colors and logo</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📏</div>
              <h3>Various Formats</h3>
              <p>Available in different sizes and formats for your needs</p>
            </div>
            <div className="info-card">
              <div className="info-icon">💎</div>
              <h3>Premium Quality</h3>
              <p>High-quality paper and printing for professional results</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LetterHeads;