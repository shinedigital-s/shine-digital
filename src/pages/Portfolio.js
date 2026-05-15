import React, { useState, useEffect } from 'react';
import './Portfolio.css';

import p1  from '../assets/portfolil/1.png';
import p2  from '../assets/portfolil/2.png';
import p3  from '../assets/portfolil/3.png';
import p4  from '../assets/portfolil/4.png';
import p5  from '../assets/portfolil/5.png';
import p6  from '../assets/portfolil/6.png';
import p7  from '../assets/portfolil/7.png';
import p8  from '../assets/portfolil/8.png';
import p9  from '../assets/portfolil/9.png';
import p10 from '../assets/portfolil/10.png';
import p11 from '../assets/portfolil/11.png';
import p12 from '../assets/portfolil/12.png';
import p13 from '../assets/portfolil/13.png';
import p14 from '../assets/portfolil/14.png';
import p15 from '../assets/portfolil/15.png';

// All images are 1080×2220 portrait (ratio ~0.487).
// Layout uses a 5-column grid.
// "hero" cells span 2 cols but keep the portrait ratio via padding-top.
const items = [
  { src: p1,  alt: 'Project 1',  hero: true  },   // row 1: cols 1-2
  { src: p2,  alt: 'Project 2',  hero: false },    // row 1: col 3
  { src: p3,  alt: 'Project 3',  hero: false },    // row 1: col 4
  { src: p4,  alt: 'Project 4',  hero: false },    // row 1: col 5
  { src: p5,  alt: 'Project 5',  hero: false },    // row 2: col 1
  { src: p6,  alt: 'Project 6',  hero: false },    // row 2: col 2
  { src: p7,  alt: 'Project 7',  hero: true  },    // row 2: cols 3-4
  { src: p8,  alt: 'Project 8',  hero: false },    // row 2: col 5
  { src: p9,  alt: 'Project 9',  hero: false },    // row 3: col 1
  { src: p10, alt: 'Project 10', hero: false },    // row 3: col 2
  { src: p11, alt: 'Project 11', hero: false },    // row 3: col 3
  { src: p12, alt: 'Project 12', hero: false },    // row 3: col 4
  { src: p13, alt: 'Project 13', hero: true  },    // row 4: cols 1-2
  { src: p14, alt: 'Project 14', hero: false },    // row 4: col 3
  { src: p15, alt: 'Project 15', hero: false },    // row 4: col 4
];

export default function Portfolio() {
  const [lightbox, setLightbox] = useState(null);
  const [visible, setVisible] = useState([]);

  // Staggered entrance animation
  useEffect(() => {
    items.forEach((_, i) => {
      setTimeout(() => setVisible(v => [...v, i]), 80 * i);
    });
  }, []);

  const open  = (i) => setLightbox(i);
  const close = ()  => setLightbox(null);
  const prev  = (e) => { e.stopPropagation(); setLightbox(i => (i - 1 + items.length) % items.length); };
  const next  = (e) => { e.stopPropagation(); setLightbox(i => (i + 1) % items.length); };

  return (
    <div className="portfolio-page">

      {/* Header */}
      <header className="pf-header">
        <span className="pf-eyebrow">Our Work</span>
        <h1 className="pf-title">Portfolio</h1>
        <p className="pf-subtitle">
          A curated showcase of brands we've elevated through strategy, design&nbsp;&amp;&nbsp;content.
        </p>
      </header>

      {/* Grid */}
      <section className="pf-grid">
        {items.map((item, i) => (
          <div
            key={i}
            className={`pf-cell${item.hero ? ' pf-hero' : ''}${visible.includes(i) ? ' pf-visible' : ''}`}
            onClick={() => open(i)}
          >
            <div className="pf-img-wrap">
              <img src={item.src} alt={item.alt} loading="lazy" draggable="false" />
            </div>
            <div className="pf-overlay">
              <div className="pf-overlay-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="pf-lb-backdrop" onClick={close}>
          <button className="pf-lb-nav pf-lb-prev" onClick={prev} aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          <div className="pf-lb-img-wrap" onClick={e => e.stopPropagation()}>
            <img src={items[lightbox].src} alt={items[lightbox].alt} />
            <span className="pf-lb-counter">{lightbox + 1} / {items.length}</span>
          </div>

          <button className="pf-lb-nav pf-lb-next" onClick={next} aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          <button className="pf-lb-close" onClick={close} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      )}
    </div>
  );
}
