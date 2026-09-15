import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Services from './components/Services';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-dark min-h-screen text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Intro />
      <Services />
      <Projects />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
