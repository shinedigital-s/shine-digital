import React, { useRef, useEffect, useState } from 'react';
import './Services.css';

const SERVICES_DATA = [
  {
    id: '01',
    title: 'Social Media',
    tagline: 'Show up consistently.',
    desc: 'We help brands build a clear and recognizable presence on social — through strategy, content, and community. Every post is shaped to communicate who you are and what you stand for.',
    offerings: ['Content Strategy', 'Reels & Stories', 'Community Management', 'Paid Ads', 'Influencer Collab', 'Monthly Analytics'],
  },
  {
    id: '02',
    title: 'Branding',
    tagline: 'Identity with clarity.',
    desc: 'Your brand is more than a logo. We craft complete identity systems — visual language, tone of voice, guidelines — that give your business clarity, character, and long term recognition.',
    offerings: ['Logo Design', 'Brand Guidelines', 'Typography System', 'Color Palette', 'Tone of Voice', 'Brand Collateral'],
  },
  {
    id: '03',
    title: 'Website',
    tagline: 'Digital presence, perfected.',
    desc: 'Websites that build trust and drive growth. We design and develop fast, responsive, SEO ready experiences that reflect your brand and serve your audience.',
    offerings: ['UI/UX Design', 'Development', 'E-Commerce', 'CMS Setup', 'Performance Opt.', 'Ongoing Support'],
  },
  {
    id: '04',
    title: 'Films',
    tagline: 'Stories worth watching.',
    desc: 'Brand films and visual content that communicate your story with intention. From concept to final cut, we craft work that stays with people long after they watch.',
    offerings: ['Concept & Script', 'Pre-Production', 'Cinematography', 'Direction', 'Colour Grading', 'Sound Design'],
  },
];

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

function HorizontalScrollSection() {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let rafId;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollProgress = -rect.top / (rect.height - window.innerHeight);
      const clamped = Math.max(0, Math.min(1, scrollProgress));
      const maxScroll = track.scrollWidth - track.clientWidth;
      track.style.transform = `translateX(-${clamped * maxScroll}px)`;
    };

    const lenis = window.__lenis;
    if (lenis) {
      lenis.on('scroll', onScroll);
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    return () => {
      if (lenis) lenis.off('scroll', onScroll);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const totalCards = SERVICES_DATA.length;
  const sectionHeight = `${100 + totalCards * 60}vh`;

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
                <div className="svc-h-card__num">{s.id}</div>
                <div className="svc-h-card__top">
                  <h3 className="svc-h-card__title">{s.title}</h3>
                  <p className="svc-h-card__tagline">{s.tagline}</p>
                </div>
                <p className="svc-h-card__desc">{s.desc}</p>
                <ul className="svc-h-card__offerings">
                  {s.offerings.map((o, j) => (
                    <li key={j}>{o}</li>
                  ))}
                </ul>
                <div className="svc-h-card__cta">
                  <span>Explore →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  const [heroRef, heroVisible] = useReveal(0.1);

  return (
    <div className="services-page">
      <section className={`svc-page-hero ${heroVisible ? 'revealed' : ''}`} ref={heroRef}>
        <div className="svc-page-hero__inner">
          <p className="section-label">Services</p>
          <h1 className="svc-page-hero__title">
            Everything your<br />brand <em>needs to grow.</em>
          </h1>
          <p className="svc-page-hero__sub">
            Strategy, marketing, design, and digital experiences — built to
            help your business stand out and grow with purpose.
          </p>
        </div>
      </section>

      <HorizontalScrollSection />
    </div>
  );
}