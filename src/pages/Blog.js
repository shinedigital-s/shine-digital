import React, { useEffect, useState } from 'react';
import './Blog.css';

export default function Blog() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`blog-page ${loaded ? 'loaded' : ''}`}>
      <div className="blog-maintenance">
        <div className="blog-maintenance__content">
          <p className="section-label">Blog</p>
          <div className="blog-maintenance__icon">✦</div>
          <h1 className="blog-maintenance__title">
            Under<br /><em>Construction.</em>
          </h1>
          <p className="blog-maintenance__sub">
            We're crafting something worth reading. Check back soon — 
            ideas, stories, and perspectives from the minds at Shine Digital.
          </p>
          <div className="blog-maintenance__dots">
            <span /><span /><span />
          </div>
        </div>
        <div className="blog-maintenance__bg-text">COMING SOON</div>
      </div>
    </div>
  );
}
