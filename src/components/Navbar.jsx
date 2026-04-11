import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'
<<<<<<< HEAD
import logo from '../assets/logo.png'

const navLinks = [
  { label: 'About Us',   to: '/about-us' },
  { label: 'Services',   to: '/services' },
  { label: 'Blogs',      to: '/blog' },
  { label: 'Portfolio',  to: '/portfolio' },
  { label: 'Contact Us', to: '/contact' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
=======
import logo from './assets/logo.png'

const navLinks = [
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Blog', to: '/blog' },
  { label: 'Join Us', to: '/join-us' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
>>>>>>> 34f04cda37a2764183c8458f2a2fcd8717baf568
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])
<<<<<<< HEAD
=======

>>>>>>> 34f04cda37a2764183c8458f2a2fcd8717baf568
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
<<<<<<< HEAD
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        {/* Logo — leave src empty, add src/assets/logo.png */}
=======
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
>>>>>>> 34f04cda37a2764183c8458f2a2fcd8717baf568
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Shine Digital" className="navbar-logo-img" />
        </Link>

        <div className="navbar-links">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
<<<<<<< HEAD
              className={`nav-link${location.pathname === link.to ? ' active' : ''}`}
=======
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
>>>>>>> 34f04cda37a2764183c8458f2a2fcd8717baf568
            >
              {link.label}
            </Link>
          ))}
<<<<<<< HEAD
        </div>

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
=======
          <Link to="/join-us" className="nav-cta">Let's Talk</Link>
        </div>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
>>>>>>> 34f04cda37a2764183c8458f2a2fcd8717baf568
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

<<<<<<< HEAD
      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
=======
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
>>>>>>> 34f04cda37a2764183c8458f2a2fcd8717baf568
        <div className="mobile-menu-inner">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className="mobile-nav-link"
<<<<<<< HEAD
              style={{ '--i': i }}
            >
              {link.label}
            </Link>
          ))}
=======
              style={{ '--delay': `${i * 0.07}s` }}
            >
              <span className="mobile-link-num">0{i + 1}</span>
              {link.label}
            </Link>
          ))}
          <Link to="/join-us" className="mobile-cta">Let's Talk →</Link>
>>>>>>> 34f04cda37a2764183c8458f2a2fcd8717baf568
        </div>
      </div>
    </>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> 34f04cda37a2764183c8458f2a2fcd8717baf568
