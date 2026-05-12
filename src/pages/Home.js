import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import collage from '../assets/collage.png';
import './Home.css';

/* ─── Logo imports ─────────────────────────────────────────────────────── */
import boehringer     from '../assets/logos/boehringer-ingelheim.svg';
import britannia      from '../assets/logos/britannia-industries-logo.svg';
import cadbury        from '../assets/logos/cadbury.svg';
import cipla          from '../assets/logos/cipla-logo.svg';
import drReddys       from '../assets/logos/dr.reddys.png';
import generalMotors  from '../assets/logos/general-motors.svg';
import hindustanTimes from '../assets/logos/hindustan-times.png';
import iball          from '../assets/logos/iball.png';
import indiaToday     from '../assets/logos/india-today.png';
import kelloggs       from '../assets/logos/kellogg-s.svg';
import maggi          from '../assets/logos/maggi.png';
import mahindra       from '../assets/logos/mahindra-mahindra-logo.svg';
import novartis       from '../assets/logos/novartis.svg';
import shell          from '../assets/logos/shell-4.svg';
import sbi            from '../assets/logos/state-bank-of-india.svg';
import surfExcel      from '../assets/logos/surf excel.png';

const BRANDS = [
  { name: 'Maggi',                src: maggi          },
  { name: 'Cadbury',              src: cadbury        },
  { name: "Kellogg's",            src: kelloggs       },
  { name: 'Britannia',            src: britannia      },
  { name: 'Surf Excel',           src: surfExcel      },
  { name: 'General Motors',       src: generalMotors  },
  { name: 'Mahindra',             src: mahindra       },
  { name: "Dr. Reddy's",          src: drReddys       },
  { name: 'Cipla',                src: cipla          },
  { name: 'Novartis',             src: novartis       },
  { name: 'Boehringer Ingelheim', src: boehringer     },
  { name: 'SBI',                  src: sbi            },
  { name: 'India Today',          src: indiaToday     },
  { name: 'Hindustan Times',      src: hindustanTimes },
  { name: 'iBall',                src: iball          },
  { name: 'Shell',                src: shell          },
];

/* ── Video IDs ── */
const MOBILE_INTRO_VIDEO_ID  = '69f50596c530a8d6d2d84952';
const DESKTOP_INTRO_VIDEO_ID = '69fb70b1c24b7e4dd498c367';

/* ═══════════════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════════════ */

function useLenis() {
  useEffect(() => {
    let lenis;
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });
      const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    });
    return () => lenis && lenis.destroy();
  }, []);
}

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

/* ═══════════════════════════════════════════════════════════════════════
   INTRO SPLASH
   Behaviour:
     • Mounts and plays the Gumlet video immediately.
     • After 1 000 ms, begins a 900 ms opacity fade.
     • Fully unmounts at 1 900 ms total — no tap/click interaction.
═══════════════════════════════════════════════════════════════════════ */
function IntroSplash({ onFinished }) {
  const [fading, setFading] = useState(false);
  const isMobile = window.innerWidth <= 768;
  const videoId  = isMobile ? MOBILE_INTRO_VIDEO_ID : DESKTOP_INTRO_VIDEO_ID;

  useEffect(() => {
    const startFade = setTimeout(() => setFading(true),  1000);       // 1 s pause
    const unmount   = setTimeout(() => onFinished(),      1000 + 900); // after fade

    return () => {
      clearTimeout(startFade);
      clearTimeout(unmount);
    };
  }, []);

  return (
    <div className={`intro-splash${fading ? ' intro-splash--fade' : ''}`}>
      <iframe
        className="intro-splash__iframe"
        src={`https://play.gumlet.io/embed/${videoId}?autoplay=true&loop=false&muted=false&disable_player_controls=true&background=false`}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write"
        allowFullScreen
        title="Intro"
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="hero">
      {/* Desktop */}
      <div className="hero__gumlet hero__gumlet--desktop">
        <iframe
          loading="lazy"
          title="Hero"
          src="https://play.gumlet.io/embed/69f50596c530a8d6d2d84950?background=false&autoplay=true&loop=true&muted=false&disable_player_controls=false"
          referrerPolicy="origin"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write"
          allowFullScreen
        />
      </div>

      {/* Mobile — padding-top is handled in CSS to clear the fixed navbar */}
      <div className="hero__mobile-wrap">
        <div className="hero__mobile-bg">
          <iframe
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              border: 'none', display: 'block',
            }}
            loading="lazy"
            title="Hero Mobile"
            src="https://play.gumlet.io/embed/69f50596c530a8d6d2d84950?background=false&autoplay=true&loop=true&muted=false&disable_player_controls=true"
            referrerPolicy="origin"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write"
            allowFullScreen
          />
          <div className="hero__overlay" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   ABOUT US
