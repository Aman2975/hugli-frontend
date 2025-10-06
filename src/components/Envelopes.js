import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Envelopes.css';
import './shared/ContactButton.css';

const Envelopes = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact');
  };

  const products = [
    {
      id: 'envelope-9x4',
      name: 'ENVELOPE - 9x4',
      description: 'Standard office letter envelope',
      icon: '✉️',
      features: ['Standard Size', 'Office Use', 'Bulk Available']
    },
    {
      id: 'envelope-10x4',
      name: 'ENVELOPE - 10x4',
      description: 'Large office envelope for bigger documents',
      icon: '📮',
      features: ['Large Size', 'Document Safe', 'Professional']
    },
    {
      id: 'envelope-12x6',
      name: 'ENVELOPE - 12x6',
      description: 'Extra large envelope for reports and catalogs',
      icon: '📋',
      features: ['Extra Large', 'Catalog Size', 'Heavy Duty']
    },
    {
      id: 'envelope-a4',
      name: 'ENVELOPE - A4',
      description: 'A4 size envelope for international correspondence',
      icon: '📄',
      features: ['A4 Size', 'International', 'Premium Quality']
    }
  ];

  return (
    <div className="envelopes-page">
      {/* Header Section */}
      <section className="envelopes-header">
        <div className="container">
          <h1>Envelopes</h1>
          <p>Various sizes and types of envelopes for all your mailing needs</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="envelopes-products">
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
              <h2>Need Custom Envelopes?</h2>
              <p>Contact us for custom sizing and branding options</p>
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
              <div className="info-icon">📏</div>
              <h3>Custom Sizing</h3>
              <p>We can create envelopes in any size to match your specific requirements</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🏷️</div>
              <h3>Branding Options</h3>
              <p>Add your logo or custom designs to make your envelopes stand out</p>
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

export default Envelopes;