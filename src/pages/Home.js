import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logoMobileVideo from '../assets/logomobile.MP4';

/* ── Lenis Smooth Scroll Init ── */
function useLenis() {
  useEffect(() => {
    let lenis;
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    });
    return () => lenis && lenis.destroy();
  }, []);
}

/* ── Reveal-on-scroll hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Intro Splash (auto-dismiss, no skip) ── */
function IntroSplash({ onFinished }) {
  const [fading, setFading] = useState(false);

  const dismiss = () => {
    setFading(true);
    setTimeout(() => onFinished(), 800);
  };

  useEffect(() => {
    // Listen for postMessage from Gumlet iframe when video ends
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

    // Fallback: auto-dismiss after 12s in case postMessage never fires
    const fallback = setTimeout(() => dismiss(), 12000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div className={`intro-splash ${fading ? 'intro-splash--fade' : ''}`}>
      <div className="intro-splash__frame intro-splash__frame--desktop">
        <iframe
          src="https://play.gumlet.io/embed/69f505961dfaccdc955d415d?preload=true&autoplay=true&loop=false&background=false&disable_player_controls=false"
          referrerPolicy="origin"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write"
          allowFullScreen
          title="Intro Desktop"
        />
      </div>
      <div className="intro-splash__frame intro-splash__frame--mobile">
        <iframe
          src="https://play.gumlet.io/embed/69f50596c530a8d6d2d84952?preload=true&autoplay=true&loop=false&background=false&disable_player_controls=false"
          referrerPolicy="origin"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write"
          allowFullScreen
          title="Intro Mobile"
        />
      </div>
    </div>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section className="hero">
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
            <path
              d="M3 8H13M13 8L8 3M13 8L8 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
      <div className="about-preview__right">
        <div className="about-preview__vid about-preview__gumlet">
          <iframe
            loading="lazy"
            title="About Us"
            src="https://play.gumlet.io/embed/69f245fa9c68b6349ab356ab?background=false&autoplay=true&loop=true&disable_player_controls=false"
            referrerPolicy="origin"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

/* ── Services Section ── */
const SERVICES = [
  {
    num: '01',
    title: 'Social Media',
    desc: 'Content strategies that grow communities, spark conversations, and turn followers into fans. We live on the feed so your brand always leads it.',
    tags: ['Strategy', 'Content', 'Analytics'],
    videoId: '69f75eef1dfaccdc957d3391',
  },
  {
    num: '02',
    title: 'Branding',
    desc: 'Identity systems built to endure. Logos, typography, tone-of-voice — every element crafted so your brand speaks before you even say a word.',
    tags: ['Identity', 'Typography', 'Voice'],
    videoId: '69f75eef1dfaccdc957d338f',
  },
  {
    num: '03',
    title: 'Website',
    desc: 'Digital experiences that convert. From landing pages to full e-commerce, we design and build fast, beautiful sites that do the work.',
    tags: ['Design', 'Dev', 'SEO'],
    videoId: '69f75d191dfaccdc957d12f1',
  },
  {
    num: '04',
    title: 'Films',
    desc: 'Cinematic brand storytelling that stays with people long after they watch. Scripts, shoots, edits — end-to-end production excellence.',
    tags: ['Production', 'Direction', 'Edit'],
    videoId: '69f75eef1dfaccdc957d3387',
  },
];

function ServicesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIdx(parseInt(entry.target.dataset.idx));
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-15% 0px -35% 0px',
      }
    );
    cardRefs.current.forEach((el) => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <section className="svc-section" ref={sectionRef}>
      {/* Section header */}
      <div className="svc-section__header">
        <p className="section-label">What We Do</p>
        <h2 className="svc-section__title">
          Our <em>Services</em>
        </h2>
      </div>

      {/* ── DESKTOP: sticky left + scrolling right cards ── */}
      <div className="svc-section__inner">
        {/* LEFT — sticky video panel */}
        <div className="svc-left">
          <div className="svc-left__vid-wrap">
            {SERVICES.map((s, i) => (
              <iframe
                key={i}
                className={activeIdx === i ? 'active' : ''}
                src={`https://play.gumlet.io/embed/${s.videoId}?background=true&autoplay=true&loop=true&disable_player_controls=true&preload=true`}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                title={s.title}
              />
            ))}
            <div className="svc-left__label">
              <span className="svc-left__label-num">{SERVICES[activeIdx].num}</span>
              <span className="svc-left__label-title">{SERVICES[activeIdx].title}</span>
            </div>
          </div>
          <div className="svc-left__progress">
            {SERVICES.map((_, i) => (
              <div
                key={i}
                className={`svc-progress-dot ${activeIdx === i ? 'active' : activeIdx > i ? 'past' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — floating cards scrolling past */}
        <div className="svc-right">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className={`svc-card ${activeIdx === i ? 'active' : ''}`}
              data-idx={i}
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <div className="svc-card__inner">
                <div className="svc-card__top">
                  <span className="svc-card__num">{s.num}</span>
                  <div className="svc-card__tags">
                    {s.tags.map((t) => <span key={t}>{t}</span>)}
                  </div>
                </div>
                <h3 className="svc-card__title">{s.title}</h3>
                <p className="svc-card__desc">{s.desc}</p>
                <div className="svc-card__footer">
                  <span className="svc-card__arrow">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE: video + card paired, one after another ── */}
      <div className="svc-mobile">
        {SERVICES.map((s, i) => (
          <div key={i} className="svc-mobile__item">
            <div className="svc-mobile__vid-wrap">
              <iframe
                src={`https://play.gumlet.io/embed/${s.videoId}?background=true&autoplay=true&loop=true&disable_player_controls=true&preload=true`}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                title={s.title}
              />
            </div>
            <div className="svc-mobile__card">
              <div className="svc-card__top">
                <span className="svc-card__num">{s.num}</span>
                <div className="svc-card__tags">
                  {s.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
              <h3 className="svc-card__title">{s.title}</h3>
              <p className="svc-card__desc">{s.desc}</p>
              <div className="svc-card__footer">
                <span className="svc-card__arrow">→</span>
              </div>
            </div>
          </div>
        ))}
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
  useLenis();

  return (
    <div className="home">
      {showIntro && <IntroSplash onFinished={() => setShowIntro(false)} />}
      <Hero />
      <AboutPreview />
      <ServicesSection />
      <BrandsSection />
    </div>
  );
}