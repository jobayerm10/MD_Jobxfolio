import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

export default function Preloader({ onComplete }) {
  const [loading, setLoading] = useState(true);
  const counterRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let count = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
          onComplete: () => {
            setLoading(false);
            onComplete?.();
          },
        });
      },
    });

    tl.to(count, {
      val: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.floor(count.val);
        }
      },
    });
  }, [onComplete]);

  if (!loading) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[100] bg-[#E8E4E0] flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-black/40 font-mono text-sm tracking-widest uppercase">
              Loading
            </span>
            <div className="flex items-baseline gap-1">
              <span
                ref={counterRef}
                className="text-[clamp(4rem,15vw,12rem)] font-black text-black leading-none tracking-tighter"
              >
                0
              </span>
              <span className="text-black/40 font-mono text-lg">%</span>
            </div>
          </div>

          {/* Animated bar */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-px bg-black/10 overflow-hidden">
            <motion.div
              className="h-full bg-black"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
