import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logoImg from '../assets/logo (2).jpeg';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const vh = window.innerHeight;

      if (isHome) {
        setVisible(scrollY > vh * 0.85);
      } else {
        setVisible(true);
      }
      setAtTop(scrollY < 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    const lenis = window.__lenis;
    if (lenis) {
      lenis.on('scroll', ({ scroll }) => {
        const vh = window.innerHeight;
        if (isHome) {
          setVisible(scroll > vh * 0.85);
        } else {
          setVisible(true);
        }
        setAtTop(scroll < 20);
      });
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  return (
    <nav className={`navbar ${visible ? 'navbar--visible' : ''} ${atTop && !isHome ? 'navbar--top' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <img src={logoImg} alt="Shine Digital" />
        </Link>

        <ul className="navbar__links">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`navbar__link ${location.pathname === l.to ? 'active' : ''}`}
              >
                <span>{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <button
          className={`burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {links.map((l, i) => (
            <li key={l.to} style={{ '--i': i }}>
              <Link to={l.to} className={location.pathname === l.to ? 'active' : ''}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}