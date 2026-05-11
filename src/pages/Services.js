import React, { useRef, useEffect, useState } from 'react';
import './Services.css';

/* ─────────────────────────────────────────
   Expanded content for each service
───────────────────────────────────────── */
const SERVICE_DETAILS = {
  'Website': {
    faqs: [
      {
        q: 'Do you offer website design along with SEO?',
        a: 'Yes. We design SEO-friendly, responsive websites that support ranking, speed, and user experience.',
      },
      {
        q: 'Do you build WordPress websites?',
        a: 'Yes, we build custom WordPress websites tailored to your brand and business goals.',
      },
      {
        q: 'How long does SEO take to show results?',
        a: 'SEO is a long-term strategy. Most clients begin seeing measurable improvements within 3–6 months.',
      },
      {
        q: 'Will my website be mobile-friendly?',
        a: 'Absolutely. Every website we build is fully responsive and optimised for all screen sizes.',
      },
      {
        q: 'Can I hire you for SEO only?',
        a: 'Yes! We offer standalone SEO packages for businesses that already have a website.',
      },
      {
        q: 'Do you provide monthly SEO reporting?',
        a: 'Yes. You receive detailed monthly reports covering rankings, traffic, and key performance metrics.',
      },
    ],
    cta: {
      heading: "Let's Build Your Online Growth Engine",
      sub: "Ready to turn your website into a traffic-generating, lead-converting machine? Our Website Design & SEO Services help you attract, engage, and convert effortlessly.",
      btn: "Get in touch today to start your Website Design & SEO journey.",
    },
  },

  'Social Media': {
    intro: {
      heading: 'Turn your social presence into a powerful marketing engine.',
      body: `From strategy to execution, Shine Digital handles everything — content calendars, copywriting, creative design, reels, and engagement. We create scroll-stopping visuals and meaningful interactions that build loyal communities around your brand.`,
    },
    whyUs: {
      heading: 'Why Choose SD Digital Marketing Agency?',
      sub: "We don't just post, we grow your brand.",
      body: `Whether you're a startup, small business, or enterprise, our team ensures your social media becomes a revenue-driving channel.`,
      points: [
        'Startup-friendly pricing',
        'Industry-specific strategies',
        'Consistent content creation',
        'Reels + video editing',
        'Community engagement',
        'Paid ads management',
        'Real-time support',
        'Monthly performance reporting',
      ],
    },
    offerings: {
      heading: 'What we offer:',
      items: [
        'Social Media Strategy (Instagram, Facebook, LinkedIn, X, Threads, etc.)',
        'Content Creation & Reels Production',
        'Social Media Management',
        'Hashtag & Trend Research',
        'Campaign Planning & Analytics',
      ],
    },
    focus: {
      heading: 'Our Focus:',
      body: "We don't just post — we perform. Every post is designed to engage, convert, and grow your audience organically and through smart paid boosts.",
    },
    process: {
      heading: 'Our SMM Process',
      steps: [
        { title: 'Discovery & Brand Audit', desc: 'We understand your goals, audience, competitors, and current social presence.' },
        { title: 'Content Strategy & Monthly Calendar', desc: 'Our designers craft visually compelling posts & videos.' },
        { title: 'Scheduling & Posting', desc: 'Timely, consistent publishing across all your platforms.' },
        { title: 'Growth & Engagement', desc: 'Active community management and audience interaction.' },
        { title: 'Reporting & Optimization', desc: 'Monthly data-driven reports with actionable improvements.' },
      ],
    },
    faqs: [
      {
        q: 'How often will you post for my brand?',
        a: 'Depending on your plan, we create 12–30 posts per month, including reels.',
      },
      {
        q: 'Do you manage paid ads for Instagram and Facebook?',
        a: 'Yes. We manage Meta Ads, set budgets, create creatives, and optimise for your goals.',
      },
      {
        q: 'Can social media help my small business grow?',
        a: 'Absolutely. Consistent, strategic social media is one of the most cost-effective growth channels for small businesses.',
      },
      {
        q: 'How long before I see results?',
        a: 'You can expect early traction within 30–60 days. Sustained growth builds over 3–6 months.',
      },
      {
        q: 'How do I know which package is right for my business?',
        a: "Book a free discovery call with us. We'll analyse your current presence and recommend the best plan.",
      },
    ],
    cta: {
      pre: 'Ready to grow your brand through social media?',
      heading: "Let's Build Your Social Presence Together",
      sub: 'SD Digital Marketing Agency — Social Media Marketing That Drives Real Results',
    },
  },

  'Branding': {
    intro: {
      heading: 'Your Brand Needs Strong Branding',
      body: `A powerful brand sets you apart from competitors and creates a lasting impression. It influences how customers perceive you, increases brand recall, and builds credibility.`,
    },
    ourBrandingHelps: [
      'Communicate your story clearly',
      'Build trust and recognition',
      'Present a consistent brand image across platforms',
      'Improve customer loyalty and conversion rates',
    ],
    services: [
      'Brand Strategy & Voice Development',
      'Logo Design & Brand Kit',
      'Visual Identity (Colors, Fonts, Graphics)',
      'Marketing Collaterals (Brochures, Banners, Posters)',
      'Packaging Design',
    ],
    whyUs: {
      heading: 'Why Choose SD Digital for Branding?',
      points: [
        'Creative team with experience in multiple industries',
        'Strategic + aesthetic approach',
        '100% original and customized designs',
        'Fast turnaround and transparent communication',
        'Complete branding support — digital + print',
      ],
      tagline: "We don't just design brands; we build brand experiences.",
    },
    process: {
      heading: 'Our Branding Process',
      sub: 'Simple, structured, and effective.',
      steps: [
        { title: 'Discovery & Research' },
        { title: 'Brand Strategy Creation' },
        { title: 'Logo Concepts & Brand Kit Design' },
        { title: 'Visual Identity Development' },
        { title: 'Marketing Collaterals & Packaging Design' },
        { title: 'Final Delivery of All Assets' },
      ],
      outcome: 'A brand that stands out, speaks clearly, and builds trust from the very first glance.',
    },
    faqs: [
      {
        q: 'What do your branding services include?',
        a: 'Logo design, brand strategy, brand kit, visual identity, marketing collaterals, and packaging design.',
      },
      {
        q: 'Why is branding important?',
        a: 'Branding creates a memorable identity, builds credibility, and differentiates your business from competitors.',
      },
      {
        q: 'Do you provide logo design only?',
        a: 'Yes, we offer standalone logo design packages if that is what you need.',
      },
      {
        q: 'What makes your branding services different?',
        a: 'We combine strategy with aesthetics — every design decision is backed by research and brand intent.',
      },
      {
        q: 'Do you offer rebranding services?',
        a: 'Absolutely. We help established brands refresh and realign their identity for new audiences or markets.',
      },
      {
        q: 'Do you provide marketing collaterals?',
        a: 'Yes. We design brochures, banners, posters, business cards, and more.',
      },
    ],
    cta: {
      heading: "Let's build something that's unique, memorable, and impact-driven",
      sub: 'Contact us today to get your Branding & Design Package.',
      btn: 'Contact Us',
    },
  },

  'Films': null,
};

