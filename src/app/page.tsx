'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════
   Jumaane Bey — Portfolio
   ═══════════════════════════════════════════════════════════════ */

/* ── Animated Counter ───────────────────────────────────────── */

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Data ───────────────────────────────────────────────────── */

interface Project {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  image: string;
  url: string;
  featured?: boolean;
  category: string;
  nda?: boolean;
}

const PROJECTS: Project[] = [
  {
    title: 'NDA Project',
    tagline: 'AI-Powered Wellness Platform',
    description:
      'Full-stack AI platform built for a wellness startup. Led architecture, frontend, and AI integration from PRD to working prototype with mobile app.',
    tags: ['React', 'TypeScript', 'AI Integration', 'Full-Stack', 'Mobile'],
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
      'Interactive homebuyer education platform with a personalized readiness score engine, progress tracking, and native iOS app via Capacitor.',
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
      'Full ecosystem for structured living communities: marketing site, AI intake agent, API backend, and property management tools.',
    tags: ['Next.js', 'AI Agent', 'API', 'Vercel'],
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80&auto=format&fit=crop',
    url: 'https://github.com/jumaanebey/the-forward-horizon',
    category: 'Housing Tech',
  },
  {
    title: 'Stop Foreclosure Fast',
    tagline: 'Real Estate Lead Generation',
    description:
      'High-conversion lead gen site for distressed homeowners. Google Ads integration, n8n automation workflows, and Twilio SMS follow-up.',
    tags: ['Next.js', 'n8n', 'Twilio', 'Google Ads'],
    image: 'https://images.unsplash.com/photo-1582407947092-045b741540d4?w=800&q=80&auto=format&fit=crop',
    url: 'https://github.com/jumaanebey/stop-foreclosure-fast',
    category: 'Real Estate',
  },
  {
    title: 'Kickoff Club HQ',
    tagline: 'Football Learning Platform',
    description:
      'Sports education platform with NotebookLM-powered video and podcast lessons for football strategy and skill development.',
    tags: ['React', 'NotebookLM', 'Video', 'Podcast'],
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80&auto=format&fit=crop',
    url: 'https://github.com/jumaanebey/Kickoff-Club-HQ',
    category: 'Sports Tech',
  },
  {
    title: 'Executive Coaching Site',
    tagline: 'Client Website for a Coaching Practice',
    description:
      'Professional website for an executive coaching practice. Trust-building design with client intake flows and UX-first approach.',
    tags: ['Next.js', 'Tailwind', 'Vercel'],
    image: 'https://images.unsplash.com/photo-1553484771-047a44eee27b?w=800&q=80&auto=format&fit=crop',
    url: '#',
    category: 'Client Work',
    nda: true,
  },
  {
    title: 'TBD Property Management',
    tagline: 'Luxury Property Management Ecosystem',
    description:
      'Complete property management platform with luxury focus. Tenant communication, maintenance workflows, and owner dashboards.',
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

const PROCESS = [
  {
    step: '01',
    title: 'Understand',
    description: 'I start with the problem, not the tech. Who are the users? What outcome matters? What does success look like in 90 days?',
  },
  {
    step: '02',
    title: 'Architect',
    description: 'Pick the right tools for the job. Design the data model, map the user flows, and make hard decisions about scope early.',
  },
  {
    step: '03',
    title: 'Build Fast',
    description: 'Working prototypes over slide decks. I ship incrementally — real users giving real feedback as early as possible.',
  },
  {
    step: '04',
    title: 'Iterate',
    description: 'Measure what matters, cut what doesn\'t work, double down on what does. Products improve through use, not theory.',
  },
];

/* ── Helpers ────────────────────────────────────────────────── */

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

function Eyebrow({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-accent ${center ? 'mx-auto' : ''}`}>
      <span className="w-8 h-px bg-accent" />
      {children}
      {center && <span className="w-8 h-px bg-accent" />}
    </span>
  );
}

function ProjectCard({ project, size = 'large' }: { project: Project; size?: 'large' | 'small' }) {
  const isLarge = size === 'large';
  const isNda = project.nda;

  const card = (
    <div className={`group relative ${isLarge ? 'rounded-2xl' : 'rounded-xl'} overflow-hidden bg-white border border-ink/5 card-hover h-full flex flex-col`}>
      <div className={`${isLarge ? 'aspect-[16/10]' : 'aspect-[16/9]'} overflow-hidden relative`}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/20 to-transparent" />
        <span className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full ${isNda ? 'bg-ink/70 text-white/80 border border-white/10 backdrop-blur-sm' : 'bg-accent text-white'}`}>
          {project.category}
        </span>
        {isNda && (
          <span className="absolute bottom-4 left-4 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider bg-white/15 text-white/70 rounded-full border border-white/10 backdrop-blur-sm">
            Under NDA
          </span>
        )}
        {!isNda && (
          <span className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-5 h-5 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </span>
        )}
      </div>
      <div className={`${isLarge ? 'p-6' : 'p-5'} flex flex-col flex-1`}>
        <h3 className={`font-[--font-display] ${isLarge ? 'text-2xl' : 'text-lg'} font-bold text-ink mb-1`}>{project.title}</h3>
        <p className={`${isLarge ? 'text-sm' : 'text-xs'} text-accent font-medium mb-3`}>{project.tagline}</p>
        <p className={`${isLarge ? 'text-sm' : 'text-xs'} text-muted leading-relaxed mb-4 flex-1 ${!isLarge ? 'line-clamp-2' : ''}`}>{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, isLarge ? 10 : 4).map(tag => (
            <span key={tag} className={`px-2.5 py-1 ${isLarge ? 'text-[10px]' : 'text-[9px]'} font-medium text-ink/40 bg-ink/[0.04] rounded-full`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (isNda) return card;

  return (
    <a href={project.url} target="_blank" rel="noopener noreferrer" className="block h-full">
      {card}
    </a>
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
          <div className="hidden sm:flex items-center gap-6 text-sm text-muted">
            <a href="#work" className="hover:text-ink transition-colors">Work</a>
            <a href="#process" className="hover:text-ink transition-colors">Process</a>
            <a href="#about" className="hover:text-ink transition-colors">About</a>
            <a href="#contact" className="hover:text-ink transition-colors">Contact</a>
          </div>
          <a
            href="#contact"
            className="text-xs font-semibold px-4 py-2 bg-accent text-white rounded-full hover:shadow-[0_0_30px_rgba(200,168,85,0.25)] transition-all"
          >
            Hire Me
          </a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Ambient background */}
        <motion.div className="absolute inset-0" style={{ y: heroY }} aria-hidden="true">
          <div className="absolute inset-0 noise" />
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-accent/[0.04] blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[100px]" />
        </motion.div>

        <motion.div
          className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 w-full"
          style={{ opacity: heroOpacity }}
        >
          <div className="grid lg:grid-cols-[1fr,auto] gap-12 items-center">
            <div>
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/[0.08] border border-accent/15 rounded-full text-xs font-medium text-accent">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Available for new projects
                </span>
              </motion.div>

              <motion.h1
                className="font-[--font-display] text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-ink leading-[0.92] tracking-tight mb-6"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                I build products<br />
                <span className="text-gradient italic">people use.</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-muted leading-relaxed max-w-lg mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                Full-stack developer specializing in AI-powered platforms,
                real estate tech, and digital products. I take ideas from
                PRD to production — fast.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-ink text-paper font-semibold text-sm rounded-full hover:bg-ink/90 transition-colors min-h-[48px]"
                >
                  View My Work
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center px-7 py-3.5 border border-ink/15 text-ink font-medium text-sm rounded-full hover:border-accent hover:text-accent transition-all min-h-[48px]"
                >
                  Get In Touch
                </a>
              </motion.div>
            </div>

            {/* Stats column */}
            <motion.div
              className="hidden lg:flex flex-col gap-8 pr-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {[
                { value: 7, suffix: '+', label: 'Products Shipped' },
                { value: 5, suffix: '', label: 'Industries' },
                { value: 3, suffix: '+', label: 'Years Building' },
              ].map((s) => (
                <div key={s.label} className="text-right">
                  <p className="font-[--font-display] text-4xl font-bold text-ink">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-xs text-muted mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

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

      {/* ─── MARQUEE RIBBON ─── */}
      <section className="py-4 bg-ink overflow-hidden">
        <div className="flex items-center gap-8 animate-[marquee_30s_linear_infinite] w-max">
          {[...Array(2)].map((_, d) => (
            <div key={d} className="flex items-center gap-8">
              {['React', 'Next.js', 'TypeScript', 'Supabase', 'Claude API', 'Tailwind', 'Capacitor', 'Vercel', 'Node.js', 'Stripe', 'Twilio', 'n8n'].map((t) => (
                <span key={`${d}-${t}`} className="flex items-center gap-3 whitespace-nowrap">
                  <span className="text-sm font-medium text-white/30">{t}</span>
                  <span className="w-1 h-1 rounded-full bg-accent/40" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ─── WORK ─── */}
      <section id="work" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <Eyebrow>Selected Work</Eyebrow>
            <h2 className="font-[--font-display] text-4xl md:text-5xl font-bold text-ink mt-4 mb-4">
              Projects I&rsquo;ve Built
            </h2>
            <p className="text-lg text-muted max-w-2xl mb-16">
              From AI platforms to real estate tech — each project solves a specific problem
              for a specific audience.
            </p>
          </Reveal>

          {/* Featured — large */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {PROJECTS.filter(p => p.featured).map((project, i) => (
              <Reveal key={project.title} delay={i * 0.1}>
                <ProjectCard project={project} size="large" />
              </Reveal>
            ))}
          </div>

          {/* Rest — smaller */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROJECTS.filter(p => !p.featured).map((project, i) => (
              <Reveal key={project.title} delay={i * 0.08}>
                <ProjectCard project={project} size="small" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section id="process" className="py-24 md:py-32 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 noise" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[120px]" aria-hidden="true" />

        <div className="relative max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <Eyebrow center>How I Work</Eyebrow>
            <h2 className="font-[--font-display] text-4xl md:text-5xl font-bold text-white mt-4">
              From idea to production
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.1}>
                <div className="relative p-6 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-accent/30 transition-colors">
                  <span className="font-[--font-display] text-3xl font-bold text-accent/20 mb-4 block">{p.step}</span>
                  <h3 className="font-[--font-display] text-xl font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{p.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section className="py-24 md:py-32 bg-warm relative">
        <div className="absolute inset-0 noise" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <Eyebrow center>Toolkit</Eyebrow>
            <h2 className="font-[--font-display] text-4xl md:text-5xl font-bold text-ink mt-4">
              What I Work With
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SKILLS.map((group, i) => (
              <Reveal key={group.category} delay={i * 0.06}>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-ink/5 h-full">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                    {group.category}
                  </p>
                  <div className="space-y-2.5">
                    {group.items.map(item => (
                      <p key={item} className="text-sm text-ink/60 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-accent/40 flex-shrink-0" />
                        {item}
                      </p>
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
          <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-start">
            <div className="md:col-span-3">
              <Reveal>
                <Eyebrow>About</Eyebrow>
                <h2 className="font-[--font-display] text-4xl md:text-5xl font-bold text-ink mt-4 mb-8">
                  Building products that<br />create real impact
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="space-y-5 text-muted leading-relaxed">
                  <p>
                    I&rsquo;m a product builder and full-stack developer. I specialize in
                    taking ideas from concept to shipped product — handling everything from
                    architecture decisions to pixel-level frontend polish.
                  </p>
                  <p>
                    My work spans AI-powered platforms, homebuyer education,
                    transitional housing solutions, sports tech, and real estate lead
                    generation. I care about craft, speed, and building things people
                    actually use.
                  </p>
                  <p>
                    I work across the full stack — React, Next.js, TypeScript on
                    the frontend; Node.js, Supabase, PostgreSQL on the backend;
                    Claude API, Vapi, and n8n for AI and automation. I ship fast
                    and iterate based on real feedback.
                  </p>
                </div>
              </Reveal>

              {/* Highlights */}
              <Reveal delay={0.2}>
                <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-ink/5">
                  {[
                    { label: 'Products Shipped', value: '7+' },
                    { label: 'Industries', value: '5' },
                    { label: 'Stack Depth', value: 'Full' },
                  ].map((h) => (
                    <div key={h.label}>
                      <p className="font-[--font-display] text-3xl font-bold text-ink">{h.value}</p>
                      <p className="text-xs text-muted mt-1">{h.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Vertical card */}
            <Reveal delay={0.15} className="md:col-span-2">
              <div className="bg-ink rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 noise" />
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-accent/10 blur-[60px]" />
                <div className="relative">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-6">What I Believe</p>
                  <div className="space-y-6">
                    {[
                      'Ship early. Learn fast. Iterate always.',
                      'The right architecture saves months.',
                      'AI should solve problems, not create complexity.',
                      'Design is how it works, not just how it looks.',
                    ].map((belief) => (
                      <div key={belief} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <p className="text-sm text-white/60 leading-relaxed font-[--font-display] italic">{belief}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-24 md:py-32 bg-ink relative">
        <div className="absolute inset-0 noise" aria-hidden="true" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[120px]" aria-hidden="true" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <Eyebrow center>Get In Touch</Eyebrow>
            <h2 className="font-[--font-display] text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
              Let&rsquo;s build<br />something great
            </h2>
            <p className="text-lg text-white/40 mb-10 max-w-lg mx-auto">
              Have a product idea? Need a technical co-builder?
              I&rsquo;d love to hear what you&rsquo;re working on.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a
                href="mailto:hello@jumaanebey.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-semibold text-sm rounded-full hover:shadow-[0_0_50px_rgba(200,168,85,0.3)] transition-all min-h-[52px]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13 2 4" />
                </svg>
                hello@jumaanebey.com
              </a>
            </div>

            {/* Social links */}
            <div className="flex justify-center gap-4">
              {[
                { label: 'GitHub', href: 'https://github.com/jumaanebey', icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/jumaanebey', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-accent hover:border-accent/30 transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.icon} />
                  </svg>
                </a>
              ))}
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
