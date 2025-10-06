import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './HomePage.css';

const HomePage = () => {

  return (
    <div className="homepage">
      <Header />

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-content">
          <h1>Welcome to Hugli Printing Press</h1>
          <p>Your trusted partner for all printing and design needs. We deliver exceptional quality and service that exceeds expectations.</p>
          <Link to="/products" className="explore-btn">Explore Our Products</Link>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-content">
            <h2>About Hugli Printing Press</h2>
            <p>With over 15 years of experience in the printing industry, Hugli Printing Press has been serving businesses and individuals with top-quality printing services. Our state-of-the-art equipment and skilled team ensure that every project meets the highest standards of quality and professionalism.</p>
            <p>We pride ourselves on our commitment to customer satisfaction, fast turnaround times, and competitive pricing. Whether you need business cards, banners, or large-scale printing projects, we have the expertise to bring your vision to life.</p>
            
          </div>
          <div className="about-image">
            <img src="https://ik.imagekit.io/krfh4tnk7/printlion/2024/04/2a865218-colour-printing-1024x778.webp" alt="Printing Services" />
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Get Free Quote</h3>
              <div className="quote-section">
                <p>Ready to start your printing project? Get a free, no-obligation quote today!</p>
                <div className="quote-buttons">
                  <Link to="/place-order" className="quote-btn primary">Place Order</Link>
                  <Link to="/contact" className="quote-btn secondary">Contact Us</Link>
                </div>
              </div>
            </div>
            <div className="footer-section">
              <h3>Contact Info</h3>
                             <div className="contact-info">
                 <p>📧 bhavnishgarg94@gmail.com</p>
                 <p>📞 +91 78373 15102</p>
                 <p>📍 Handiaya Bazaar Rd, Barnala, Punjab 148101</p>
               </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-logo">
              <h3>Hugli Printing Press</h3>
            </div>
            <div className="copyright">
              <p>&copy; 2025 Hugli Printing Press. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
