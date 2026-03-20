import React from 'react';
import squirrelMascot from '../assets/squirrel_mascot.png';
import appMockup from '../assets/app_mockup.png';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero section">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Stop Guessing. <br/><span className="highlight">Start Saving.</span></h1>
          <p className="hero-subtitle">
            Shopmate helps you track grocery prices, compare stores, and save money on every trip.
            Join the smart shoppers today!
          </p>
          <div className="hero-cta">
            <button className="btn-primary">Download Now</button>
            <button className="btn-secondary">Learn More</button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Happy Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">$$$</span>
              <span className="stat-label">Saved Monthly</span>
            </div>
          </div>
        </div>
        <div className="hero-visuals">
          <img src={squirrelMascot} alt="Shopmate Squirrel Mascot" className="mascot-img floating" />
          <img src={appMockup} alt="Shopmate App Mockup" className="mockup-img" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
