import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logoMobileVideo from '../assets/logomobile.MP4';
import reelsVideo from '../assets/services reels.1 (1).mp4';

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

/* ── Intro Splash ── */
function IntroSplash({ onFinished }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const handleMessage = (e) => {
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (
          data?.event === 'ended' ||
          data?.type === 'ended' ||
          data?.action === 'ended'
        ) {
          dismiss();
        }
      } catch (_) { }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const dismiss = () => {
    setFading(true);
    setTimeout(() => onFinished(), 800);
  };

  return (
    <div
      className={`intro-splash ${fading ? 'intro-splash--fade' : ''}`}
      onClick={dismiss}
    >
      {/* Desktop 16:9 */}
      <div
        className="intro-splash__frame intro-splash__frame--desktop"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src="https://play.gumlet.io/embed/69f505961dfaccdc955d415d?preload=true&autoplay=true&loop=false&background=false&disable_player_controls=false"
          referrerPolicy="origin"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write"
          allowFullScreen
          title="Intro Desktop"
        />
      </div>

      {/* Mobile 9:16 */}
      <div
        className="intro-splash__frame intro-splash__frame--mobile"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src="https://play.gumlet.io/embed/69f50596c530a8d6d2d84952?preload=true&autoplay=true&loop=false&background=false&disable_player_controls=false"
          referrerPolicy="origin"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write"
          allowFullScreen
          title="Intro Mobile"
        />
      </div>

      <button className="intro-skip" onClick={dismiss}>
        Skip ↗
      </button>
    </div>
  );
}

/* ── Hero — Gumlet 16:9 banner (replaces old video) ── */
function Hero() {
  return (
    <section className="hero">
      {/* Desktop: Gumlet iframe */}
      <div className="hero__gumlet hero__gumlet--desktop">
        <iframe
          loading="lazy"
          title="Gumlet video player"
          src="https://play.gumlet.io/embed/69f50596c530a8d6d2d84950?background=false&autoplay=true&loop=true&disable_player_controls=false"
          referrerPolicy="origin"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write"
          allowFullScreen
        />
      </div>

      {/* Mobile: original video */}
      <div className="hero__mobile-bg">
        <video
          className="hero__video"
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
        <div className="about-preview__vid about-preview__gumlet"><iframe loading="lazy" title="About Us" src="https://play.gumlet.io/embed/69f245fa9c68b6349ab356ab?background=false&autoplay=true&loop=true&disable_player_controls=false" referrerPolicy="origin" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write" allowFullScreen /></div>
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
        <div className="svc-left" ref={leftRef}>
          <div className="svc-left__content">
            <p className="section-label">What We Do</p>
            <h2 className="svc-left__heading">
              Our<br /><em>Services</em>
            </h2>
            <video
              className="svc-left__vid"
              src={reelsVideo}
              style={{ aspectRatio: '4/5', width: '100%', objectFit: 'cover' }}
              autoPlay
              muted
              loop
              playsInline
            />
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
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="home">
      {showIntro && (
        <IntroSplash onFinished={() => setShowIntro(false)} />
      )}
      <Hero />
      <AboutPreview />
      <ServicesSection />
      <BrandsSection />
    </div>
  );
}