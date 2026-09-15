import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Intro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="bg-dark px-6 md:px-12 py-24 md:py-32 max-w-[1400px] mx-auto border-t border-border">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12"
      >
        {/* Left: Intro Text */}
        <p className="text-muted text-sm md:text-base leading-relaxed tracking-widest max-w-2xl uppercase">
          I'm a versatile designer who partners with founders to turn ideas into real products.
          I focus on clear interfaces, sharp decisions, and fast execution.
        </p>

        {/* Right: CTA */}
        <a
          href="#projects"
          className="group flex items-center gap-3 text-white text-sm tracking-widest hover:gap-5 transition-all duration-300 shrink-0"
        >
          See my Work
          <span className="inline-flex items-center justify-center w-10 h-10 border border-border rounded-full group-hover:bg-white group-hover:text-black transition-all duration-300">
            <svg
              className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </a>
      </motion.div>
    </section>
  );
}
