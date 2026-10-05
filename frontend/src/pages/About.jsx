import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Linkedin } from 'lucide-react';
import SEO from '../components/SEO';
import SectionHeading from '../components/common/SectionHeading';
import ScrollReveal from '../components/reveal/ScrollReveal';
import BrandLogo from '../components/common/BrandLogo';
import { useContent } from '../context/ContentContext';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCountUp } from '../hooks/use-count-up';

function StatCard({ stat }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  // useCountUp returns { count, startAnimation } — extract properly (rendering
  // the hook object directly crashes React with "Objects are not valid as a
  // React child" and blanks the whole About page).
  const raw = String(stat.val ?? '');
  const match = raw.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const end = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : raw;
  const { count, startAnimation } = useCountUp(end ?? 0);

  useEffect(() => {
    if (isVisible && end !== null) {
      startAnimation();
    }
  }, [isVisible, end, startAnimation]);

  const displayValue = end === null ? raw : `${count}${suffix}`;
  return (
    <div ref={ref} className="rounded-xl bg-surface p-3">
      <p className="font-display text-lg font-bold text-text">{displayValue}</p>
      <p className="text-[10px] uppercase tracking-widest text-muted">{stat.label}</p>
    </div>
  );
}

const defaultMilestones = [
  { year: '2023', title: 'Studio Founded', desc: 'Nowic Studio was born from a belief: great products deserve great execution.' },
  { year: '2024', title: '25+ Projects', desc: 'Expanded to full-stack platforms, AI apps, and healthcare solutions.' },
  { year: '2025', title: 'AI-First', desc: 'Integrated AI workflows for 3× faster product delivery.' },
  { year: '2026', title: '50+ & Growing', desc: 'Serving founders and enterprises across India and globally.' },
];

const whyUs = [
  { title: 'One Technical Partner', desc: 'Web, mobile, SaaS, AI, APIs and cloud delivery under one accountable engineering team.', icon: CheckCircle2 },
  { title: 'Built Around Your Workflow', desc: 'We learn your users, operations and bottlenecks before choosing a solution or stack.', icon: CheckCircle2 },
  { title: 'Product-Minded Engineering', desc: 'We design for adoption, performance, maintainability and the next stage of growth.', icon: CheckCircle2 },
  { title: 'Transparent Execution', desc: 'Clear scope, milestones, demos and commercial decisions from discovery to handover.', icon: CheckCircle2 },
  { title: 'Security & Quality by Default', desc: 'Testing, access control, documentation and deployment discipline are part of the work.', icon: CheckCircle2 },
  { title: 'Long-Term Support', desc: 'After launch, we can continue with maintenance, scaling, security and product improvements.', icon: CheckCircle2 },
];

const coreExpertise = [
  { title: 'Web Products', description: 'Responsive marketing sites, CMS platforms, e-commerce and high-performance web applications.' },
  { title: 'Mobile Applications', description: 'Flutter, React Native, Swift and Kotlin products for Android, iOS and cross-platform delivery.' },
  { title: 'AI & Automation', description: 'Practical assistants, search, document workflows, integrations and business process automation.' },
  { title: 'Custom Software', description: 'CRM, ERP, admin systems, SaaS platforms and API-first architecture for complex operations.' },
];

const deliveryStandards = [
  { title: 'Clear Commercials', description: 'Scope, features, pricing, milestones, third-party costs and handover terms are documented before build.' },
  { title: 'Scalable Foundations', description: 'We plan the architecture so an MVP can evolve into a reliable production system without needless rewrites.' },
  { title: 'Useful Design', description: 'Interfaces are made to be understood, trusted and used repeatedly across devices and workflows.' },
  { title: 'Post-Launch Ownership', description: 'Warranty support, maintenance, technical assistance and growth planning continue after release.' },
];

const teamValues = [
  'Speed without sacrificing quality',
  'Outcome-driven engineering',
  'Client transparency above all',
  'Continuous improvement mindset',
];

const defaultTeamProfiles = [
  { name: 'Saqulain Haider', role: 'Founder & Lead Engineer', initials: 'SH', linkedin: '' },
  { name: 'Amark Rydav', role: 'Engineering & Operations', initials: 'AR', linkedin: '' },
  { name: 'Product Design Team', role: 'UI/UX & Product Design', initials: 'PD', linkedin: '' },
  { name: 'Engineering Team', role: 'Full-Stack Delivery', initials: 'ET', linkedin: '' },
];

