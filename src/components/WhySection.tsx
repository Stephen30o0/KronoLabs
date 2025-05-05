import React, { useState, useEffect, useRef } from 'react';
import { ComicPanel } from './ComicPanel';
import { InfinityLogo } from './InfinityLogo';
import { BrushStroke, ComicEffect } from './DesignElements';
interface WhySectionProps {
  scrollPosition: number;
}
export const WhySection: React.FC<WhySectionProps> = ({
  scrollPosition
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [sectionFocus, setSectionFocus] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect when section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        setSectionFocus(true);
      } else {
        setSectionFocus(false);
      }
    }, {
      threshold: 0.2
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto-rotate highlights through stats
  useEffect(() => {
    if (sectionFocus) {
      // Start auto-highlighting panels after a delay
      const startTimeout = setTimeout(() => {
        setHighlightIndex(0);

        // Set up rotating highlights
        const interval = setInterval(() => {
          setHighlightIndex(prev => prev === null ? 0 : (prev + 1) % 4);
        }, 3000);
        timeoutRef.current = interval;
      }, 2000);
      return () => {
        clearTimeout(startTimeout);
        if (timeoutRef.current) {
          clearInterval(timeoutRef.current);
        }
      };
    } else {
      // Clear highlight when section not focused
      setHighlightIndex(null);
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    }
  }, [sectionFocus]);

  // Handle panel hover
  const handlePanelHover = (index: number) => {
    setHighlightIndex(index);

    // Reset auto-rotation on manual hover
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }

    // Restart auto-rotation after a longer delay
    timeoutRef.current = setTimeout(() => {
      setHighlightIndex(prev => prev === null ? 0 : (prev + 1) % 4);
      const interval = setInterval(() => {
        setHighlightIndex(prev => prev === null ? 0 : (prev + 1) % 4);
      }, 3000);
      timeoutRef.current = interval;
    }, 5000) as any;
  };

  // Data for the panels to make it more maintainable
  const panelData = [{
    value: "1%",
    text: "Only 1% of global comics feature African or underrepresented voices.",
    effect: "pow",
    rotation: "rotate-1",
    color: "#A259FF"
  }, {
    value: "<1%",
    text: "Less than 1% of creators on major platforms earn enough to live on.",
    effect: "boom",
    rotation: "-rotate-1",
    color: "#FF5E5E"
  }, {
    value: "40M",
    text: "40 million kids in Sub-Saharan Africa don't have access to digital tools.",
    effect: "bang",
    rotation: "rotate-2",
    color: "#3DBBFF"
  }, {
    value: "",
    text: "Great stories die because creators don't have funds, tools, or an audience.",
    effect: "star",
    rotation: "-rotate-2",
    color: "#FFD600"
  }];
  return <section ref={sectionRef} id="why" className="relative py-32 pb-40 bg-black overflow-hidden">
    <div className="absolute inset-0 z-0 pointer-events-none">
  <div className="w-full h-full bg-black bg-[radial-gradient(circle,rgba(162,89,255,0.09)_1.5px,transparent_1.5px)] [background-size:28px_28px]" />
    </div>


      {/* Decorative lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="20" x2="100" y2="80" stroke="#A259FF" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
          <line x1="0" y1="80" x2="100" y2="20" stroke="#A259FF" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="#FFFFFF" strokeWidth="0.2" vectorEffect="non-scaling-stroke" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#FFFFFF" strokeWidth="0.2" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      
      {/* Comic decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <ComicEffect type="zap" className="absolute top-20 -left-20 opacity-10 transition-all duration-700" size={300} style={{
        transform: `rotate(-15deg) ${isVisible ? 'scale(1)' : 'scale(0.8)'}`,
        opacity: isVisible ? 0.1 : 0
      }} />
        <ComicEffect type="boom" className="absolute bottom-40 -right-20 opacity-10 transition-all duration-700" size={350} style={{
        transform: `rotate(10deg) ${isVisible ? 'scale(1)' : 'scale(0.8)'}`,
        opacity: isVisible ? 0.1 : 0
      }} />
        <BrushStroke color="#A259FF" className="absolute top-1/4 -right-40 opacity-10 transition-all duration-700" width={400} rotation={20} style={{
        transform: `${isVisible ? 'translateX(0)' : 'translateX(100px)'}`,
        opacity: isVisible ? 0.1 : 0
      }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Title section */}
        <div className="mb-24 relative" style={{
        transform: `translateY(${isVisible ? '0' : '30px'})`,
        opacity: isVisible ? 1 : 0,
        transition: 'transform 0.8s ease-out, opacity 0.8s ease-out'
      }}>
          <h2 className="text-6xl md:text-8xl font-black uppercase mb-4 leading-none tracking-tighter relative">
            <span className="text-white">Why</span>{" "}
            <span className="text-[#A259FF] relative inline-block">
              <span className="relative z-10">KronoLabs</span>
              <div className="absolute -bottom-2 left-0 w-full h-4 bg-[#A259FF]/20 -skew-x-6"></div>
            </span>{" "}
            <span className="text-white block md:inline-block">Exists</span>
            
            <ComicEffect type="bang" className="absolute -top-12 -right-12 opacity-30 hidden md:block animate-float" size={120} />
          </h2>
          
          <div className="w-24 h-2 bg-[#A259FF] mt-8"></div>
          
          <div className="absolute top-0 right-0 md:right-12 opacity-30 transition-all duration-500 hover:opacity-100">
            <InfinityLogo size={140} scrollEffect={true} scrollPosition={scrollPosition} />
          </div>
        </div>
        
        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20" style={{
        transform: `translateY(${isVisible ? '0' : '50px'})`,
        opacity: isVisible ? 1 : 0,
        transition: 'transform 1s ease-out, opacity 1s ease-out',
        transitionDelay: '0.2s'
      }}>
          {/* Left column - Mission statement */}
          <div className="flex flex-col justify-center">
            <h3 className="text-4xl md:text-5xl font-bold mb-8 uppercase text-[#A259FF] relative" style={{
            textShadow: '0 0 20px rgba(162, 89, 255, 0.3)'
          }}>
              Stories the World 
              <span className="block">Hasn't Seen... Yet</span>
              
              <div className="absolute -bottom-4 left-0 w-1/2 h-1 bg-[#A259FF]"></div>
            </h3>
            
            <p className="text-xl mb-8 leading-relaxed">
              We built KronoLabs because the future of storytelling should be
              <span className="text-[#A259FF] font-bold"> decentralized</span>,
              <span className="text-[#3DBBFF] font-bold"> accessible</span>, and
              <span className="text-[#FFD600] font-bold"> community-powered</span>.
            </p>
            
            <div className="mt-8 relative">
              <button className="bg-[#A259FF] px-8 py-4 text-xl font-bold uppercase border-4 border-black hover:bg-white hover:text-black transition-colors duration-300 relative overflow-hidden group shadow-comic transform hover:scale-105">
                <span className="relative z-10">Learn How It Works</span>
                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </button>
              
              <BrushStroke color="#A259FF" className="absolute -bottom-4 -right-4 opacity-50" width={100} rotation={-10} />
            </div>
          </div>
          
          {/* Right column - Stats panels */}
          <div className="grid grid-cols-1 gap-8">
            {panelData.map((panel, index) => <ComicPanel key={index} scrollPosition={scrollPosition} delay={100 + index * 200} className={`transform ${panel.rotation} transition-all duration-500 cursor-pointer relative ${highlightIndex === index ? 'scale-105 z-20' : 'scale-100 z-10'}`} onMouseEnter={() => handlePanelHover(index)} highlighted={highlightIndex === index} highlightColor={panel.color}>
                <div className="flex items-center relative z-10">
                  {panel.value && <div className="text-6xl font-black mr-4" style={{
                color: highlightIndex === index ? panel.color : 'white',
                textShadow: highlightIndex === index ? `0 0 15px ${panel.color}80` : 'none',
                transition: 'color 0.3s ease, text-shadow 0.3s ease'
              }}>
                      {panel.value}
                    </div>}
                  <p className={`text-lg font-medium ${!panel.value ? 'font-bold' : ''}`} style={{
                transition: 'transform 0.3s ease',
                transform: highlightIndex === index ? 'scale(1.05)' : 'scale(1)'
              }}>
                    {panel.text}
                  </p>
                </div>
                
                {/* Show comic effect when highlighted */}
                {highlightIndex === index && <ComicEffect type={panel.effect} className="absolute -top-12 -right-12 transition-all duration-300" size={100} style={{
              color: panel.color
            }} />}
              </ComicPanel>)}
          </div>
        </div>
        
        {/* New animated infographic section showing global impact */}
        <div className="mt-28 relative" style={{
        transform: `translateY(${isVisible ? '0' : '50px'})`,
        opacity: isVisible ? 1 : 0,
        transition: 'transform 1s ease-out, opacity 1s ease-out',
        transitionDelay: '0.4s'
      }}>
          <div className="w-full h-1 bg-white/10 mb-16"></div>
          
          <h3 className="text-3xl font-bold mb-12 text-center uppercase">
            How KronoLabs Is <span className="text-[#A259FF]">Making A Difference</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-black/50 border border-white/10 p-8 rounded-sm relative group hover:bg-black/80 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#A259FF]"></div>
              <div className="text-4xl font-bold mb-4 text-[#A259FF]">500+</div>
              <h4 className="text-xl font-bold mb-2">Global Creators</h4>
              <p className="text-white/80">From 32 countries across 6 continents - bringing diverse stories to life.</p>
              <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#A259FF" />
                </svg>
              </div>
            </div>
            
            <div className="bg-black/50 border border-white/10 p-8 rounded-sm relative group hover:bg-black/80 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#3DBBFF]"></div>
              <div className="text-4xl font-bold mb-4 text-[#3DBBFF]">10K+</div>
              <h4 className="text-xl font-bold mb-2">Digital Comics</h4>
              <p className="text-white/80">Published and tokenized on our platform - preserving creator ownership.</p>
              <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#3DBBFF" />
                </svg>
              </div>
            </div>
            
            <div className="bg-black/50 border border-white/10 p-8 rounded-sm relative group hover:bg-black/80 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#FFD600]"></div>
              <div className="text-4xl font-bold mb-4 text-[#FFD600]">$2.5M</div>
              <h4 className="text-xl font-bold mb-2">Creator Earnings</h4>
              <p className="text-white/80">Generated for creators from direct sales, NFTs, and community support.</p>
              <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z" fill="#FFD600" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced diagonal divider with comic effect */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{
      height: '100px'
    }}>
        <div className="w-full h-24 bg-[#A259FF] transform -skew-y-3 translate-y-10 relative">
          {/* Diagonal stripes */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => <div key={i} className="absolute h-full bg-black/10" style={{
            width: '20px',
            left: `${i * 8}%`,
            transform: 'skew(45deg)'
          }} />)}
          </div>
          
          {/* Comic dots */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            {[...Array(50)].map((_, i) => <div key={i} className="absolute rounded-full bg-black" style={{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`
          }} />)}
          </div>
          
          {/* Top highlight */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white opacity-20"></div>
        </div>
      </div>
    </section>;
};