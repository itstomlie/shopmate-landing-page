import React, { useState, useEffect } from "react";
import StoreButtons from "./StoreButtons";
import "./Header.css";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-container">
        <a href="#home" className="logo">
          Shopmate
        </a>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#features">Features</a>
        </nav>
        <div className="header-cta">
          <StoreButtons size="sm" show="auto" />
        </div>
      </div>
    </header>
  );
};

export default Header;
