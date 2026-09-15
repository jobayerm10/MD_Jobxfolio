import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () =>
      setScrolled(window.scrollY > window.innerHeight - 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-full mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          {/* Left: Brand */}
          <div className="flex flex-col">
            <span
              className={`font-extrabold text-xl tracking-tighter transition-colors duration-500 ${
                scrolled ? "text-white" : "text-black/80"
              }`}
            >
              © Jobayer Design & Technology
            </span>
          </div>

          {/* Center/Right: Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-md font-semibold tracking-wider transition-colors duration-300 relative group ${
                  scrolled
                    ? "text-white/70 hover:text-white"
                    : "text-black/70 hover:text-black"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                    scrolled ? "bg-white" : "bg-black"
                  }`}
                />
              </a>
            ))}
            <a
              target="_blank"
              rel="Jobayer Mahmud"
              href="mailto:jobayermahmud976@gmail.com"
              className="hidden lg:inline-block text-sm lg:text-[1vw] px-6 py-3 border-2 rounded-md bg-black/85 text-white transition-all duration-300 ease-out hover:px-9 shadow-md hover:shadow-lg"
            >
              @jobayer
            </a>
          </div>

          {/* Mobile Burger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-px origin-center transition-colors duration-500 ${
                scrolled ? "bg-white" : "bg-black"
              }`}
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`block w-6 h-px transition-colors duration-500 ${
                scrolled ? "bg-white" : "bg-black"
              }`}
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-px origin-center transition-colors duration-500 ${
                scrolled ? "bg-white" : "bg-black"
              }`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-light text-white tracking-widest hover:text-muted transition-colors"
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
