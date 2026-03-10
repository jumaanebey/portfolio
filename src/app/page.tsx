'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════
   Jumaane Bey — Portfolio
   ═══════════════════════════════════════════════════════════════ */

const PROJECTS = [
  {
    title: 'Continuum',
    tagline: 'AI-Powered Future Self Operating System',
    description:
      'A 6-agent AI platform for midlife transformation. Deep Life Scan, Future Self archetypes, 12-week pathways, identity experiments, journaling companion, and human mentor matching — all built on a React + Fastify monorepo with Supabase and the Anthropic API.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Supabase', 'Claude API', 'Capacitor'],
    image: 'https://images.unsplash.com/photo-1504198322253-cfa87a0ff25f?w=800&q=80&auto=format&fit=crop',
    url: '#',
    featured: true,
    category: 'AI Platform',
    nda: true,
  },
  {
    title: 'HomeIQ Academy',
    tagline: 'Homebuyer Education Platform',
    description:
      'Interactive homebuyer education platform with a personalized readiness score engine (credit, DTI, down payment, module completion), progress tracking, and native iOS app via Capacitor.',
    tags: ['Next.js', 'Supabase', 'Capacitor', 'iOS', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&auto=format&fit=crop',
    url: 'https://github.com/jumaanebey/homeiq-academy',
    featured: true,
    category: 'EdTech',
  },
  {
    title: 'Forward Horizon',
    tagline: 'Transitional Housing Solutions',
    description:
      'Full ecosystem for structured living communities: marketing site, AI intake agent, API backend, and property management tools. Helping people transition from crisis to stability.',
    tags: ['Next.js', 'AI Agent', 'API', 'Vercel'],
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80&auto=format&fit=crop',
    url: 'https://github.com/jumaanebey/the-forward-horizon',
    category: 'Housing Tech',
  },
  {
    title: 'Stop Foreclosure Fast',
    tagline: 'Real Estate Lead Generation',
    description:
      'High-conversion lead generation site for distressed homeowners facing foreclosure. Google Ads integration, n8n automation workflows, and Twilio SMS follow-up system.',
    tags: ['Next.js', 'n8n', 'Twilio', 'Google Ads', 'Vercel'],
    image: 'https://images.unsplash.com/photo-1582407947092-045b741540d4?w=800&q=80&auto=format&fit=crop',
    url: 'https://github.com/jumaanebey/stop-foreclosure-fast',
    category: 'Real Estate',
  },
  {
    title: 'Kickoff Club HQ',
    tagline: 'Football Learning Platform',
    description:
      'Sports education platform featuring NotebookLM-powered video and podcast lessons. Interactive learning modules for football strategy and skill development.',
    tags: ['React', 'NotebookLM', 'Video', 'Podcast'],
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80&auto=format&fit=crop',
    url: 'https://github.com/jumaanebey/Kickoff-Club-HQ',
    category: 'Sports Tech',
  },
  {
    title: 'Amelia Norvell Coaching',
    tagline: 'Executive Coaching Website',
    description:
      'Professional website for an executive coaching practice. Clean, trust-building design with client intake flows and a UX-first approach to presenting coaching services.',
    tags: ['Next.js', 'Tailwind', 'Vercel'],
    image: 'https://images.unsplash.com/photo-1553484771-047a44eee27b?w=800&q=80&auto=format&fit=crop',
    url: 'https://github.com/jumaanebey/AM-site',
    category: 'Client Work',
  },
  {
    title: 'TBD Property Management',
    tagline: 'Luxury Property Management Ecosystem',
    description:
      'Complete property management platform with luxury focus. Modern technology stack for managing residential properties, tenant communication, and maintenance workflows.',
    tags: ['React', 'TypeScript', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&auto=format&fit=crop',
    url: 'https://github.com/jumaanebey/tbd-property-management',
    category: 'PropTech',
  },
];

const SKILLS = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'Fastify', 'Supabase', 'PostgreSQL'] },
  { category: 'AI & APIs', items: ['Claude API', 'Vapi', 'n8n', 'NotebookLM'] },
  { category: 'Mobile', items: ['Capacitor', 'iOS', 'Android'] },
  { category: 'Infrastructure', items: ['Vercel', 'GitHub Actions', 'Stripe', 'Twilio'] },
];

