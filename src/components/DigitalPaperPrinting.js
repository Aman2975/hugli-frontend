import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DigitalPaperPrinting.css';

const DigitalPaperPrinting = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact');
  };

  const products = [
    {
      id: 'letter-head-paper',
      name: 'LETTER HEAD PAPER',
      productCode: '1',
      features: ['Professional Design', 'Custom Branding', 'High Quality'],
      image: '/images/digital_papers/letter head digital.jpg'
    },
    {
      id: 'art-paper',
      name: 'ART PAPER',
      productCode: '2',
      features: ['Smooth Finish', 'Premium Quality', 'High Resolution'],
      image: '/images/digital_papers/art paper.jpg'
    },
    {
      id: 'texture-paper',
      name: 'TEXTURE PAPER',
      productCode: '3',
      features: ['Textured Surface', 'Unique Feel', 'Premium Finish'],
      image: '/images/digital_papers/texture.jpg'
    },
    {
      id: 'metallic-paper',
      name: 'METALLIC PAPER',
      productCode: '4',
      features: ['Shiny Metallic Finish', 'Luxury Look', 'Eye-catching'],
      image: '/images/digital_papers/golden.jpg'
    },
    {
      id: 'nt-pvc-sheets',
      name: 'NT / PVC SHEETS',
      productCode: '5',
      features: ['Durable Material', 'Waterproof', 'Long Lasting'],
      image: '/images/digital-printing.jpeg'
    },
    {
      id: 'paper-gumming',
      name: 'PAPER GUMMING',
      productCode: '6',
      features: ['Self-Adhesive', 'Easy Application', 'Strong Bond'],
      image: '/images/digital_papers/gumming.jpg'
    },
    {
      id: 'pvc-gumming',
      name: 'PVC GUMMING',
      productCode: '7',
      features: ['PVC Material', 'Adhesive Back', 'Durable'],
      image: '/images/digital-printing.jpeg'
    },
    {
      id: 'only-printing',
      name: 'ONLY PRINTING',
      productCode: '8',
      features: ['Digital Printing', 'High Speed', 'Quality Output'],
      image: '/images/digital-printing.jpeg'
    }
  ];

  return (
    <div className="digital-printing-page">
      {/* Header Section */}
      <section className="digital-printing-header">
        <div className="container">
          <h1>Digital Paper Printing</h1>
          <p>High-quality digital printing on various paper types with fast turnaround times</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="digital-printing-products">
        <div className="container">
          <div className="digital-products-grid">
            {products.map((product) => (
              <div key={product.id} className="digital-product-card">
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
              <h2>Ready to Order?</h2>
              <p>Contact us for custom digital paper printing solutions</p>
              <div className="minimum-quantity">
                <span className="min-qty-text">Minimum Order: </span>
                <span className="min-qty-number">100</span>
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
              <div className="info-icon">⚡</div>
              <h3>Fast Turnaround</h3>
              <p>Quick processing and delivery for urgent orders</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🎨</div>
              <h3>Custom Designs</h3>
              <p>Tailored designs to match your brand requirements</p>
            </div>
            <div className="info-card">
              <div className="info-icon">💎</div>
              <h3>Premium Quality</h3>
              <p>High-quality materials and printing technology</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalPaperPrinting;