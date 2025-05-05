import React, { useEffect, useState } from 'react';
import { InfinityLogo } from './components/InfinityLogo';
import { Hero } from './components/Hero';
import { WhySection } from './components/WhySection';
import { BuildingSection } from './components/BuildingSection';
import { BlockchainSection } from './components/BlockchainSection';
import { ExperienceSection } from './components/ExperienceSection';
import { CreatorTools } from './components/CreatorTools';
import { Empowerment } from './components/Empowerment';
import { BusinessModel } from './components/BusinessModel';
import { Roadmap } from './components/Roadmap';
import { Team } from './components/Team';
import { Advantage } from './components/Advantage';
import { CallToAction } from './components/CallToAction';
import { Navigation } from './components/Navigation';
export function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Handle initial loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    // Track scroll position for animations
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);
  if (isLoading) {
    return <div className="fixed inset-0 bg-black flex items-center justify-center">
        <InfinityLogo isAnimating={true} size={180} />
      </div>;
  }
  return <div className="w-full bg-black text-white overflow-x-hidden">
      <Navigation />
      <Hero scrollPosition={scrollPosition} />
      <WhySection scrollPosition={scrollPosition} />
      <BuildingSection scrollPosition={scrollPosition} />
      <BlockchainSection scrollPosition={scrollPosition} />
      <ExperienceSection scrollPosition={scrollPosition} />
      <CreatorTools scrollPosition={scrollPosition} />
      <Empowerment scrollPosition={scrollPosition} />
      <BusinessModel scrollPosition={scrollPosition} />
      <Roadmap scrollPosition={scrollPosition} />
      <Team scrollPosition={scrollPosition} />
      <Advantage scrollPosition={scrollPosition} />
      <CallToAction scrollPosition={scrollPosition} />
    </div>;
}