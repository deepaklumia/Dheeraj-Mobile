import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion';
import { Shield, MapPin, ChevronDown } from 'lucide-react';

const TOTAL_HERO_FRAMES = 101;

interface HeroCanvasScrollScrubProps {
  handleNavClick: (sectionId: string) => void;
}

export default function HeroCanvasScrollScrub({ handleNavClick }: HeroCanvasScrollScrubProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload hero frames
  useEffect(() => {
    let loadedCount = 0;
    const preloadedImages: HTMLImageElement[] = [];

    const loadImages = async () => {
      const promises = Array.from({ length: TOTAL_HERO_FRAMES }, (_, i) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          const frameNum = String(i + 1).padStart(3, '0');
          img.src = `/hero_frames/frame_${frameNum}.jpg`;
          img.onload = () => {
            preloadedImages[i] = img;
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / TOTAL_HERO_FRAMES) * 100));
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load hero_frame_${frameNum}.jpg`);
            resolve(); // resolve to prevent stalling loader
          };
        });
      });

      await Promise.all(promises);
      setImages(preloadedImages);
      setIsLoaded(true);
    };

    loadImages();
  }, []);

  // Track scroll of the hero container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress (0 to 1) to image index (0 to 100)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_HERO_FRAMES - 1]);

  // Text overlay transforms (fade out and scale down as you scroll down)
  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 0, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -30]);

  // Ambient subtitle reveal (fades in as hero fades out, then fades away)
  const secondaryOpacity = useTransform(scrollYProgress, [0.35, 0.6, 0.85], [0, 1, 0]);
  const secondaryY = useTransform(scrollYProgress, [0.35, 0.6, 0.85], [40, 0, -40]);

  // Handle canvas drawing logic
  const drawImage = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[Math.floor(index)];
    if (!img) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Aspect ratio preserve (cover)
    const imgWidth = img.width;
    const imgHeight = img.height;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Watch frameIndex changes to draw on canvas
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (isLoaded && images.length > 0) {
      requestAnimationFrame(() => drawImage(latest));
    }
  });

  // Handle canvas resize matching screen size
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

      const currentVal = frameIndex.get();
      drawImage(currentVal);
    };

    window.addEventListener('resize', handleResize);
    if (isLoaded) {
      handleResize();
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, images]);

  useEffect(() => {
    if (isLoaded && images.length > 0) {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
        canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
        drawImage(0);
      }
    }
  }, [isLoaded]);

  return (
    <div ref={containerRef} className="relative h-[220vh] bg-black">
      {/* Sticky Screen Viewport Wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Loading Overlay */}
        {!isLoaded ? (
          <div className="flex flex-col items-center justify-center text-white space-y-4 z-40 bg-black absolute inset-0">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-blue-900/30"></div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
            </div>
            <div className="text-xl font-display font-medium tracking-wide">
              Loading Cinematic Intro... {loadingProgress}%
            </div>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full object-cover opacity-100 pointer-events-none"
          />
        )}

        {/* Ambient Dark Overlay Gradients (Subtle bottom shadow only for transition) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none z-10" />

      </div>
    </div>
  );
}
