import React, { useEffect, useRef, useState, useCallback } from 'react';
import './About.css';

/* ─── Lenis smooth scroll ───────────────────────── */
function useLenis() {
  useEffect(() => {
    // Dynamically load Lenis from CDN
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

/* ─── About Page ────────────────────────────────── */
export default function About() {
  useLenis();

  const [heroRef, heroVisible] = useReveal(0.1);
  const [introRef, introVisible] = useReveal();
  const [mvRef, mvVisible] = useReveal();
  const [perspectiveRef, perspectiveVisible] = useReveal();
  const [whatRef, whatVisible] = useReveal();
  const [foundersRef, foundersVisible] = useReveal();

  const scrambled = useScramble('stand out.', heroVisible, 1100);

  return (
    <div className="about-page">
      <CursorGlow />

      {/* ── Hero ── */}
      <section className={`about-hero ${heroVisible ? 'revealed' : ''}`} ref={heroRef}>
        <div className="about-hero__inner">
          <p className="section-label">About Shine Digital</p>
          <h1 className="about-hero__title">
            <span>Building brands that</span>
            <em>{scrambled}</em>
          </h1>
          <p className="about-hero__sub">
            Shine Digital is a Mumbai based digital marketing and brand
            strategy agency focused on helping businesses grow with
            clarity and purpose.
          </p>
        </div>
        <div className="about-hero__stats">
          {[
            { num: '50+', label: 'Brands Shaped' },
            { num: '3+', label: 'Years Running' },
            { num: '200+', label: 'Projects Delivered' },
            { num: '∞', label: 'Ideas Generated' },
          ].map((s, i) => (
            <div key={i} className="about-stat" style={{ '--i': i }}>
              <span className="about-stat__num">{s.num}</span>
              <span className="about-stat__label">{s.label}</span>
            </div>
          ))}
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

      {/* ── Mission / Vision ── */}
      <section className={`mv-section ${mvVisible ? 'revealed' : ''}`} ref={mvRef}>
        <div className="mv-card">
          <p className="section-label">Our Vision</p>
          <h2>
            To help businesses grow into <em>strong and recognizable brands</em> in
            the digital world — creating digital experiences that build
            trust, credibility, and long term value.
          </h2>
        </div>
        <div className="mv-card mv-card--vision">
          <p className="section-label">Our Mission</p>
          <h2>
            To support businesses through thoughtful strategy, creative
            execution, and effective digital marketing — combining design,
            technology, and communication to <em>achieve sustainable growth.</em>
          </h2>
        </div>
      </section>

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

      {/* ── What We Do ── */}
      <section className={`what-section ${whatVisible ? 'revealed' : ''}`} ref={whatRef}>
        <div className="what-section__left">
          <p className="section-label">What We Do</p>
          <h2 className="what-section__heading">
            We help brands<br />grow.
          </h2>
          <p className="what-section__sub">
            Through strategy, marketing, design, and digital experiences.
          </p>
        </div>
        <div className="what-section__right">
          {[
            'Brand Strategy & Positioning',
            'Identity & Brand Design',
            'Digital Marketing',
            'Social Media & Content',
            'Websites & Digital Experiences',
            'Films & Visual Storytelling',
          ].map((item, i) => (
            <div key={i} className="what-item" style={{ '--i': i }}>
              <span className="what-item__num">0{i + 1}</span>
              <span className="what-item__text">{item}</span>
              <span className="what-item__arrow">→</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Founders (kept as existing) ── */}
      <section className={`founders-section ${foundersVisible ? 'revealed' : ''}`} ref={foundersRef}>
        <p className="section-label">The Minds Behind It</p>
        <h2 className="founders-section__heading">Our Founders</h2>
        <div className="founders-grid">
          {[
            {
              name: 'Krisha Mehta',
              role: 'Co-Founder & Creative Director',
              bio: "The visual brain. Krisha turns brand stories into stunning content — from strategy to execution, she's the one making it look effortless.",
            },
            {
              name: 'Savin Furtado',
              role: 'Co-Founder & Director of Films',
              bio: 'The storyteller. Savin crafts cinematic narratives that connect brands with people on a deeply human level. Every frame, intentional.',
            },
          ].map((f, i) => (
            <div key={i} className="founder-card" style={{ '--i': i }}>
              <div className="founder-card__photo">
                <div className="founder-card__photo-ph">
                  <span>{f.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
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