import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

export default function SmoothScroll({ children }) {
  const locomotiveRef = useRef(null);

  useEffect(() => {
    const locoScroll = new LocomotiveScroll({
      lenisOptions: {
        duration: 2.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.6,
        touchMultiplier: 1.5,
      },
      autoStart: true,
    });

    locomotiveRef.current = locoScroll;

    const timer = setTimeout(() => {
      locoScroll.resize();
    }, 500);

    return () => {
      clearTimeout(timer);
      locoScroll.destroy();
    };
  }, []);

  return <>{children}</>;
}
