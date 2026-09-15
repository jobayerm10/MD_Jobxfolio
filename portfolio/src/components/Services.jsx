import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    number: '01',
    title: 'Branding & Marketing',
    description: 'Branding that builds trust and drives loyalty through clear visuals and messaging, into an unforgettable online experience.',
    items: [
      'Brand Strategy and Messaging',
      'Logo Design',
      'Visual Identity',
      'Brand Guidelines & Frameworks',
      'Marketing materials',
      'Motion Design',
    ],
  },
  {
    number: '02',
    title: 'Website Design',
    description: 'Not just about aesthetics, but about developing logical, scalable design systems that are precisely tailored to the web and app application.',
    items: [
      'Landing Pages',
      'Corporate Websites',
      'Blogs',
      'E-commerce',
      'Complex Websites',
    ],
  },
  {
    number: '03',
    title: 'Web Development',
    description: 'User-focused app design that maximizes usability and encourages retention.',
    items: [
      'Framer, Webflow, or WordPress Builds',
      'CMS Integration',
      'SEO Optimization',
      'Site Migrations',
    ],
  },
  {
    number: '04',
    title: 'Application Design',
    description: 'User-focused app design that maximizes usability and encourages retention.',
    items: [
      'Mobile Apps',
      'Desktop Apps',
      'Complex Systems',
      'Design Systems Optimization',
    ],
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const panelRefs = useRef([]);

  const updateActive = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollTop = container.scrollTop;
    const panelHeight = container.clientHeight;
    if (panelHeight === 0) return;
    const newIndex = Math.round(scrollTop / panelHeight);
    const clamped = Math.max(0, Math.min(newIndex, services.length - 1));
    setActiveIndex(clamped);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
    return () => el.removeEventListener('scroll', updateActive);
  }, [updateActive]);

  return (
    <section id="about" className="sticky top-0 h-screen bg-dark z-5">
      {/* Section Label */}
      <div className="absolute top-0 left-0 right-0 px-6 md:px-12 py-6 z-20 pointer-events-none">
        <span className="text-orange font-mono text-sm tracking-widest">// Services</span>
      </div>

      <div className="flex h-full">
        {/* ─── Left: Fixed Sidebar Number ─── */}
        <div className="w-[40%] lg:w-[35%] relative hidden md:flex flex-col items-center justify-center">
          {/* Large animated number */}
          <div className="relative w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={activeIndex}
                initial={{ opacity: 0, y: 60, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -60, scale: 0.85 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(8rem,20vw,16rem)] font-black leading-none select-none block"
                style={{
                  WebkitTextStroke: '1.5px rgba(255,255,255,0.2)',
                  color: 'transparent',
                }}
              >
                {services[activeIndex].number}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* ─── Right: Scrollable Content Panels ─── */}
        <div
          ref={scrollRef}
          className="w-full md:w-[60%] lg:w-[65%] h-full overflow-y-scroll hide-scrollbar"
          style={{ scrollSnapType: 'y mandatory' }}
        >
          {services.map((service, index) => (
            <div
              key={service.number}
              ref={(el) => (panelRefs.current[index] = el)}
              className="min-h-full flex items-center px-6 md:px-12 lg:px-14 py-28 scroll-snap-start"
            >
              <div className="w-full max-w-2xl">
                {/* Mobile: large number */}
                <div className="md:hidden mb-8">
                  <span
                    className="text-[clamp(6rem,18vw,10rem)] font-black leading-none select-none"
                    style={{
                      WebkitTextStroke: '1.5px rgba(255,255,255,0.2)',
                      color: 'transparent',
                    }}
                  >
                    {service.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[clamp(2rem,5vw,3.8rem)] font-bold leading-tight tracking-tight mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted text-sm leading-relaxed mb-10 max-w-lg">
                  {service.description}
                </p>

                {/* Items List */}
                <div className="border-t border-border">
                  {service.items.map((item, i) => (
                    <div
                      key={item}
                      className="flex items-center justify-between py-5 border-b border-border group"
                    >
                      <span className="text-white text-sm md:text-base font-medium tracking-wide group-hover:pl-2 transition-all duration-300">
                        {item}
                      </span>
                      <span className="text-muted text-xs font-mono shrink-0 ml-4">
                        0{i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .scroll-snap-start { scroll-snap-align: start; }
      `}</style>
    </section>
  );
}
