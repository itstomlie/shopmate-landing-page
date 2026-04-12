import React from "react";
import StoreButtons from "./StoreButtons";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div id="download" className="final-cta section">
        <div className="container text-center">
          <h2 className="cta-title">Ready to Start Saving?</h2>
          <p className="cta-subtitle">
            Download Shopmate on Android. iOS is coming soon.
          </p>
          <div className="footer-download-wrap">
            <StoreButtons variant="on-dark" />
          </div>
        </div>
      </div>

      <div className="footer-links">
        <div className="container footer-content">
          <div className="footer-brand">
            <h3>Shopmate</h3>
            <p>Shop Smarter, Not Harder.</p>
          </div>
          <div className="footer-nav">
            <a href="#about">About</a>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
          </div>
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} Shopmate. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
