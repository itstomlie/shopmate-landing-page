import React from "react";
import { BadgePercent, ArrowUpDown, Users } from "lucide-react";
import squirrelMascot from "../assets/squirrel_mascot.png";
import appMockup from "../assets/app_mockup.png";
import WishlistForm from "./WishlistForm";
import "./Hero.css";

const Hero: React.FC = () => {
  return (
    <section id="home" className="hero section">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Stop Guessing. <br />
            <span className="highlight">Start Saving.</span>
          </h1>
          <p className="hero-subtitle">
            Shopmate helps you track grocery prices, compare stores, and save
            money on every trip. Join the smart shoppers today!
          </p>
          <div className="hero-cta">
            <p className="coming-soon">Coming Soon!</p>
            <WishlistForm />
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">
                <ArrowUpDown size={20} aria-hidden="true" />
                No High-Low Pricing
              </span>
              <span className="stat-label">No more pricing mind games</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                <Users size={20} aria-hidden="true" />
                No Loyalty-Only Prices
              </span>
              <span className="stat-label">Fair prices for everyone</span>
            </div>
            <div className="stat-item stat-item--primary">
              <span className="stat-number">
                <BadgePercent size={20} aria-hidden="true" />
                No Fake Discounts
              </span>
              <span className="stat-label">Real price drops only</span>
            </div>
          </div>
        </div>
        <div className="hero-visuals">
          <img
            src={squirrelMascot}
            alt="Shopmate Squirrel Mascot"
            className="mascot-img floating"
          />
          <img
            src={appMockup}
            alt="Shopmate App Mockup"
            className="mockup-img"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
