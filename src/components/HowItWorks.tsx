import React from "react";
import "./HowItWorks.css";

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="how-it-works section">
      <div className="container">
        <div className="text-center reveal">
          <span className="section-eyebrow">How it works</span>
          <h2 className="section-title">Three steps to smarter shopping</h2>
        </div>
        <div className="steps-container">
          <div className="step reveal">
            <div className="step-number">1</div>
            <h3>Scan</h3>
            <p>
              Snap your receipt after shopping — AI reads every item, price,
              and discount in seconds.
            </p>
          </div>
          <div className="step-connector"></div>
          <div className="step reveal">
            <div className="step-number">2</div>
            <h3>Review</h3>
            <p>
              Confirm items with the zoomable receipt viewer. Your purchase
              history organizes itself.
            </p>
          </div>
          <div className="step-connector"></div>
          <div className="step reveal">
            <div className="step-number">3</div>
            <h3>Decide</h3>
            <p>
              See trends and store comparisons at a glance — and make every
              purchase an informed decision.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
