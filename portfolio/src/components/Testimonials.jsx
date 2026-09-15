import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: "Jobayer transformed our brand vision into something extraordinary. His attention to detail and strategic thinking elevated our entire digital presence beyond what we imagined possible.",
    name: 'Maya Lopez',
    role: 'CEO, Fundwizz',
  },
  {
    quote: "Working with Jobayer was a game-changer for our product. He has this rare ability to balance beautiful design with real business outcomes. Our conversion rates jumped significantly.",
    name: 'George Jones',
    role: 'Product Manager, Gliss',
  },
  {
    quote: "The design system Jobayer built for us has become the backbone of our product development. His work is clean, scalable, and incredibly well-thought-out. Highly recommend.",
    name: 'Ray Brown',
    role: 'Head of Product, ISO',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="px-6 md:px-12 py-24 md:py-32 max-w-[1400px] mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight">
          <span className="text-muted font-mono text-[clamp(0.875rem,1.5vw,1.125rem)] font-normal mr-3">#</span>
          Kind Words
          <span className="text-muted">-</span>
        </h2>
      </motion.div>

      <div className="border border-border p-8 md:p-16 relative">
        {/* Fraction Indicator */}
        <div className="absolute top-8 right-8 md:top-12 md:right-12 flex items-center gap-3">
          <span className="text-white font-mono text-sm">
            {String(current + 1).padStart(2, '0')}
          </span>
          <span className="text-muted">/</span>
          <span className="text-muted font-mono text-sm">
            {String(testimonials.length).padStart(2, '0')}
          </span>
        </div>

        {/* Quote */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <blockquote className="text-xl md:text-3xl lg:text-4xl font-light leading-relaxed text-white/90 max-w-4xl mb-12">
              "{testimonials[current].quote}"
            </blockquote>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold text-lg">{testimonials[current].name}</p>
                <p className="text-muted text-sm tracking-wider mt-1">{testimonials[current].role}</p>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-4">
                <button
                  onClick={prev}
                  className="w-12 h-12 border border-border flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 border border-border flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                  aria-label="Next testimonial"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex items-center gap-2 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 transition-all duration-300 ${
                i === current ? 'w-8 bg-white' : 'w-4 bg-border hover:bg-muted'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
