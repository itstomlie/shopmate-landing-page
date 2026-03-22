import React from "react";
import "./Features.css";

const Features: React.FC = () => {
  return (
    <section id="features" className="features section">
      <div className="container">
        <h2 className="section-title text-center">Features that Empower You</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-content">
              <h3>AI-Powered Scanning</h3>
              <p>
                Our advanced AI instantly recognizes items and prices from any
                receipt, saving you time on manual entry.
              </p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-content">
              <h3>Price History Tracking</h3>
              <p>
                Watch how prices change over time. Never fall for a "fake sale"
                again.
              </p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-content">
              <h3>Smart Search</h3>
              <p>
                Find any item you've ever bought in seconds. "How much did I pay
                for milk last month?" Now you know.
              </p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-content">
              <h3>Store Comparison</h3>
              <p>
                Automatically compare prices across different stores to ensure
                you're getting the best deal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
