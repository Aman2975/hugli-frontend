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
      productCode: '1',
      dimensions: '9x4',
      utility: 'For Office Letters',
      features: ['Standard Office Size', 'Professional Quality'],
      image: '/images/envelopes/1.png'
    },
    {
      id: 'envelope-10x4',
      name: 'ENVELOPE - 10.75x4.75',
      productCode: '2',
      dimensions: '10.75x4.75',
      utility: 'For Office Letters',
      features: ['Window Envelope', 'Large Office Size'],
      image: '/images/envelopes/2.png'
    },
    {
      id: 'envelope-9x4-2',
      name: 'ENVELOPE - 9.70x4.20',
      productCode: '3',
      dimensions: '9.70x4.20',
      utility: 'For Office Letters',
      features: ['Custom Office Size', 'Pointed Flap'],
      image: '/images/envelopes/3.png'
    },
    {
      id: 'envelope-5x7',
      name: 'ENVELOPE - 5x7',
      productCode: '4',
      dimensions: '5x7',
      utility: 'For Invitations / Cards',
      features: ['Invitation Size', 'Card Envelope'],
      image: '/images/envelopes/4.png'
    },
    {
      id: 'envelope-6x8',
      name: 'ENVELOPE - 6x8',
      productCode: '5',
      dimensions: '6x8',
      utility: 'For Invitations / Cards',
      features: ['Medium Invitation', 'Decorative Design'],
      image: '/images/envelopes/5.png'
    },
    {
      id: 'envelope-8x10',
      name: 'ENVELOPE - 8.60x10.60',
      productCode: '6',
      dimensions: '8.60x10.60',
      utility: 'For Brochures / Files',
      features: ['Large Document Size', 'File Envelope'],
      image: '/images/envelopes/7.png'
    },
    {
      id: 'envelope-9x12',
      name: 'ENVELOPE - 9.40x12.40',
      productCode: '7',
      dimensions: '9.40x12.40',
      utility: 'For Brochures / Files',
      features: ['Extra Large Size', 'Button Closure'],
      image: '/images/envelopes/1.png'
    },
    {
      id: 'gift-envelope',
      name: 'GIFT ENVELOPE',
      productCode: '8',
      dimensions: 'Various Sizes',
      utility: 'For Gifting',
      features: ['Decorative Design', 'Festive Colors'],
      image: '/images/envelopes/7.png'
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
          <div className="envelopes-products-grid">
            {products.map((product) => (
              <div key={product.id} className="envelopes-product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <div className="product-dimensions">{product.dimensions}</div>
                <div className="product-utility">{product.utility}</div>
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
              <h2>Need Custom Envelopes?</h2>
              <p>Contact us for custom sizing and branding options</p>
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