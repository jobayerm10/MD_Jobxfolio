import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.8,
      easing: (t) => {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      },
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.6,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
