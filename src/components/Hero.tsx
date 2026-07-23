import React from "react";
import {
  ChartLine,
  Bell,
  BadgePercent,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import squirrelMascot from "../assets/squirrel_mascot.png";
import appMockup from "../assets/app_mockup.png";
import StoreButtons from "./StoreButtons";
import "./Hero.css";

const Hero: React.FC = () => {
  return (
    <section id="home" className="hero section">
      <div className="container hero-container">
        <div className="hero-content">
          <span className="hero-eyebrow">
            Community-sourced grocery prices for Australia
          </span>
          <h1 className="hero-title">
            Stop Guessing. <br />
            <span className="highlight">Start Saving.</span>
          </h1>
          <p className="hero-subtitle">
            Scan your receipts and Shopmate turns them into price knowledge —
            see price history, compare stores, and make every grocery run an{" "}
            <em>informed decision</em>, not a guess.
          </p>
          <div className="hero-cta">
            <StoreButtons />
            <p className="hero-cta-note">
              No sign-up required · No credit card required
            </p>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">
                <ChartLine size={20} aria-hidden="true" />
                Know Before You Buy
              </span>
              <span className="stat-label">
                Price history for every product you scan
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                <Bell size={20} aria-hidden="true" />
                Price Watch
              </span>
              <span className="stat-label">
                Know when items you buy go up or down
              </span>
            </div>
            <div className="stat-item stat-item--primary">
              <span className="stat-number">
                <BadgePercent size={20} aria-hidden="true" />
                No More Guessing
              </span>
              <span className="stat-label">
                See if that "special" is really special
              </span>
            </div>
          </div>
        </div>
        <div className="hero-visuals">
          <div className="hero-blob" aria-hidden="true"></div>
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
          <div className="price-chip price-chip--down floating-slow" aria-hidden="true">
            <TrendingDown size={16} />
            <span>
              Milk 2L <strong>$3.10</strong> · cheaper at Aldi
            </span>
          </div>
          <div className="price-chip price-chip--up floating-slower" aria-hidden="true">
            <TrendingUp size={16} />
            <span>
              Coffee 1kg <strong>+12%</strong> since you last bought
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
