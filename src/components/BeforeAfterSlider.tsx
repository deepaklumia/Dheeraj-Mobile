import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, EyeOff } from 'lucide-react';
import beforeImage from '../assets/before_after.png';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 450 });

  // Update dimensions dynamically on mount and window resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    updateDimensions();
    // Trigger double check after short timeout to ensure container is fully laid out
    const timer = setTimeout(updateDimensions, 100);

    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  const handleMove = (clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  // Reset drag state on window blur just in case
  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-4 py-8">
      {/* Interactive Container */}
      <div 
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative aspect-square md:aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 select-none touch-none custom-interactive"
      >
        {/* BEFORE IMAGE (Damaged Screen - Left Side) */}
        {/* We use a greyscale or raw styling on the image itself */}
        <div className="absolute inset-0 w-full h-full bg-[#1e293b]">
          <img 
            src={beforeImage} 
            alt="Before repair - Damaged" 
            className="absolute inset-0 w-full h-full object-cover filter brightness-75 select-none"
          />
          {/* Label */}
          <div className="absolute top-4 left-4 bg-red-950/80 backdrop-blur-md text-red-400 border border-red-500/30 text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg select-none">
            <EyeOff className="w-3.5 h-3.5" />
            Shattered Display
          </div>
        </div>

        {/* AFTER IMAGE (Repaired Screen - Right Side) */}
        {/* We use a mask block matching sliderPosition to reveal this image */}
        <div 
          className="absolute top-0 right-0 bottom-0 overflow-hidden bg-black transition-shadow duration-300"
          style={{ left: `${sliderPosition}%` }}
        >
          <img 
            src={beforeImage} 
            alt="After repair - Restored" 
            className="absolute top-0 right-0 object-cover filter saturate-110 select-none max-w-none"
            style={{ 
              width: `${dimensions.width}px`, 
              height: `${dimensions.height}px` 
            }}
          />
          {/* Label */}
          <div className="absolute top-4 right-4 bg-emerald-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg select-none">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Flawless Apple Quality
          </div>
        </div>

        {/* SLIDER LINE & DRAGGER */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Glowing slide line */}
          <div className="absolute top-0 bottom-0 w-0.5 bg-blue-500 shadow-[0_0_10px_#3b82f6]" />

          {/* Slider Handle */}
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black shadow-[0_4px_20px_rgba(0,0,0,0.5)] border-2 border-blue-500 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 pointer-events-auto">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={3} 
              stroke="currentColor" 
              className="w-5 h-5 md:w-6 md:h-6 text-blue-600 animate-pulse"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" className="rotate-90 origin-center" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Help text */}
      <span className="text-xs md:text-sm text-slate-400 mt-4 flex items-center gap-2">
        ← Drag the handle to inspect screen restoration quality →
      </span>
    </div>
  );
}
