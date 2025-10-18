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
      name: 'PAMPHLETS',
      productCode: '1',
      type: 'Marketing Grade',
      features: ['Custom Design', 'High Quality', 'Bulk Available'],
      image: '/images/posters/pamplets.png'
    },
    {
      id: 'posters',
      name: 'POSTERS',
      productCode: '2',
      type: 'Large Format',
      features: ['High Quality', 'Eye Catching', 'Durable Material'],
      image: '/images/posters/poster.png'
    },
    {
      id: 'flyers',
      name: 'FLYERS',
      productCode: '3',
      type: 'Cost Effective',
      features: ['Quick Printing', 'Versatile Use', 'Budget Friendly'],
      image: '/images/posters/flyer.png'
    },
    {
      id: 'brochures',
      name: 'BROCHURES',
      productCode: '4',
      type: 'Professional',
      features: ['Professional Look', 'Detailed Info', 'Fold Options'],
      image: '/images/posters/brouches.png'
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
          <div className="pamphlets-products-grid">
            {products.map((product) => (
              <div key={product.id} className="pamphlets-product-card">
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
              <h2>Custom Marketing Materials</h2>
              <p>We can create custom pamphlets and posters for your marketing campaigns</p>
              <div className="minimum-quantity">
                <span className="min-qty-text">Minimum Order: </span>
                <span className="min-qty-number">500</span>
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