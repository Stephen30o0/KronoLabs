import React from 'react';
interface SpeechBubbleProps {
  children: React.ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
  type?: 'thought' | 'speech' | 'shout';
  className?: string;
}
export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  children,
  position = 'bottom',
  type = 'speech',
  className = ''
}) => {
  let bubbleStyle = '';
  let pointerStyle = '';
  // Set bubble style based on type
  switch (type) {
    case 'thought':
      bubbleStyle = 'rounded-full';
      break;
    case 'shout':
      bubbleStyle = 'polygon-[0_0,100%_15%,85%_100%,15%_85%,0_100%]';
      break;
    default:
      bubbleStyle = '';
  }
  // Set pointer position
  switch (position) {
    case 'left':
      pointerStyle = 'left-[-15px] top-1/2 transform -translate-y-1/2 border-r-white border-t-transparent border-b-transparent border-l-transparent';
      break;
    case 'right':
      pointerStyle = 'right-[-15px] top-1/2 transform -translate-y-1/2 border-l-white border-t-transparent border-b-transparent border-r-transparent';
      break;
    case 'top':
      pointerStyle = 'top-[-15px] left-1/2 transform -translate-x-1/2 border-b-white border-l-transparent border-r-transparent border-t-transparent';
      break;
    case 'bottom':
      pointerStyle = 'bottom-[-15px] left-1/2 transform -translate-x-1/2 border-t-white border-l-transparent border-r-transparent border-b-transparent';
      break;
  }
  return <div className={`relative bg-white text-black p-4 border-4 border-black ${bubbleStyle} ${className}`}>
      {children}
      <div className={`absolute w-0 h-0 border-[15px] ${pointerStyle}`} />
    </div>;
};