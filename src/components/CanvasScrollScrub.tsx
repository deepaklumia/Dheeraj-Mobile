import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion';

const TOTAL_FRAMES = 31;

export default function CanvasScrollScrub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload frames
  useEffect(() => {
    let loadedCount = 0;
    const preloadedImages: HTMLImageElement[] = [];

    const loadImages = async () => {
      const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          // Frame names are frame_001.png, frame_002.png...
          const frameNum = String(i + 1).padStart(3, '0');
          img.src = `/frames/frame_${frameNum}.png`;
          img.onload = () => {
            preloadedImages[i] = img;
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load frame_${frameNum}.png`);
            // Resolve anyway to avoid blocking execution
            resolve();
          };
        });
      });

      await Promise.all(promises);
      setImages(preloadedImages);
      setIsLoaded(true);
    };

    loadImages();
  }, []);

  // Set up scroll tracking on the parent sticky container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map the scroll progress (0 to 1) to image indices (0 to TOTAL_FRAMES - 1)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Motion transforms for text panels (declared at top level to satisfy Rules of Hooks)
  const opacityStep1 = useTransform(scrollYProgress, [0, 0.25, 0.35], [0, 1, 0]);
  const yStep1 = useTransform(scrollYProgress, [0, 0.25, 0.35], [50, 0, -50]);

  const opacityStep2 = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0, 1, 0]);
  const yStep2 = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [50, 0, -50]);

  const opacityStep3 = useTransform(scrollYProgress, [0.65, 0.8, 0.95], [0, 1, 0]);
  const yStep3 = useTransform(scrollYProgress, [0.65, 0.8, 0.95], [50, 0, -50]);

  // Handle canvas drawing logic
  const drawImage = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use the preloaded image or fallback
    const img = images[Math.floor(index)];
    if (!img) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Cover style drawing (preserve aspect ratio)
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
      // Canvas is wider than image
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      // Canvas is taller than image
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Watch frameIndex and redraw on canvas
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (isLoaded && images.length > 0) {
      // Use requestAnimationFrame for extra smooth performance
      requestAnimationFrame(() => drawImage(latest));
    }
  });

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Set canvas display resolution matching container size
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

      // Redraw the current frame
      const currentVal = frameIndex.get();
      drawImage(currentVal);
    };

    window.addEventListener('resize', handleResize);
    // Initial resize trigger
    if (isLoaded) {
      handleResize();
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, images]);

  // Handle first render after image preloading completes
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
    <div ref={containerRef} className="relative h-[300vh] bg-black">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {!isLoaded ? (
          <div className="flex flex-col items-center justify-center text-white space-y-4">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-blue-900"></div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
            </div>
            <div className="text-xl font-display font-medium tracking-wide">
              Initializing Microscope Feed... {loadingProgress}%
            </div>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full object-cover opacity-100"
          />
        )}

        {/* Ambient Dark Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40 pointer-events-none" />

        {/* Cinematic Floating Content Overlays */}
        {isLoaded && (
          <>
            {/* Step 1 Text Overlay: Active around 0% - 30% scroll */}
            <motion.div 
              className="absolute left-6 md:left-24 max-w-lg p-6 md:p-8 rounded-2xl glass-panel text-left flex flex-col space-y-4"
              style={{
                opacity: opacityStep1,
                y: yStep1
              }}
            >
              <span className="text-xs uppercase tracking-widest text-blue-500 font-bold">Diagnostics</span>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
                Motherboard-Level Repair Expertise
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                When basic swaps fail, our microscope-guided soldering begins. We inspect circuit boards under high magnification to locate micron-sized micro-cracks and damaged ICs.
              </p>
            </motion.div>

            {/* Step 2 Text Overlay: Active around 35% - 65% scroll */}
            <motion.div 
              className="absolute right-6 md:right-24 max-w-lg p-6 md:p-8 rounded-2xl glass-panel text-left flex flex-col space-y-4"
              style={{
                opacity: opacityStep2,
                y: yStep2
              }}
            >
              <span className="text-xs uppercase tracking-widest text-blue-500 font-bold">Micro-soldering</span>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
                Extreme Precision & Heat Control
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Using specialized warm-air guns and micro-soldering irons, our technicians safely re-solder CPU chips, power ICs, and backlight modules without damaging the surrounding board.
              </p>
            </motion.div>

            {/* Step 3 Text Overlay: Active around 70% - 95% scroll */}
            <motion.div 
              className="absolute left-6 md:left-24 max-w-lg p-6 md:p-8 rounded-2xl glass-panel text-left flex flex-col space-y-4"
              style={{
                opacity: opacityStep3,
                y: yStep3
              }}
            >
              <span className="text-xs uppercase tracking-widest text-blue-500 font-bold">Quality Rebuild</span>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
                Restoring Lifelines
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Our advanced diagnostic tools verify connectivity across every node. We restore water-damaged boards and screen controller tracks, giving dead phones a second life.
              </p>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