/* ── Animation Variants ─────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function Portfolio() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <>
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/80 backdrop-blur-xl border-b border-ink/5">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-[--font-display] text-lg font-bold tracking-wide">JB</span>
          <div className="flex items-center gap-6 text-sm text-muted">
            <a href="#work" className="hover:text-ink transition-colors">Work</a>
            <a href="#about" className="hover:text-ink transition-colors">About</a>
            <a href="#contact" className="hover:text-ink transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div className="absolute inset-0 noise" style={{ y: heroY }} aria-hidden="true" />

        <motion.div
          className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
              <span className="w-8 h-px bg-accent" />
              Product Builder &amp; Developer
            </span>
          </motion.div>

          <motion.h1
            className="font-[--font-display] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-ink leading-[0.95] tracking-tight mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Jumaane Bey
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted leading-relaxed max-w-xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            I build AI-powered platforms, real estate tech, and digital products
            that solve real problems for real people. Full-stack. Design-minded.
            Shipping fast.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <a
              href="#work"
              className="inline-flex items-center px-7 py-3.5 bg-ink text-paper font-semibold text-sm rounded-full hover:bg-ink/90 transition-colors"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-7 py-3.5 border border-ink/15 text-ink font-medium text-sm rounded-full hover:border-accent hover:text-accent transition-all"
            >
              Get In Touch
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-5 h-9 rounded-full border-2 border-ink/15 flex items-start justify-center p-1.5"
            >
              <motion.div className="w-1 h-1 rounded-full bg-accent" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── STATS RIBBON ─── */}
      <section className="py-5 bg-ink">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-3">
          {[
            { value: '7+', label: 'Shipped Products' },
            { value: '5', label: 'Industries' },
            { value: 'AI', label: 'Specialization' },
            { value: 'Full-Stack', label: 'Capability' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="font-[--font-display] text-xl font-bold text-accent">{s.value}</span>
              <span className="text-xs text-white/40">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURED WORK ─── */}
      <section id="work" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-4">
              <span className="w-8 h-px bg-accent" />
              Selected Work
            </span>
            <h2 className="font-[--font-display] text-4xl md:text-5xl font-bold text-ink mb-4">
              Projects I&rsquo;ve Built
            </h2>
            <p className="text-lg text-muted max-w-2xl mb-16">
              From AI platforms to real estate tech — each project solves a specific problem
              for a specific audience.
            </p>
          </Reveal>

          {/* Featured projects — large cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {PROJECTS.filter(p => p.featured).map((project, i) => {
              const Wrapper = project.nda ? 'div' : 'a';
              const linkProps = project.nda ? {} : { href: project.url, target: '_blank' as const, rel: 'noopener noreferrer' };
              return (
                <Reveal key={project.title} delay={i * 0.1}>
                  <Wrapper
                    {...linkProps}
                    className="group block relative rounded-2xl overflow-hidden bg-white border border-ink/5 card-hover"
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
                      <span className="absolute top-4 left-4 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider bg-accent text-white rounded-full">
                        {project.category}
                      </span>
                      {project.nda && (
                        <span className="absolute top-4 right-4 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider bg-ink/80 text-white/90 rounded-full border border-white/10 backdrop-blur-sm">
                          Under NDA &middot; Details Shared
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-[--font-display] text-2xl font-bold text-ink mb-1">{project.title}</h3>
                      <p className="text-sm text-accent font-medium mb-3">{project.tagline}</p>
                      <p className="text-sm text-muted leading-relaxed mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-2.5 py-1 text-[10px] font-medium text-ink/50 bg-ink/[0.04] rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Wrapper>
                </Reveal>
              );
            })}
          </div>

          {/* Other projects — smaller cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROJECTS.filter(p => !p.featured).map((project, i) => (
              <motion.a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="group block rounded-xl overflow-hidden bg-white border border-ink/5 card-hover"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-[--font-display] text-lg font-bold text-ink">{project.title}</h3>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-muted">{project.category}</span>
                  </div>
                  <p className="text-sm text-accent font-medium mb-2">{project.tagline}</p>
                  <p className="text-xs text-muted leading-relaxed mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 4).map(tag => (
                      <span key={tag} className="px-2 py-0.5 text-[9px] font-medium text-ink/40 bg-ink/[0.03] rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section className="py-24 md:py-32 bg-warm relative">
        <div className="absolute inset-0 noise" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mx-auto">
              <span className="w-8 h-px bg-accent" />
              Toolkit
              <span className="w-8 h-px bg-accent" />
            </span>
            <h2 className="font-[--font-display] text-4xl md:text-5xl font-bold text-ink mt-4">
              What I Work With
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {SKILLS.map((group, i) => (
              <Reveal key={group.category} delay={i * 0.08}>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-ink/5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                    {group.category}
                  </p>
                  <div className="space-y-2">
                    {group.items.map(item => (
                      <p key={item} className="text-sm text-ink/70">{item}</p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Reveal>
              <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-4">
                <span className="w-8 h-px bg-accent" />
                About
              </span>
              <h2 className="font-[--font-display] text-4xl md:text-5xl font-bold text-ink mb-6">
                Building products<br />that matter
              </h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  I&rsquo;m a product builder and full-stack developer focused on
                  AI-powered platforms, real estate technology, and digital
                  products that create real impact.
                </p>
                <p>
                  My work spans from AI transformation engines (Continuum) to
                  homebuyer education (HomeIQ Academy) to transitional housing
                  solutions (Forward Horizon). I care about craft, speed, and
                  building things that people actually use.
                </p>
                <p>
                  I work across the full stack — React, Next.js, TypeScript on
                  the frontend; Node.js, Supabase, PostgreSQL on the backend;
                  Claude API, Vapi, and n8n for AI and automation. I ship fast
                  and iterate based on real feedback.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format&fit=crop"
                    alt="Collaborative work environment"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-accent text-white px-6 py-4 rounded-xl shadow-lg">
                  <p className="font-[--font-display] text-2xl font-bold">7+</p>
                  <p className="text-xs text-white/70">Products Shipped</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-24 md:py-32 bg-ink relative">
        <div className="absolute inset-0 noise" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mx-auto">
              <span className="w-8 h-px bg-accent" />
              Get In Touch
              <span className="w-8 h-px bg-accent" />
            </span>
            <h2 className="font-[--font-display] text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Let&rsquo;s build something
            </h2>
            <p className="text-lg text-white/40 mb-10 max-w-lg mx-auto">
              Whether you have an idea, a product that needs building, or just want to
              connect — I&rsquo;d love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/jumaanebey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white font-medium text-sm rounded-full hover:bg-white/15 border border-white/10 transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href="mailto:hello@jumaanebey.com"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold text-sm rounded-full hover:shadow-[0_0_40px_rgba(200,168,85,0.3)] transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13 2 4" />
                </svg>
                Email Me
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-ink border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-[--font-display] text-sm font-bold text-white/30">Jumaane Bey</span>
          <p className="text-xs text-white/15">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
