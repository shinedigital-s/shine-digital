import React, { useEffect, useRef, useState } from 'react';
import './About.css';
import founder1 from '../assets/founder (1).jpeg';
import founder2 from '../assets/founder (2).jpeg';

/* ─── Lenis smooth scroll ───────────────────────── */
function useLenis() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js';
    script.onload = () => {
      const lenis = new window.Lenis({
        duration: 1.4,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
      });
      const raf = time => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
      window.__lenis = lenis;
    };
    document.head.appendChild(script);
    return () => {
      if (window.__lenis) window.__lenis.destroy();
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
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── Cursor Glow ───────────────────────────────── */
function CursorGlow() {
  const glowRef = useRef(null);
  useEffect(() => {
    const move = e => {
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
  const items = [
    'Strategy', 'Branding', 'Marketing', 'Design', 'Digital', 'Growth', 'Clarity',
  ];
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

/* ─── Generic Flip Card ─────────────────────────── */
function FlipCard({ number, tag, frontTitle, backLabel, backBody, cueChar = '→' }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div>
      <div
        className={`flip-card${flipped ? ' flipped' : ''}`}
        onClick={() => setFlipped(f => !f)}
        role="button"
        tabIndex={0}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setFlipped(f => !f)}
        aria-label={`${tag} — click to reveal`}
      >
        <div className="flip-card__inner">

          {/* ── Front ── */}
          <div className="flip-card__front">
            {number && (
              <span className="flip-card__front-number">{number}</span>
            )}
            <p className="flip-card__front-tag">{tag}</p>
            <h3
              className="flip-card__front-title"
              dangerouslySetInnerHTML={{ __html: frontTitle }}
            />
            <span className="flip-card__front-cue">{cueChar}</span>
          </div>

          {/* ── Back ── */}
          <div className="flip-card__back">
            <p className="flip-card__back-label">{backLabel}</p>
            <p
              className="flip-card__back-body"
              dangerouslySetInnerHTML={{ __html: backBody }}
            />
            <button
              className="flip-card__back-close"
              onClick={e => { e.stopPropagation(); setFlipped(false); }}
            >
              ← Flip back
            </button>
          </div>

        </div>
      </div>
      <p className="flip-card__hint">{flipped ? 'Click to go back' : 'Click to reveal'}</p>
    </div>
  );
}

/* ─── Vision / Mission Flip Cards Section ───────── */
function FlipCardsSection({ fcRef, fcVisible }) {
  return (
    <section
      className={`flip-cards-section${fcVisible ? ' revealed' : ''}`}
      ref={fcRef}
    >
      <p className="section-label">What We Believe</p>
      <div className="flip-cards-grid">
        <FlipCard
          number="01"
          tag="Our Vision"
          frontTitle="Every Brand<br/><em>Has a Story</em>"
          backLabel="Our Vision"
          backBody={`To help businesses grow into <em>strong and recognizable brands</em> in the digital world — creating digital experiences that build trust, credibility, and long-term value.`}
        />
        <FlipCard
          number="02"
          tag="Our Mission"
          frontTitle="We Help<br/><em>It Shine</em>"
          backLabel="Our Mission"
          backBody={`To support businesses through thoughtful strategy, creative execution, and effective digital marketing — combining design, technology, and communication to <em>achieve sustainable growth.</em>`}
        />
      </div>
    </section>
  );
}

/* ─── Perspective Flip Cards Section ────────────── */
function PerspectiveFlipSection({ perspRef, perspVisible }) {
  const cards = [
    {
      tag: 'Brand First',
      frontTitle: 'Identity<br/><em>before</em> everything',
      backLabel: 'Why brand matters',
      backBody: `When a brand has clarity in its identity and purpose, every digital effort becomes more meaningful. We build the foundation <em>before</em> the campaign.`,
    },
    {
      tag: 'Lasting Impression',
      frontTitle: 'Beyond<br/><em>the campaign</em>',
      backLabel: 'Our thinking',
      backBody: `We look beyond individual campaigns or platforms. Our focus is on shaping a brand's overall presence so that every touchpoint works <em>together.</em>`,
    },
    {
      tag: 'Real Growth',
      frontTitle: 'Clarity<br/><em>drives results</em>',
      backLabel: 'The outcome',
      backBody: `A clear message, a consistent voice, and a purposeful presence — these aren't nice-to-haves. They're what turn <em>visibility into trust.</em>`,
    },
  ];

  return (
    <section
      className={`perspective-flip-section${perspVisible ? ' revealed' : ''}`}
      ref={perspRef}
    >
      <p className="section-label">Our Perspective</p>
      <h2 className="perspective-flip-section__heading">
        Successful marketing starts<br />
        with a <em>strong brand.</em>
      </h2>
      <div className="perspective-flip-grid">
        {cards.map((card, i) => (
          <FlipCard key={i} {...card} cueChar="↗" />
        ))}
      </div>
    </section>
  );
}

/* ─── Founder Card ──────────────────────────────── */
function FounderCard({ founder, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="founder-card" style={{ '--i': index }}>
      <div className="founder-card__photo">
        <img
          src={founder.photo}
          alt={founder.name}
          className="founder-card__photo-img"
        />
      </div>
      <div className="founder-card__info">
        <div className="founder-card__name-row">
          <h3>{founder.name}</h3>
          {founder.linkedin && (
            <a
              href={founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="founder-linkedin"
              aria-label={`${founder.name} on LinkedIn`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          )}
        </div>
        <p className="founder-card__role">{founder.role}</p>
        <div className="founder-card__bio-wrap">
          <p className="founder-card__bio">
            {founder.bioShort}
            {founder.bioExtra && (
              <span
                className={`founder-card__bio-extra${expanded ? ' expanded' : ''}`}
              >
                {' '}{founder.bioExtra}
              </span>
            )}
          </p>
          {founder.bioExtra && (
            <button
              className="founder-read-more"
              onClick={() => setExpanded(p => !p)}
            >
              {expanded ? 'Read less ↑' : 'Read more ↓'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── About Page ────────────────────────────────── */
export default function About() {
  useLenis();

  const [heroRef, heroVisible] = useReveal(0.1);
  const [introRef, introVisible] = useReveal();
  const [fcRef, fcVisible] = useReveal(0.1);
  const [perspRef, perspVisible] = useReveal(0.1);
  const [whatRef, whatVisible] = useReveal();
  const [foundersRef, foundersVisible] = useReveal();

  const founders = [
    {
      name: 'Krisha Mehta',
      role: 'Co-Founder & Managing Director',
      bioShort: "Krisha Mehta is a marketing professional with a Master's degree from London and a refined background in business and fashion.",
      bioExtra: null,
      photo: founder1,
      linkedin: 'https://www.linkedin.com/in/krisha-mehta-5056861a5',
    },
    {
      name: 'Savin Tuscano',
      role: 'Founder, Shine Digital',
      bioShort: 'Savin Tuscano is a filmmaker, writer, producer, and founder of Shine Digital based in Mumbai.',
      bioExtra: 'With a strong background in storytelling, digital media, and creative marketing, he has worked across films, branded content, and advertising campaigns. His passion lies in building impactful narratives that connect brands with audiences authentically. Known for his creative vision and people-driven approach, Savin blends cinematic storytelling with modern digital strategy. Through Shine Digital, he continues to help businesses and creators grow their presence in the digital space.',
      photo: founder2,
      linkedin: 'https://www.linkedin.com/in/savin-tuscano-20593b30',
    },
  ];

  return (
    <div className="about-page">
      <CursorGlow />

      {/* ── Hero ── */}
      <section
        className={`about-hero${heroVisible ? ' revealed' : ''}`}
        ref={heroRef}
      >
        <div className="about-hero__inner">
          <p className="section-label">About Shine Digital</p>
          <h1 className="about-hero__title">
            <span>Every Brand Has a Story. </span>
            <em>We Help It Shine.</em>
          </h1>
          <p className="about-hero__sub">
            Shine Digital is a Mumbai based digital marketing and brand strategy
            agency focused on helping businesses grow with clarity and purpose.
          </p>
        </div>
      </section>

      <MarqueeBar />

      {/* ── Intro ── */}
      <section
        className={`about-intro-section${introVisible ? ' revealed' : ''}`}
        ref={introRef}
      >
        <div className="about-intro-section__inner">
          <p className="about-intro-section__lead">
            In today's crowded digital landscape, many brands are active but not
            memorable. Content is created, ads are run, and platforms are used,
            but the brand itself often lacks a clear identity.
          </p>
          <p className="about-intro-section__lead">
            At Shine Digital, our work begins by solving that problem.
          </p>
          <p className="about-intro-section__lead">
            We help businesses define what they stand for, shape how they
            communicate, and build a digital presence that people recognize and
            trust.
          </p>
          <h3 className="about-intro-section__pull">
            Our role is not just to run marketing campaigns.<br />
            Our role is to <em>build brands that grow.</em>
          </h3>
        </div>
      </section>

      {/* ── Vision / Mission Flip Cards ── */}
      <FlipCardsSection fcRef={fcRef} fcVisible={fcVisible} />

      <MarqueeBar />

      {/* ── Perspective Flip Cards ── */}
      <PerspectiveFlipSection perspRef={perspRef} perspVisible={perspVisible} />

      <MarqueeBar />

      {/* ── What We Do ── */}
      <section
        className={`about-visual-section${whatVisible ? ' revealed' : ''}`}
        ref={whatRef}
      >
        <div className="about-visual__left">
          <p className="section-label">What We Do</p>
          <h2 className="about-visual__heading">
            We help brands<br />grow.
          </h2>
          <p className="about-visual__sub">
            Through strategy, marketing, design, and digital experiences we build
            brands that people recognize, trust, and remember.
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
        className={`founders-section${foundersVisible ? ' revealed' : ''}`}
        ref={foundersRef}
      >
        <p className="section-label">The Minds Behind It</p>
        <h2 className="founders-section__heading">Our Founders</h2>
        <div className="founders-grid">
          {founders.map((f, i) => (
            <FounderCard key={i} founder={f} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}