import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

import logo from '../assets/logo.png'; // Ensure this path matches your project structure

const navLinks = [
  { label: 'About Us', to: '/about-us' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Blog', to: '/blog' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [belowHero, setBelowHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setBelowHero(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu when the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${belowHero ? 'nav-visible' : ''}`}>
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Shine Digital" className="navbar-logo-img" />
        </Link>

        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/join-us" className="nav-cta">Let's Talk</Link>
        </div>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className="mobile-nav-link"
              style={{ '--delay': `${i * 0.07}s` }}
            >
              <span className="mobile-link-num">0{i + 1}</span>
              {link.label}
            </Link>
          ))}
          <Link to="/join-us" className="mobile-cta">Let's Talk →</Link>
        </div>
      </div>
    </>
  );
}