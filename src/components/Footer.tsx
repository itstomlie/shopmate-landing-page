import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="final-cta section">
        <div className="container text-center">
          <h2 className="cta-title">Ready to Start Saving?</h2>
          <p className="cta-subtitle">Download Shopmate today and take control of your grocery budget.</p>
          <div className="app-buttons">
            <button className="btn-store">Download on App Store</button>
            <button className="btn-store">Get it on Google Play</button>
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
            <a href="#">About</a>
            <a href="#">Features</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
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
