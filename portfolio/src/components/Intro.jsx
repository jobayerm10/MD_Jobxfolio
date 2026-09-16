import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

function AnimatedButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="#projects"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative inline-flex items-center justify-center overflow-hidden border border-border rounded-full px-10 py-4 cursor-pointer group"
    >
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 bg-orange origin-left"
      />

      <motion.span
        animate={{ y: isHovered ? -30 : 0, opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 text-white text-sm tracking-widest"
      >
        See my Work
      </motion.span>

      <motion.span
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: isHovered ? 0 : 30, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute z-10 text-black text-sm tracking-widest font-medium"
      >
        See my Work
      </motion.span>

      <motion.span
        animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="absolute right-8 z-10 text-black"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </motion.span>
    </a>
  );
}

export default function Intro() {
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, margin: "-10%" });

  const words = [
    { text: "I'm a versat", highlight: false },
    { text: "ile designer who", highlight: false },
    { text: " partners with founders to turn ideas into real products", highlight: true },
    { text: ". I focus on clear interfaces, sharp decisions, and fast execution.", highlight: false },
  ];

  return (
    <section className="relative bg-dark min-h-screen flex flex-col justify-center z-10">
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 py-32">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-orange font-mono text-sm tracking-widest">
            // Intro
          </span>
        </motion.div>

        {/* Main Text */}
        <div ref={textRef} className="max-w-5xl">
          <h2 className="text-[clamp(2rem,5.5vw,4.5rem)] font-bold leading-[1.1] tracking-tight">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={word.highlight ? "text-orange" : "text-white"}
              >
                {word.text}
              </motion.span>
            ))}
          </h2>
        </div>

        {/* Subtitle + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex flex-col items-start gap-10 max-w-xl ml-auto"
        >
          <p className="text-muted text-sm leading-relaxed tracking-wide">
            Bringing your vision to life quickly and efficiently—whether it's
            branding, apps, or websites—I've got it covered, delivering smooth
            and effective solutions from start to finish.
          </p>

          <AnimatedButton />
        </motion.div>
      </div>
    </section>
  );
}
