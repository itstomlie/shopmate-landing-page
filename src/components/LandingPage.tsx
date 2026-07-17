import React, { useEffect } from "react";
import Header from "./Header";
import Hero from "./Hero";
import ProblemSolution from "./ProblemSolution";
import HowItWorks from "./HowItWorks";
import Features from "./Features";
import Footer from "./Footer";

const LandingPage: React.FC = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page">
      <Header />
      <Hero />
      <ProblemSolution />
      <HowItWorks />
      <Features />
      {/* <SocialProof /> */}
      <Footer />
    </div>
  );
};

export default LandingPage;
