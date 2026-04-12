import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <img src="/logo.jpeg" alt="Shine Digital" className="footer__logo" />
          <p className="footer__tagline">
            We craft stories that <em>move</em> people.
          </p>
        </div>

        <div className="footer__nav">
          <div className="footer__col">
            <h4>Pages</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Connect</h4>
            <ul>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copy">© {new Date().getFullYear()} Shine Digital. All rights reserved.</p>
        <p className="footer__made">Made with obsession.</p>
      </div>

      <div className="footer__wordmark">SHINE DIGITAL</div>
    </footer>
  );
}
