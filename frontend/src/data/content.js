import {
  Bot,
  Building2,
  LayoutDashboard,
  Rocket,
  Gauge,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Code2,
  Globe,
  Zap,
  Trophy,
  Users,
  Star,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  TrendingUp,
  Palette
} from 'lucide-react';

export { ArrowRight, CheckCircle2, Star, Trophy, Users, Zap, Code2 };

export const brand = {
  name: 'Nowic Studio',
  tagline: 'Vision to Version',
  logoPrimary: '/image.png',
  logoFallback: '/nowic-logo.svg',
  email: 'hello@nowicstudio.com',
  phone: '+91 98765 43210',
  location: 'India 🇮🇳',
};

export const navLinks = [
  { label: 'Home',      path: '/' },
  { label: 'Services',  path: '/services' },
  { label: 'Pricing',   path: '/pricing' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'About',     path: '/about' },
  { label: 'Contact',   path: '/contact' },
];

export const services = [
  {
    icon: Building2,
    title: 'Website Development',
    headline: 'High-Performance Web Solutions',
    description: 'Modern, responsive, and conversion-optimized websites built with Next.js, headless CMS, and technical SEO architecture.',
    features: ['5–7 Custom Pages', 'Lighthouse 95+ Score', 'SSL & Schema SEO'],
    color: 'rgba(31,200,125,0.12)',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    headline: 'iOS & Android Applications',
    description: 'Cross-platform and native mobile apps (Flutter, React Native, Swift, Kotlin) with smooth 60fps animations and offline sync.',
    features: ['Single Codebase MVP', 'Biometric Security', 'App Store Publishing'],
    color: 'rgba(52,232,161,0.15)',
  },
  {
    icon: Globe,
    title: 'Custom Software & SaaS',
    headline: 'Multi-Tenant Cloud ERP & SaaS',
    description: 'Enterprise ERPs, CRMs, multi-tenant databases, and automated billing engines built on resilient cloud infrastructure.',
    features: ['Multi-Tenant Database', 'Stripe Automated Billing', 'Role-Based Permissions'],
    color: 'rgba(95,255,192,0.1)',
  },
  {
    icon: Bot,
    title: 'AI & Intelligent Automation',
    headline: 'Custom AI Agents & WhatsApp Bots',
    description: 'Embed custom AI models, RAG document pipelines, and WhatsApp bots trained on your private knowledge base.',
    features: ['Private Data RAG Pipeline', 'WhatsApp & Web Bots', 'Workflow Automation'],
    color: 'rgba(52,232,161,0.12)',
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing & SEO',
    headline: 'Full-Funnel Organic & Paid Growth',
    description: 'Technical SEO audits, high-intent keyword dominance, Google & Meta Ads management, and conversion rate optimization.',
    features: ['Local & Global SEO', 'Google & Meta Ads', 'Monthly Rank Tracking'],
    color: 'rgba(14,165,96,0.12)',
  },
  {
    icon: Palette,
    title: 'Graphics Designing & Branding',
    headline: 'Memorable Brand Identities',
    description: 'Primary/secondary logo suites, brand books, typography systems, marketing collaterals, and editable Figma kits.',
    features: ['Complete Logo Suite', 'Brand Style Guide', 'Social Media Design Kit'],
    color: 'rgba(31,200,125,0.08)',
  },
  {
    icon: Users,
    title: 'Resource Outsource & Staffing',
    headline: 'Dedicated IT Staff & BPO Pods',
    description: 'Augment your engineering sprints with vetted senior software developers, UI designers, and managed BPO support teams.',
    features: ['Senior Dedicated Devs', '3–5 Day Fast Onboarding', 'Free Replacement SLA'],
    color: 'rgba(52,232,161,0.14)',
  },
];

