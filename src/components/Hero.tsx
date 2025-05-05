import React, { useEffect, useState, useRef } from 'react';
import { Logo } from './Logo';
import { BrushStroke, ComicEffect, SpeechBurst } from './DesignElements';
import { BackgroundElements } from './BackgroundElements';
interface HeroProps {
  scrollPosition: number;
}
export const Hero: React.FC<HeroProps> = ({
  scrollPosition
}) => {
  const [logoHover, setLogoHover] = useState(false);
  const [activePanel, setActivePanel] = useState(0);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const heroRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation sequence on mount - simplified
  // Animation sequence on mount - simplified but keeping core animations
  useEffect(() => {
    // Add a slight delay for the entrance animation
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    const interval = setInterval(() => {
      setActivePanel(prev => (prev + 1) % 3);
    }, 4000); // Slightly longer to give readers time

    return () => clearInterval(interval);
  }, []);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    // Reduced update frequency for mouse position
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width * 100,
      y: (e.clientY - rect.top) / rect.height * 100
    });
  };

  // Significantly reduced parallax effect
  const getParallaxStyle = (depth: number) => {
    const x = (mousePosition.x - 50) * depth;
    const y = (mousePosition.y - 50) * depth;
    return {
      transform: `translate(${x / 200}px, ${y / 200}px)` // Reduced movement by 75%
    };
  };
  const messages = ["The world's first social blockchain platform for comic and animation creators.", 'Create, share, and monetize your stories with our community.', 'Empowering underrepresented voices in comics and animation.'];
  return <section ref={heroRef} className="relative min-h-screen bg-black pt-24 overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Animated grid background - kept as requested */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      
      {/* Removed dynamic particles backdrop */}
      
      {/* Subtle gradient glow with reduced opacity */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(162,89,255,0.15)_0%,transparent_70%)] transition-opacity duration-1000" style={{
      '--x': `${mousePosition.x}%`,
      '--y': `${mousePosition.y}%`,
      opacity: isLoaded ? 0.7 : 0
    } as any} />
      
      {/* Reduced number of comic-style decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <BrushStroke color="#A259FF" className="absolute top-10 -left-20 opacity-20 transition-transform duration-700" width={300} rotation={-20} style={getParallaxStyle(0.3)} />
        <ComicEffect type="pow" className="absolute top-1/3 right-1/4 opacity-15 transition-transform duration-700" size={250} style={getParallaxStyle(0.4)} />
        
        {/* Reduced number of stars with slower animations */}
        <div className="star-field">
          {[...Array(10)].map((_, i) => <div key={i} className="absolute w-1 h-1 bg-white rounded-full" style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.4 + 0.2,
          animation: `twinkle ${Math.random() * 4 + 4}s ease-in-out infinite` // Slower animation
        }} />)}
        </div>
      </div>
      
      {/* Main hero content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[80vh] py-20">
          {/* Logo with hover animation - kept as requested */}
          <div className={`mb-8 transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} onMouseEnter={() => setLogoHover(true)} onMouseLeave={() => setLogoHover(false)}>
            <div className={`relative ${logoHover ? 'animate-pulse-fast' : ''}`}>
              <Logo size={200} color={logoHover ? '#FFFFFF' : '#A259FF'} className={`transition-all duration-500 ${logoHover ? 'filter drop-shadow-[0_0_20px_rgba(162,89,255,0.8)]' : ''}`} />
              {logoHover && <div className="absolute inset-0 animate-ping-slow opacity-30">
                  <Logo size={200} color="#FFFFFF" />
                </div>}
            </div>
          </div>
          
          {/* Title with animated entrance */}
          <h1 className={`text-7xl md:text-9xl font-black text-center uppercase mb-6 leading-none tracking-tighter relative transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <span className="block text-white filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Krono</span>
            <span className="block text-[#A259FF] relative filter drop-shadow-[0_0_15px_rgba(162,89,255,0.5)]">
              Labs
              {/* Removed Comic Effect here */}
            </span>
          </h1>
          
          {/* Animated message panels with enhanced styling */}
          <div className={`relative h-36 w-full max-w-2xl mb-12 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`} style={{
          transitionDelay: '300ms'
        }}>
            {messages.map((message, index) => <div key={index} className={`
                  absolute inset-0 flex items-center justify-center
                  transition-all duration-700 transform
                  ${activePanel === index ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
                `}>
                <div className="bg-white text-black p-6 border-4 border-black rounded-sm relative shadow-comic">
                  <p className="text-xl md:text-2xl font-bold text-center">
                    {message}
                  </p>
                  <BrushStroke color="#A259FF" className="absolute -bottom-4 left-1/2 transform -translate-x-1/2" width={120} />
                  <div className="absolute -top-1 -left-1 w-3 h-3 bg-black"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-black"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-black"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-black"></div>
                </div>
              </div>)}
          </div>
          
          {/* CTA Buttons with original hover effects - kept as requested */}
          <div className={`flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{
          transitionDelay: '600ms'
        }}>
            <button className="bg-[#A259FF] px-10 py-4 text-xl font-bold uppercase border-4 border-black hover:bg-white hover:text-black transition-colors duration-300 relative overflow-hidden group shadow-comic transform hover:scale-105 hover:rotate-1">
              <div className="absolute -inset-1 bg-white/20 opacity-0 group-hover:opacity-100 group-hover:blur-sm transition-all duration-300"></div>
              <span className="relative z-10 flex items-center justify-center">
                Join the Waitlist
                <ComicEffect type="star" className="absolute -right-6 -top-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={40} />
              </span>
              <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
            
            <button className="bg-transparent px-10 py-4 text-xl font-bold uppercase border-4 border-[#A259FF] text-[#A259FF] hover:bg-[#A259FF] hover:text-white transition-colors duration-300 relative overflow-hidden group shadow-comic transform hover:scale-105 hover:-rotate-1">
              <div className="absolute -inset-1 bg-[#A259FF]/20 opacity-0 group-hover:opacity-100 group-hover:blur-sm transition-all duration-300"></div>
              <span className="relative z-10 flex items-center justify-center">
                Watch Demo
                <SpeechBurst text="NEW!" className="absolute -top-8 -right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={60} />
              </span>
            </button>
            
            <button className="bg-white text-black px-10 py-4 text-xl font-bold uppercase border-4 border-black hover:bg-black hover:text-white transition-colors duration-300 relative overflow-hidden group shadow-comic transform hover:scale-105 hover:rotate-1">
              <div className="absolute -inset-1 bg-black/20 opacity-0 group-hover:opacity-100 group-hover:blur-sm transition-all duration-300"></div>
              <span className="relative z-10">Read Comics</span>
              <div className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
          </div>
        </div>
        
        {/* Feature panels with simplified animations */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-24 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{
        transitionDelay: '900ms'
      }}>
          <div className="bg-[#A259FF] border-4 border-black p-6 transform hover:translate-y-[-5px] transition-all duration-300 relative shadow-comic">
            <h3 className="text-2xl font-bold mb-2 uppercase">Create</h3>
            <p>Publish your comic and animation stories</p>
            <div className="w-full h-1 bg-black/20 mt-4"></div>
            <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-black/30"></div>
          </div>
          
          <div className="bg-white text-black border-4 border-black p-6 transform hover:translate-y-[-5px] transition-all duration-300 relative shadow-comic">
            <h3 className="text-2xl font-bold mb-2 uppercase">Connect</h3>
            <p>Build your community and find your audience</p>
            <div className="w-full h-1 bg-black/20 mt-4"></div>
            <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-black/30"></div>
          </div>
          
          <div className="bg-[#A259FF] border-4 border-black p-6 transform hover:translate-y-[-5px] transition-all duration-300 relative shadow-comic">
            <h3 className="text-2xl font-bold mb-2 uppercase">Earn</h3>
            <p>Monetize your work through tokens and NFTs</p>
            <div className="w-full h-1 bg-black/20 mt-4"></div>
            <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-black/30"></div>
          </div>
        </div>
      </div>
      
      {/* Simplified divider */}
      <div className="w-full h-16 bg-[#A259FF] relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => <div key={i} className="absolute h-full w-4 bg-black opacity-5" style={{
          left: `${i * 20}%`,
          transform: 'skew(-45deg)'
        }} />)}
        </div>
        <div className="absolute top-0 left-0 w-full h-1 bg-white opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black opacity-30"></div>
      </div>
    </section>;
};