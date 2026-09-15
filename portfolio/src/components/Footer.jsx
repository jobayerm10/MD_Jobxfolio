import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const socialLinks = ['Linkedin', 'Twitter', 'Instagram', 'Dribbble'];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <footer id="contact" className="px-6 md:px-12 py-24 md:py-32 max-w-[1400px] mx-auto border-t border-border">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <h2 className="text-[clamp(2.5rem,7vw,6rem)] font-bold tracking-tight leading-[0.95] mb-16">
          <span className="text-muted font-mono text-[clamp(0.875rem,1.5vw,1.125rem)] font-normal mr-3">#</span>
          Reach Out
          <span className="text-muted">-</span>
        </h2>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20">
          {/* Office */}
          <div className="border border-border p-8 group hover:border-muted/50 transition-colors duration-500">
            <span className="text-muted text-xs tracking-widest uppercase block mb-4">Office</span>
            <p className="text-white text-lg leading-relaxed">
              Rajshahi,<br />Bangladesh
            </p>
          </div>

          {/* Mail */}
          <div className="border border-border p-8 group hover:border-muted/50 transition-colors duration-500">
            <span className="text-muted text-xs tracking-widest uppercase block mb-4">Mail</span>
            <a
              href="mailto:jobayermahmud976@gmail.com"
              className="text-white text-lg leading-relaxed hover:text-muted transition-colors duration-300 break-all"
            >
              jobayermahmud976@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div className="border border-border p-8 group hover:border-muted/50 transition-colors duration-500">
            <span className="text-muted text-xs tracking-widest uppercase block mb-4">Phone</span>
            <a
              href="tel:+8801723180690"
              className="text-white text-lg leading-relaxed hover:text-muted transition-colors duration-300"
            >
              +8801723180690
            </a>
          </div>
        </div>

        {/* Social & Bottom */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-8 border-t border-border">
          <div className="flex flex-wrap gap-6">
            {socialLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-muted text-sm tracking-widest hover:text-white transition-colors duration-300 relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <p className="text-muted text-xs tracking-wider">
            © 2024 Jobayer Mahmud. All Rights Reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
