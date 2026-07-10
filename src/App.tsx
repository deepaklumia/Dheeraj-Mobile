import React, { useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  BatteryCharging, 
  Zap, 
  Cpu, 
  Droplet, 
  AppWindow, 
  Unlock, 
  Database,
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  ChevronDown,
  Wrench,
  Shield,
  Menu,
  X
} from 'lucide-react';

// Subcomponents
import HeroCanvasScrollScrub from './components/HeroCanvasScrollScrub';
import CanvasScrollScrub from './components/CanvasScrollScrub';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import AccessoriesShowcase from './components/AccessoriesShowcase';
import RepairTimeline from './components/RepairTimeline';
import CounterTrust from './components/CounterTrust';

// Assets
import heroImage from './assets/hero_shop.png';
import servicesImage from './assets/services_exploded.png';
import contactImage from './assets/contact_night.png';

interface ServiceItem {
  id: number;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  tag: string;
}

const SERVICES: ServiceItem[] = [
  { id: 1, name: "Screen Replacement", description: "Original quality OLED/LCD displays with True Tone functionality fully restored.", icon: Smartphone, tag: "Display" },
  { id: 2, name: "Battery Replacement", description: "Certified high-capacity battery cell swaps with battery health health logs.", icon: BatteryCharging, tag: "Power" },
  { id: 3, name: "Charging Port Repair", description: "USB-C and Lightning dock repairs for loose connections or charging failures.", icon: Zap, tag: "Dock" },
  { id: 4, name: "Motherboard Repair", description: "Expert micro-soldering, short-circuit diagnostics, and IC chips re-balling.", icon: Cpu, tag: "Logic Board" },
  { id: 5, name: "Water Damage Repair", description: "Advanced ultrasonic board cleaning and chemical corrosion neutralization.", icon: Droplet, tag: "Emergency" },
  { id: 6, name: "Software Solutions", description: "Bootloop recovery, official updates, system flashes, and lock bypasses.", icon: AppWindow, tag: "System" },
  { id: 7, name: "Phone Unlocking", description: "Factory network unlocking and credential recovery services.", icon: Unlock, tag: "Network" },
  { id: 8, name: "Data Recovery", description: "Deep-level memory recovery of photos and files from water-damaged or dead phones.", icon: Database, tag: "Storage" }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position to update navbar blur background
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      // Find offset and scroll smoothly
      const offset = 80; // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <ReactLenis root className="lenis-smooth">
      <div className="min-h-screen bg-black text-slate-100 selection:bg-blue-600 selection:text-white font-sans antialiased">
        
        {/* ==================== 1. NAVIGATION BAR ==================== */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? 'glass-nav py-3' : 'bg-transparent py-5'
        }`}>
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
            {/* Logo */}
            <div 
              onClick={() => handleNavClick('hero')} 
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                <Wrench className="w-5.5 h-5.5 group-hover:rotate-45 transition-transform duration-300" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-lg font-display font-extrabold tracking-tight text-white leading-none">
                  DHEERAJ MOBILE
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-blue-500 mt-0.5">
                  PREMIUM TECH CARE
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              {['about', 'services', 'process', 'accessories', 'reviews', 'contact'].map((link) => (
                <button
                  key={link}
                  onClick={() => handleNavClick(link)}
                  className="text-slate-400 hover:text-white capitalize transition-colors duration-200"
                >
                  {link}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button 
                onClick={() => handleNavClick('contact')}
                className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/20 hover:shadow-blue-500/35 transition-all duration-300 hover:scale-102 cursor-pointer"
              >
                Book a Repair
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation Drawer */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="fixed inset-0 top-[60px] bg-black/95 backdrop-blur-lg z-40 md:hidden flex flex-col items-center justify-center space-y-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {['about', 'services', 'process', 'accessories', 'reviews', 'contact'].map((link) => (
                  <button
                    key={link}
                    onClick={() => handleNavClick(link)}
                    className="text-2xl font-display font-medium text-slate-300 hover:text-white capitalize tracking-wide transition-colors"
                  >
                    {link}
                  </button>
                ))}
                <button
                  onClick={() => handleNavClick('contact')}
                  className="px-8 py-3 rounded-full bg-blue-600 text-white font-semibold text-base shadow-lg shadow-blue-500/30"
                >
                  Book a Repair
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* ==================== 2. HERO SECTION ==================== */}
        <div id="hero">
          <HeroCanvasScrollScrub handleNavClick={handleNavClick} />
        </div>

        {/* ==================== 3. ABOUT SECTION (CANVAS SCROLL SCRUB) ==================== */}
        <section id="about" className="relative z-20">
          <div className="bg-black py-16 md:py-24 text-center max-w-4xl mx-auto px-4">
            <span className="text-xs uppercase tracking-widest text-blue-500 font-bold mb-3 block">
              Trusted Repair Specialist
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-6">
              Engineering Diagnostics In Action
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              We operate a professional technology workspace equipped with digital microscopes, infrared thermal cameras, and micro-soldering gear. Scroll down to look over our shoulder as we repair a smartphone logic board.
            </p>
          </div>

          {/* Sticky Canvas scrubbing section */}
          <CanvasScrollScrub />
        </section>

        {/* ==================== 4. REPAIR SERVICES SECTION ==================== */}
        <section id="services" className="relative bg-black py-24 md:py-32 z-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-left max-w-3xl mb-16 flex flex-col space-y-3">
              <span className="text-xs uppercase tracking-widest text-blue-500 font-bold">
                Professional Repair Solutions
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
                No Defect is Too Small. <br />
                No Fix is Too Complex.
              </h2>
            </div>

            {/* Layout splitting Exploded Phone graphics and grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Interactive Service Cards Grid */}
              <div className="lg:col-span-7 order-2 lg:order-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                {SERVICES.map((serv) => {
                  const Icon = serv.icon;
                  return (
                    <motion.div
                      key={serv.id}
                      className="p-6 rounded-2xl bg-white/5 border border-white/5 text-left flex flex-col space-y-4 group relative overflow-hidden glass-panel-hover"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2.5 py-1 bg-white/5 border border-white/5 rounded-full">
                          {serv.tag}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-lg font-display font-bold text-white mb-2">
                          {serv.name}
                        </h4>
                        <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                          {serv.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Right Column: Exploded Smartphone View Sticky Image */}
              <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-24 flex justify-center">
                <div className="relative w-full max-w-md rounded-3xl overflow-hidden border border-white/10 shadow-2xl group aspect-[4/5]">
                  <img 
                    src={servicesImage} 
                    alt="Exploded smartphone view showing logic board, battery, screen modules" 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 text-left">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-1.5 block">
                      Internal Engineering
                    </span>
                    <h4 className="text-xl font-display font-bold text-white">
                      Original Part Specifications
                    </h4>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ==================== 5. REPAIR PROCESS SECTION ==================== */}
        <section id="process" className="relative bg-black py-20 z-20 border-t border-white/5">
          <RepairTimeline />
        </section>

        {/* ==================== 6. ACCESSORIES SECTION ==================== */}
        <section id="accessories" className="relative bg-black py-24 md:py-32 z-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-left mb-16 flex flex-col space-y-3">
            <span className="text-xs uppercase tracking-widest text-blue-500 font-bold">
              Premium Mobile Accessories
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight">
              Accessorize Your Daily Companion.
            </h2>
          </div>
          <AccessoriesShowcase />
        </section>

        {/* ==================== 7. BEFORE / AFTER REPAIR SECTION ==================== */}
        <section id="before-after" className="relative bg-black py-24 md:py-32 z-20 border-t border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center flex flex-col items-center space-y-4 mb-16">
            <span className="text-xs uppercase tracking-widest text-blue-500 font-bold">
              See the Difference
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Restoring Shattered Screens to Life.
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
              We employ professional liquid optical cleaners, pressurized dust-extraction chambers, and industrial vacuum laminators to replace cracked screens while preserving raw factory screen parameters.
            </p>
          </div>
          
          <BeforeAfterSlider />
        </section>

        {/* ==================== 8. CUSTOMER TRUST & TESTIMONIALS ==================== */}
        <section id="reviews" className="relative bg-black py-20 z-20 border-t border-white/5">
          <CounterTrust />
        </section>

        {/* ==================== 9. CONTACT & FOOTER SECTION ==================== */}
        <section id="contact" className="relative bg-black py-24 md:py-32 z-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
              
              {/* Left Side: Store Night View Card */}
              <div className="lg:col-span-6 relative aspect-video md:aspect-[16/11] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                <img 
                  src={contactImage} 
                  alt="Dheeraj Mobile store view at night with glowing board sign" 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                
                {/* Embedded Contact Badge */}
                <div className="absolute bottom-6 left-6 bg-blue-950/80 backdrop-blur-md text-blue-400 border border-blue-500/30 text-xs md:text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  We are open today until 8:00 PM
                </div>
              </div>

              {/* Right Side: Details & Contact Links */}
              <div className="lg:col-span-6 flex flex-col space-y-8 lg:pl-6">
                <div className="flex flex-col space-y-3">
                  <span className="text-xs uppercase tracking-widest text-blue-500 font-bold">
                    Visit Dheeraj Mobile Today
                  </span>
                  <h3 className="text-3xl md:text-5xl font-display font-extrabold text-white leading-tight">
                    Premium Service. <br />
                    Right in Nalanda.
                  </h3>
                </div>

                {/* Details list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-white font-semibold text-sm mb-1">Our Location</h5>
                      <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                        Ben, Nalanda, <br />
                        Bihar – 803114
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-white font-semibold text-sm mb-1">Quick Contact</h5>
                      <a href="tel:+919939505544" className="text-blue-400 hover:text-blue-300 text-xs md:text-sm font-semibold transition-colors">
                        +91 99395 05544
                      </a>
                      <p className="text-slate-500 text-[11px] mt-0.5">Call or WhatsApp for quotes</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-white font-semibold text-sm mb-1">Store Hours</h5>
                      <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                        Monday – Saturday <br />
                        10:00 AM – 8:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-white font-semibold text-sm mb-1">Service Areas</h5>
                      <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                        Ben, Nalanda, Rajgir, Bihar Sharif & nearby towns.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call-to-action contact button with glowing borders */}
                <div className="pt-6">
                  <a 
                    href="https://wa.me/919939505544?text=Hello%20Dheeraj%20Mobile,%20I%20have%20an%20issue%20with%20my%20smartphone."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-wide shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all duration-300 hover:scale-102 cursor-pointer w-full text-center relative overflow-hidden group border border-blue-400/25"
                  >
                    <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    Get Instant WhatsApp Support Quote
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Footer info and copyrights */}
        <footer className="bg-black py-12 border-t border-white/5 text-slate-500 text-sm">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col text-center md:text-left gap-1">
              <span className="text-white font-display font-bold">Dheeraj Mobile</span>
              <span className="text-xs">Premium repair services and original hardware parts.</span>
            </div>
            
            <div className="flex items-center gap-6 text-xs font-medium">
              <button onClick={() => handleNavClick('about')} className="hover:text-slate-300 transition-colors">About</button>
              <button onClick={() => handleNavClick('services')} className="hover:text-slate-300 transition-colors">Services</button>
              <button onClick={() => handleNavClick('accessories')} className="hover:text-slate-300 transition-colors">Accessories</button>
              <button onClick={() => handleNavClick('contact')} className="hover:text-slate-300 transition-colors">Contact</button>
            </div>
            
            <span className="text-xs text-center md:text-right">
              © {new Date().getFullYear()} Dheeraj Mobile. All Rights Reserved. <br />
              Designed in Apple Cinematic style.
            </span>
          </div>
        </footer>

      </div>
    </ReactLenis>
  );
}
