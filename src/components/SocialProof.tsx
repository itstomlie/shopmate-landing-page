import React from 'react';
import './SocialProof.css';

const SocialProof: React.FC = () => {
  return (
    <section className="social-proof section">
      <div className="container">
        <h2 className="section-title text-center">Join Thousands of Smart Shoppers</h2>
        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-value">50k+</div>
            <div className="stat-label">Downloads</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">2M+</div>
            <div className="stat-label">Receipts Scanned</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">$500k+</div>
            <div className="stat-label">User Savings</div>
          </div>
        </div>
        
        <div className="testimonials">
          <div className="testimonial-card">
            <p className="testimonial-text">"I never realized how much prices fluctuate until I started using Shopmate. I've saved over $200 this month alone!"</p>
            <p className="testimonial-author">- Sarah J.</p>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">"The receipt scanner is so fast and accurate. It's actually fun to track my grocery spending now."</p>
            <p className="testimonial-author">- Mike T.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
