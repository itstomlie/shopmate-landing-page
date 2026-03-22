import React from "react";
import { Camera, ChartColumn, Scale, Brain } from "lucide-react";
import "./ProblemSolution.css";

const ProblemSolution: React.FC = () => {
  return (
    <section id="about" className="problem-solution section">
      <div className="container">
        <div className="problem-section">
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
          <div className="card">
            <div className="card-icon" aria-hidden="true">
              <Camera size={44} strokeWidth={2.25} />
            </div>
            <h3>Scan Receipts</h3>
            <p>
              Quickly digitize your shopping history with our AI-powered
              scanner.
            </p>
          </div>
          <div className="card">
            <div className="card-icon" aria-hidden="true">
              <ChartColumn size={44} strokeWidth={2.25} />
            </div>
            <h3>Track Prices</h3>
            <p>See price trends over time and know exactly when to buy.</p>
          </div>
          <div className="card">
            <div className="card-icon" aria-hidden="true">
              <Scale size={44} strokeWidth={2.25} />
            </div>
            <h3>Compare Stores</h3>
            <p>
              Find out which store has the best price for your favorite items.
            </p>
          </div>
          <div className="card">
            <div className="card-icon" aria-hidden="true">
              <Brain size={44} strokeWidth={2.25} />
            </div>
            <h3>Shop Confidently</h3>
            <p>Make informed decisions and stop overpaying for groceries.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
