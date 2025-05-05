import React, { useEffect, useRef } from 'react';
interface InfinityLogoProps {
  isAnimating?: boolean;
  size?: number;
  color?: string;
  onHover?: boolean;
  scrollEffect?: boolean;
  scrollPosition?: number;
}
export const InfinityLogo: React.FC<InfinityLogoProps> = ({
  isAnimating = false,
  size = 60,
  color = '#A259FF',
  onHover = false,
  scrollEffect = false,
  scrollPosition = 0
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', {
      willReadFrequently: true
    });
    if (!ctx) return;

    // Set canvas dimensions with higher resolution for better glow effect
    const scale = 2; // Higher resolution for better rendering
    canvas.width = size * scale;
    canvas.height = size / 2 * scale;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size / 2}px`;

    // Scale canvas for high-DPI display
    ctx.scale(scale, scale);

    // Animation function
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / 2000, 1); // 2 second animation

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width / scale, canvas.height / scale);

      // Calculate dimensions
      const centerX = canvas.width / scale / 2;
      const centerY = canvas.height / scale / 2;
      const hoverScale = onHover ? 1.1 : 1;

      // Circle dimensions
      const strokeWidth = size / 15; // Proportional stroke width
      const radius = (canvas.height / (2 * scale) - strokeWidth / 2) * hoverScale;

      // Calculate rotation effect
      const rotationEffect = scrollEffect ? Math.sin(scrollPosition / 500) * 0.1 : 0;

      // Save canvas state for rotation
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotationEffect);
      ctx.translate(-centerX, -centerY);

      // Draw the glow layers first (multiple layers for better glow effect)
      if (!isAnimating || progress > 0.1) {
        const glowColor = color;
        const glowLayers = 5;
        const maxBlur = size / 10;
        for (let i = 0; i < glowLayers; i++) {
          const alpha = 0.3 - i * 0.05;
          const blur = maxBlur - i * maxBlur / glowLayers;
          ctx.save();
          ctx.shadowBlur = blur;
          ctx.shadowColor = glowColor;
          ctx.strokeStyle = `${glowColor}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = strokeWidth - i * 0.5;
          const leftProgress = isAnimating ? Math.min(progress * 2, 1) : 1;
          const rightProgress = isAnimating ? Math.max(0, Math.min((progress - 0.4) * 1.7, 1)) : 1;

          // Draw left circle with glow
          if (leftProgress > 0) {
            drawPartialCircle(ctx, centerX - radius, centerY, radius, 0, Math.PI * 2 * leftProgress);
          }

          // Draw right circle with glow
          if (rightProgress > 0) {
            drawPartialCircle(ctx, centerX + radius, centerY, radius, 0, Math.PI * 2 * rightProgress);
          }
          ctx.restore();
        }
      }

      // Draw the main circles
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = color;
      ctx.lineCap = 'round';
      if (isAnimating) {
        // Slightly overlapping animation timing for smoother transition
        const leftProgress = Math.min(progress * 1.8, 1);
        const rightProgress = Math.max(0, Math.min((progress - 0.4) * 1.7, 1));

        // Draw left circle
        if (leftProgress > 0) {
          drawPartialCircle(ctx, centerX - radius, centerY, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * leftProgress);
        }

        // Draw right circle
        if (rightProgress > 0) {
          drawPartialCircle(ctx, centerX + radius, centerY, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * rightProgress);
        }

        // Add particle effects during animation
        if (leftProgress < 1 || rightProgress < 1) {
          drawParticles(ctx, centerX, centerY, radius, progress, color);
        }
      } else {
        // Draw both circles completely
        drawFullCircle(ctx, centerX - radius, centerY, radius);
        drawFullCircle(ctx, centerX + radius, centerY, radius);
      }
      ctx.restore();

      // Add hover effect
      if (onHover) {
        // Subtle pulse effect
        const pulseSize = Math.sin(timestamp / 200) * size / 30;
        ctx.beginPath();
        ctx.arc(centerX, centerY, size / 8 + pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = `${color}22`; // Very transparent
        ctx.fill();
      }

      // Continue animation if still animating
      if (isAnimating && progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    // Helper function to draw a partial circle
    function drawPartialCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, startAngle: number, endAngle: number) {
      ctx.beginPath();
      ctx.arc(x, y, radius, startAngle, endAngle);
      ctx.stroke();
    }

    // Helper function to draw a full circle
    function drawFullCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
      drawPartialCircle(ctx, x, y, radius, 0, Math.PI * 2);
    }

    // Helper function to draw particle effects
    function drawParticles(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, progress: number, color: string) {
      const particleCount = 10;
      const maxParticleSize = size / 25;
      ctx.save();

      // Draw particles around the forming circles
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.PI * 2 * i / particleCount + progress * Math.PI;
        const distance = radius * 1.1;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        const particleProgress = progress * 3 - i / particleCount;
        if (particleProgress > 0 && particleProgress < 1) {
          const particleSize = maxParticleSize * (1 - particleProgress);
          const particleAlpha = 0.5 * (1 - particleProgress);
          ctx.beginPath();
          ctx.arc(x, y, particleSize, 0, Math.PI * 2);
          ctx.fillStyle = `${color}${Math.floor(particleAlpha * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();

          // Add small trail
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x - Math.cos(angle) * particleSize * 2, y - Math.sin(angle) * particleSize * 2);
          ctx.lineWidth = particleSize / 2;
          ctx.strokeStyle = `${color}${Math.floor(particleAlpha * 0.5 * 255).toString(16).padStart(2, '0')}`;
          ctx.stroke();
        }
      }
      ctx.restore();
    }
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isAnimating, size, color, onHover, scrollEffect, scrollPosition]);
  return <canvas ref={canvasRef} style={{
    width: `${size}px`,
    height: `${size / 2}px`,
    display: 'block'
  }} className="select-none" />;
};