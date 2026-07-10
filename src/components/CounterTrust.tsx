import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, ShieldCheck, Heart, Clock, Award } from 'lucide-react';
import trustImage from '../assets/customer_trust.png';

interface StatItem {
  id: number;
  value: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<any>;
}

const STATS: StatItem[] = [
  { id: 1, value: 5000, suffix: "+", label: "Smartphones Restored", icon: ShieldCheck },
  { id: 2, value: 99, suffix: "%", label: "Client Satisfaction Rate", icon: Heart },
  { id: 3, value: 8, suffix: "+", label: "Years Technical Experience", icon: Award },
  { id: 4, value: 20, suffix: " Min", label: "Avg. Screen Swap Time", icon: Clock }
];

interface Testimonial {
  id: number;
  name: string;
  location: string;
  stars: number;
  text: string;
  date: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Raman Kumar",
    location: "Nalanda",
    stars: 5,
    text: "Got my iPhone 14 Pro Max screen replaced here. The quality is indistinguishable from the original display. Extremely professional repair center in Nalanda!",
    date: "2 days ago"
  },
  {
    id: 2,
    name: "Dinesh Prasad",
    location: "Ben",
    stars: 5,
    text: "Dheeraj Mobile solved a motherboard short-circuit issue that other repair shops claimed was impossible. Truly a specialist. Highly recommended!",
    date: "1 week ago"
  },
  {
    id: 3,
    name: "Anjali Sinha",
    location: "Bihar Sharif",
    stars: 5,
    text: "Best place for premium accessories. I bought a 65W charger and magnetic leather cases. Fully authentic products and reasonable pricing.",
    date: "2 weeks ago"
  }
];

// Helper Counter component utilizing requestAnimationFrame
function AnimatedCounter({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(countRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    let frame = 0;
    const totalFrames = Math.round(duration * 60);
    const end = value;

    const updateCounter = () => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.round(end * easeProgress);

      if (frame < totalFrames) {
        setCount(currentCount);
        requestAnimationFrame(updateCounter);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, value, duration]);

  return <span ref={countRef}>{count.toLocaleString()}</span>;
}

export default function CounterTrust() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <div ref={sectionRef} className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col space-y-20">
      
      {/* Top Section - Stats & Hero Image Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Stats Cards */}
        <div className="lg:col-span-6 text-left flex flex-col space-y-8">
          <div className="flex flex-col space-y-3">
            <span className="text-xs uppercase tracking-widest text-blue-500 font-bold">
              Unmatched Credibility
            </span>
            <h3 className="text-3xl md:text-5xl font-display font-extrabold text-white leading-tight">
              Nalanda's Most Trusted Technicians
            </h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              We stand by our repairs with premium parts and detailed testing procedures. Over the years, we have built a legacy of trust in Nalanda through precision and transparent operations.
            </p>
          </div>

          {/* Grid layout of counter cards */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {STATS.map((stat) => {
              const StatIcon = stat.icon;
              return (
                <div 
                  key={stat.id}
                  className="p-5 md:p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col space-y-3 relative overflow-hidden group hover:border-blue-500/25 hover:bg-white/[0.07] transition-all duration-300"
                >
                  <div className="text-blue-500 flex items-center justify-between">
                    <StatIcon className="w-6 h-6" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:scale-150 transition-transform duration-300" />
                  </div>
                  <div className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
                    <AnimatedCounter value={stat.value} />
                    <span className="text-blue-500">{stat.suffix}</span>
                  </div>
                  <div className="text-xs md:text-sm text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Hero Image with Floating Review Banner */}
        <div className="lg:col-span-6 relative aspect-video md:aspect-[16/11] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
          <img 
            src={trustImage} 
            alt="Customer receiving repaired phone at Dheeraj Mobile" 
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
          
          {/* Floating Live review notification card */}
          <motion.div 
            className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel text-left flex items-center gap-4 border border-white/10"
            initial={{ y: 50, opacity: 0 }}
            animate={isSectionInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
              G
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-1 text-yellow-400 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-white text-xs md:text-sm font-semibold">
                Rated 4.9/5 stars based on 450+ Google Reviews
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Section - Floating Testimonials Cards */}
      <div className="flex flex-col space-y-8">
        <h4 className="text-xl md:text-2xl font-display font-semibold text-slate-300 text-left border-b border-white/5 pb-4">
          Direct Customer Feedback
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test, idx) => (
            <motion.div
              key={test.id}
              className="p-6 md:p-8 rounded-2xl glass-panel text-left flex flex-col justify-between space-y-4 hover:border-white/15 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
            >
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-white font-semibold text-base">{test.name}</h5>
                    <span className="text-xs text-slate-500">{test.location}</span>
                  </div>
                  <span className="text-xs text-slate-500">{test.date}</span>
                </div>
                
                {/* Stars */}
                <div className="flex items-center gap-0.5 text-yellow-400">
                  {[...Array(test.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-slate-300 text-xs md:text-sm leading-relaxed italic">
                  "{test.text}"
                </p>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-white/5 text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Verified Repair</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
