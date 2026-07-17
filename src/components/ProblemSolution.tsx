import React from "react";
import { Camera, ChartLine, Scale, Bell } from "lucide-react";
import "./ProblemSolution.css";

const ProblemSolution: React.FC = () => {
  return (
    <section id="about" className="problem-solution section">
      <div className="container">
        <div className="problem-section reveal">
          <h2 className="section-title">
            Ever wonder if you're paying too much?
          </h2>
          <p className="section-subtitle">
            "Was this cheaper last week?" "Is this deal actually good?"
            <br />
            We've all been there. Shopping without data is just guessing.
          </p>
        </div>

        <div className="solution-cards">
          <div className="card reveal">
            <div className="card-icon" aria-hidden="true">
              <Camera size={32} strokeWidth={2.25} />
            </div>
            <h3>Scan Receipts</h3>
            <p>
              Snap a photo — even multi-page receipts — and AI extracts every
              item, price, and discount for you.
            </p>
          </div>
          <div className="card reveal">
            <div className="card-icon" aria-hidden="true">
              <ChartLine size={32} strokeWidth={2.25} />
            </div>
            <h3>Track Price History</h3>
            <p>
              See how each product's price moved over the last year and know
              exactly when to buy.
            </p>
          </div>
          <div className="card reveal">
            <div className="card-icon" aria-hidden="true">
              <Scale size={32} strokeWidth={2.25} />
            </div>
            <h3>Compare Stores</h3>
            <p>
              Side-by-side prices across stores, normalized per unit — $/100g,
              $/L — so comparisons are fair.
            </p>
          </div>
          <div className="card reveal">
            <div className="card-icon" aria-hidden="true">
              <Bell size={32} strokeWidth={2.25} />
            </div>
            <h3>Watch Prices</h3>
            <p>
              Shopmate flags when items you regularly buy get cheaper — or
              quietly creep up.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
