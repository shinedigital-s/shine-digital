import React, { useState } from 'react';
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

const items = [
  { src: p1,  alt: 'Portfolio 1',  cls: 'bento-wide' },
  { src: p2,  alt: 'Portfolio 2',  cls: 'bento-tall' },
  { src: p3,  alt: 'Portfolio 3',  cls: 'bento-normal' },
  { src: p4,  alt: 'Portfolio 4',  cls: 'bento-normal' },
  { src: p5,  alt: 'Portfolio 5',  cls: 'bento-wide' },
  { src: p6,  alt: 'Portfolio 6',  cls: 'bento-normal' },
  { src: p7,  alt: 'Portfolio 7',  cls: 'bento-tall' },
  { src: p8,  alt: 'Portfolio 8',  cls: 'bento-normal' },
  { src: p9,  alt: 'Portfolio 9',  cls: 'bento-wide' },
  { src: p10, alt: 'Portfolio 10', cls: 'bento-normal' },
  { src: p11, alt: 'Portfolio 11', cls: 'bento-normal' },
  { src: p12, alt: 'Portfolio 12', cls: 'bento-wide' },
  { src: p13, alt: 'Portfolio 13', cls: 'bento-normal' },
  { src: p14, alt: 'Portfolio 14', cls: 'bento-tall' },
  { src: p15, alt: 'Portfolio 15', cls: 'bento-normal' },
];

export default function Portfolio() {
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = (src, alt) => setLightbox({ src, alt });
  const closeLightbox = () => setLightbox(null);

  return (
    <div className="portfolio-page">
      {/* ── Header ── */}
      <div className="pf-header">
        <span className="pf-eyebrow">Our Work</span>
        <h1 className="pf-title">Portfolio</h1>
        <p className="pf-subtitle">
          A curated showcase of brands we've elevated through strategy, design&nbsp;&amp;&nbsp;content.
        </p>
      </div>

      {/* ── Bento Grid ── */}
      <div className="bento-grid">
        {items.map((item, i) => (
          <div
            key={i}
            className={`bento-cell ${item.cls}`}
            onClick={() => openLightbox(item.src, item.alt)}
          >
            <img src={item.src} alt={item.alt} loading="lazy" />
            <div className="bento-overlay">
              <span className="bento-zoom">&#x2B;</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div className="pf-lightbox" onClick={closeLightbox}>
          <button className="pf-lb-close" onClick={closeLightbox} aria-label="Close">&#x2715;</button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