/* ─────────────────────────────────────────
   Services card data
───────────────────────────────────────── */
const SERVICES_DATA = [
  {
    id: '01',
    title: 'Social Media',
    tagline: 'Show up consistently.',
    desc: 'We help brands build a clear and recognizable presence on social — through strategy, content, and community. Every post is shaped to communicate who you are and what you stand for.',
    offerings: ['Content Strategy', 'Reels & Stories', 'Community Management', 'Paid Ads', 'Influencer Collab', 'Monthly Analytics'],
    videoId: '69f75d191dfaccdc957d12f1',
  },
  {
    id: '02',
    title: 'Branding',
    tagline: 'Identity with clarity.',
    desc: 'Your brand is more than a logo. We craft complete identity systems — visual language, tone of voice, guidelines — that give your business clarity, character, and long term recognition.',
    offerings: ['Logo Design', 'Brand Guidelines', 'Typography System', 'Color Palette', 'Tone of Voice', 'Brand Collateral'],
    videoId: '69f75eef1dfaccdc957d3387',
  },
  {
    id: '03',
    title: 'Website',
    tagline: 'Digital presence, perfected.',
    desc: 'Websites that build trust and drive growth. We design and develop fast, responsive, SEO ready experiences that reflect your brand and serve your audience.',
    offerings: ['UI/UX Design', 'Development', 'E-Commerce', 'CMS Setup', 'Performance Opt.', 'Ongoing Support'],
    videoId: '69f75eef1dfaccdc957d338f',
  },
  {
    id: '04',
    title: 'Films',
    tagline: 'Stories worth watching.',
    desc: 'Brand films and visual content that communicate your story with intention. From concept to final cut, we craft work that stays with people long after they watch.',
    offerings: ['Concept & Script', 'Pre-Production', 'Cinematography', 'Direction', 'Colour Grading', 'Sound Design'],
    videoId: '69f75eef1dfaccdc957d3391',
  },
];

