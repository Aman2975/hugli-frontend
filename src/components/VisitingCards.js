import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VisitingCards.css';
import './shared/ContactButton.css';

const VisitingCards = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact');
  };

  const products = [
    {
      id: 'standard-cards',
      name: 'Standard Visiting Cards',
      description: 'Professional standard visiting cards with various finishes',
      icon: '💼',
      features: ['Professional Look', 'Various Finishes', 'Quick Delivery']
    },
    {
      id: 'premium-cards',
      name: 'Premium Visiting Cards',
      description: 'High-quality premium cards with luxury finishes',
      icon: '💎',
      features: ['Premium Quality', 'Luxury Feel', 'Custom Design']
    },
    {
      id: 'metal-cards',
      name: 'Metal Visiting Cards',
      description: 'Unique metal cards for a distinctive impression',
      icon: '🔗',
      features: ['Unique Material', 'Distinctive Look', 'Durable']
    },
    {
      id: 'pvc-cards',
      name: 'PVC Visiting Cards',
      description: 'Durable PVC cards for frequent use',
      icon: '💳',
      features: ['Waterproof', 'Tear Resistant', 'Long Lasting']
    }
  ];

  return (
    <div className="visiting-cards-page">
      {/* Header Section */}
      <section className="visiting-cards-header">
        <div className="container">
          <h1>Visiting Cards</h1>
          <p>Professional visiting cards in various styles and materials</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="visiting-cards-products">
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
              <h2>Custom Visiting Cards</h2>
              <p>We can create custom visiting cards to match your brand and style</p>
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
              <p>Create unique visiting cards with your brand colors and logo</p>
            </div>
            <div className="info-card">
              <div className="info-icon">✨</div>
              <h3>Various Finishes</h3>
              <p>Available in different finishes like matte, glossy, and soft touch</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📦</div>
              <h3>Quick Delivery</h3>
              <p>Fast turnaround times for urgent visiting card orders</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisitingCards;