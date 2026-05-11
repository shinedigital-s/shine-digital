import React from 'react';
import collage from '../assets/collage.png';
import './Portfolio.css';

export default function Portfolio() {
  return (
    <div className="portfolio-page">
      <div className="pf-collage-wrap">
        <img src={collage} alt="Shine Digital Portfolio" className="pf-collage-img" />
      </div>
    </div>
  );
}
