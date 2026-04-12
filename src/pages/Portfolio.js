import React, { useState, useRef, useEffect } from 'react';
import './Portfolio.css';

const PORTFOLIO_ITEMS = [
  { id: '01', title: 'The Neon Brief', client: 'TechCorp India', category: 'Brand Film', year: '2024', aspect: '16/9', size: 'large' },
  { id: '02', title: 'Golden Hour', client: 'Lumière Skincare', category: 'Social Media', year: '2024', aspect: '9/16', size: 'tall' },
  { id: '03', title: 'Untethered', client: 'EduStart', category: 'Branding', year: '2023', aspect: '4/3', size: 'medium' },
  { id: '04', title: 'Pulse', client: 'FitZone', category: 'Social Media', year: '2024', aspect: '9/16', size: 'tall' },
  { id: '05', title: 'Surface Tension', client: 'Kairos Watches', category: 'Brand Film', year: '2023', aspect: '16/9', size: 'large' },
  { id: '06', title: 'Bloom', client: 'Aria Florals', category: 'Website', year: '2024', aspect: '4/3', size: 'medium' },
  { id: '07', title: 'Concrete Dreams', client: 'UrbanNest', category: 'Branding', year: '2023', aspect: '16/9', size: 'large' },
  { id: '08', title: 'Signal & Noise', client: 'Wavelength Records', category: 'Films', year: '2024', aspect: '9/16', size: 'tall' },
];

const CATEGORIES = ['All', 'Brand Film', 'Social Media', 'Branding', 'Website', 'Films'];

function useReveal(threshold = 0.1) {
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

function PortfolioCard({ item, index }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div
      ref={ref}
      className={`pf-card pf-card--${item.size} ${visible ? 'revealed' : ''}`}
      style={{ '--i': index % 4 }}
    >
      <div className="pf-card__media" style={{ aspectRatio: item.aspect }}>
        <div className="pf-card__ph">
          <div className="pf-card__ph-icon">▶</div>
          <span>{item.title}</span>
        </div>
        <div className="pf-card__overlay">
          <div className="pf-card__overlay-content">
            <p className="pf-card__overlay-cat">{item.category}</p>
            <h3>{item.title}</h3>
            <p className="pf-card__overlay-client">{item.client}</p>
          </div>
        </div>
      </div>
      <div className="pf-card__meta">
        <span className="pf-card__num">{item.id}</span>
        <div>
          <h4 className="pf-card__title">{item.title}</h4>
          <p className="pf-card__client">{item.client} · {item.year}</p>
        </div>
        <span className="pf-card__tag">{item.category}</span>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const [heroRef, heroVisible] = useReveal(0.1);

  const filtered = active === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(i => i.category === active);

  return (
    <div className="portfolio-page">
      <section className={`pf-hero ${heroVisible ? 'revealed' : ''}`} ref={heroRef}>
        <div className="pf-hero__inner">
          <p className="section-label">Portfolio</p>
          <h1 className="pf-hero__title">
            Work that<br /><em>speaks.</em>
          </h1>
          <p className="pf-hero__sub">
            A selection of brands we've helped find their voice, 
            their audience, and their moment.
          </p>
        </div>
      </section>

      <section className="pf-filter">
        <div className="pf-filter__inner">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`pf-filter__btn ${active === cat ? 'active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="pf-grid">
        {filtered.map((item, i) => (
          <PortfolioCard key={item.id} item={item} index={i} />
        ))}
      </section>
    </div>
  );
}