/* ─────────────────────────────────────────
   Reveal hook
───────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─────────────────────────────────────────
   FAQ accordion item
───────────────────────────────────────── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`svc-faq-item ${open ? 'open' : ''}`}>
      <button className="svc-faq-q" onClick={() => setOpen(o => !o)}>
        <span>{q}</span>
        <span className="svc-faq-icon">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="svc-faq-a">{a}</p>}
    </div>
  );
}

/* ─────────────────────────────────────────
   Detail panel content — Website
───────────────────────────────────────── */
function WebsiteDetail({ d }) {
  return (
    <>
      <div className="svc-detail-faqs">
        <h3 className="svc-detail-section-title">Frequently Asked Questions</h3>
        {d.faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
      </div>
      <div className="svc-detail-cta">
        <h2 className="svc-detail-cta-heading">{d.cta.heading}</h2>
        <p className="svc-detail-cta-sub">{d.cta.sub}</p>
        <a href="/contact" className="svc-detail-cta-btn">{d.cta.btn}</a>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   Detail panel content — Social Media
───────────────────────────────────────── */
function SocialMediaDetail({ d }) {
  return (
    <>
      <div className="svc-detail-intro">
        <h2 className="svc-detail-big-heading">{d.intro.heading}</h2>
        <p className="svc-detail-body">{d.intro.body}</p>
      </div>

      <div className="svc-detail-why">
        <h3 className="svc-detail-section-title">{d.whyUs.heading}</h3>
        <p className="svc-detail-tagline-sm">{d.whyUs.sub}</p>
        <p className="svc-detail-body">{d.whyUs.body}</p>
        <ul className="svc-detail-pill-list">
          {d.whyUs.points.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      </div>

      <div className="svc-detail-offerings">
        <h3 className="svc-detail-section-title">{d.offerings.heading}</h3>
        <ul className="svc-detail-bullet-list">
          {d.offerings.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>

      <div className="svc-detail-focus">
        <h3 className="svc-detail-section-title">{d.focus.heading}</h3>
        <p className="svc-detail-body">{d.focus.body}</p>
      </div>

      <div className="svc-detail-process">
        <h3 className="svc-detail-section-title">{d.process.heading}</h3>
        <ol className="svc-detail-steps">
          {d.process.steps.map((s, i) => (
            <li key={i}>
              <strong>{s.title}</strong>
              {s.desc && <span> — {s.desc}</span>}
            </li>
          ))}
        </ol>
      </div>

      <div className="svc-detail-faqs">
        <h3 className="svc-detail-section-title">FAQs</h3>
        {d.faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
      </div>

      <div className="svc-detail-cta">
        <p className="svc-detail-cta-pre">{d.cta.pre}</p>
        <h2 className="svc-detail-cta-heading">{d.cta.heading}</h2>
        <p className="svc-detail-cta-sub">{d.cta.sub}</p>
        <a href="/contact" className="svc-detail-cta-btn">Get Started</a>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   Detail panel content — Branding
───────────────────────────────────────── */
function BrandingDetail({ d }) {
  return (
    <>
      <div className="svc-detail-intro">
        <h2 className="svc-detail-big-heading">{d.intro.heading}</h2>
        <p className="svc-detail-body">{d.intro.body}</p>
        <ul className="svc-detail-bullet-list" style={{ marginTop: '1.25rem' }}>
          {d.ourBrandingHelps.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>

      <div className="svc-detail-offerings">
        <h3 className="svc-detail-section-title">Services:</h3>
        <ul className="svc-detail-bullet-list">
          {d.services.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>

      <div className="svc-detail-why">
        <h3 className="svc-detail-section-title">{d.whyUs.heading}</h3>
        <ul className="svc-detail-bullet-list">
          {d.whyUs.points.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
        <p className="svc-detail-tagline-sm" style={{ marginTop: '1.5rem' }}>{d.whyUs.tagline}</p>
      </div>

      <div className="svc-detail-process">
        <h3 className="svc-detail-section-title">{d.process.heading}</h3>
        <p className="svc-detail-tagline-sm">{d.process.sub}</p>
        <ol className="svc-detail-steps">
          {d.process.steps.map((s, i) => (
            <li key={i}><strong>{s.title}</strong></li>
          ))}
        </ol>
        <div className="svc-detail-outcome">
          <span>Outcome:</span>
          {d.process.outcome}
        </div>
      </div>

      <div className="svc-detail-faqs">
        <h3 className="svc-detail-section-title">FAQs</h3>
        {d.faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
      </div>

      <div className="svc-detail-cta">
        <h2 className="svc-detail-cta-heading">{d.cta.heading}</h2>
        <p className="svc-detail-cta-sub">{d.cta.sub}</p>
        <a href="/contact" className="svc-detail-cta-btn">{d.cta.btn}</a>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   Service Detail Panel
───────────────────────────────────────── */
function ServiceDetailPanel({ title, onClose }) {
  const d = SERVICE_DETAILS[title];

  if (!d) {
    return (
      <div className="svc-detail-panel">
        <button className="svc-detail-close" onClick={onClose}>✕ Close</button>
        <div className="svc-detail-inner svc-detail-empty">
          <p>Detailed content coming soon for Films.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="svc-detail-panel">
      <button className="svc-detail-close" onClick={onClose}>✕ Close</button>
      <div className="svc-detail-inner">
        {title === 'Website' && <WebsiteDetail d={d} />}
        {title === 'Social Media' && <SocialMediaDetail d={d} />}
        {title === 'Branding' && <BrandingDetail d={d} />}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Horizontal scroll section
───────────────────────────────────────── */
function HorizontalScrollSection({ onKnowMore, activeService }) {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollProgress = -rect.top / (rect.height - window.innerHeight);
      const clamped = Math.max(0, Math.min(1, scrollProgress));
      const maxScroll = track.scrollWidth - track.clientWidth;
      track.style.transform = `translateX(-${clamped * maxScroll}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const sectionHeight = `${100 + SERVICES_DATA.length * 60}vh`;

  return (
    <section className="horiz-section" ref={sectionRef} style={{ height: sectionHeight }}>
      <div className="horiz-section__sticky">
        <div className="horiz-section__header">
          <p className="section-label">What We Offer</p>
          <h2>Our Services</h2>
          <p className="horiz-section__intro">
            We help brands grow through strategy, marketing, design, and digital experiences.
          </p>
        </div>
        <div className="horiz-track-wrap">
          <div className="horiz-track" ref={trackRef}>
            {SERVICES_DATA.map((s, i) => (
              <div key={i} className="svc-h-card">
                {/* Video background */}
                <div className="svc-h-card__vid">
                  <iframe
                    src={`https://play.gumlet.io/embed/${s.videoId}?background=true&autoplay=true&loop=true&disable_player_controls=true&preload=true`}
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    title={s.title}
                  />
                </div>
                <div className="svc-h-card__overlay" />

                <div className="svc-h-card__num">{s.id}</div>
                <div className="svc-h-card__top">
                  <h3 className="svc-h-card__title">{s.title}</h3>
                  <p className="svc-h-card__tagline">{s.tagline}</p>
                </div>
                {/* flex-shrink:1 + overflow:hidden ensures desc never pushes CTA out */}
                <p className="svc-h-card__desc" style={{ flexShrink: 1, overflow: 'hidden' }}>{s.desc}</p>
                <ul className="svc-h-card__offerings">
                  {s.offerings.map((o, j) => <li key={j}>{o}</li>)}
                </ul>
                {/* flex-shrink:0 + z-index:10 guarantees button is always visible */}
                <div className="svc-h-card__cta" style={{ flexShrink: 0, position: 'relative', zIndex: 10 }}>
                  <button
                    className="svc-know-more-btn"
                    onClick={() => onKnowMore(s.title)}
                  >
                    {activeService === s.title ? 'Close' : 'Know More'}
                    <span className="svc-know-more-arrow">
                      {activeService === s.title ? '↑' : '↓'}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Main page
───────────────────────────────────────── */
export default function Services() {
  const [heroRef, heroVisible] = useReveal(0.1);
  const [activeService, setActiveService] = useState(null);
  const detailRef = useRef(null);

  const handleKnowMore = (title) => {
    if (activeService === title) {
      setActiveService(null);
      return;
    }
    setActiveService(title);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="services-page">
      <section className={`svc-page-hero ${heroVisible ? 'revealed' : ''}`} ref={heroRef}>
        <div className="svc-page-hero__inner">
          <p className="section-label">Services</p>
          <h1 className="svc-page-hero__title">
            Everything your<br />brand <em>needs to SHINE.</em>
          </h1>
          <p className="svc-page-hero__sub">
            Strategy, marketing, design, and digital experiences built to
            help your business stand out and grow with purpose.
          </p>
        </div>
      </section>

      <HorizontalScrollSection
        onKnowMore={handleKnowMore}
        activeService={activeService}
      />

      {/* Detail panel renders below the scroll section */}
      <div ref={detailRef}>
        {activeService && (
          <ServiceDetailPanel
            title={activeService}
            onClose={() => setActiveService(null)}
          />
        )}
      </div>
    </div>
  );
}