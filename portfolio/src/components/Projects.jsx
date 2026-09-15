import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    year: '2024',
    title: 'Formula Vintage',
    description: 'A premium landing page and mobile app redesign for a vintage automotive brand, blending classic aesthetics with modern digital experiences.',
    tags: ['Landing Page', 'Mobile App', 'Redesign'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=500&fit=crop',
  },
  {
    year: '2024',
    title: 'Sprey Zest',
    description: 'Complete website design and brand identity for a beverage company, focusing on vibrant visual storytelling and conversion-driven layouts.',
    tags: ['Website Design', 'Branding'],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop',
  },
  {
    year: '2020',
    title: 'Super Pro',
    description: 'Cross-platform desktop and mobile application design for a productivity tool, emphasizing intuitive workflows and clean interfaces.',
    tags: ['Desktop App', 'Mobile App'],
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=500&fit=crop',
  },
  {
    year: '2024',
    title: 'Architech Buildings',
    description: 'End-to-end mobile app, branding, and website design for a construction tech startup, delivering a cohesive premium brand experience.',
    tags: ['Mobile App', 'Branding', 'Website Design'],
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=500&fit=crop',
  },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group border border-border overflow-hidden hover:border-muted/50 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/9]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="p-8 md:p-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-muted font-mono text-sm">({project.year})</span>
          <h3 className="text-2xl md:text-3xl font-bold group-hover:translate-x-2 transition-transform duration-300">
            {project.title}
          </h3>
        </div>

        <p className="text-muted text-sm leading-relaxed mb-6 max-w-2xl">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-xs tracking-wider border border-border text-muted hover:text-white hover:border-muted transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="px-6 md:px-12 py-24 md:py-32 max-w-[1400px] mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <h2
          id="recent-projects-headline"
          className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight"
        >
          <span className="text-muted font-mono text-[clamp(0.875rem,1.5vw,1.125rem)] font-normal mr-3">#</span>
          Recent Projects
          <span className="text-muted">-</span>
        </h2>
      </motion.div>

      <div className="flex flex-col gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
