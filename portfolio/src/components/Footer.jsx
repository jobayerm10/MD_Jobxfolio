import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import image from "../assets/footer2.png";

const socialLinks = [
  {
    label: "Linkedin",
    href: "https://www.linkedin.com/in/jobayer-al-mahmud26/",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/jobayerm10",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297a12 12 0 00-3.794 23.384c.6.113.82-.26.82-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.465-2.381 1.235-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 016.008 0c2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.233 1.911 1.233 3.221 0 4.61-2.804 5.624-5.475 5.921.43.372.823 1.102.823 2.222v3.293c0 .32.216.694.825.576A12 12 0 0012 .297z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/the_jobayermahmud/",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: false, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const textX = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#E8E4E0]"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          extra
          alt="Contact"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="absolute top-8 right-8 z-30 h-12 w-12 overflow-hidden rounded-full border border-black/20 bg-black/90 backdrop-blur-sm transition-all duration-500 ease-out group hover:w-36 hover:rounded-full hover:bg-black cursor-pointer"
        aria-label="Scroll to top"
      >
        <svg
          className="absolute left-3.5 h-5 w-5 text-white transition-transform duration-500 group-hover:-translate-y-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
          />
        </svg>
        <span className="ml-8 whitespace-nowrap text-xs font-bold tracking-wide text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Scroll to top
        </span>
      </motion.button>

      {/* Giant Marquee Text */}
      <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden mt-[20%]">
        <motion.div
          style={{ x: textX, mixBlendMode: "difference", color: "#fff" }}
          className="whitespace-nowrap"
        >
          <h2 className="text-[3.5rem] sm:text-[clamp(5rem,13vw,11rem)] font-black leading-none tracking-tighter text-white select-none">
            Reach Out - Reach Out - Reach Out -
          </h2>
        </motion.div>
      </div>

      {/* Bottom Left — Contact Details */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-20 left-6 md:left-12 z-20"
      >
        <p className="text-white md:text-black text-sm md:text-base leading-loose tracking-wide">
          <span className="font-extrabold text-md">Office:</span>{" "}
          <span className="font-semibold">Rajshahi, Bangladesh</span>
        </p>
        <p className="text-white md:text-black text-sm md:text-base leading-loose tracking-wide">
          <span className="font-extrabold text-md">Mail:</span>{" "}
          <a
            href="mailto:jobayermahmud976@gmail.com"
            className="hover:opacity-60 transition-opacity duration-300 font-semibold"
          >
            jobayermahmud976@gmail.com
          </a>
        </p>
        <p className="text-white md:text-black text-sm md:text-base leading-loose tracking-wide">
          <span className="font-extrabold text-md">Phone:</span>{" "}
          <a
            href="tel:+8801723180690"
            className="hover:opacity-60 transition-opacity duration-300 font-semibold"
          >
            +8801723180690
          </a>
        </p>
      </motion.div>

      {/* Bottom — Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute bottom-6 left-1/2 z-20 flex w-max max-w-[calc(100%-3rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-6"
      >
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white md:text-black font-semibold text-sm tracking-wider hover:opacity-60 transition-opacity duration-300 group"
          >
            <span className="opacity-70 group-hover:opacity-100 transition-opacity">
              {social.icon}
            </span>
            {social.label}
          </a>
        ))}
      </motion.div>
    </footer>
  );
}
