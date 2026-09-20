import { useState, useCallback } from "react";
import SmoothScroll from "./components/SmoothScroll";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

function App() {
  const [loaded, setLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <SmoothScroll>
      <div className="bg-dark min-h-screen text-white overflow-x-hidden">
        <Preloader onComplete={handlePreloaderComplete} />
        <Navbar />
        <div className="relative">
          <Hero />
          <Intro />
        </div>
        <div className="relative">
          <Services />
          <div className="relative z-10">
            <Projects />
            <div className="relative z-10">
              <Testimonials />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
}

export default App;
