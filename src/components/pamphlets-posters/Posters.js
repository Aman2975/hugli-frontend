import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PamphletsPosters.css';
import '../shared/ContactButton.css';

const Posters = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact');
  };

  const posterOptions = [
    {
      name: 'A3 Size',
      description: 'Standard poster size for indoor display',
      icon: '🖼️'
    },
    {
      name: 'A2 Size',
      description: 'Large poster for prominent display',
      icon: '📋'
    },
    {
      name: 'A1 Size',
      description: 'Extra large poster for maximum impact',
      icon: '📰'
    },
    {
      name: 'Custom Size',
      description: 'Any custom size to fit your needs',
      icon: '✂️'
    }
  ];

  return (
    <div className="posters-section">
      <div className="section-header">
        <div className="section-icon">🖼️</div>
        <h2>POSTERS</h2>
        <p>Large format posters for advertising and promotional purposes</p>
      </div>

      <div className="poster-options">
        <h3>Available Poster Sizes</h3>
        <div className="options-grid">
          {posterOptions.map((option, index) => (
            <div key={index} className="option-item">
              <div className="option-icon">{option.icon}</div>
              <h4>{option.name}</h4>
              <p>{option.description}</p>
              <div className="minimum-quantity">
                <span className="min-qty-text">Minimum Order: </span>
                <span className="min-qty-number">1000</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="contact-section">
        <div className="contact-card">
          <h3>Need Custom Posters?</h3>
          <p>Contact us for custom poster designs and large format printing</p>
          <button className="contact-btn" onClick={handleContactUs}>
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Posters;