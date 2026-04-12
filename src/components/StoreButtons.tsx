import React from "react";
import "./StoreButtons.css";

type StoreButtonsProps = {
  variant?: "default" | "on-dark";
};

const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.itstomlie.Guruu&pcampaignid=shopmate-landing-page";
const GOOGLE_PLAY_BADGE_SRC =
  "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png";

const StoreButtons: React.FC<StoreButtonsProps> = ({ variant = "default" }) => {
  return (
    <div className={`store-buttons store-buttons--${variant}`}>
      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download on Google Play"
        className="google-play-link"
      >
        <img
          src={GOOGLE_PLAY_BADGE_SRC}
          alt="Get it on Google Play"
          className="google-play-badge"
        />
      </a>
      <button type="button" className="app-store-coming-soon" disabled>
        App Store Coming Soon
      </button>
    </div>
  );
};

export default StoreButtons;
