import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, Hammer, ShieldCheck, CheckCircle2 } from 'lucide-react';
import timelineImage from '../assets/repair_process.png';

interface Step {
  id: number;
  num: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  details: string[];
}

const STEPS: Step[] = [
  {
    id: 1,
    num: "01",
    title: "Diagnose",
    description: "Complete inspection and fault detection.",
    icon: Search,
    details: ["Microsoldering diagnostics", "Thermal camera scans", "Current-leak detection"]
  },
  {
    id: 2,
    num: "02",
    title: "Repair",
    description: "Expert repair using professional tools.",
    icon: Hammer,
    details: ["Original screen replacements", "Micro-soldered track rebuilds", "Genuine cell swaps"]
  },
  {
    id: 3,
    num: "03",
    title: "Testing",
    description: "Multiple quality checks performed.",
    icon: ShieldCheck,
    details: ["Touch sensitivity scans", "Battery drain testing", "Signal strength checks"]
  },
  {
    id: 4,
    num: "04",
    title: "Delivery",
    description: "Device returned in perfect condition.",
    icon: CheckCircle2,
    details: ["Express pickup & delivery", "Secure protective packing", "Up to 90 days service warranty"]
  }
];

export default function RepairTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll of timeline section for connector line animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Scale the height of the glowing center line from 0% to 100%
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 relative">
      
      {/* Background Storytelling Section (Double Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16 text-left">
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <span className="text-xs uppercase tracking-widest text-blue-500 font-bold">
            Precision Workflow
          </span>
          <h3 className="text-3xl md:text-5xl font-display font-extrabold text-white leading-tight">
            Engineered For Excellence
          </h3>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Every device that enters Dheeraj Mobile undergoes a standardized, high-precision repair workflow. We combine clean-room style diagnostics with expert workbench repair to ensure zero structural flaws.
          </p>
        </div>

        <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group aspect-video">
          <img 
            src={timelineImage} 
            alt="Technician repairing mobile step-by-step" 
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* The Timeline Elements */}
      <div className="relative mt-24">
        
        {/* Central Vertical Connector Line (Hidden on tiny screens) */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 -translate-x-1/2 pointer-events-none">
          {/* Glowing animated scroll-driven line overlay */}
          <motion.div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-600 to-indigo-500 shadow-[0_0_12px_#3b82f6]"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Timeline Items */}
        <div className="space-y-16 md:space-y-24">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={step.id} 
                className={`relative flex flex-col md:flex-row items-start md:items-center w-full ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Connector Point/Dot */}
                <div className="absolute left-6 md:left-1/2 top-4 md:top-auto -translate-x-1/2 w-8 h-8 rounded-full bg-black border-2 border-slate-700 flex items-center justify-center z-10">
                  <motion.div 
                    className="w-3.5 h-3.5 rounded-full bg-blue-500"
                    initial={{ scale: 0.6, opacity: 0.5 }}
                    whileInView={{ scale: 1.1, opacity: 1 }}
                    viewport={{ once: false, amount: 'all' }}
                    transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                  />
                </div>

                {/* Timeline Card Panel */}
                <motion.div 
                  className={`w-full md:w-[44%] ml-12 md:ml-0 p-6 md:p-8 rounded-2xl glass-panel text-left flex flex-col space-y-4 group relative overflow-hidden`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ borderColor: 'rgba(59, 130, 246, 0.25)' }}
                >
                  {/* Backdrop subtle grid */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

                  {/* Header row */}
                  <div className="flex items-center justify-between">
                    <span className="text-4xl md:text-5xl font-display font-extrabold text-white/10 group-hover:text-blue-500/10 transition-colors duration-300">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Content details */}
                  <h4 className="text-xl md:text-2xl font-display font-bold text-white">
                    {step.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* List of subtasks */}
                  <ul className="space-y-1.5 pt-2 border-t border-white/5">
                    {step.details.map((detail, dIdx) => (
                      <li key={dIdx} className="text-xs text-slate-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Empty column buffer space on desktop to maintain center grid symmetry */}
                <div className="hidden md:block w-[44%] pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
