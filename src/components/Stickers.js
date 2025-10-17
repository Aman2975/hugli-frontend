import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Stickers.css';
import './shared/ContactButton.css';

const Stickers = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact');
  };

  const products = [
    {
      id: 'vinyl-stickers',
      name: 'VINYL STICKERS',
      productCode: '1',
      type: 'Weather Resistant',
      features: ['Long Lasting', 'Outdoor Safe', 'Durable Material'],
      image: '/images/stickers.jpeg'
    },
    {
      id: 'paper-stickers',
      name: 'PAPER STICKERS',
      productCode: '2',
      type: 'Cost Effective',
      features: ['Quick Printing', 'Indoor Use', 'Budget Friendly'],
      image: '/images/stickers.jpeg'
    },
    {
      id: 'transparent-stickers',
      name: 'TRANSPARENT STICKERS',
      productCode: '3',
      type: 'Clear Finish',
      features: ['Seamless Look', 'Versatile Use', 'Invisible Edge'],
      image: '/images/stickers.jpeg'
    },
    {
      id: 'die-cut-stickers',
      name: 'DIE CUT STICKERS',
      productCode: '4',
      type: 'Custom Shapes',
      features: ['Precise Cutting', 'Unique Design', 'Any Shape'],
      image: '/images/stickers.jpeg'
    }
  ];

  return (
    <div className="stickers-page">
      {/* Header Section */}
      <section className="stickers-header">
        <div className="container">
          <h1>Stickers</h1>
          <p>Custom stickers with various cutting options for all your needs</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="stickers-products">
        <div className="container">
          <div className="stickers-products-grid">
            {products.map((product) => (
              <div key={product.id} className="stickers-product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <div className="product-type">{product.type}</div>
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
              <h2>Custom Sticker Solutions</h2>
              <p>We can create custom stickers to match your specific requirements</p>
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
              <div className="info-icon">🎨</div>
              <h3>Custom Design</h3>
              <p>Create unique stickers with your brand colors and design</p>
            </div>
            <div className="info-card">
              <div className="info-icon">✂️</div>
              <h3>Various Cutting</h3>
              <p>Available in different cutting styles and shapes</p>
            </div>
            <div className="info-card">
              <div className="info-icon">💪</div>
              <h3>Durable Materials</h3>
              <p>High-quality materials for long-lasting stickers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stickers;