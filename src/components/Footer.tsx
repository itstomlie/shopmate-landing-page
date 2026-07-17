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
            Free on Android — no sign-up needed. iOS is coming soon.
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
          <div className="footer-columns">
            <nav className="footer-nav" aria-label="Product">
              <span className="footer-nav-title">Product</span>
              <a href="#about">About</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#features">Features</a>
            </nav>
            <nav className="footer-nav" aria-label="Support">
              <span className="footer-nav-title">Support</span>
              <a href="/support">Support</a>
              <a href="/privacy">Privacy Policy</a>
              <a href="/delete-account">Delete Account</a>
              <a href="mailto:tom@shopmategrocery.com">Contact</a>
            </nav>
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
