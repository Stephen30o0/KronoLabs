import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Custom Comic Panel component with interactive elements
const ComicPanel = ({
  title,
  description,
  delay,
  index
}) => {
  const colors = ['#FF5252', '#FFC107', '#4CAF50', '#2196F3', '#9C27B0'];
  const rotations = [-3, 2, -1, 1, -2];
  return <motion.div className="comic-panel min-w-[350px] md:min-w-[400px] h-[400px] bg-white text-black p-6 md:p-8 relative overflow-hidden flex flex-col justify-center" initial={{
    x: 100,
    opacity: 0
  }} whileInView={{
    x: 0,
    opacity: 1
  }} viewport={{
    once: false
  }} transition={{
    delay: delay * 0.1,
    duration: 0.5
  }} whileHover={{
    scale: 1.05,
    rotate: rotations[index % rotations.length],
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
  }} style={{
    border: `4px solid ${colors[index % colors.length]}`,
    transform: `rotate(${rotations[index % rotations.length]}deg)`,
    boxShadow: "5px 5px 0px rgba(0, 0, 0, 0.5)"
  }}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-black opacity-20" />
      <div className="absolute top-0 right-0 w-2 h-full bg-black opacity-20" />
      <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full" style={{
      backgroundColor: colors[index % colors.length],
      opacity: 0.3
    }} />
      <div className="absolute top-4 left-4 w-8 h-8 rounded-full" style={{
      backgroundColor: colors[(index + 2) % colors.length],
      opacity: 0.3
    }} />
      
      {/* Content */}
      <h4 className="text-3xl font-extrabold mb-6 uppercase" style={{
      textShadow: "2px 2px 0px rgba(0, 0, 0, 0.2)",
      fontFamily: "'Impact', sans-serif"
    }}>
        {title}
      </h4>
      <p className="text-lg" style={{
      fontFamily: "'Comic Sans MS', cursive"
    }}>
        {description}
      </p>
      
      {/* Interactive elements */}
      <motion.div className="absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center bg-black text-white cursor-pointer" whileHover={{
      scale: 1.2,
      rotate: 180
    }}>
        +
      </motion.div>
    </motion.div>;
};
export const CreatorTools = ({
  scrollPosition
}) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  // Tools data
  const tools = [{
    title: "Story Feedback + Analytics",
    description: "Get real-time data on how readers engage with your stories, which panels they linger on, and where they drop off."
  }, {
    title: "Polling Tools",
    description: "Ask your fans directly about plot directions, character designs, and more."
  }, {
    title: "Token Dashboard",
    description: "Track earnings, tips, and royalty payments in one centralized dashboard."
  }, {
    title: "Royalty Splits",
    description: "Easily manage revenue sharing for collaborative projects with transparent smart contracts."
  }, {
    title: "NFT Minting",
    description: "Turn chapters, special editions, or collectible art into NFTs with just a few clicks."
  }];

  // Handle horizontal scroll with mouse wheel
  useEffect(() => {
    const handleWheel = e => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const delta = e.deltaY || e.deltaX;

        // Prevent default scroll behavior
        e.preventDefault();

        // Smooth scroll horizontally
        container.scrollLeft += delta;
        setScrollX(container.scrollLeft);
      }
    };
    const calculateMaxScroll = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        setMaxScroll(container.scrollWidth - container.clientWidth);
      }
    };
    const element = scrollContainerRef.current;
    if (element) {
      element.addEventListener('wheel', handleWheel, {
        passive: false
      });
      calculateMaxScroll();
      window.addEventListener('resize', calculateMaxScroll);
    }
    return () => {
      if (element) {
        element.removeEventListener('wheel', handleWheel);
        window.removeEventListener('resize', calculateMaxScroll);
      }
    };
  }, []);

  // Handle scroll position and animations
  useEffect(() => {
    if (scrollContainerRef.current) {
      setScrollX(scrollContainerRef.current.scrollLeft);
    }
  }, [scrollPosition]);

  // Handle drag to scroll
  const handleDragStart = () => {
    setIsScrolling(true);
  };
  const handleDragEnd = () => {
    setIsScrolling(false);
  };
  const handleDrag = e => {
    if (isScrolling && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= e.movementX;
      setScrollX(scrollContainerRef.current.scrollLeft);
    }
  };
  return <section className="relative py-20 bg-black overflow-hidden">
      {/* Background Pattern - Brutalist style */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="grid grid-cols-10 h-full w-full">
          {Array(100).fill(0).map((_, i) => <div key={i} className="border border-white" style={{
          transform: `rotate(${Math.random() * 5}deg)`,
          opacity: Math.random() * 0.3 + 0.1
        }} />)}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16">
          <motion.h2 className="text-6xl md:text-9xl font-black uppercase mb-4 leading-none tracking-tighter" initial={{
          x: -100,
          opacity: 0
        }} whileInView={{
          x: 0,
          opacity: 1
        }} transition={{
          duration: 0.8
        }} style={{
          textShadow: "5px 5px 0px rgba(162, 89, 255, 0.5)"
        }}>
            Creator <span className="text-[#A259FF]">Tools</span>
          </motion.h2>
          <motion.div className="w-24 h-4 bg-[#A259FF]" initial={{
          width: 0
        }} whileInView={{
          width: 120
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }} />
        </div>
        
        <motion.div className="mb-12 text-center" initial={{
        y: 50,
        opacity: 0
      }} whileInView={{
        y: 0,
        opacity: 1
      }} transition={{
        duration: 0.5,
        delay: 0.5
      }}>
          <h3 className="text-4xl font-bold uppercase" style={{
          textShadow: "3px 3px 0px rgba(162, 89, 255, 0.5)"
        }}>
            From Inspiration to Monetization
          </h3>
        </motion.div>
        
        {/* Scroll progress indicator */}
        <div className="w-full h-2 bg-gray-800 mb-6 rounded-full overflow-hidden">
          <motion.div className="h-full bg-[#A259FF]" style={{
          width: `${maxScroll > 0 ? scrollX / maxScroll * 100 : 0}%`,
          transition: "width 0.1s ease-out"
        }} />
        </div>
        
        {/* Scroll indicators */}
        <div className="flex justify-between mb-6 px-4">
          <motion.div className="text-2xl font-bold cursor-pointer" whileHover={{
          scale: 1.2
        }} onClick={() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft -= 400;
          }
        }}>
            ← DRAG
          </motion.div>
          <motion.div className="text-2xl font-bold cursor-pointer" whileHover={{
          scale: 1.2
        }} onClick={() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += 400;
          }
        }}>
            SCROLL →
          </motion.div>
        </div>
        
        {/* Horizontal scrolling container */}
        <div ref={scrollContainerRef} className="flex overflow-x-auto pb-10 pt-4 no-scrollbar" style={{
        scrollBehavior: "smooth",
        scrollbarWidth: "none",
        cursor: isScrolling ? "grabbing" : "grab"
      }} onMouseDown={handleDragStart} onMouseUp={handleDragEnd} onMouseLeave={handleDragEnd} onMouseMove={handleDrag}>
          {/* Leading spacer */}
          <div className="min-w-[10vw]" />
          
          {/* Comic panels */}
          {tools.map((tool, index) => <div key={index} className="mx-4">
              <ComicPanel title={tool.title} description={tool.description} delay={index} index={index} />
            </div>)}
          
          {/* Trailing spacer */}
          <div className="min-w-[10vw]" />
        </div>
      </div>
      
      {/* Glitch effect zigzag divider */}
      <div className="w-full overflow-hidden relative mt-20">
        <motion.svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24 text-[#A259FF]" initial={{
        x: "-100%"
      }} animate={{
        x: "0%"
      }} transition={{
        duration: 1.5,
        ease: "easeInOut"
      }}>
          <motion.path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" animate={{
          pathOffset: [0, 0.02, 0],
          pathLength: [1, 0.98, 1]
        }} transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }} />
        </motion.svg>
        
        {/* Glitch effect duplicate */}
        <motion.svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24 text-white absolute top-0 left-0" initial={{
        opacity: 0
      }} animate={{
        opacity: [0, 0.2, 0]
      }} transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 3
      }}>
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" />
        </motion.svg>
      </div>
    </section>;
};