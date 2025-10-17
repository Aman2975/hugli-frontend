import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VisitingCards.css';
import './shared/ContactButton.css';

const VisitingCards = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact');
  };

  const cardCategories = [
    {
      id: 'metal-cards',
      title: 'METAL VISITING CARDS',
      quantity: 'QTY. 50 CARDS',
      products: [
        {
          id: 'metal-card-1',
          name: 'METAL CARDS',
          productCode: '1',
          features: ['Sheet Color: 8 Types', 'Die Cut Option: Any Shape'],
          image: '/images/visiting-cards.jpg'
        }
      ]
    },
    {
      id: '800gsm-cards',
      title: '800 GSM VISITING CARDS',
      quantity: 'QTY. 500 CARDS',
      products: [
        {
          id: '800gsm-velvet',
          name: '800 GSM + VELVET',
          productCode: '2',
          features: ['Lamination Type: Velvet', 'UV Option: Available', 'Foil Option: Available (5 Types)', 'Die Cut Option: Available (36 Types)'],
          image: '/images/visiting-cards.jpg'
        },
        {
          id: '800gsm-matt',
          name: '800 GSM + MATT',
          productCode: '3',
          features: ['Lamination Type: Matt', 'UV Option: Available', 'Foil Option: Available', 'Die Cut Option: Available (36 Types)'],
          image: '/images/visiting-cards.jpg'
        },
        {
          id: '800gsm-black',
          name: '800 GSM BLACK SHEET (WITH WHITE INK)',
          productCode: '4',
          features: ['Lamination: Not Available', 'UV Option: Available', 'Foil Option: Available (5 Types)', 'Die Cut Option: Available (36 Types)'],
          image: '/images/visiting-cards.jpg'
        },
        {
          id: '800gsm-craft',
          name: '800 GSM CRAFT PAPER',
          productCode: '5',
          features: ['Lamination: Not Available', 'UV Option: Available', 'Foil Option: Available (5 Types)', 'Die Cut Option: Available (36 Types)'],
          image: '/images/visiting-cards.jpg'
        },
        {
          id: '800gsm-texture',
          name: '800 GSM + TEXTURE',
          productCode: '6',
          features: ['Lamination Type: Matt', 'Texture Option: Available (8 Types)', 'Die Cut Option: Available (36 Types)'],
          image: '/images/visiting-cards.jpg'
        }
      ]
    },
    {
      id: '500gsm-cards',
      title: '500 GSM CARDS',
      quantity: 'QTY. 500 CARDS',
      products: [
        {
          id: '500gsm-velvet',
          name: '500 GSM + VELVET',
          productCode: '7',
          features: ['Velvet Lamination', 'UV Option: Available', 'Foil Option: Available (5 Types)', 'Die Cut Option: Available (36 Types)', 'Customized Die Cut Available'],
          image: '/images/visiting-cards.jpg'
        },
        {
          id: '500gsm-matt',
          name: '500 GSM + MATT',
          productCode: '8',
          features: ['Matt Lamination', 'UV Option: Available', 'Foil Option: Available (5 Types)', 'Die Cut Option: Available (36 Types)'],
          image: '/images/visiting-cards.jpg'
        },
        {
          id: '500gsm-drip',
          name: '500 GSM + DRIP-OFF',
          productCode: '9',
          features: ['Drip-off', 'Die Cut Option: Available (36 Types)'],
          image: '/images/visiting-cards.jpg'
        }
      ]
    },
    {
      id: 'nt-pvc-cards',
      title: 'NT / PVC VISITING CARDS',
      quantity: 'QTY. 100, 500 & 1000 CARDS',
      products: [
        {
          id: '800micron-fusing',
          name: '800 MICRON FUSING',
          productCode: '10',
          features: ['Sheet Color: White, Gold, Silver', 'UV Option: Available', 'Foil Option: Available (5 Types)', 'Die Cut Option: Available (2 Types)'],
          image: '/images/visiting-cards.jpg'
        },
        {
          id: '250micron-transparent',
          name: '250 MICRON TRANSPARENT SHEET',
          productCode: '11',
          features: ['250 Micron Transparent NT Sheet', 'Die Cut Option: Die No. 1 only'],
          image: '/images/visiting-cards.jpg'
        },
        {
          id: '180micron',
          name: '180 MICRON',
          productCode: '12',
          features: ['180 Micron White NT Sheet', 'Gloss UV Coating Option: Available'],
          image: '/images/visiting-cards.jpg'
        }
      ]
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
          {cardCategories.map((category) => (
            <div key={category.id} className="card-category">
              <div className="category-header">
                <h2 className="category-title">{category.title}</h2>
                <span className="category-quantity">{category.quantity}</span>
              </div>
              <div className="visiting-cards-grid">
                {category.products.map((product) => (
                  <div key={product.id} className="visiting-product-card">
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
            </div>
          ))}

          {/* Contact Section */}
          <div className="contact-section">
            <div className="contact-card">
              <h2>Custom Visiting Cards</h2>
              <p>We can create custom visiting cards to match your brand and style</p>
              <div className="minimum-quantity">
                <span className="min-qty-text">Minimum Order: </span>
                <span className="min-qty-number">50</span>
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