export const stats = [
  { icon: Gauge,       label: 'Fast Delivery',          value: '7–21 Days',          suffix: '' },
  { icon: Sparkles,    label: 'UI Quality',              value: 'Startup-Grade',       suffix: '' },
  { icon: Cpu,         label: 'AI-Powered Dev',          value: 'Automation-First',    suffix: '' },
  { icon: Layers,      label: 'Architecture',            value: 'Future-Ready',        suffix: '' },
  { icon: ShieldCheck, label: 'Execution Quality',       value: 'Zero Fluff',          suffix: '' },
  { icon: Users,       label: 'Satisfied Clients',       value: '30+',                 suffix: '' },
];

export const highlights = [
  { icon: Zap,         value: '3×',   label: 'Faster Development' },
  { icon: Trophy,      value: '98%',  label: 'Client Satisfaction' },
  { icon: Star,        value: '50+',  label: 'Projects Delivered' },
  { icon: Code2,       value: '21d',  label: 'Avg. Time to Launch' },
];

export const whyUs = [
  { title: 'Execution-First Process',        desc: 'We ship in tight sprints with clear milestones — no delays, no excuses.', icon: Rocket },
  { title: 'Senior-Level Code Quality',      desc: 'Every project uses clean architecture, proper patterns, and scalable structure.', icon: Code2 },
  { title: 'AI-Augmented Speed',             desc: 'We leverage AI workflows to deliver 3× faster without compromising quality.', icon: Bot },
  { title: 'Premium UI from Day 1',          desc: 'Your product will look and feel premium — because first impressions win customers.', icon: Sparkles },
  { title: 'Transparent Collaboration',      desc: 'Weekly demos, direct founder access, clear progress — you\'re never in the dark.', icon: Users },
  { title: 'Architecture That Scales',       desc: 'We build for today and tomorrow — clean code that grows with your business.', icon: Layers },
];

export const portfolioItems = [
  {
    title: 'Event Ticket Booking System',
    category: 'Full-Stack Platform',
    description: 'A complete booking platform with event discovery, dynamic seat management, real-time availability, and Stripe payment workflows.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    gradient: 'from-mint/25 via-jade/10 to-emerald/20',
    featured: true,
  },
  {
    title: 'Catering Services Website',
    category: 'Business Website',
    description: 'A high-conversion business site with quote request flows, visual menu showcases, testimonials, and admin content control.',
    tags: ['React', 'SEO', 'CMS', 'Framer Motion'],
    gradient: 'from-jade/20 via-transparent to-mint/20',
    featured: false,
  },
  {
    title: 'Siya AI — Assistant Platform',
    category: 'AI Web Application',
    description: 'An enterprise AI assistant with custom LLM workflows, internal knowledge search, role-based access, and usage analytics.',
    tags: ['LLM', 'OpenAI', 'Dashboards', 'RBAC'],
    gradient: 'from-emerald/20 via-mint/10 to-jade/25',
    featured: true,
  },
  {
    title: 'BloodConnect',
    category: 'Healthcare Platform',
    description: 'A life-saving donor-receiver matching system with real-time blood availability tracking, admin management, and geolocation.',
    tags: ['React', 'MongoDB', 'Maps API', 'Healthcare'],
    gradient: 'from-glow/15 via-transparent to-mint/20',
    featured: false,
  },
];

export const teamValues = [
  'Speed without sacrificing quality',
  'Outcome-driven engineering',
  'Client transparency above all',
  'Continuous improvement mindset',
];

export const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'Most MVPs and websites are delivered in 7–21 days. Complex SaaS platforms take 4–8 weeks depending on scope.',
  },
  {
    q: 'Do you provide post-launch support?',
    a: 'Yes — we offer ongoing maintenance, feature iterations, and dedicated support packages for all projects.',
  },
  {
    q: 'What tech stack do you use?',
    a: 'Primarily React, Next.js, Node.js, MongoDB and PostgreSQL. We adapt to your stack as needed.',
  },
  {
    q: 'Can you work with an existing codebase?',
    a: 'Absolutely. We audit, refactor, and extend existing codebases with clean, maintainable enhancements.',
  },
];
