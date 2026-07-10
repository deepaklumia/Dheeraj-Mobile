import { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Headphones, 
  Watch, 
  BatteryCharging, 
  Smartphone, 
  Layers, 
  Cable, 
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import accessoriesImage from '../assets/accessories_showcase.png';

interface AccessoryProduct {
  id: number;
  name: string;
  category: string;
  description: string;
  priceTag: string;
  icon: React.ComponentType<any>;
  glowColor: string;
}

const ACCESSORIES: AccessoryProduct[] = [
  {
    id: 1,
    name: "Wireless Earbuds",
    category: "Audio",
    description: "Active noise cancellation, deep bass, 24hr battery life.",
    priceTag: "Premium Range",
    icon: Headphones,
    glowColor: "rgba(59, 130, 246, 0.4)" // blue
  },
  {
    id: 2,
    name: "Fast Chargers (GaN)",
    category: "Power",
    description: "Ultra-compact 65W & 120W multi-port adapters.",
    priceTag: "Super Fast Tech",
    icon: Zap,
    glowColor: "rgba(234, 179, 8, 0.4)" // yellow
  },
  {
    id: 3,
    name: "Smart Watches",
    category: "Wearables",
    description: "AMOLED displays, health tracking, BT calling features.",
    priceTag: "Latest Models",
    icon: Watch,
    glowColor: "rgba(168, 85, 247, 0.4)" // purple
  },
  {
    id: 4,
    name: "Power Banks",
    category: "Power",
    description: "20,000mAh high capacity, Power Delivery support.",
    priceTag: "High Capacity",
    icon: BatteryCharging,
    glowColor: "rgba(34, 197, 94, 0.4)" // green
  },
  {
    id: 5,
    name: "Premium Mobile Covers",
    category: "Protection",
    description: "MagSafe cases, leather textures, shockproof armor.",
    priceTag: "Luxury Cases",
    icon: Smartphone,
    glowColor: "rgba(244, 63, 94, 0.4)" // rose
  },
  {
    id: 6,
    name: "Tempered Glass (9H+)",
    category: "Protection",
    description: "Oleophobic coating, edge-to-edge curved shield.",
    priceTag: "Military Grade",
    icon: Layers,
    glowColor: "rgba(6, 182, 212, 0.4)" // cyan
  },
  {
    id: 7,
    name: "Super-Durable USB Cables",
    category: "Cables",
    description: "Braided nylon cables, 100W PD type-C to lightning/C.",
    priceTag: "Reinforced Fiber",
    icon: Cable,
    glowColor: "rgba(249, 115, 22, 0.4)" // orange
  },
  {
    id: 8,
    name: "Bluetooth Neckbands",
    category: "Audio",
    description: "Magnetic earbuds, sweat-resistant, fast charging.",
    priceTag: "Sports Edition",
    icon: Headphones,
    glowColor: "rgba(236, 72, 153, 0.4)" // pink
  }
];

export default function AccessoriesShowcase() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollAmount = 340; // Card width + margin
    const targetScroll = slider.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    
    slider.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <div className="w-full flex flex-col space-y-12">
      {/* Intro section combining Image and Copy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto px-4 md:px-8">
        <div className="lg:col-span-7 relative group rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[16/10]">
          <img 
            src={accessoriesImage} 
            alt="Accessories showcase store layout" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2 block">
              Curated Collection
            </span>
            <h4 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
              Apple Store Style Display
            </h4>
            <p className="text-slate-300 text-sm max-w-md">
              We stock only premium accessories that guarantee compatibility, high performance, and long life cycles.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 text-left flex flex-col space-y-6 lg:pl-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
            Elevate Your Mobile Experience
          </h3>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            From smart watches to high-efficiency chargers, we provide top-tier add-ons that complement and protect your smart devices. Stop settling for cheap replicas. Enjoy original performance.
          </p>
          
          {/* Slider Navigation Buttons */}
          <div className="flex items-center gap-4 pt-2">
            <button 
              onClick={() => handleScroll('left')}
              className="w-12 h-12 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors duration-200"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => handleScroll('right')}
              className="w-12 h-12 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors duration-200"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Drag Slider */}
      <div className="relative w-full overflow-hidden select-none">
        <div 
          ref={sliderRef}
          className="flex overflow-x-auto space-x-6 px-4 md:px-12 py-4 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {ACCESSORIES.map((prod) => {
            const Icon = prod.icon;
            return (
              <motion.div
                key={prod.id}
                className="flex-shrink-0 w-[280px] md:w-[320px] aspect-[4/5] rounded-3xl p-6 md:p-8 glass-panel text-left flex flex-col justify-between snap-start transition-all duration-300 relative group overflow-hidden"
                whileHover={{ 
                  y: -8, 
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                  boxShadow: `0 15px 40px -10px ${prod.glowColor}`
                }}
              >
                {/* Glowing subtle ambient circle in the background */}
                <div 
                  className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: prod.glowColor }}
                />

                {/* Card Top */}
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-semibold px-3 py-1 bg-white/5 border border-white/10 rounded-full text-slate-400">
                      {prod.category}
                    </span>
                    <div className="text-slate-400 group-hover:text-blue-500 transition-colors duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>
                  <h4 className="text-xl md:text-2xl font-display font-bold text-white leading-tight">
                    {prod.name}
                  </h4>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                {/* Card Bottom */}
                <div className="flex items-center justify-between mt-6">
                  <span className="text-xs md:text-sm text-blue-400 font-semibold uppercase tracking-wide">
                    {prod.priceTag}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:bg-white text-slate-400 group-hover:text-black flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
