import React from 'react';
import Header from './Header';
import Hero from './Hero';
import ProblemSolution from './ProblemSolution';
import HowItWorks from './HowItWorks';
import Features from './Features';
import SocialProof from './SocialProof';
import Footer from './Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <Header />
      <Hero />
      <ProblemSolution />
      <HowItWorks />
      <Features />
      <SocialProof />
      <Footer />
    </div>
  );
};

export default LandingPage;
