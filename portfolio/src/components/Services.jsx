import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    number: '01',
    title: 'Branding & Marketing',
    items: ['Brand Strategy', 'Logo Design', 'Visual Identity', 'Brand Guidelines', 'Marketing Materials', 'Motion Design'],
  },
  {
    number: '02',
    title: 'Website Design',
    items: ['Landing Pages', 'Corporate Websites', 'Blogs', 'E-commerce', 'Complex Websites'],
  },
  {
    number: '03',
    title: 'Web Development',
    items: ['Framer/Webflow Builds', 'CMS Integration', 'SEO Optimization', 'Site Migrations'],
  },
  {
    number: '04',
    title: 'Application Design',
    items: ['Mobile Apps', 'Desktop Apps', 'Complex Systems', 'Design Systems Optimization'],
  },
];

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="border border-border p-8 md:p-10 group hover:border-muted/50 transition-colors duration-500"
    >
      <div className="flex items-start gap-6">
        <span className="text-muted font-mono text-sm">{service.number}</span>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-semibold mb-6 group-hover:translate-x-2 transition-transform duration-300">
            {service.title}
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.items.map((item) => (
              <li key={item} className="text-muted text-sm tracking-wide flex items-center gap-2">
                <span className="w-1 h-1 bg-muted rounded-full shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="px-6 md:px-12 py-24 md:py-32 max-w-[1400px] mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight">
          <span className="text-muted font-mono text-[clamp(0.875rem,1.5vw,1.125rem)] font-normal mr-3">#</span>
          What I Do
          <span className="text-muted">-</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, i) => (
          <ServiceCard key={service.number} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}
