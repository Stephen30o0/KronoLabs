import React from 'react';
interface BrushStrokeProps {
  color?: string;
  className?: string;
  width?: number;
  height?: number;
  rotation?: number;
}
export const BrushStroke: React.FC<BrushStrokeProps> = ({
  color = '#A259FF',
  className = '',
  width = 100,
  height = 20,
  rotation = 0
}) => <div className={`absolute pointer-events-none ${className}`} style={{
  transform: `rotate(${rotation}deg)`
}}>
    <svg width={width} height={height} viewBox="0 0 100 20">
      <path d="M0,10 Q25,0 50,10 T100,10" stroke={color} strokeWidth="4" fill="none" />
    </svg>
  </div>;
interface ComicEffectProps {
  type: 'pow' | 'bang' | 'zap';
  color?: string;
  className?: string;
  size?: number;
}
export const ComicEffect: React.FC<ComicEffectProps> = ({
  type,
  color = '#A259FF',
  className = '',
  size = 100
}) => {
  const getPath = () => {
    switch (type) {
      case 'pow':
        return 'M10,50 L30,20 L50,50 L70,20 L90,50 L70,80 L50,50 L30,80 Z';
      case 'bang':
        return 'M50,10 L65,40 L90,45 L70,65 L75,90 L50,75 L25,90 L30,65 L10,45 L35,40 Z';
      case 'zap':
        return 'M60,10 L80,40 L55,45 L70,90 L40,60 L20,85 L30,40 Z';
    }
  };
  return <div className={`absolute pointer-events-none ${className}`}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <path d={getPath()} fill={color} opacity="0.15" />
      </svg>
    </div>;
};
interface SpeechBurstProps {
  text: string;
  color?: string;
  className?: string;
}
export const SpeechBurst: React.FC<SpeechBurstProps> = ({
  text,
  color = '#A259FF',
  className = ''
}) => <div className={`absolute pointer-events-none ${className}`} style={{
  background: color,
  padding: '8px 16px',
  borderRadius: '4px',
  transform: 'rotate(-5deg)',
  border: '4px solid black'
}}>
    <span className="font-bold text-black">{text}</span>
  </div>;