import React, { useState } from "react";
import "./StoreButtons.css";

type Platform = "ios" | "android" | "other";

type StoreButtonsProps = {
  variant?: "default" | "on-dark";
  size?: "md" | "sm";
  /** "both" always shows both; "auto" shows only the store for the visitor's device (both on desktop). */
  show?: "both" | "auto";
};

const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.itstomlie.Guruu&pcampaignid=shopmate-landing-page";
const TESTFLIGHT_URL = "https://testflight.apple.com/join/XVMtRcqX";

// Brand logos live in /public (served at site root)
const APPLE_LOGO = "/apple.png";
const GOOGLE_PLAY_LOGO = "/googlePlay.svg.webp";

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent || "";
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  // iPadOS 13+ reports as "Macintosh" — disambiguate via touch points
  if (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) return "ios";
  return "other";
}

const AppleLogo: React.FC = () => (
  <img
    className="store-btn__logo"
    src={APPLE_LOGO}
    alt=""
    aria-hidden="true"
    loading="lazy"
    width={22}
    height={22}
  />
);

const GooglePlayLogo: React.FC = () => (
  <img
    className="store-btn__logo"
    src={GOOGLE_PLAY_LOGO}
    alt=""
    aria-hidden="true"
    loading="lazy"
    width={22}
    height={22}
  />
);

const GooglePlayButton: React.FC = () => (
  <a
    href={GOOGLE_PLAY_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Download on Google Play"
    className="store-btn"
  >
    <GooglePlayLogo />
    <span className="store-btn__text">
      <small>Get it on</small>
      <strong>Google Play</strong>
    </span>
  </a>
);

const TestFlightButton: React.FC = () => (
  <a
    href={TESTFLIGHT_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Join the iOS beta on TestFlight"
    className="store-btn"
  >
    <AppleLogo />
    <span className="store-btn__text">
      <small>Join the beta on</small>
      <strong>TestFlight (iOS)</strong>
    </span>
  </a>
);

const StoreButtons: React.FC<StoreButtonsProps> = ({
  variant = "default",
  size = "md",
  show = "both",
}) => {
  // Client-only SPA — navigator is available on first render, so no flash.
  const [platform] = useState<Platform>(detectPlatform);

  let showGoogle = true;
  let showApple = true;
  if (show === "auto") {
    if (platform === "android") showApple = false;
    else if (platform === "ios") showGoogle = false;
  }
  const count = Number(showGoogle) + Number(showApple);

  return (
    <div
      className={`store-buttons store-buttons--${variant} store-buttons--${size} store-buttons--${
        count === 1 ? "single" : "pair"
      }`}
    >
      {showGoogle && <GooglePlayButton />}
      {showApple && <TestFlightButton />}
    </div>
  );
};

export default StoreButtons;
