import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PamphletsPosters.css';
import './shared/ContactButton.css';

const PamphletsPosters = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact');
  };

  const products = [
    {
      id: 'pamphlets',
      name: 'Pamphlets',
      description: 'High-quality pamphlets for marketing and information distribution',
      icon: '📄',
      features: ['Marketing Grade', 'Custom Design', 'Bulk Available']
    },
    {
      id: 'posters',
      name: 'Posters',
      description: 'Large format posters for advertising and promotional purposes',
      icon: '🖼️',
      features: ['Large Format', 'High Quality', 'Eye Catching']
    },
    {
      id: 'flyers',
      name: 'Flyers',
      description: 'Cost-effective flyers for promotional campaigns',
      icon: '📋',
      features: ['Cost Effective', 'Quick Printing', 'Versatile Use']
    },
    {
      id: 'brochures',
      name: 'Brochures',
      description: 'Professional brochures for detailed product information',
      icon: '📖',
      features: ['Professional Look', 'Detailed Info', 'Fold Options']
    }
  ];

  return (
    <div className="pamphlets-posters-page">
      {/* Header Section */}
      <section className="pamphlets-posters-header">
        <div className="container">
          <h1>Pamphlets & Posters</h1>
          <p>Marketing materials for promotional campaigns and information distribution</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="pamphlets-posters-products">
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
              <h2>Custom Marketing Materials</h2>
              <p>We can create custom pamphlets and posters for your marketing campaigns</p>
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
              <p>Create unique designs that match your brand and campaign goals</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📏</div>
              <h3>Various Sizes</h3>
              <p>Available in different sizes to fit your marketing needs</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📦</div>
              <h3>Bulk Orders</h3>
              <p>Competitive pricing for large quantity marketing materials</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PamphletsPosters;