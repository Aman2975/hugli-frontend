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
      name: 'Vinyl Stickers',
      description: 'Durable vinyl stickers for outdoor use',
      icon: '🏷️',
      features: ['Weather Resistant', 'Long Lasting', 'Outdoor Safe']
    },
    {
      id: 'paper-stickers',
      name: 'Paper Stickers',
      description: 'Cost-effective paper stickers for indoor use',
      icon: '📄',
      features: ['Cost Effective', 'Quick Printing', 'Indoor Use']
    },
    {
      id: 'transparent-stickers',
      name: 'Transparent Stickers',
      description: 'Clear transparent stickers for seamless application',
      icon: '🔍',
      features: ['Transparent', 'Seamless Look', 'Versatile Use']
    },
    {
      id: 'die-cut-stickers',
      name: 'Die Cut Stickers',
      description: 'Custom shaped stickers with precise cutting',
      icon: '✂️',
      features: ['Custom Shapes', 'Precise Cutting', 'Unique Design']
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
              <h2>Custom Sticker Solutions</h2>
              <p>We can create custom stickers to match your specific requirements</p>
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