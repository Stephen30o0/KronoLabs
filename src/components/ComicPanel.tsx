import React, { useState, useEffect, useRef } from 'react';
interface ComicPanelProps {
  children: React.ReactNode;
  scrollPosition: number;
  threshold?: number;
  delay?: number;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  highlighted?: boolean;
  highlightColor?: string;
  width?: string;
  height?: string;
  duration?: number; // NEW: Animation duration in ms
}
export const ComicPanel: React.FC<ComicPanelProps> = ({
  children,
  scrollPosition,
  threshold = 300,
  delay = 0,
  className = '',
  onMouseEnter,
  onMouseLeave,
  highlighted = false,
  highlightColor = '#A259FF',
  width = 'w-full',
  height = 'auto',
  duration = 1000 // Default to 1 second
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [wasTriggered, setWasTriggered] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [isHovering, setIsHovering] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Effect for scroll-based visibility
  useEffect(() => {
    if (!panelRef.current || wasTriggered) return;
    const panelTop = panelRef.current.getBoundingClientRect().top + window.scrollY;
    const triggerPoint = panelTop - window.innerHeight + threshold;
    if (scrollPosition > triggerPoint) {
      setWasTriggered(true);
      setIsVisible(true);
      // Use duration + delay for timer
      const animationTimer = setTimeout(() => {
        setHasAnimated(true);
      }, duration + delay);
      return () => clearTimeout(animationTimer);
    }
  }, [scrollPosition, threshold, delay, wasTriggered, duration]);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovering) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({
      x,
      y
    });
  };
  const handleMouseEnter = () => {
    setIsHovering(true);
    if (onMouseEnter) onMouseEnter();
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
    if (onMouseLeave) onMouseLeave();
    setMousePosition({
      x: 0,
      y: 0
    });
  };

  // 3D tilt effect for hover
  const tiltStyle = isHovering ? {
    transform: `perspective(1000px) rotateX(${mousePosition.y * -5}deg) rotateY(${mousePosition.x * 5}deg) ${highlighted ? 'scale(1.05)' : ''}`,
    transition: 'transform 0.1s ease'
  } : {
    transform: highlighted ? 'scale(1.05)' : '',
    transition: `transform ${duration}ms cubic-bezier(0.4,0,0.2,1)`
  };

  // Highlight glow effect
  const highlightStyle = highlighted ? {
    boxShadow: `0 0 20px ${highlightColor}80, 0 0 40px ${highlightColor}40`,
    borderColor: highlightColor
  } : {};

  // Dynamic transition classes for scroll-in
  const transitionClass = isVisible ? `opacity-100 translate-y-0` : `opacity-0 translate-y-20`;
  return <div ref={panelRef} className={`
        ${width} ${height}
        bg-white text-black p-6 border-4 border-black relative shadow-comic
        transform transition-all
        ${transitionClass}
        ${className}
      `} style={{
    ...tiltStyle,
    ...highlightStyle,
    transitionDuration: `${duration}ms` // For opacity/translate-y
  }} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Comic panel corners */}
      <div className="absolute -top-1 -left-1 w-3 h-3 bg-black"></div>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-black"></div>
      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-black"></div>
      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-black"></div>
      
      {/* Comic panel inner shadow */}
      <div className="absolute inset-0 shadow-inner pointer-events-none"></div>
      
      {/* Comic panel dot pattern (using background pattern) */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-dot-pattern"></div>
      </div>
      
      {/* Highlighted state - subtle glow around content */}
      {highlighted && <div className="absolute inset-0 pointer-events-none bg-gradient-radial" style={{
      opacity: 0.1,
      background: `radial-gradient(circle at center, ${highlightColor} 0%, transparent 70%)`
    }} />}
      
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>;
};