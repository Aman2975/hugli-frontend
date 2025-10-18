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
      name: 'A4 BILL BOOK',
      productCode: '1',
      type: '2 Copy',
      features: ['A4 Size', '2 Carbon Copies', 'Professional Format'],
      image: '/images/bill_books/1.jpg'
    },
    {
      id: 'a4-bill-book-3-copy',
      name: 'A4 BILL BOOK',
      productCode: '2',
      type: '3 Copy',
      features: ['A4 Size', '3 Carbon Copies', 'Multi-Purpose'],
      image: '/images/bill_books/2.jpg'
    },
    {
      id: 'receipt-book',
      name: 'RECEIPT BOOK',
      productCode: '3',
      type: 'Small Format',
      features: ['Compact Size', 'Quick Entries', 'Retail Ready'],
      image: '/images/bill_books/3.jpg'
    },
    {
      id: 'invoice-book',
      name: 'INVOICE BOOK',
      productCode: '4',
      type: 'Professional',
      features: ['Professional Format', 'Business Grade', 'Custom Branding'],
      image: '/images/bill_books/4.jpg'
    }
  ];

  return (
    <div className="bill-books-page">
      {/* Header Section */}
      <section className="bill-books-header">
        <div className="container">
          <h1>Bill Books</h1>
          <p>Professional bill books for all your business transaction needs</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="bill-books-products">
        <div className="container">
          <div className="billbooks-products-grid">
            {products.map((product) => (
              <div key={product.id} className="billbooks-product-card">
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
              <h2>Custom Bill Books Available</h2>
              <p>We can create custom formats to match your business requirements</p>
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