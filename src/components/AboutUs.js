import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

const AboutUs = () => {
  const companyStats = [
    { number: '10+', label: 'Years of Experience' },
    { number: '5000+', label: 'Happy Customers' },
    { number: '50+', label: 'Team Members' },
    { number: '24/7', label: 'Customer Support' }
  ];

  const services = [
    { icon: '🖨️', title: 'Digital Printing', description: 'High-quality digital printing services for all your business needs' },
    { icon: '📄', title: 'Offset Printing', description: 'Large volume offset printing with premium quality results' },
    { icon: '🎨', title: 'Graphic Design', description: 'Creative design solutions to make your brand stand out' },
    { icon: '📦', title: 'Packaging', description: 'Custom packaging solutions for your products' }
  ];

  const teamMembers = [
    { name: 'name', position: 'Founder & CEO', image: '👨‍💼' },
    { name: 'name', position: 'Operations Manager', image: '👩‍💼' },
    { name: 'name', position: 'Design Director', image: '👨‍🎨' },
    { name: 'name', position: 'Quality Manager', image: '👩‍🔬' }
  ];

  return (
    <div className="about-us-page">
      {/* Header Section */}
      <section className="about-header">
        <div className="container">
          <h1>About Hugli Printing Press</h1>
          <p>Your trusted partner in printing excellence since 2014</p>
        </div>
      </section>

      {/* Breadcrumb Section */}
      <section className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">About Us</span>
          </nav>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="company-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Hugli Printing Press has been at the forefront of the printing industry, 
                delivering exceptional quality and service to businesses across the region. What started as 
                a small printing shop has grown into a comprehensive printing solutions provider, serving 
                thousands of satisfied customers.
              </p>
              <p>
                Our commitment to quality, innovation, and customer satisfaction has made us a trusted 
                partner for businesses of all sizes. From small startups to large corporations, we provide 
                the same level of excellence and attention to detail.
              </p>
              <div className="story-highlights">
                <div className="highlight-item">
                  <div className="highlight-icon">🎯</div>
                  <div className="highlight-text">
                    <h4>Mission</h4>
                    <p>To provide high-quality printing solutions that help businesses communicate effectively and grow.</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">👁️</div>
                  <div className="highlight-text">
                    <h4>Vision</h4>
                    <p>To be the leading printing company known for innovation, quality, and exceptional customer service.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <div className="company-mockup">
                  <div className="printing-machine">🖨️</div>
                  <div className="paper-stack">📄</div>
                  <div className="quality-badge">⭐</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <h2>Our Achievements</h2>
          <div className="stats-grid">
            {companyStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-overview">
        <div className="container">
          <h2>What We Do</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-image">{member.image}</div>
                <h3>{member.name}</h3>
                <p>{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="location-section">
        <div className="container">
          <h2>Visit Our Location</h2>
          <div className="location-content">
            <div className="location-info">
              <div className="info-card">
                <h3>📍 Address</h3>
                <p>
                  Handiaya Bazaar Rd<br />
                  Barnala, Punjab 148101<br />
                  India
                </p>
              </div>
              <div className="info-card">
                <h3>🕒 Business Hours</h3>
                <p>
                  Monday - Friday: 9:00 AM - 7:00 PM<br />
                  Saturday: 9:00 AM - 5:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
              <div className="info-card">
                <h3>📞 Contact Info</h3>
                <p>
                  Phone: +91 78373 15102<br />
                  Mobile: +91 78373 15102<br />
                  Email: bhavnishgarg94@gmail.com
                </p>
              </div>
            </div>
            <div className="map-container">
              <div className="map-placeholder">
                <div className="map-content">
                  <div className="map-icon">🗺️</div>
                  <h3>Google Maps</h3>
                  <p>Interactive map showing our location</p>
                  <div className="map-iframe">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.379523252459!2d75.54478614575096!3d30.37337159499353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3910f376559490b9%3A0x2edc362fa9ff6bd4!2sHugli%20Printing%20Press!5e0!3m2!1sen!2sin!4v1757612424262!5m2!1sen!2sin"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Hugli Printing Press Location"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Work With Us?</h2>
          <p>Get in touch with our team to discuss your printing needs</p>
          <div className="cta-buttons">
            <Link to="/contact" className="cta-btn primary">Contact Us</Link>
            <Link to="/products" className="cta-btn secondary">View Products</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
