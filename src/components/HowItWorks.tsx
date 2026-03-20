import React from 'react';
import './HowItWorks.css';

const HowItWorks: React.FC = () => {
  return (
    <section className="how-it-works section">
      <div className="container">
        <h2 className="section-title text-center">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Scan</h3>
            <p>Snap a photo of your receipt after shopping.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Review</h3>
            <p>We automatically organize your purchase history.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Compare</h3>
            <p>See price trends and find the best deals.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
