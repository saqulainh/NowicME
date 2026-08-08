import { useParams, Link } from 'react-router-dom';
import { caseStudyDetails, toProjectSlug } from '../data/caseStudyDetails';
import SEO from '../components/SEO';
import SectionHeading from '../components/common/SectionHeading';
import ScrollReveal from '../components/reveal/ScrollReveal';
import Breadcrumbs from '../components/common/Breadcrumbs';
import NotFound from './NotFound';
import { ArrowRight, ExternalLink, CheckCircle2, Layers, Clock, Users } from 'lucide-react';

export default function PortfolioDetail() {
  const { slug } = useParams();
  // Fallback: use caseStudyDetails if available
  const study = caseStudyDetails[slug];

  if (!study) return <NotFound />;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": study.title,
      "description": study.heroSummary,
      "author": { "@type": "Organization", "name": "Nowic Studio", "url": "https://nowicstdio.tech" }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nowicstdio.tech/" },
        { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://nowicstdio.tech/portfolio" },
        { "@type": "ListItem", "position": 3, "name": study.title, "item": `https://nowicstdio.tech/portfolio/${slug}` }
      ]
    }
  ];

  return (
    <>
      <SEO title={`${study.title} — Portfolio | Nowic Studio`} description={study.heroSummary} canonicalUrl={`https://nowicstdio.tech/portfolio/${slug}`} schema={schema} />

      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="container-shell relative z-10">
          <Breadcrumbs items={[{ label: 'Portfolio', path: '/portfolio' }, { label: study.title, path: `/portfolio/${slug}` }]} />

          <div className="max-w-4xl mx-auto mt-12">
            <h1 className="font-display text-4xl font-extrabold text-[#f0f0f3] leading-tight sm:text-5xl md:text-6xl">{study.title}</h1>
            <p className="mt-6 text-lg text-[#8b8fa3] leading-relaxed max-w-3xl">{study.heroSummary}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {study.liveUrl && (
                <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className="cta-btn">
                  View Live <ExternalLink size={14} className="ml-2" />
                </a>
              )}
              <Link to="/contact" className="outline-btn">Start a Project</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-white/5 bg-[#0a0b0f]">
        <div className="container-shell max-w-4xl mx-auto">
          <SectionHeading eyebrow="Overview" title="Project Details" />
          <div className="mt-6 text-base text-[#8b8fa3] leading-relaxed">{study.problem}</div>
        </div>
      </section>

      <section className="py-24 border-t border-white/5">
        <div className="container-shell max-w-4xl mx-auto">
          <SectionHeading eyebrow="Solution" title="How We Solved It" />
          <div className="mt-6 text-base text-[#8b8fa3] leading-relaxed">{study.solution}</div>
        </div>
      </section>

      <section className="py-24 border-t border-white/5 bg-[#0a0b0f]">
        <div className="container-shell">
          <SectionHeading eyebrow="Results" title="Impact" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {study.results.map((r, i) => (
              <div key={i} className="card p-6 text-center bg-white/[0.02] border border-white/5">
                <p className="font-display text-3xl font-extrabold text-[#34d99a]">{r.metric}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-muted">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
