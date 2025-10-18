import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GarmentTags.css';
import './shared/ContactButton.css';

const GarmentTags = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact');
  };

  const products = [
    {
      id: 'thread-tags',
      name: 'THREAD',
      productCode: '1',
      features: ['Thread-based attachment', 'Custom colors available'],
      image: '/images/garment_tags/1.png'
    },
    {
      id: 'gloss-tags',
      name: 'GLOSS',
      productCode: '2',
      features: ['High Gloss UV Coating', 'Premium finish'],
      image: '/images/garment_tags/2.png'
    },
    {
      id: 'matt-tags',
      name: 'MATT',
      productCode: '3',
      features: ['350 GSM Paper', 'Matt Lamination'],
      image: '/images/garment_tags/3.png'
    },
    {
      id: 'matt-uv-tags',
      name: 'MATT LAMINATION + UV',
      productCode: '4',
      features: ['400 GSM Paper', 'Matt Lamination'],
      image: '/images/garment_tags/4.png'
    },
    {
      id: '800gsm-matt-texture',
      name: '800 GSM + MATT + TEXTURE',
      productCode: '5',
      features: ['Available in 8 Texture', 'Premium quality'],
      image: '/images/garment_tags/5.png'
    },
    {
      id: '800gsm-matt',
      name: '800 GSM + MATT',
      productCode: '6',
      features: ['Matt Lamination', 'Heavy weight'],
      image: '/images/garment_tags/6.png'
    },
    {
      id: '800gsm-matt-uv',
      name: '800 GSM + MATT + UV',
      productCode: '7',
      features: ['MATT + UV', 'Enhanced durability'],
      image: '/images/garment_tags/7.png'
    },
    {
      id: 'pvc-tags',
      name: 'PVC TAG',
      productCode: '8',
      features: ['PVC Material', 'Waterproof'],
      image: '/images/garment_tags/10.png'
    }
  ];

  return (
    <div className="garmenttags-page">
      {/* Header Section */}
      <section className="garmenttags-header">
        <div className="container">
          <h1>Garment Tags</h1>
          <p>Custom tags and labels for clothing and textiles</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="garmenttags-products">
        <div className="container">
          <div className="garmenttags-products-grid">
            {products.map((product) => (
              <div key={product.id} className="garmenttags-product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
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
              <h2>Custom Garment Tags</h2>
              <p>We can create custom tags to match your brand requirements</p>
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
              <p>Create unique tags with your brand logo and colors</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📏</div>
              <h3>Various Sizes</h3>
              <p>Available in different sizes to fit your garment needs</p>
            </div>
            <div className="info-card">
              <div className="info-icon">💪</div>
              <h3>Durable Quality</h3>
              <p>High-quality materials that withstand washing and wear</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GarmentTags;