═══════════════════════════════════════════════════════════════════════ */
function AboutSection() {
  const [ref, visible] = useReveal(0.1);

  return (
    <section className={`about-section${visible ? ' revealed' : ''}`} ref={ref}>
      <div className="about-section__left">
        <p className="section-label">About Us</p>

        <h2 className="about-section__heading">
          Every brand has<br />
          its own <em>light</em> —<br />
          our job is to make<br />
          it <em>shine brighter.</em>
        </h2>

        <p className="about-section__body">
          We are a Mumbai-based digital marketing agency built by young,
          passionate creators and strategists. From storytelling to strategy,
          from design to data — we bring together creativity and performance
          to help businesses stand out in today's competitive marketplace.
        </p>

        <Link to="/about" className="btn-outline about-section__cta">
          <span>Our Story</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div className="about-section__right">
        <div className="about-section__img-wrap">
          <img
            src={collage}
            alt="Shine Digital collage"
            className="about-section__img"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SERVICES
═══════════════════════════════════════════════════════════════════════ */
const SERVICES = [
  {
    num: '01', title: 'Social Media',
    desc: 'Strategy and content built to grow communities and earn attention. We help your brand show up consistently and meaningfully across every platform.',
    tags: ['Strategy', 'Content', 'Analytics'],
    videoId: '69f75d191dfaccdc957d12f1',
  },
  {
    num: '02', title: 'Branding',
    desc: 'Identity systems that give your brand clarity, character, and recognition. Logos, typography, tone of voice — every element built to last.',
    tags: ['Identity', 'Typography', 'Voice'],
    videoId: '69f75eef1dfaccdc957d3387',
  },
  {
    num: '03', title: 'Website',
    desc: 'Digital experiences that build trust and drive growth. Fast, beautiful, and built around your brand and your audience.',
    tags: ['Design', 'Dev', 'SEO'],
    videoId: '69f75eef1dfaccdc957d338f',
  },
  {
    num: '04', title: 'Films',
    desc: 'Brand films and visual content that communicate your story with intention. From script to screen, we craft work people remember.',
    tags: ['Production', 'Direction', 'Edit'],
    videoId: '69f75eef1dfaccdc957d3391',
  },
];

function ServicesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef(null);
  const cardRefs   = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setActiveIdx(parseInt(e.target.dataset.idx));
      }),
      { threshold: 0.5, rootMargin: '-15% 0px -35% 0px' }
    );
    cardRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="svc-section" ref={sectionRef}>
      <div className="svc-section__header">
        <p className="section-label">What We Do</p>
        <h2 className="svc-section__title">Our <em>Services</em></h2>
      </div>

      {/* Desktop */}
      <div className="svc-section__inner">
        <div className="svc-left">
          <div className="svc-left__card">
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

        <div className="svc-right">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className={`svc-card${activeIdx === i ? ' active' : ''}`}
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

      {/* Mobile */}
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

/* ═══════════════════════════════════════════════════════════════════════
   BRANDS
═══════════════════════════════════════════════════════════════════════ */
function BrandsSection() {
  const [ref, visible] = useReveal(0.1);
  const track = [...BRANDS, ...BRANDS];

  return (
    <section className={`brands-section${visible ? ' revealed' : ''}`} ref={ref}>
      <p className="section-label">Trusted By</p>
      <h2 className="brands-section__heading">Brands We've Shaped</h2>
      <div className="brands-marquee">
        <div className="brands-marquee__track">
          {track.map((brand, i) => (
            <div className="brand-logo-card" key={i}>
              <img
                src={brand.src}
                alt={brand.name}
                className="brand-logo-img"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   HOME
═══════════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  useLenis();

  useEffect(() => {
    document.body.style.overflow = showIntro ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showIntro]);

  return (
    <div className="home">
      <Hero />
      <AboutSection />
      <ServicesSection />
      <BrandsSection />

      {showIntro && (
        <IntroSplash onFinished={() => setShowIntro(false)} />
      )}
    </div>
  );
}