export default function About() {
  const { content = {}, loading } = useContent();
  const brand = content.brand || {};
  const milestones = content.milestones || defaultMilestones;
  const whyUsItems = content.whyUs || whyUs;
  const teamValueItems = content.teamValues || teamValues;
  const teamProfiles = Array.isArray(content.teamProfiles) && content.teamProfiles.length > 0
    ? content.teamProfiles
    : defaultTeamProfiles;
  const brandName = brand.name || 'Nowic Studio';
  const tagline = brand.tagline || 'Vision to Version';

  useEffect(() => {
    if (!loading) {
      setTimeout(() => document.dispatchEvent(new Event('prerender-trigger')), 150);
    }
  }, [loading]);

  const apiStats = Array.isArray(content?.stats) ? content.stats : [];
  const liveStats = content?.liveStats || {};

  const resolveDisplayValue = (item) => {
    if (item.link_type && item.link_type !== 'manual') {
      return String(liveStats[item.link_type] || 0);
    }
    return item.value;
  };

  const statCards = apiStats.length > 0
    ? apiStats.map(s => ({ val: resolveDisplayValue(s), label: s.label }))
    : [
        { val: '50+', label: 'Projects' },
        { val: '98%', label: 'Satisfaction' },
        { val: '21d', label: 'Avg Launch' },
        { val: '3+', label: 'Years' },
      ];

  const aboutSchema = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Nowic Studio",
      "url": "https://www.nowicstdio.tech/about",
      "description": "Learn about Nowic Studio's journey, our execution-first philosophy, and the engineering principles that guide our product development.",
      "mainEntity": {
        "@type": "Organization",
        "name": "Nowic Studio",
        "alternateName": "Nowic",
        "url": "https://www.nowicstdio.tech",
        "logo": "https://www.nowicstdio.tech/image.png",
        "foundingDate": "2023",
        "description": "Premium software agency building MVPs, SaaS platforms, AI apps, and digital products for startups and businesses worldwide.",
        "areaServed": "Worldwide",
        "email": "haiderssaqulain@gmail.com",
        "knowsAbout": ["MVP Development", "SaaS Development", "AI Integration", "React", "Django", "Next.js", "Python", "Web Design", "API Development"]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.nowicstdio.tech/" },
        { "@type": "ListItem", "position": 2, "name": "About", "item": "https://www.nowicstdio.tech/about" }
      ]
    }
  ];

  return (
    <>
      <SEO 
        title="About Us — Our Story, Values & Engineering Philosophy | Nowic Studio"
        description="Nowic Studio is a premium software agency founded in 2023. We build MVPs, SaaS platforms, and AI apps with an execution-first philosophy. 50+ projects delivered, 98% satisfaction."
        canonicalUrl="https://www.nowicstdio.tech/about"
        keywords="about Nowic Studio, software agency India, startup development company, who is Nowic Studio, software development team, execution-first software agency"
        schema={aboutSchema}
      />
      {/* Hero */}
      <section className="relative py-20">
        <div
          className="pointer-events-none absolute inset-x-0 -top-20 h-60"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(52,217,154,0.06) 0%, transparent 70%)' }}
        />
        <div className="container-shell relative">
          <Breadcrumbs items={[{ label: 'About', path: '/about' }]} />
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <ScrollReveal>
              <p className="eyebrow">About Us</p>
              <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-text sm:text-5xl">
                We are builders{' '}
                <span className="text-gradient">obsessed with outcomes</span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-sub">
                {brandName} is an India-based software studio helping founders and growing teams turn business ideas into reliable digital products — from first prototype to production scale.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/contact" className="cta-btn">
                  Work With Us <ArrowRight size={15} className="ml-2" />
                </Link>
                <Link to="/portfolio" className="outline-btn">View Our Work</Link>
              </div>
            </ScrollReveal>

            {/* Brand card */}
            <ScrollReveal delay={0.1}>
              <div className="card p-7 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-surface">
                  <BrandLogo variant="full" className="h-16 w-16" />
                </div>
                <p className="font-display text-xl font-bold text-text">{brandName}</p>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">{tagline}</p>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  {statCards.map((s) => (
                    <StatCard key={s.label} stat={s} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(#34d99a_0.7px,transparent_0.7px)] [background-size:16px_16px]" />
        <div className="container-shell relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">The People</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-text sm:text-5xl">
              Meet our <span className="text-gradient">team</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-sub">
              The people bringing strategy, design and engineering together for every project.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {teamProfiles.map((member, index) => {
              const name = member.name || member.title || 'Nowic Studio Team';
              const role = member.role || member.position || 'Product Delivery';
              const initials = member.initials || name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
              return (
                <ScrollReveal key={`${name}-${index}`} delay={index * 0.07}>
                  <article className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center transition-all hover:-translate-y-1 hover:border-mint/40 hover:shadow-[0_18px_50px_rgba(52,217,154,0.08)]">
                    <div className="relative mx-auto flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-white/80 bg-gradient-to-br from-mint/30 via-surface to-white/5 text-3xl font-display font-black text-mint shadow-[0_0_0_1px_rgba(52,217,154,0.25)]">
                      {member.image_url || member.image ? (
                        <img src={member.image_url || member.image} alt={name} className="h-full w-full object-cover" loading="lazy" />
                      ) : (
                        initials
                      )}
                      <span className="absolute bottom-1 right-2 h-3 w-3 rounded-full border-2 border-panel bg-mint" aria-label="Available" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-text">{name}</h3>
                    <p className="mx-auto mt-2 inline-flex rounded-full border border-mint/20 bg-mint/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-mint">
                      {role}
                    </p>
                    <div className="mt-5 flex min-h-5 justify-center">
                      {member.linkedin ? (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${name} on LinkedIn`} className="text-muted transition-colors hover:text-mint">
                          <Linkedin size={15} />
                        </a>
                      ) : (
                        <span className="text-muted/40" aria-hidden="true"><Linkedin size={15} /></span>
                      )}
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core expertise */}
      <section className="py-20">
        <div className="container-shell">
          <SectionHeading
            eyebrow="What We Do"
            title="Technology that creates |business value"
            description="We combine product thinking, modern engineering and direct collaboration to solve the problem behind the brief."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {coreExpertise.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.06}>
                <div className="card h-full p-6">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-mint/10 text-mint">
                    <span className="font-display text-sm font-black">0{index + 1}</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-text">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-sub">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What makes us different */}
      <section className="py-20">
        <div className="divider mb-20" />
        <div className="container-shell">
          <SectionHeading
            eyebrow="Our Philosophy"
            title="What makes us |different"
            description="We don't just write code — we engineer outcomes with craft and clarity."
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {whyUsItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title} delay={i * 0.06}>
                  <div className="card p-5 h-full">
                    <div className="icon-box mb-3">
                      <Icon size={16} />
                    </div>
                    <h3 className="font-display text-sm font-bold text-text">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-sub">{item.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="divider mb-20" />
        <div className="container-shell">
          <SectionHeading
            eyebrow="Our Journey"
            title={`The |${brandName}| story`}
          />
          <div className="mx-auto mt-12 max-w-2xl">
            <div className="relative pl-12">
              {/* Line */}
              <div className="absolute left-4 top-2 bottom-2 w-px bg-border" />

              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <ScrollReveal key={`${m.year}-${i}`} delay={i * 0.08}>
                    <div className="relative">
                      <div className="absolute -left-12 flex h-8 w-8 items-center justify-center rounded-lg bg-surface text-xs font-bold text-mint">
                        '{m.year.slice(2)}
                      </div>
                      <div className="card p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-mint">{m.year}</p>
                        <h3 className="mt-1 font-display text-base font-bold text-text">{m.title}</h3>
                        <p className="mt-1 text-sm text-sub">{m.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-shell py-20">
        <ScrollReveal>
          <div className="rounded-2xl bg-panel p-10 sm:p-12" style={{ border: '1px solid #1e2028' }}>
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <p className="eyebrow">Our Values</p>
                <h2 className="mt-4 font-display text-3xl font-bold text-text">
                  Principles we build by
                </h2>
                <p className="mt-3 text-sub">
                  Every decision is guided by these core principles.
                </p>
              </div>
              <ul className="space-y-3">
                {teamValueItems.map((v, i) => (
                  <motion.li
                    key={typeof v === 'string' ? v : v.id || v.text}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 size={16} className="shrink-0 text-mint" />
                    <span className="text-sm font-medium text-text">{typeof v === 'string' ? v : v.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Delivery standards */}
      <section className="container-shell pb-20">
        <ScrollReveal>
          <div className="rounded-2xl border border-mint/20 bg-mint/5 p-8 sm:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="eyebrow">Why Nowic</p>
                <h2 className="mt-4 font-display text-3xl font-bold text-text sm:text-4xl">We build with <span className="text-gradient">purpose</span></h2>
                <p className="mt-4 text-sm leading-relaxed text-sub">Our standards keep the work practical, transparent and ready for the next stage of your business.</p>
                <Link to="/contact" className="cta-btn mt-7 inline-flex items-center gap-2">Work With Us <ArrowRight size={15} /></Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {deliveryStandards.map((item) => (
                  <div key={item.title}>
                    <h3 className="font-display text-sm font-bold text-text">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-sub">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
