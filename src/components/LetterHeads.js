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
      id: 'letterhead-70gsm-maplitho',
      name: 'Letter Head',
      productCode: '1',
      specifications: '70 GSM, Maplitho Paper',
      features: ['Professional Quality', 'Standard Weight'],
      image: '/images/latter_heads/1.png'
    },
    {
      id: 'letterhead-90gsm-sunshine',
      name: 'Letter Head',
      productCode: '2',
      specifications: '90 GSM, Sunshine Paper',
      features: ['Premium Quality', 'Bright White'],
      image: '/images/latter_heads/2.png'
    },
    {
      id: 'letterhead-100gsm-bond',
      name: 'Letter Head',
      productCode: '3',
      specifications: '100 GSM, Bond Paper',
      features: ['Heavy Weight', 'Durable Quality'],
      image: '/images/latter_heads/3.png'
    },
    {
      id: 'letterhead-100gsm-deo',
      name: 'Letter Head',
      productCode: '4',
      specifications: '100 GSM, Deo Paper',
      features: ['Heavy Weight', 'Smooth Finish'],
      image: '/images/latter_heads/4.png'
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
          <div className="letterheads-products-grid">
            {products.map((product) => (
              <div key={product.id} className="letterheads-product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <div className="product-specifications">{product.specifications}</div>
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
              <h2>Custom Letterhead Design</h2>
              <p>We can create custom letterheads to match your brand identity</p>
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