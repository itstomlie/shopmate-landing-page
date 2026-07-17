import React from "react";
import {
  ScanLine,
  ChartLine,
  Scale,
  Bell,
  Wallet,
  Search,
} from "lucide-react";
import "./Features.css";

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
  isNew?: boolean;
};

const FEATURES: Feature[] = [
  {
    icon: <ScanLine size={26} strokeWidth={2.25} />,
    title: "AI Receipt Scanning",
    description:
      "Snap or import a photo — even long, multi-page receipts. Items, prices, discounts, and totals are extracted automatically, then you confirm them against a zoomable photo of the receipt.",
  },
  {
    icon: <ChartLine size={26} strokeWidth={2.25} />,
    title: "Price History Charts",
    description:
      "Every product gets a price chart over 12 weeks, 6 months, or a year — with highs and lows marked. A \"special\" that isn't below the usual price isn't special.",
  },
  {
    icon: <Scale size={26} strokeWidth={2.25} />,
    title: "Cross-Store Comparison",
    description:
      "Compare offers across stores with fair per-unit pricing ($/100g, $/L) — the full picture before you decide where to shop.",
  },
  {
    icon: <Bell size={26} strokeWidth={2.25} />,
    title: "Price Watch",
    description:
      "Your home screen highlights items you buy whose price moved since your last shop — green when they're cheaper, red when they've crept up.",
    isNew: true,
  },
  {
    icon: <Wallet size={26} strokeWidth={2.25} />,
    title: "Spend Insights",
    description:
      "See your grocery spend by week or month, compare it to the previous period, and drill into the exact receipts behind any spike.",
    isNew: true,
  },
  {
    icon: <Search size={26} strokeWidth={2.25} />,
    title: "Searchable History",
    description:
      "\"How much did I pay for milk last month?\" Search every receipt by store or item, view the original photo, and edit any receipt in place.",
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="features section">
      <div className="container">
        <div className="text-center reveal">
          <span className="section-eyebrow">Features</span>
          <h2 className="section-title">
            Everything you need to decide with confidence
          </h2>
          <p className="section-subtitle">
            Walk into the store already knowing the answer — what it usually
            costs, where it's cheapest, and whether now is the time to buy.
          </p>
        </div>
        <div className="features-grid">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="feature-item reveal">
              <div className="feature-icon" aria-hidden="true">
                {feature.icon}
              </div>
              <div className="feature-content">
                <h3>
                  {feature.title}
                  {feature.isNew && <span className="feature-badge">New</span>}
                </h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
