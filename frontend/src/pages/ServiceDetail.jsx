import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import LoadingSpinner from '../components/LoadingSpinner';
import SEO from '../components/SEO';
import SectionHeading from '../components/common/SectionHeading';
import ScrollReveal from '../components/reveal/ScrollReveal';
import Breadcrumbs from '../components/common/Breadcrumbs';
import NotFound from './NotFound';
import { CheckCircle2, ArrowRight, HelpCircle, BookOpen, Calendar } from 'lucide-react';
import RelatedServices from '../components/common/RelatedServices';
import { resolveIcon } from '../lib/icons';
import { api, resolveImageUrl } from '../lib/api';

/* 
   Manual mapping of Service Slugs -> Array of relevant Blog Post Slugs.
   Based on live production database slugs.
*/
const SERVICE_BLOG_MAPPING = {
  'mvp-development': ['mvp-development-cost-india-2025'],
  'ai-web-apps': ['ai-assisted-development-code-review'],
};

function toSlug(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function formatCurrency(value) {
  if (value === null || value === undefined || value === '') return '';
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return String(value);
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(numeric);
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const { content, loading } = useContent();
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  // Fetch matching blog posts for this specific service
  useEffect(() => {
    const mappedBlogSlugs = SERVICE_BLOG_MAPPING[slug] || [];
    if (mappedBlogSlugs.length > 0) {
      api.public_getBlogs().then(res => {
        if (res.success) {
          const matched = (res.data || []).filter(post => mappedBlogSlugs.includes(post.slug));
          setRelatedBlogs(matched);
        }
      }).catch(() => {});
    } else {
      setRelatedBlogs([]);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-[#050806]">
        <LoadingSpinner />
      </div>
    );
  }

  const services = content?.services || [];
  const service = services.find(s => toSlug(s.title) === slug);

  if (!service) {
    return <NotFound />;
  }

  const Icon = typeof service.icon === 'function' ? service.icon : resolveIcon(service.icon);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": service.title,
      "description": service.description,
      "provider": {
        "@type": "Organization",
        "name": "Nowic Studio",
        "url": "https://www.nowicstdio.tech"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.nowicstdio.tech/" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.nowicstdio.tech/services" },
        { "@type": "ListItem", "position": 3, "name": service.title, "item": `https://www.nowicstdio.tech/services/${slug}` }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": (service.faqs || []).map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a }
      }))
    }
  ];

  return (
    <>
      <SEO 
        title={`${service.title} Services | Nowic Studio`}
        description={service.description}
        canonicalUrl={`https://www.nowicstdio.tech/services/${slug}`}
        keywords={`${service.title.toLowerCase()} services, software development, Nowic Studio`}
        schema={schema}
      />

      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[#050806]" />
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-[#34d99a]/5 blur-[120px]" />
        
        <div className="container-shell relative z-10">
          <Breadcrumbs items={[
            { label: 'Services', path: '/services' },
            { label: service.title, path: `/services/${slug}` }
          ]} />
          
          <div className="max-w-4xl mx-auto text-center mt-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-mint/10 text-mint mb-8">
              <Icon size={40} />
            </div>
            
            <p className="eyebrow">{service.title}</p>
            <h1 className="mt-4 font-display text-4xl font-extrabold text-[#f0f0f3] leading-tight sm:text-5xl md:text-6xl">
              {service.headline}
            </h1>
            <p className="mt-6 text-lg text-[#8b8fa3] leading-relaxed max-w-2xl mx-auto">
              {service.description}
            </p>

            {/* Metadata Badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {service.price_starting && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">Starts at</span>
                  <span className="text-sm font-bold text-mint">₹{formatCurrency(service.price_starting)}</span>
                </div>
              )}
              {service.delivery_days && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">Timeline</span>
                  <span className="text-sm font-bold text-[#f0f0f3]">{service.delivery_days} Days</span>
                </div>
              )}
            </div>

            {service.keyTech && service.keyTech.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {service.keyTech.map(tech => (
                  <span key={tech} className="px-3 py-1 rounded-full bg-[#34d99a]/5 border border-[#34d99a]/10 text-[11px] text-[#cbd5e1] font-medium tracking-wide">
                    {tech}
                  </span>
                ))}
              </div>
            )}
            
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link to={`/booking?service=${slug}`} className="cta-btn">
                Book a Strategy Call <ArrowRight size={16} className="ml-2" />
              </Link>
              <Link to="/contact" className="outline-btn">
                Request a Custom Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 border-y border-white/5 bg-[#0a0b0f]">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="The Nowic |Advantage"
            description="We build products that look incredible and perform flawlessly."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(service.benefits || []).map((benefit, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="card h-full p-6 bg-white/[0.02] border border-white/5 hover:border-mint/20 transition-all">
                  <CheckCircle2 size={24} className="text-mint mb-4" />
                  <p className="text-sm text-text font-medium leading-relaxed">{benefit}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <RelatedServices currentServiceSlug={slug} />

      {/* Features */}
      <section className="py-24 relative overflow-hidden">
        <div className="container-shell">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-center">
            <div>
              <p className="eyebrow">What's Included</p>
              <h2 className="mt-4 font-display text-3xl font-bold text-text">
                Everything you need to <span className="text-mint">succeed</span>.
              </h2>
              <p className="mt-4 text-sub leading-relaxed">
                We don't just write code. We provide a complete end-to-end engineering service. From architecture design to deployment, we've got you covered.
              </p>
              <Link to="/portfolio" className="inline-flex items-center gap-2 mt-8 text-mint font-bold text-sm uppercase tracking-wider hover:text-white transition-colors">
                View Our Portfolio <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {(service.features || []).map((feature, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <CheckCircle2 size={18} className="text-mint shrink-0 mt-0.5" />
                    <span className="text-sm text-[#cbd5e1] font-medium">{feature}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources (Blog) */}
      {relatedBlogs.length > 0 && (
        <section className="py-24 relative overflow-hidden bg-[#050806]">
          <div className="container-shell">
            <SectionHeading
              eyebrow="Resources"
              title="Related |Insights"
              description="Deep dives and guides related to this service."
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {relatedBlogs.map((post, i) => (
                <ScrollReveal key={post.slug} delay={i * 0.07}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex flex-col h-full rounded-2xl bg-white/[0.02] border border-white/5 hover:border-mint/20 hover:bg-white/[0.04] overflow-hidden transition-all"
                  >
                    {/* Cover image */}
                    <div className="h-40 w-full overflow-hidden bg-surface/30 border-b border-white/5">
                      {post.cover_image_url ? (
                        <img src={resolveImageUrl(post.cover_image_url)} alt={post.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-[#3a3e50]">
                          <BookOpen size={32} />
                        </div>
                      )}
                    </div>
                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1 gap-3">
                      <div className="flex items-center gap-1.5 text-[10px] text-muted">
                        <Calendar size={10} />
                        {new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </div>
                      <h3 className="font-display text-base font-bold text-text group-hover:text-mint transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <div className="mt-auto pt-2 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-mint hover:text-white transition-colors">
                        Read Article <ArrowRight size={12} />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="py-24 border-t border-white/5 bg-[#0a0b0f] relative overflow-hidden">
        <div className="container-shell max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="FAQ"
            title="Common |questions"
            description="Everything you need to know about our process."
          />

          <div className="mt-16 space-y-4">
            {(service.faqs || []).map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors">
                  <h4 className="text-lg font-bold text-[#f0f0f3] flex items-start gap-3">
                    <HelpCircle size={20} className="text-[#34d99a] shrink-0 mt-0.5" />
                    {faq.q}
                  </h4>
                  <p className="mt-4 text-[#8b8fa3] text-sm leading-relaxed pl-8">
                    {faq.a}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
