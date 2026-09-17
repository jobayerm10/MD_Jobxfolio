import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  });

  const navLinks = [
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 left-0 right-0 z-50 bg-transparent"
          >
            <div className="max-w-full mx-auto px-3 md:px-12 flex items-center justify-between h-18">
              {/* Left: Brand */}
              <div className="flex flex-col">
                <span
                  className={`text-md font-light sm:text-sm lg:text-xl lg:font-extrabold tracking-tighter ${
                    isOpen ? "text-white" : "text-black/80"
                  } md:text-black/80`}
                >
                  JBM Labs
                </span>
                <span
                  className={`mt-0.5 text-[7px] sm:text-[10px] lg:text-[12px] tracking-[0.18em] ${
                    isOpen ? "text-white" : "text-black/55"
                  } md:text-black/55 whitespace-nowrap`}
                >
                  Design • Development • AI • Digital Experiences
                </span>
              </div>

              {/* Center/Right: Desktop Nav */}
              <div className="hidden md:flex items-center gap-10">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-md font-semibold tracking-wider text-black/70 hover:text-black transition-colors duration-300 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
                <motion.a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="mailto:jobayermahmud976@gmail.com"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="relative hidden lg:inline-flex items-center justify-center overflow-hidden border-3 border-accent bg-accent rounded-xl px-6 py-3 cursor-pointer group"
                >
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="absolute inset-0 bg-[#B5E550] origin-left"
                  />
                  <motion.span
                    animate={{
                      y: isHovered ? -30 : 0,
                      opacity: isHovered ? 0 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 text-white text-sm tracking-widest"
                  >
                    @jobayer
                  </motion.span>
                  <motion.span
                    initial={{ y: 30, opacity: 0 }}
                    animate={{
                      y: isHovered ? 0 : 30,
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute z-10 text-black text-sm tracking-widest font-medium"
                  >
                    @jobayer
                  </motion.span>
                </motion.a>
              </div>

              {/* Mobile Burger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden flex flex-col gap-1.5 p-2"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-6 h-px bg-black"
                />
                <motion.span
                  animate={
                    isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
                  }
                  className="block w-6 h-px bg-black origin-center"
                />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 left-0 right-0 z-40 h-56 bg-black/95 backdrop-blur-lg px-3 pt-20 flex flex-col items-start gap-6 md:hidden"
          >
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="absolute top-7 right-4 p-2 text-white"
            >
              <span className="block w-5 h-px bg-white rotate-45 translate-y-px" />
              <span className="block w-5 h-px bg-white -rotate-45" />
            </button>
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-white tracking-wide hover:text-muted transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
