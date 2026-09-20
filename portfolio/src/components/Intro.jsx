import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

function MagneticButton({ children, className = "", ...props }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    setPosition({ x: (clientX - centerX) * 0.15, y: (clientY - centerY) * 0.15 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.a
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
}

function AnimatedButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <MagneticButton
      href="#projects"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative inline-flex items-center justify-center overflow-hidden border border-border rounded-xl px-10 py-4 cursor-pointer group"
    >
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 bg-[#B5E550] origin-left"
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
    </MagneticButton>
  );
}

function AnimatedWord({ word, index, totalWords, scrollYProgress }) {
  const start = 0.12 + (index / totalWords) * 0.42;
  const end = start + 0.06;
  const color = useTransform(
    scrollYProgress,
    [start, end],
    ["#242223", word.highlight ? "#B5E550" : "#ffffff"],
  );
  const y = useTransform(scrollYProgress, [start, end], [8, 0]);

  return (
    <motion.span style={{ color, y }} className="inline-block whitespace-pre">
      {word.text}
    </motion.span>
  );
}

export default function Intro() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const labelOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const labelX = useTransform(scrollYProgress, [0.1, 0.3], [-20, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.55, 0.75], [30, 0]);
  const textParts = [
    {
      text: "As a Web developer, I create custom web solutions",
      highlight: false,
    },
    {
      text: " that solve real business problems, strengthen your online visibility, and drive measurable growth.",
      highlight: true,
    },
  ];
  const words = textParts.flatMap(({ text, highlight }) =>
    text.split(/(\s+)/).map((word) => ({ text: word, highlight })),
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-dark min-h-screen flex flex-col justify-center z-10"
    >
      <div className="max-w-350 mx-auto w-full px-6 md:px-12 py-32">
        {/* Section Label */}
        <motion.div
          style={{ opacity: labelOpacity, x: labelX }}
          className="absolute top-0 left-0 right-0 px-6 md:px-12 py-6 z-20 pointer-events-none"
        >
          <span className="text-[#B5E550] font-mono text-sm tracking-widest">
            // Intro
          </span>
        </motion.div>

        {/* Main Text */}
        <div ref={textRef} className="max-w-5xl">
          <h2 className="relative text-[clamp(2rem,5.5vw,4.5rem)] font-bold leading-[1.1] tracking-tight">
            {words.map((word, i) => (
              <AnimatedWord
                key={i}
                word={word}
                index={i}
                totalWords={words.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </h2>
        </div>

        {/* Subtitle + CTA */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
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
