import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles, Zap, Shield, HelpCircle } from 'lucide-react';
import SEO from '../components/SEO';
import SectionHeading from '../components/common/SectionHeading';
import ScrollReveal from '../components/reveal/ScrollReveal';

const PRICING_TIERS = [
  {
    name: 'Starter Website',
    price: '$1,499',
    description: 'Perfect for new businesses needing a premium online presence.',
    idealFor: 'Consultants, Local Businesses, Early Startups',
    features: [
      'Custom Premium Design',
      'Up to 5 Pages',
      'Mobile Responsive',
      'Basic SEO Setup',
      'Contact Form Integration',
      '1 Week Delivery',
    ],
    notIncluded: [
      'User Authentication',
      'Custom Backend / CMS',
      'AI Integrations'
    ],
    ctaText: 'Start Your Website',
    popular: false,
    delay: 0.1
  },
  {
    name: 'SaaS / MVP',
    price: '$5,999',
    description: 'Full-stack application ready to launch and acquire users.',
    idealFor: 'SaaS Founders, Funded Startups, Marketplaces',
    features: [
      'Everything in Starter',
      'Custom React/Next.js Frontend',
      'Django/Node.js Backend API',
      'User Authentication & Roles',
      'Payment Gateway Integration',
      'Admin Dashboard',
      '4-6 Weeks Delivery'
    ],
    notIncluded: [
      'Complex AI Agent Workflows'
    ],
    ctaText: 'Build Your MVP',
    popular: true,
    delay: 0.2
  },
  {
    name: 'AI Integration',
    price: '$3,999',
    description: 'Add powerful AI capabilities to your existing product.',
    idealFor: 'Established SaaS, E-commerce, Tech Companies',
    features: [
      'LLM API Integration (OpenAI/Claude)',
      'Custom Chatbots',
      'RAG / Semantic Search',
      'Automated Workflows',
      'Prompt Engineering',
      '2-3 Weeks Delivery'
    ],
    notIncluded: [],
    ctaText: 'Integrate AI',
    popular: false,
    delay: 0.3
  }
];

const FAQS = [
  {
    question: "Do you offer payment plans?",
    answer: "Yes, typically projects are split into milestones: 50% upfront to commence work, and 50% upon final delivery and deployment."
  },
  {
    question: "Are there any hidden costs or ongoing fees?",
    answer: "No hidden costs. The price we quote is the price you pay for development. You will only need to pay for your own hosting and third-party APIs (like OpenAI or Stripe) directly to those providers."
  },
  {
    question: "Do I own the source code?",
    answer: "100% Yes. Upon final payment, the intellectual property and full source code are transferred to you."
  }
];

