import React, { useEffect, useRef, useState } from 'react';
import './About.css';

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

const WORKFLOW = [
  { step: '01', title: 'Discovery', desc: 'We deep dive into your brand, audience, and goals. No assumptions — just honest listening and sharp questions.' },
  { step: '02', title: 'Strategy', desc: 'We map out the path forward. Every deliverable is justified by data and shaped by creative instinct.' },
  { step: '03', title: 'Creation', desc: 'This is where the magic happens. Scripts, visuals, pixels — we obsess over every detail until it\'s right.' },
  { step: '04', title: 'Launch', desc: 'We deploy with precision and watch the numbers. Then we iterate, optimize, and keep pushing forward.' },
];

export default function About() {
  const [heroRef, heroVisible] = useReveal(0.1);
  const [mvRef, mvVisible] = useReveal();
  const [whatRef, whatVisible] = useReveal();
  const [workRef, workVisible] = useReveal(0.1);
  const [foundersRef, foundersVisible] = useReveal();

  return (
    <div className="about-page">
      {/* Hero */}
      <section className={`about-hero ${heroVisible ? 'revealed' : ''}`} ref={heroRef}>
        <div className="about-hero__inner">
          <p className="section-label">About Us</p>
          <h1 className="about-hero__title">
            <span>Built on</span>
            <em>obsession.</em>
          </h1>
          <p className="about-hero__sub">
            Shine Digital is where creativity meets strategy — 
            a studio that doesn't settle for good when great is possible.
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

      {/* Mission / Vision */}
      <section className={`mv-section ${mvVisible ? 'revealed' : ''}`} ref={mvRef}>
        <div className="mv-card">
          <p className="section-label">Mission</p>
          <h2>To amplify brands that dare to be different, crafting content that doesn't just capture attention — it <em>earns</em> it.</h2>
        </div>
        <div className="mv-card mv-card--vision">
          <p className="section-label">Vision</p>
          <h2>To be India's most creative digital studio — where every frame, every word, every pixel tells a story worth sharing.</h2>
        </div>
      </section>

      {/* What We Do */}
      <section className={`what-section ${whatVisible ? 'revealed' : ''}`} ref={whatRef}>
        <div className="what-section__left">
          <p className="section-label">What We Do</p>
          <h2 className="what-section__heading">
            Full-spectrum<br />creative power.
          </h2>
        </div>
        <div className="what-section__right">
          {[
            'Social media that stops the scroll',
            'Branding that people remember',
            'Websites that actually convert',
            'Films that move people',
            'Campaigns built on real insight',
            'Strategy driven by data and instinct',
          ].map((item, i) => (
            <div key={i} className="what-item" style={{ '--i': i }}>
              <span className="what-item__num">0{i + 1}</span>
              <span className="what-item__text">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className={`workflow-section ${workVisible ? 'revealed' : ''}`} ref={workRef}>
        <div className="workflow-section__header">
          <p className="section-label">How We Work</p>
          <h2>Our Process</h2>
        </div>
        <div className="workflow-steps">
          {WORKFLOW.map((w, i) => (
            <div key={i} className="workflow-step" style={{ '--i': i }}>
              <div className="workflow-step__num">{w.step}</div>
              <div className="workflow-step__content">
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
              {i < WORKFLOW.length - 1 && <div className="workflow-step__line" />}
            </div>
          ))}
        </div>
      </section>

      {/* Founders */}
      <section className={`founders-section ${foundersVisible ? 'revealed' : ''}`} ref={foundersRef}>
        <p className="section-label">The Minds Behind It</p>
        <h2 className="founders-section__heading">Our Founders</h2>
        <div className="founders-grid">
          {[
            { name: 'Krisha Mehta', role: 'Co-Founder & Creative Director', bio: "The visual brain. Krisha turns brand stories into stunning content \u2014 from strategy to execution, she's the one making it look effortless." },
            { name: 'Savin Furtado', role: 'Co-Founder & Director of Films', bio: 'The storyteller. Savin crafts cinematic narratives that connect brands with people on a deeply human level. Every frame, intentional.' },
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
