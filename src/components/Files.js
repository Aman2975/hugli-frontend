import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Files.css';
import './shared/ContactButton.css';

const Files = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact');
  };

  const products = [
    {
      id: 'ring-binder',
      name: 'Ring Binder Files',
      description: 'Professional ring binder files for document organization',
      icon: '📁',
      features: ['Durable Rings', 'Professional Look', 'Multiple Sizes']
    },
    {
      id: 'clip-files',
      name: 'Clip Files',
      description: 'Convenient clip files for easy document access',
      icon: '📎',
      features: ['Easy Access', 'Secure Clips', 'Compact Design']
    },
    {
      id: 'box-files',
      name: 'Box Files',
      description: 'Storage box files for bulk document storage',
      icon: '📦',
      features: ['Bulk Storage', 'Durable Material', 'Organized Storage']
    },
    {
      id: 'folder-files',
      name: 'Folder Files',
      description: 'Standard folder files for everyday use',
      icon: '🗂️',
      features: ['Standard Size', 'Daily Use', 'Cost Effective']
    }
  ];

  return (
    <div className="files-page">
      {/* Header Section */}
      <section className="files-header">
        <div className="container">
          <h1>Files</h1>
          <p>Document organization and filing solutions for your office</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="files-products">
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
              <h2>Custom File Solutions</h2>
              <p>We can create custom files to match your specific requirements</p>
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
              <h3>Custom Branding</h3>
              <p>Add your company logo and colors to your files</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📏</div>
              <h3>Various Sizes</h3>
              <p>Available in multiple sizes to fit your needs</p>
            </div>
            <div className="info-card">
              <div className="info-icon">💪</div>
              <h3>Durable Materials</h3>
              <p>High-quality materials for long-lasting use</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Files;