import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logoVideo from '../assets/logo.mp4';
import logoMobileVideo from '../assets/logomobile.MP4';

/* ── Reveal-on-scroll hook ── */
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

/* ── Video Placeholder ── */
function VideoPlaceholder({ label = 'VIDEO', aspect = '16/9', className = '' }) {
  return (
    <div className={`vid-placeholder ${className}`} style={{ aspectRatio: aspect }}>
      <div className="vid-placeholder__inner">
        <div className="vid-placeholder__icon">▶</div>
        <span>{label}</span>
      </div>
    </div>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg">
        {/* Desktop video */}
        <video
          className="hero__video hero__video--desktop"
          src={logoVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Mobile video */}
        <video
          className="hero__video hero__video--mobile"
          src={logoMobileVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero__overlay" />
      </div>
    </section>
  );
}

/* ── About Preview ── */
function AboutPreview() {
  const [ref, visible] = useReveal();
  return (
    <section className={`about-preview ${visible ? 'revealed' : ''}`} ref={ref}>
      <div className="about-preview__left">
        <p className="section-label">About Us</p>
        <h2 className="about-preview__heading">
          We don't just<br />make content—<br />we build <em>worlds.</em>
        </h2>
        <p className="about-preview__body">
          Shine Digital is a full-service creative studio from Mumbai,
          helping brands find their voice in the noise. From social
          strategy to cinematic films, we do it all — and we do it
          with obsessive precision.
        </p>
        <Link to="/about" className="btn-outline">
          <span>Discover Our Story</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
      <div className="about-preview__right">
        <VideoPlaceholder label="OUR STORY" aspect="16/9" className="about-preview__vid" />
      </div>
    </section>
  );
}

/* ── Reels Section ── */
function ReelsSection() {
  const [ref, visible] = useReveal(0.1);
  return (
    <section className={`reels-section ${visible ? 'revealed' : ''}`} ref={ref}>
      <div className="reels-section__header">
        <p className="section-label">Portfolio Highlights</p>
        <h2>Latest Work</h2>
      </div>
      <div className="reels-section__grid">
        {['REEL 01', 'REEL 02', 'REEL 03'].map((label, i) => (
          <div
            key={i}
            className="reel-card"
            style={{ transitionDelay: `${i * 0.12}s` }}
          >
            <VideoPlaceholder label={label} aspect="9/16" className="reel-card__vid" />
            <div className="reel-card__info">
              <span className="reel-card__num">0{i + 1}</span>
              <span className="reel-card__tag">
                {['Brand Film', 'Social Media', 'Campaign'][i]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Services Sticky Scroll ── */
const SERVICES = [
  {
    num: '01',
    title: 'Social Media',
    desc: 'Content strategies that grow communities, spark conversations, and turn followers into fans. We live on the feed so your brand always leads it.',
    tags: ['Strategy', 'Content', 'Analytics'],
  },
  {
    num: '02',
    title: 'Branding',
    desc: 'Identity systems built to endure. Logos, typography, tone-of-voice — every element crafted so your brand speaks before you even say a word.',
    tags: ['Identity', 'Typography', 'Voice'],
  },
  {
    num: '03',
    title: 'Website',
    desc: 'Digital experiences that convert. From landing pages to full e-commerce, we design and build fast, beautiful sites that do the work.',
    tags: ['Design', 'Dev', 'SEO'],
  },
  {
    num: '04',
    title: 'Films',
    desc: 'Cinematic brand storytelling that stays with people long after they watch. Scripts, shoots, edits — end-to-end production excellence.',
    tags: ['Production', 'Direction', 'Edit'],
  },
];

function ServicesSection() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.svc-card');
    if (!cards) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.idx);
            setActiveIdx(idx);
          }
        });
      },
      { threshold: 0.55, rootMargin: '-10% 0px -35% 0px' }
    );

    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="svc-section" ref={sectionRef}>
      <div className="svc-section__inner">
        {/* LEFT sticky */}
        <div className="svc-left" ref={leftRef}>
          <div className="svc-left__content">
            <p className="section-label">What We Do</p>
            <h2 className="svc-left__heading">
              Our<br /><em>Services</em>
            </h2>
            <VideoPlaceholder label="SERVICES REEL" aspect="4/5" className="svc-left__vid" />
            <div className="svc-left__progress">
              {SERVICES.map((_, i) => (
                <div
                  key={i}
                  className={`svc-progress-dot ${activeIdx === i ? 'active' : activeIdx > i ? 'past' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT scroll */}
        <div className="svc-right">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className={`svc-card ${activeIdx === i ? 'active' : ''}`}
              data-idx={i}
            >
              <div className="svc-card__num">{s.num}</div>
              <div className="svc-card__body">
                <h3 className="svc-card__title">{s.title}</h3>
                <p className="svc-card__desc">{s.desc}</p>
                <div className="svc-card__tags">
                  {s.tags.map(t => <span key={t}>{t}</span>)}
                </div>
              </div>
              <div className="svc-card__arrow">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Brands ── */
const BRAND_PLACEHOLDERS = Array.from({ length: 8 }, (_, i) => `BRAND ${i + 1}`);

function BrandsSection() {
  const [ref, visible] = useReveal(0.1);
  return (
    <section className={`brands-section ${visible ? 'revealed' : ''}`} ref={ref}>
      <p className="section-label">Trusted By</p>
      <h2 className="brands-section__heading">Brands We've Shaped</h2>
      <div className="brands-marquee">
        <div className="brands-marquee__track">
          {[...BRAND_PLACEHOLDERS, ...BRAND_PLACEHOLDERS].map((b, i) => (
            <div key={i} className="brand-logo-ph">
              <span>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Home ── */
export default function Home() {
  return (
    <div className="home">
      <Hero />
      <AboutPreview />
      <ReelsSection />
      <ServicesSection />
      <BrandsSection />
    </div>
  );
}