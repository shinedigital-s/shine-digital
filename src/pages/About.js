import React, { useEffect, useRef, useState } from 'react';
import './About.css';
import founder1 from '../assets/founder (1).jpeg';
import founder2 from '../assets/founder (2).jpeg';

/* ─── Lenis smooth scroll ───────────────────────── */
function useLenis() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js';
    script.onload = () => {
      const lenis = new window.Lenis({
        duration: 1.4,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
      });
      const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
      window.__lenis = lenis;
    };
    document.head.appendChild(script);
    return () => {
      if (window.__lenis) { window.__lenis.destroy(); }
    };
  }, []);
}

/* ─── Intersection reveal ───────────────────────── */
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

/* ─── Scramble text hook ────────────────────────── */
function useScramble(text, trigger, duration = 1000) {
  const [display, setDisplay] = useState(text);
  const chars = '!@#$%^&*<>?/abcdefghijklmnopqrstuvwxyz';
  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const totalFrames = Math.floor(duration / 30);
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setDisplay(
        text.split('').map((char, i) => {
          if (char === ' ') return ' ';
          const revealAt = i / text.length;
          if (progress > revealAt) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      if (frame >= totalFrames) {
        setDisplay(text);
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [trigger]);
  return display;
}

/* ─── Cursor glow ───────────────────────────────── */
function CursorGlow() {
  const glowRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px';
        glowRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div className="cursor-glow" ref={glowRef} />;
}

/* ─── Marquee Bar ───────────────────────────────── */
function MarqueeBar() {
  const items = ['Strategy', 'Branding', 'Marketing', 'Design', 'Digital', 'Growth', 'Clarity'];
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="marquee-bar">
      <div className="marquee-bar__inner">
        {doubled.map((w, i) => (
          <React.Fragment key={i}>
            <span>{w}</span>
            <span className="dot">✦</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ─── Bento MV Section ──────────────────────────── */
function BentoMVSection({ mvRef, mvVisible }) {
  const [flipped, setFlipped] = useState({ vision: false, mission: false });

  const toggle = (key) => (e) => {
    e.stopPropagation();
    setFlipped(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section
      className={`bento-mv-section ${mvVisible ? 'revealed' : ''}`}
      ref={mvRef}
    >
      <div className="bento-grid">

        {/* ── Vision Card ── */}
        <div
          className={`bento-card bento-card--vision ${flipped.vision ? 'flipped' : ''}`}
          onClick={toggle('vision')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && toggle('vision')(e)}
          aria-label="Our Vision – tap to reveal"
        >
          <div className="bento-card__inner">
            {/* Front */}
            <div className="bento-card__face bento-card__front">
              <div className="bento-card__front-top">
                <p className="bento-front-label">Our Vision</p>
                <h2 className="bento-front-keyword">
                  Strong &amp;<br />
                  Recognizable<br />
                  Brands.
                </h2>
                <p className="bento-front-teaser">
                  Building digital presence that commands trust and lasting value.
                </p>
              </div>
              <span className="bento-tap-hint">
                <span className="bento-tap-hint__icon">↗</span>
                Tap to reveal
              </span>
            </div>
            {/* Back */}
            <div className="bento-card__face bento-card__back">
              <p className="bento-back-label">Our Vision</p>
              <p className="bento-back-body">
                To help businesses grow into{' '}
                <em>strong and recognizable brands</em> in the digital world —
                creating digital experiences that build trust, credibility,
                and long-term value.
              </p>
              <span className="bento-close-hint" onClick={toggle('vision')}>
                ↙ Close
              </span>
            </div>
          </div>
        </div>

        {/* ── Accent Card 1 ── */}
        <div className="bento-card bento-card--acct1">
          <div className="bento-accent-face">
            <span className="bento-accent-big">MUM<br />BAI</span>
            <span className="bento-accent-label">Based In</span>
          </div>
        </div>

        {/* ── Accent Card 2 ── */}
        <div className="bento-card bento-card--acct2">
          <div className="bento-accent-face">
            <span className="bento-accent-big">✦</span>
            <span className="bento-accent-label">Brand First</span>
          </div>
        </div>

        {/* ── Mission Card ── */}
        <div
          className={`bento-card bento-card--mission ${flipped.mission ? 'flipped' : ''}`}
          onClick={toggle('mission')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && toggle('mission')(e)}
          aria-label="Our Mission – tap to reveal"
        >
          <div className="bento-card__inner">
            {/* Front */}
            <div className="bento-card__face bento-card__front">
              <div className="bento-card__front-top">
                <p className="bento-front-label">Our Mission</p>
                <h2 className="bento-front-keyword">
                  Sustainable<br />
                  Growth.
                </h2>
                <p className="bento-front-teaser">
                  Strategy, creativity, and technology working as one force.
                </p>
              </div>
              <span className="bento-tap-hint">
                <span className="bento-tap-hint__icon">↗</span>
                Tap to reveal
              </span>
            </div>
            {/* Back */}
            <div className="bento-card__face bento-card__back">
              <p className="bento-back-label">Our Mission</p>
              <p className="bento-back-body">
                To support businesses through thoughtful strategy, creative
                execution, and effective digital marketing — combining design,
                technology, and communication to{' '}
                <em>achieve sustainable growth.</em>
              </p>
              <span className="bento-close-hint" onClick={toggle('mission')}>
                ↙ Close
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─── About Page ────────────────────────────────── */
export default function About() {
  useLenis();

  const [heroRef, heroVisible] = useReveal(0.1);
  const [introRef, introVisible] = useReveal();
  const [mvRef, mvVisible] = useReveal(0.1);
  const [perspectiveRef, perspectiveVisible] = useReveal();
  const [whatRef, whatVisible] = useReveal();
  const [foundersRef, foundersVisible] = useReveal();

  const scrambled = useScramble('stand out.', heroVisible, 1100);

  return (
    <div className="about-page">
      <CursorGlow />

      {/* ── Hero ── */}
      <section
        className={`about-hero ${heroVisible ? 'revealed' : ''}`}
        ref={heroRef}
      >
        <div className="about-hero__inner">
          <p className="section-label">About Shine Digital</p>
          <h1 className="about-hero__title">
            <span>Every Brand Has a Story. </span>
            <em>We Help It Shine.</em>
          </h1>
          <p className="about-hero__sub">
            Shine Digital is a Mumbai based digital marketing and brand
            strategy agency focused on helping businesses grow with
            clarity and purpose.
          </p>
        </div>
      </section>

      <MarqueeBar />

      {/* ── Intro Statement ── */}
      <section
        className={`about-intro-section ${introVisible ? 'revealed' : ''}`}
        ref={introRef}
      >
        <div className="about-intro-section__inner">
          <p className="about-intro-section__lead">
            In today's crowded digital landscape, many brands are active
            but not memorable. Content is created, ads are run, and platforms
            are used, but the brand itself often lacks a clear identity.
          </p>
          <p className="about-intro-section__lead">
            At Shine Digital, our work begins by solving that problem.
          </p>
          <p className="about-intro-section__lead">
            We help businesses define what they stand for, shape how they
            communicate, and build a digital presence that people recognize
            and trust.
          </p>
          <h3 className="about-intro-section__pull">
            Our role is not just to run marketing campaigns.<br />
            Our role is to <em>build brands that grow.</em>
          </h3>
        </div>
      </section>

      {/* ── Bento Mission / Vision ── */}
      <BentoMVSection mvRef={mvRef} mvVisible={mvVisible} />

      {/* ── Perspective ── */}
      <section
        className={`perspective-section ${perspectiveVisible ? 'revealed' : ''}`}
        ref={perspectiveRef}
      >
        <div className="perspective-section__inner">
          <p className="section-label">Our Perspective</p>
          <h2 className="perspective-section__heading">
            Successful marketing starts with<br />
            building a <em>strong brand.</em>
          </h2>
          <p className="perspective-section__body">
            When a brand has clarity in its identity, message, and purpose,
            every digital effort becomes more meaningful. We look beyond
            individual campaigns or platforms — our focus is on shaping a
            brand's overall presence so that every website, piece of content,
            and marketing effort works together to create a clear and
            lasting impression.
          </p>
        </div>
      </section>

      <MarqueeBar />

      {/* ── About Visual Block ── */}
      <section
        className={`about-visual-section ${whatVisible ? 'revealed' : ''}`}
        ref={whatRef}
      >
        <div className="about-visual__left">
          <p className="section-label">What We Do</p>
          <h2 className="about-visual__heading">
            We help brands<br />grow.
          </h2>
          <p className="about-visual__sub">
            Through strategy, marketing, design, and digital experiences
            we build brands that people recognize, trust, and remember.
          </p>
        </div>
        <div className="about-visual__right">
          <div className="about-visual__vid-wrap">
            <iframe
              src="https://play.gumlet.io/embed/69f245fa9c68b6349ab356ab?background=false&autoplay=true&loop=true&muted=true&disable_player_controls=false&preload=true"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              title="Shine Digital About Video"
            />
          </div>
        </div>
      </section>

      {/* ── Founders ── */}
      <section
        className={`founders-section ${foundersVisible ? 'revealed' : ''}`}
        ref={foundersRef}
      >
        <p className="section-label">The Minds Behind It</p>
        <h2 className="founders-section__heading">Our Founders</h2>
        <div className="founders-grid">
          {[
            {
              name: 'Krisha Mehta',
              role: 'Co-Founder & Managing Director',
              bio: "Krisha Mehta is a marketing professional with a Master's degree from London and a refined background in business and fashion.",
              photo: founder1,
            },
            {
              name: 'Savin Tuscano',
              role: 'Founder, Shine Digital',
              bio: 'Savin Tuscano is a filmmaker, writer, producer, and founder of Shine Digital based in Mumbai. With a strong background in storytelling, digital media, and creative marketing, he has worked across films, branded content, and advertising campaigns. His passion lies in building impactful narratives that connect brands with audiences authentically. Known for his creative vision and people-driven approach, Savin blends cinematic storytelling with modern digital strategy. Through Shine Digital, he continues to help businesses and creators grow their presence in the digital space.',
              photo: founder2,
            },
          ].map((f, i) => (
            <div key={i} className="founder-card" style={{ '--i': i }}>
              <div className="founder-card__photo">
                <img
                  src={f.photo}
                  alt={f.name}
                  className="founder-card__photo-img"
                />
              </div>
              <div className="founder-card__info">
                <h3>{f.name}</h3>
                <p className="founder-card__role">{f.role}</p>
                <p className="founder-card__bio">{f.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}