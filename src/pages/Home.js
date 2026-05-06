import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import collage from '../assets/collage.png';
import './Home.css';

/* ─── Logo imports ─────────────────────────────────────────────────────── */
import boehringer from '../assets/logos/boehringer-ingelheim.svg';
import britannia from '../assets/logos/britannia-industries-logo.svg';
import cadbury from '../assets/logos/cadbury.svg';
import cipla from '../assets/logos/cipla-logo.svg';
import drReddys from '../assets/logos/dr.reddys.png';
import generalMotors from '../assets/logos/general-motors.svg';
import hindustanTimes from '../assets/logos/hindustan-times.png';
import iball from '../assets/logos/iball.png';
import indiaToday from '../assets/logos/india-today.png';
import kelloggs from '../assets/logos/kellogg-s.svg';
import maggi from '../assets/logos/maggi.png';
import mahindra from '../assets/logos/mahindra-mahindra-logo.svg';
import novartis from '../assets/logos/novartis.svg';
import shell from '../assets/logos/shell-4.svg';
import sbi from '../assets/logos/state-bank-of-india.svg';
import surfExcel from '../assets/logos/surf excel.png';

const BRANDS = [
  { name: 'Maggi', src: maggi },
  { name: 'Cadbury', src: cadbury },
  { name: "Kellogg's", src: kelloggs },
  { name: 'Britannia', src: britannia },
  { name: 'Surf Excel', src: surfExcel },
  { name: 'General Motors', src: generalMotors },
  { name: 'Mahindra', src: mahindra },
  { name: "Dr. Reddy's", src: drReddys },
  { name: 'Cipla', src: cipla },
  { name: 'Novartis', src: novartis },
  { name: 'Boehringer Ingelheim', src: boehringer },
  { name: 'SBI', src: sbi },
  { name: 'India Today', src: indiaToday },
  { name: 'Hindustan Times', src: hindustanTimes },
  { name: 'iBall', src: iball },
  { name: 'Shell', src: shell },
];

/* ── Lenis Smooth Scroll ── */
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

/* ── Reveal on scroll ── */
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

/* ── Intro Splash ── */
function IntroSplash({ onFinished }) {
  const [fading, setFading] = useState(false);
  const fadingRef = useRef(false);

  const dismiss = () => {
    if (fadingRef.current) return;
    fadingRef.current = true;
    setFading(true);
    setTimeout(() => onFinished(), 800);
  };

  useEffect(() => {
    const handleMessage = (e) => {
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (data?.event === 'ended' || data?.type === 'ended' || data?.action === 'ended') dismiss();
      } catch (_) { }
    };
    window.addEventListener('message', handleMessage);
    const fallback = setTimeout(() => dismiss(), 20000);
    return () => { window.removeEventListener('message', handleMessage); clearTimeout(fallback); };
  }, []);

  return (
    <div className={`intro-splash ${fading ? 'intro-splash--fade' : ''}`}>
      {/* Desktop 16:9 */}
      <div className="intro-splash__frame intro-splash__frame--desktop">
        <iframe
          src="https://play.gumlet.io/embed/69fb70b1c24b7e4dd498c367?preload=true&autoplay=true&loop=false&background=false&muted=false&disable_player_controls=true"
          referrerPolicy="origin"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write"
          allowFullScreen
          title="Intro Desktop"
        />
        <div className="intro-splash__tap" onClick={dismiss} />
      </div>

      {/* Mobile 9:16 */}
      <div className="intro-splash__frame intro-splash__frame--mobile" onClick={dismiss}>
        <div className="intro-splash__mobile-vid" onClick={(e) => e.stopPropagation()}>
          <iframe
            loading="lazy"
            title="Intro Mobile"
            src="https://play.gumlet.io/embed/69f50596c530a8d6d2d84952?background=false&autoplay=false&loop=false&muted=false&disable_player_controls=false"
            style={{ border: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
            referrerPolicy="origin"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write"
            allowFullScreen
          />
        </div>
        <span className="intro-splash__skip-hint">Tap outside to skip</span>
      </div>
    </div>
  );
}

/* ── Hero ── */
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

      {/* Mobile */}
      <div className="hero__mobile-wrap">
        <div className="hero__mobile-bg">
          <iframe
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', display: 'block' }}
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

/* ── About Preview ── */
function AboutPreview() {
  const [ref, visible] = useReveal();
  return (
    <section className={`about-preview ${visible ? 'revealed' : ''}`} ref={ref}>
      <div className="about-preview__left">
        <p className="section-label">About Shine Digital</p>
        <h2 className="about-preview__heading">
          Building brands<br />that <em>stand out.</em>
        </h2>
        <p className="about-preview__body">
          Shine Digital is a Mumbai based digital marketing and brand strategy
          agency focused on helping businesses grow with clarity and purpose.
          We help businesses define what they stand for, shape how they
          communicate, and build a digital presence that people recognize
          and trust.
        </p>
        <Link to="/about" className="btn-outline">
          <span>Discover Our Story</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
      <div className="about-preview__right">
        <div className="about-preview__img-wrap">
          <img src={collage} alt="Shine Digital collage" className="about-preview__img" />
        </div>
      </div>
    </section>
  );
}

/* ── Services ── */
const SERVICES = [
  {
    num: '01', title: 'Social Media',
    desc: 'Strategy and content built to grow communities and earn attention. We help your brand show up consistently and meaningfully across every platform.',
    tags: ['Strategy', 'Content', 'Analytics'],
    videoId: '69f75eef1dfaccdc957d3391',
  },
  {
    num: '02', title: 'Branding',
    desc: 'Identity systems that give your brand clarity, character, and recognition. Logos, typography, tone of voice — every element built to last.',
    tags: ['Identity', 'Typography', 'Voice'],
    videoId: '69f75eef1dfaccdc957d338f',
  },
  {
    num: '03', title: 'Website',
    desc: 'Digital experiences that build trust and drive growth. Fast, beautiful, and built around your brand and your audience.',
    tags: ['Design', 'Dev', 'SEO'],
    videoId: '69f75d191dfaccdc957d12f1',
  },
  {
    num: '04', title: 'Films',
    desc: 'Brand films and visual content that communicate your story with intention. From script to screen, we craft work people remember.',
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
        <p className="svc-section__intro">
          We help brands grow through strategy, marketing, design, and digital experiences.
        </p>
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
              <div key={i} className={`svc-progress-dot ${activeIdx === i ? 'active' : activeIdx > i ? 'past' : ''}`} />
            ))}
          </div>
        </div>

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

/* ── Brands ── */
function BrandsSection() {
  const [ref, visible] = useReveal(0.1);
  const track = [...BRANDS, ...BRANDS];

  return (
    <section className={`brands-section ${visible ? 'revealed' : ''}`} ref={ref}>
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

/* ── Home ── */
export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  useLenis();

  useEffect(() => {
    document.body.style.overflow = showIntro ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showIntro]);

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