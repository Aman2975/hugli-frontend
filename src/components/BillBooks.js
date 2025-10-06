import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BillBooks.css';
import './shared/ContactButton.css';

const BillBooks = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact');
  };

  const products = [
    {
      id: 'a4-bill-book-2-copy',
      name: 'A4 Bill Book - 2 Copy',
      description: 'Professional A4 bill book with 2 carbon copies',
      icon: '📊',
      features: ['A4 Size', '2 Carbon Copies', 'Professional Format']
    },
    {
      id: 'a4-bill-book-3-copy',
      name: 'A4 Bill Book - 3 Copy',
      description: 'Professional A4 bill book with 3 carbon copies',
      icon: '📋',
      features: ['A4 Size', '3 Carbon Copies', 'Multi-Purpose']
    },
    {
      id: 'receipt-book',
      name: 'Receipt Book',
      description: 'Small format receipt book for retail businesses',
      icon: '🧾',
      features: ['Compact Size', 'Quick Entries', 'Retail Ready']
    },
    {
      id: 'invoice-book',
      name: 'Invoice Book',
      description: 'Professional invoice book for business transactions',
      icon: '📄',
      features: ['Professional Format', 'Business Grade', 'Custom Branding']
    }
  ];

  return (
    <div className="billbooks-page">
      {/* Header Section */}
      <section className="billbooks-header">
        <div className="container">
          <h1>Bill Books</h1>
          <p>Professional bill books for all your business transaction needs</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="billbooks-products">
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
              <h2>Custom Bill Books Available</h2>
              <p>We can create custom formats to match your business requirements</p>
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
              <div className="info-icon">📝</div>
              <h3>Custom Formatting</h3>
              <p>Tailored bill book formats to match your business requirements</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🎨</div>
              <h3>Branding Options</h3>
              <p>Add your company logo and branding to your bill books</p>
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

export default BillBooks;