import React, { useEffect, useState, useRef } from 'react';
interface Element {
  id: number;
  type: 'matrix' | 'halftone' | 'grid' | 'splash' | 'comicDot';
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  };
  pulsePhase: number;
}
export const BackgroundElements: React.FC<{
  color?: string;
  secondaryColor?: string;
  density?: number;
  speed?: number;
  interactive?: boolean;
  style?: 'comic' | 'tech' | 'mixed';
}> = ({
  color = '#A259FF',
  secondaryColor = '#FFFFFF',
  density = 20,
  speed = 1,
  interactive = true,
  style = 'comic'
}) => {
  const [elements, setElements] = useState<Element[]>([]);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [isMouseInContainer, setIsMouseInContainer] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  // Generate color variations
  const getColorVariation = (baseColor: string, variation: number): string => {
    // Convert hex to RGB
    const r = parseInt(baseColor.slice(1, 3), 16);
    const g = parseInt(baseColor.slice(3, 5), 16);
    const b = parseInt(baseColor.slice(5, 7), 16);
    switch (variation) {
      case 0:
        // Lighter
        return `rgba(${Math.min(r + 40, 255)}, ${Math.min(g + 40, 255)}, ${Math.min(b + 40, 255)}, 1)`;
      case 1:
        // Darker
        return `rgba(${Math.max(r - 40, 0)}, ${Math.max(g - 40, 0)}, ${Math.max(b - 40, 0)}, 1)`;
      case 2:
        // Semi-transparent
        return `${baseColor}80`;
      default:
        return baseColor;
    }
  };

  // Get element types based on style
  const getElementTypes = (style: 'comic' | 'tech' | 'mixed'): Element['type'][] => {
    switch (style) {
      case 'comic':
        return ['halftone', 'splash', 'comicDot'];
      case 'tech':
        return ['matrix', 'grid'];
      case 'mixed':
      default:
        return ['matrix', 'halftone', 'grid', 'splash', 'comicDot'];
    }
  };

  // Generate initial elements
  useEffect(() => {
    if (!containerRef.current) return;
    const newElements: Element[] = [];
    const elementTypes = getElementTypes(style);
    for (let i = 0; i < density; i++) {
      const useSecondaryColor = Math.random() > 0.7;
      const colorVariation = Math.floor(Math.random() * 3);
      const elementColor = useSecondaryColor ? getColorVariation(secondaryColor, colorVariation) : getColorVariation(color, colorVariation);
      newElements.push({
        id: i,
        type: elementTypes[Math.floor(Math.random() * elementTypes.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 1.5,
        opacity: 0.15 + Math.random() * 0.3,
        color: elementColor,
        velocity: {
          x: (Math.random() - 0.5) * 0.05 * speed,
          y: (Math.random() - 0.5) * 0.05 * speed
        },
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
    setElements(newElements);
  }, [density, color, secondaryColor, style]);

  // Mouse tracking for interactivity
  useEffect(() => {
    if (!interactive || !containerRef.current) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width * 100,
        y: (e.clientY - rect.top) / rect.height * 100
      });
      setIsMouseInContainer(true);
    };
    const handleMouseLeave = () => {
      setIsMouseInContainer(false);
    };
    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [interactive]);

  // Animation loop
  const animate = (time: number) => {
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time;
    }
    const deltaTime = time - previousTimeRef.current;
    previousTimeRef.current = time;
    setElements(prevElements => prevElements.map(element => {
      // Update position, rotation, pulsing
      let {
        x,
        y,
        rotation,
        scale,
        opacity,
        velocity,
        pulsePhase
      } = element;

      // Update pulse phase
      pulsePhase = (pulsePhase + 0.02 * speed) % (Math.PI * 2);

      // For interactive elements, calculate attraction/repulsion to mouse
      if (isMouseInContainer && interactive) {
        const dx = mousePosition.x - x;
        const dy = mousePosition.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 20) {
          // Repel if too close
          velocity.x -= dx / distance * 0.02 * speed;
          velocity.y -= dy / distance * 0.02 * speed;
        } else if (distance < 40) {
          // Attract slightly at medium distance
          velocity.x += dx / distance * 0.005 * speed;
          velocity.y += dy / distance * 0.005 * speed;
        }
      }

      // Apply velocity with damping
      velocity.x *= 0.98;
      velocity.y *= 0.98;
      x += velocity.x * deltaTime / 16;
      y += velocity.y * deltaTime / 16;

      // Wrap around edges
      if (x < -10) x = 110;
      if (x > 110) x = -10;
      if (y < -10) y = 110;
      if (y > 110) y = -10;

      // Element-specific movements
      switch (element.type) {
        case 'matrix':
          // Matrix elements fall downward
          y = (y + 0.05 * speed * deltaTime / 16) % 110;
          break;
        case 'comicDot':
          // Comic dots pulse in size
          scale = element.scale * (1 + 0.2 * Math.sin(pulsePhase));
          break;
        case 'splash':
          // Splashes rotate faster
          rotation = (rotation + 0.2 * speed * deltaTime / 16) % 360;
          break;
        case 'halftone':
          // Halftones pulse opacity
          opacity = element.opacity * (1 + 0.3 * Math.sin(pulsePhase));
          break;
        case 'grid':
          // Grids move in a slight wave pattern
          x += Math.sin(time / 2000 + element.id) * 0.05;
          break;
      }
      return {
        ...element,
        x,
        y,
        rotation: (rotation + 0.05 * speed * deltaTime / 16) % 360,
        scale,
        opacity,
        velocity,
        pulsePhase
      };
    }));
    requestRef.current = requestAnimationFrame(animate);
  };
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [speed, isMouseInContainer, mousePosition, interactive]);

  // Render different element types
  const renderElement = (element: Element) => {
    const style = {
      position: 'absolute' as const,
      left: `${element.x}%`,
      top: `${element.y}%`,
      transform: `rotate(${element.rotation}deg) scale(${element.scale})`,
      opacity: element.opacity,
      transition: 'transform 0.3s ease',
      filter: `drop-shadow(0 0 3px ${element.color}30)`,
      willChange: 'transform, opacity'
    };
    switch (element.type) {
      case 'matrix':
        return <div key={element.id} style={style} className="w-12 h-16 origin-center">
            <svg viewBox="0 0 40 60" className="w-full h-full">
              <text x="20" y="20" textAnchor="middle" dominantBaseline="middle" fill={element.color} fontFamily="monospace" fontSize="16">
                {['0', '1'][Math.floor(Math.random() * 2)]}
              </text>
              <text x="20" y="40" textAnchor="middle" dominantBaseline="middle" fill={element.color} fontFamily="monospace" fontSize="16">
                {['0', '1'][Math.floor(Math.random() * 2)]}
              </text>
            </svg>
          </div>;
      case 'halftone':
        return <div key={element.id} style={style} className="w-24 h-24 origin-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <pattern id={`halftone-${element.id}`} patternUnits="userSpaceOnUse" width="10" height="10">
                  <circle cx="5" cy="5" r="2" fill={element.color} />
                </pattern>
              </defs>
              <circle cx="50" cy="50" r="45" fill={`url(#halftone-${element.id})`} />
            </svg>
          </div>;
      case 'grid':
        return <div key={element.id} style={style} className="w-32 h-32 origin-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <pattern id={`grid-${element.id}`} patternUnits="userSpaceOnUse" width="20" height="20">
                  <path d="M0,0 L20,0 L20,20 L0,20 Z" fill="none" stroke={element.color} strokeWidth="1" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100" height="100" fill={`url(#grid-${element.id})`} />
            </svg>
          </div>;
      case 'splash':
        // Comic-style splash effect
        return <div key={element.id} style={style} className="w-28 h-28 origin-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M50,10 Q65,5 75,15 Q95,5 90,25 Q105,35 85,45 Q95,65 75,60 Q70,80 50,70 Q30,80 25,60 Q5,65 15,45 Q-5,35 10,25 Q5,5 25,15 Q35,5 50,10" fill="none" stroke={element.color} strokeWidth="2" />
            </svg>
          </div>;
      case 'comicDot':
        // Comic-style halftone dot
        const dotSizes = [3, 5, 8, 12];
        const dotSize = dotSizes[Math.floor(Math.random() * dotSizes.length)];
        return <div key={element.id} style={style} className="w-20 h-20 origin-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r={40} fill={element.color} />
            </svg>
          </div>;
    }
  };
  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" style={{
    perspective: '1000px',
    zIndex: 0
  }}>
      {interactive && isMouseInContainer && <div className="absolute pointer-events-none" style={{
      left: `${mousePosition.x}%`,
      top: `${mousePosition.y}%`,
      width: '100px',
      height: '100px',
      background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      opacity: 0.5,
      transition: 'all 0.1s ease-out',
      zIndex: 1
    }} />}
      {elements.map(renderElement)}
    </div>;
};