import React from 'react';
interface LogoProps {
  color?: string;
  size?: number;
  className?: string;
}
export const Logo: React.FC<LogoProps> = ({
  color = '#A259FF',
  size = 60,
  className = ''
}) => {
  // Calculate dimensions based on size
  const width = size;
  const height = size / 2;

  // SVG viewBox dimensions
  const viewBoxWidth = 100;
  const viewBoxHeight = 50;

  // Make the stroke thick for visibility
  const strokeWidth = 10;

  // Calculate the radius of each circle
  const ringRadius = viewBoxHeight / 2 - strokeWidth / 2;

  // Center points for both circles - positioned exactly so they touch at one point
  const cx1 = viewBoxWidth / 2 - ringRadius;
  const cx2 = viewBoxWidth / 2 + ringRadius;
  const cy = viewBoxHeight / 2;
  return <svg width={width} height={height} viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx={cx1} cy={cy} r={ringRadius} stroke={color} strokeWidth={strokeWidth} fill="none" />
      <circle cx={cx2} cy={cy} r={ringRadius} stroke={color} strokeWidth={strokeWidth} fill="none" />
    </svg>;
};