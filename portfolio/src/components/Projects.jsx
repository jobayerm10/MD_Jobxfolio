import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";

const projects = [
  {
    year: "2024",
    title: "Formula Vintage",
    description:
      "For Formula Vintage, we crafted a design that honors the rich heritage of classic cars while adding a modern twist. Combining timeless elegance with sleek, contemporary elements, we created an experience that appeals to both enthusiasts and newcomers, celebrating the past with a fresh perspective.",
    tags: ["Landing Page", "Mobile App", "Redesign"],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=800&fit=crop",
  },
  {
    year: "2024",
    title: "Sprey Zest",
    description:
      "Complete website design and brand identity for a beverage company, focusing on vibrant visual storytelling and conversion-driven layouts. We brought energy and freshness to every pixel, ensuring the brand resonates with its audience.",
    tags: ["Website Design", "Branding"],
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop",
  },
  {
    year: "2020",
    title: "Super Pro",
    description:
      "Cross-platform desktop and mobile application design for a productivity tool, emphasizing intuitive workflows and clean interfaces. Built for power users who demand efficiency without sacrificing aesthetics.",
    tags: ["Desktop App", "Mobile App"],
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop",
  },
  {
    year: "2024",
    title: "Architech Buildings",
    description:
      "End-to-end mobile app, branding, and website design for a construction tech startup, delivering a cohesive premium brand experience that bridges the gap between innovation and trust.",
    tags: ["Mobile App", "Branding", "Website Design"],
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=800&fit=crop",
  },
];

function CustomCursor({ containerRef }) {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [visible, setVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMove = (e) => {
      const rect = container.getBoundingClientRect();
      cursorX.set(e.clientX - rect.left);
      cursorY.set(e.clientY - rect.top);
      setVisible(true);
    };

    const handleLeave = () => setVisible(false);

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);
    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, [containerRef, cursorX, cursorY]);

  return (
    <motion.div
      className="pointer-events-none absolute z-50 flex items-center justify-center"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        animate={{ scale: visible ? 1 : 0, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="w-20 h-20 rounded-full bg-orange flex items-center justify-center"
      >
        <span className="text-white text-xs font-semibold tracking-wider">
          View
        </span>
      </motion.div>
    </motion.div>
  );
}

function ProjectSlide({ project, slideRef }) {
  const imageRef = useRef(null);

  return (
    <div
      ref={slideRef}
      className="absolute inset-0 h-full w-full will-change-transform"
    >
      <div className="h-full w-full flex flex-col md:flex-row items-center gap-8 md:gap-12 px-6 md:px-12 lg:px-20 py-24">
        {/* Left — Image with clip-path reveal */}
        <motion.div
          ref={imageRef}
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="relative w-full md:w-[55%] h-[40vh] md:h-[70vh] overflow-hidden rounded-lg group"
        >
          <CustomCursor containerRef={imageRef} />
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
        </motion.div>

        {/* Right — Content */}
        <div className="w-full md:w-[45%] flex flex-col justify-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted font-mono text-sm mb-4 block"
          >
            ({project.year})
          </motion.span>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-[clamp(2rem,5vw,4rem)] font-bold leading-tight tracking-tight mb-6"
          >
            {project.title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-muted text-sm leading-relaxed mb-10 max-w-lg"
          >
            {project.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col gap-0 max-w-md"
          >
            {project.tags.map((tag, i) => (
              <div
                key={tag}
                className="flex items-center justify-between py-4 border-b border-border"
              >
                <span className="text-white text-sm font-medium tracking-wide">
                  {tag}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const slideRefs = useRef([]);

  // GSAP animation for slide overlay effect
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let ticking = false;

    const animateSlides = () => {
      const scrollTop = container.scrollTop;
      const panelHeight = container.clientHeight;
      if (panelHeight === 0) return;

      const scrollFraction = scrollTop / panelHeight;

      slideRefs.current.forEach((slide, i) => {
        if (!slide) return;

        const distance = i - scrollFraction;

        const scale = 1 - Math.abs(distance) * 0.05;
        const y = distance * -60;
        const opacity = Math.max(0, 1 - Math.abs(distance) * 0.8);
        const borderRadius = Math.abs(distance) < 0.5 ? "16px" : "0px";

        gsap.set(slide, {
          y: `${y}%`,
          scale: Math.max(0.8, scale),
          opacity: Math.max(0, opacity),
          borderRadius,
          zIndex: projects.length - Math.abs(Math.round(distance)),
        });
      });

      const newIndex = Math.max(
        0,
        Math.min(Math.round(scrollFraction), projects.length - 1),
      );
      setActiveIndex(newIndex);
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          animateSlides();
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    animateSlides();

    return () => {
      container.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section id="projects" className="sticky top-0 h-screen bg-dark z-5">
      {/* Section Label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-0 left-0 right-0 px-6 md:px-12 py-6 z-30 pointer-events-none"
      >
        <span className="text-[#B5E550] font-mono text-sm tracking-widest">
          // Projects
        </span>
      </motion.div>

      {/* Project Counter */}
      <div className="absolute top-6 right-6 md:right-12 z-30 flex items-center gap-3">
        <motion.span
          key={activeIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white font-mono text-sm"
        >
          {String(activeIndex + 1).padStart(2, "0")}
        </motion.span>
        <span className="text-muted">/</span>
        <span className="text-muted font-mono text-sm">
          {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      {/* Scrollable project slides */}
      <div
        ref={scrollRef}
        className="h-full overflow-y-scroll hide-scrollbar relative"
        style={{ scrollSnapType: "y mandatory" }}
      >
        <div className="relative h-full">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="h-full scroll-snap-start"
              ref={(el) => (slideRefs.current[index] = el)}
            >
              <ProjectSlide project={project} />
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