export default function Pricing() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Pricing — Nowic Studio",
    "description": "Transparent pricing for MVP development, SaaS platforms, and AI integrations."
  };

  return (
    <>
      <SEO 
        title="Pricing | Nowic Studio"
        description="Clear, transparent pricing for premium software development. Explore our packages for Websites, SaaS MVPs, and AI Integrations."
        canonicalUrl="https://nowicstdio.tech/pricing"
        schema={schema}
      />

      <section className="relative overflow-hidden pt-32 pb-24">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[#050806]" />
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-[#34d99a]/5 blur-[120px]" />
        <div className="engineering-grid" />

        <div className="container-shell relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <p className="eyebrow">Pricing</p>
            <h1 className="mt-4 font-display text-4xl font-extrabold text-[#f0f0f3] leading-tight sm:text-5xl">
              Transparent pricing for <span className="text-gradient">premium quality</span>
            </h1>
            <p className="mt-6 text-base text-[#8b8fa3] leading-relaxed">
              No hidden fees, no endless hourly billing. We offer clear milestone-based pricing so you know exactly what you get and when.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="mt-20 grid gap-8 lg:grid-cols-3 items-start">
            {PRICING_TIERS.map((tier) => (
              <ScrollReveal key={tier.name} delay={tier.delay}>
                <div className={`relative h-full rounded-3xl bg-[#0e0f14]/80 backdrop-blur-md border ${tier.popular ? 'border-[#34d99a] shadow-[0_0_40px_rgba(52,217,154,0.1)]' : 'border-white/10'} p-8 flex flex-col`}>
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#34d99a] to-[#2cb380] text-[#050806] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                      <Sparkles size={12} /> Most Popular
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-xl font-display font-bold text-white mb-2">{tier.name}</h3>
                    <p className="text-sm text-[#8b8fa3] h-10">{tier.description}</p>
                  </div>

                  <div className="mb-8 flex items-baseline gap-1">
                    <span className="text-sm font-semibold text-[#8b8fa3] uppercase tracking-wider">From</span>
                    <span className="text-4xl font-display font-bold text-white">{tier.price}</span>
                  </div>

                  <div className="mb-8">
                    <p className="text-xs font-semibold text-[#8b8fa3] uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Ideal For</p>
                    <p className="text-sm text-[#cbd5e1] font-medium">{tier.idealFor}</p>
                  </div>

                  <div className="space-y-4 mb-10 flex-grow">
                    <p className="text-xs font-semibold text-[#8b8fa3] uppercase tracking-wider mb-4 border-b border-white/10 pb-2">What's Included</p>
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check size={16} className="text-[#34d99a] shrink-0 mt-0.5" />
                        <span className="text-sm text-[#cbd5e1]">{feature}</span>
                      </div>
                    ))}

                    {tier.notIncluded.length > 0 && (
                      <div className="pt-4 mt-4 border-t border-white/5 space-y-4">
                        {tier.notIncluded.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3 opacity-50">
                            <div className="w-4 h-4 rounded-full border border-[#8b8fa3] flex items-center justify-center shrink-0 mt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#8b8fa3]" />
                            </div>
                            <span className="text-sm text-[#8b8fa3] line-through">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link 
                    to="/booking" 
                    className={`w-full py-4 rounded-xl text-center text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                      tier.popular 
                        ? 'bg-[#34d99a] text-[#050806] hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                        : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {tier.ctaText}
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-20 border-y border-white/5 bg-[#0a0b0f]">
        <div className="container-shell">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <ScrollReveal delay={0.1} className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#34d99a]/10 flex items-center justify-center mb-4 border border-[#34d99a]/20">
                <Shield className="text-[#34d99a]" size={20} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">100% Code Ownership</h4>
              <p className="text-sm text-[#8b8fa3]">You own all intellectual property and source code the moment the final payment clears.</p>
            </ScrollReveal>
            <ScrollReveal delay={0.2} className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#34d99a]/10 flex items-center justify-center mb-4 border border-[#34d99a]/20">
                <Zap className="text-[#34d99a]" size={20} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Fast Execution</h4>
              <p className="text-sm text-[#8b8fa3]">We use modern frameworks and AI tools to deliver products in weeks, not months.</p>
            </ScrollReveal>
            <ScrollReveal delay={0.3} className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#34d99a]/10 flex items-center justify-center mb-4 border border-[#34d99a]/20">
                <Sparkles className="text-[#34d99a]" size={20} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Premium Quality</h4>
              <p className="text-sm text-[#8b8fa3]">We don't do 'cheap'. Every line of code is clean, and every UI element is polished to perfection.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 relative overflow-hidden">
        <div className="container-shell max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="FAQ"
            title="Common |questions"
            description="Everything you need to know about our pricing and process."
          />

          <div className="mt-16 space-y-4">
            {FAQS.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors">
                  <h4 className="text-lg font-bold text-[#f0f0f3] flex items-start gap-3">
                    <HelpCircle size={20} className="text-[#34d99a] shrink-0 mt-0.5" />
                    {faq.question}
                  </h4>
                  <p className="mt-4 text-[#8b8fa3] text-sm leading-relaxed pl-8">
                    {faq.answer}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Quote CTA */}
      <section className="py-24 relative">
        <div className="container-shell text-center">
          <ScrollReveal>
            <div className="hero-glass glass-noise p-12 rounded-3xl border border-white/5 max-w-3xl mx-auto relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#34d99a]/10 rounded-full blur-[80px]" />
              <h3 className="text-2xl font-display font-bold text-white mb-4 relative z-10">Need something completely custom?</h3>
              <p className="text-[#8b8fa3] mb-8 relative z-10">Enterprise applications, legacy migrations, or massive scale platforms.</p>
              <Link to="/contact" className="cta-btn relative z-10">
                Request a Custom Quote <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
