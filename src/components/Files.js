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
      id: 'pvc-file-small',
      name: 'PVC FILE',
      productCode: '1',
      size: 'SMALL SIZE',
      features: ['300 Micron PP Sheet', '9"x12"'],
      image: '/images/files.jpeg'
    },
    {
      id: 'pvc-file-big',
      name: 'PVC FILE',
      productCode: '2',
      size: 'BIG SIZE',
      features: ['300 Micron PP Sheet', '9.5"x12.5"'],
      image: '/images/files.jpeg'
    },
    {
      id: 'sbs-file-small',
      name: 'SBS FILE',
      productCode: '3',
      size: 'SMALL SIZE',
      features: ['260 Gsm SBS Paper', '9"x12"'],
      image: '/images/files.jpeg'
    },
    {
      id: 'sbs-file-big',
      name: 'SBS FILE',
      productCode: '4',
      size: 'BIG SIZE',
      features: ['320 Gsm SBS Paper', '9.5"x12.5"'],
      image: '/images/files.jpeg'
    },
    {
      id: 'pvc-clip',
      name: 'PVC CLIP',
      productCode: '5',
      size: 'Available in 3 Varieties',
      features: ['PVC Material', 'Durable Design'],
      image: '/images/files.jpeg'
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
          <div className="files-products-grid">
            {products.map((product) => (
              <div key={product.id} className="files-product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <div className="product-size">{product.size}</div>
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
              <h2>Custom File Solutions</h2>
              <p>We can create custom files to match your specific requirements</p>
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