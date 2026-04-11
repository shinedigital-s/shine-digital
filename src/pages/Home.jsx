<<<<<<< HEAD
import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Lenis from 'lenis'
import './Home.css'

/* ─── Lenis smooth scroll ─────────────────────────────────── */
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf) }
    const id = requestAnimationFrame(raf)
    return () => { lenis.destroy(); cancelAnimationFrame(id) }
  }, [])
}

/* ─── Reveal on scroll ────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
        }),
        { threshold: 0.1 }
      )
      document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))
      return () => obs.disconnect()
    }, 120)
    return () => clearTimeout(timer)
  }, [])
}


/* ─── Services data ───────────────────────────────────────── */
const SERVICES = [
  {
    num: '01', title: 'Social Media',
    desc: 'Strategy, content, reels, paid campaigns and community management — we run your entire social presence so you can focus on your business.',
    tags: ['Content Strategy', 'Reels & Stories', 'Paid Campaigns', 'Analytics'],
  },
  {
    num: '02', title: 'Branding',
    desc: 'Logo systems, colour, typography, tone of voice — a complete identity that makes your brand instantly recognisable and deeply trusted.',
    tags: ['Logo & Identity', 'Brand Guidelines', 'Visual Systems', 'Messaging'],
  },
  {
    num: '03', title: 'Website Development',
    desc: 'Fast, beautiful, conversion-focused websites built from scratch — landing pages, stores, portfolios and beyond.',
    tags: ['UI / UX Design', 'Development', 'E-commerce', 'SEO'],
  },
  {
    num: '04', title: 'Films',
    desc: 'Concept to final cut — brand films, social reels and ad campaigns that capture attention and move people to act.',
    tags: ['Brand Films', 'Social Reels', 'Ad Production', 'Motion Graphics'],
  },
]

/* ─── Animated background orbs ───────────────────────────── */
function BackgroundOrbs() {
  return (
    <div className="svc-bg-orbs" aria-hidden="true">
      <div className="svc-orb svc-orb--1" />
      <div className="svc-orb svc-orb--2" />
      <div className="svc-orb svc-orb--3" />
      <div className="svc-grid-lines">
        {Array(6).fill(null).map((_, i) => (
          <div key={i} className="svc-grid-line" />
        ))}
=======
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import logo from '../components/assets/logo.png'

/* ─── Lenis ─────────────────────────────────────────────── */
function useLenis(cb) {
  useEffect(() => {
    let lenis
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
      if (cb) lenis.on('scroll', cb)
    })
    return () => lenis?.destroy()
  }, [])
}

/* ─── Scroll reveal ─────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) }
      }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('[data-r]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

/* ─── Data ──────────────────────────────────────────────── */
const SERVICES = [
  {
    num: '01',
    title: 'Website Design and Development',
    lead: 'Your website is often the first impression people have of your business. We design clean, modern websites that communicate your brand clearly and guide visitors toward action.',
    items: ['Business websites', 'E-commerce websites', 'Landing pages', 'Website redesign', 'Website support and maintenance'],
  },
  {
    num: '02',
    title: 'Search Engine Optimization',
    lead: 'Search visibility plays a key role in digital growth. Our SEO strategies help businesses appear in front of the right audience when they search for relevant products or services.',
    items: ['Keyword research', 'On page optimization', 'Technical SEO', 'Local SEO', 'Content improvement'],
  },
  {
    num: '03',
    title: 'Digital Marketing',
    lead: 'We create marketing campaigns that help brands connect with the right audience. Our focus is on meaningful engagement and measurable business outcomes.',
    items: ['Social media marketing', 'Google advertising', 'Content marketing', 'Performance marketing', 'Lead generation campaigns'],
  },
  {
    num: '04',
    title: 'Branding and Creative',
    lead: 'A strong brand helps people remember you and trust your business. We work closely with clients to develop brand identities that reflect their values and vision.',
    items: ['Logo design', 'Brand identity', 'Creative direction', 'Visual communication', 'Campaign design'],
  },
]

const WHY = [
  { title: 'Thoughtful Strategy', body: 'Every project begins with understanding your business and your goals.' },
  { title: 'Creative Execution', body: 'Our work combines clear thinking with creative ideas that stand out.' },
  { title: 'Focus On Growth', body: 'The goal is always to support your business growth through digital.' },
  { title: 'Collaborative Process', body: 'We work closely with our clients and treat every project as a partnership.' },
]

const PROCESS = [
  { num: '01', title: 'Understanding', body: 'We begin by learning about your business, your audience, and your objectives.' },
  { num: '02', title: 'Planning', body: 'A clear strategy is developed to guide the project.' },
  { num: '03', title: 'Creating', body: 'Our team designs, develops, and builds your digital presence.' },
  { num: '04', title: 'Improving', body: 'We review performance and continuously improve results.' },
]

/* ─── Intro animation overlay ───────────────────────────── */
// Phases: logo → typing → hold → fading → cta
const TAGLINE = 'Marketing that moves.'

function IntroOverlay({ onDone }) {
  const [phase, setPhase] = useState('logo')   // logo | typing | fading | cta
  const [charCount, setCharCount] = useState(0)
  const timerRef = useRef(null)

  // Phase: logo → after 1.4s start typing
  useEffect(() => {
    if (phase !== 'logo') return
    timerRef.current = setTimeout(() => setPhase('typing'), 1400)
    return () => clearTimeout(timerRef.current)
  }, [phase])

  // Phase: typing → hold → fade out → done (no CTA)
  useEffect(() => {
    if (phase !== 'typing') return
    let i = 0
    const tick = () => {
      if (i < TAGLINE.length) {
        i++
        setCharCount(i)
        timerRef.current = setTimeout(tick, 65)
      } else {
        timerRef.current = setTimeout(() => setPhase('fading'), 1200)
      }
    }
    timerRef.current = setTimeout(tick, 200)
    return () => clearTimeout(timerRef.current)
  }, [phase])

  // Phase: fading → call onDone to reveal home
  useEffect(() => {
    if (phase !== 'fading') return
    timerRef.current = setTimeout(() => onDone(), 950)
    return () => clearTimeout(timerRef.current)
  }, [phase])

  return (
    <div className={`intro-overlay${phase === 'fading' ? ' io-fading' : ''}`}>
      <div className="io-logo-wrap">
        {/* Logo animates in */}
        <div className="io-logo-mark">
          <img src={logo} alt="Shine Digital" className="io-logo-img" />
        </div>

        {/* Tagline types in beneath logo */}
        {(phase === 'typing' || phase === 'fading') && (
          <p className="io-tagline">
            {TAGLINE.slice(0, charCount)}
            {phase === 'typing' && <span className="io-cursor" />}
          </p>
        )}
>>>>>>> 34f04cda37a2764183c8458f2a2fcd8717baf568
      </div>
    </div>
  )
}

<<<<<<< HEAD
/* ─── Services Section ────────────────────────────────────── */
function ServicesSection() {
  const cardsRef = useRef([])

  /* Use Lenis scroll event so cards reveal correctly with smooth scroll */
  useEffect(() => {
    const revealCards = () => {
      cardsRef.current.forEach((el) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > 0
        el.classList.toggle('svc-card--visible', inView)
      })
    }

    window.addEventListener('scroll', revealCards, { passive: true })
    revealCards() // run once on mount
    return () => window.removeEventListener('scroll', revealCards)
  }, [])

  return (
    <section className="svc-section">
      <BackgroundOrbs />

      {/* ── Left — sticky panel ── */}
      <div className="svc-left">
        <div className="svc-left-inner">
          <p className="eyebrow">What We Do</p>
          <h2 className="svc-heading">
            Everything<br />your brand<br />
            <span className="outline-text">needs.</span>
          </h2>

          {/* Services reel video */}
          <div className="svc-video-wrap">
            <div className="svc-video-inner">
              <video
                className="svc-video"
                src="/src/assets/services reels.1.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="svc-video-border-anim" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Right — scrolling cards ── */}
      <div className="svc-right">
        <div className="svc-cards-track">
          {SERVICES.map((s, i) => (
            <div
              key={s.num}
              className="svc-card"
              ref={(el) => (cardsRef.current[i] = el)}
              style={{ '--card-index': i }}
            >
              {/* Large ghost numeral */}
              <span className="svc-card-numeral">{s.num}</span>

              <div className="svc-card-content">
                <div className="svc-card-header">
                  <h3 className="svc-card-title">{s.title}</h3>
                  <div className="svc-card-line" />
                </div>
                <p className="svc-card-desc">{s.desc}</p>
                <div className="svc-tags">
                  {s.tags.map((t) => (
                    <span key={t} className="svc-tag">{t}</span>
                  ))}
                </div>
                <Link to="/services" className="svc-cta">
                  <span>Explore</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
/* ─── Home ────────────────────────────────────────────────── */
export default function Home() {
  useLenis()
  useReveal()

  return (
    <div className="home">

      <section className="hero">
        <video
          className="hero-video"
          src="/src/assets/Logo_Animation_Generation_Request (1).mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {Array(3).fill(['Social Media', 'Branding', 'Website Dev', 'Films', 'Content', 'Growth']).flat()
            .map((t, i) => <span key={i} className="ticker-item">{t}<em>✦</em></span>)}
        </div>
      </div>

      <section className="about">
        <div className="about-inner">
          <div className="about-left">
            <p className="eyebrow reveal">About Shine Digital</p>
            <h2 className="about-heading reveal" style={{ '--d': '0.06s' }}>
              ABOUT<br /><span className="outline-text">SHINE</span>
            </h2>
          </div>
          <div className="about-right">
            <div className="about-video reveal" style={{ '--d': '0.1s' }}>
              <div className="about-video-inner">
                <div className="play-btn">▶</div>
              </div>
            </div>
            <p className="about-body reveal" style={{ '--d': '0.18s' }}>
              Shine Digital is a Mumbai-based creative agency working with brands that want to grow online with purpose. Creative thinking, sharp strategy, real results.
            </p>
            <Link to="/about-us" className="view-more reveal" style={{ '--d': '0.24s' }}>VIEW MORE</Link>
          </div>
        </div>
      </section>

      <section className="reels">
        <div className="reels-header">
          <p className="eyebrow reveal">Our Work</p>
          <h2 className="reels-heading reveal" style={{ '--d': '0.08s' }}>
            STORIES<br /><span className="outline-text">WE'VE TOLD</span>
          </h2>
        </div>
        <div className="reels-grid">
          {[
            { n: '01', title: 'Brand Campaign', tag: 'Social Media' },
            { n: '02', title: 'Product Launch', tag: 'Films' },
            { n: '03', title: 'Identity Design', tag: 'Branding' },
          ].map((r, i) => (
            <div key={r.n} className="reel reveal" style={{ '--d': `${i * 0.18}s` }}>
              <div className="reel-media">
                <span className="reel-num">{r.n}</span>
                <div className="reel-overlay">
                  <span className="reel-tag-pill">{r.tag}</span>
                  <span className="reel-overlay-title">{r.title}</span>
                </div>
              </div>
              <div className="reel-footer">
                <span className="reel-name">{r.title}</span>
                <span className="reel-cat">{r.tag}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="reels-cta reveal">
          <Link to="/portfolio" className="view-more">VIEW ALL WORK</Link>
        </div>
      </section>

      <ServicesSection />

      {/* ── Brands Section ── */}
      <section className="brands">
        <div className="brands-inner">
          <div className="brands-header reveal">
            <p className="eyebrow">Trusted By</p>
            <h2 className="brands-heading">
              BRANDS WE'VE<br /><span className="outline-text">WORKED WITH</span>
            </h2>
          </div>

          <div className="brands-grid">
            {[
              {
                cat: 'FMCG & Food',
                brands: ['Maggi', "Ching's Secret", "Kellogg's", 'Sundrop', 'Britannia', 'Cadbury'],
              },
              {
                cat: 'Household / Consumer',
                brands: ['Surf Excel', 'Asian Paints', 'Vim', 'Rin Liquid'],
              },
              {
                cat: 'Electronics & Technology',
                brands: ['iBall', 'Fingers'],
              },
              {
                cat: 'Automotive',
                brands: ['General Motors', 'Mahindra', 'Mahindra Atom'],
              },
              {
                cat: 'Telecom & Connectivity',
                brands: ['Matrix Cellular'],
              },
              {
                cat: 'Pharma & Healthcare',
                brands: ['Dr. Reddy\'s Laboratories', 'Cipla', 'Lupin', 'Novartis', 'Boehringer Ingelheim'],
              },
              {
                cat: 'Banking & Finance',
                brands: ['BCCB Bank', 'SBI', 'RBI'],
              },
              {
                cat: 'Media & Publishing',
                brands: ['India Today', 'Mint', 'Big FM', 'Hindustan Times'],
              },
              {
                cat: 'Industrial & Corporate',
                brands: ['Shree Om Steel', 'Shell', 'Indian Oil', 'TCS'],
              },
              {
                cat: 'Fashion & Lifestyle',
                brands: ['Indian Wedding Sarees', "D'damas", 'Asmi'],
              },
              {
                cat: 'Government / Public Campaigns',
                brands: [
                  'Samajwadi Party Campaign',
                  'Women Power Line 1090',
                  'Samajwadi Pension Yojana',
                  'Kisan Yojna',
                  'UP Expressway Development Campaign',
                ],
              },
            ].map((group, i) => (
              <div key={group.cat} className="brands-group reveal" style={{ '--d': `${(i % 4) * 0.08}s` }}>
                <span className="brands-cat">{group.cat}</span>
                <ul className="brands-list">
                  {group.brands.map(b => (
                    <li key={b} className="brands-item">{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner reveal">
          <div className="footer-brand">
            <p className="footer-logo">SHINE<span>DIGITAL</span></p>
            <p className="footer-tagline">Marketing that moves.</p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <span className="footer-col-head">Navigate</span>
              <Link to="/">Home</Link>
              <Link to="/about-us">About Us</Link>
              <Link to="/services">Services</Link>
              <Link to="/portfolio">Portfolio</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="footer-col">
              <span className="footer-col-head">Contact</span>
              <a href="mailto:hello@shinedigital.in">hello@shinedigital.in</a>
              <a href="tel:+91XXXXXXXXXX">+91 XX XXXX XXXX</a>
              <span>Mumbai, India</span>
            </div>
            <div className="footer-col">
              <span className="footer-col-head">Follow</span>
              <a href="#" target="_blank" rel="noreferrer">Instagram</a>
              <a href="#" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="#" target="_blank" rel="noreferrer">Behance</a>
              <a href="#" target="_blank" rel="noreferrer">Twitter / X</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Shine Digital</span>
          <span>Made with care in Mumbai ✦</span>
        </div>
      </footer>

    </div>
=======

/* ─── Pull quote component ──────────────────────────── */
const QUOTES = [
  'We turn digital presence into business growth.',
  'Strategy first. Creativity always.',
  'Your audience is out there. We help you reach them.',
]

function AboutPullQuote() {
  const [idx, setIdx] = useState(0)
  const [fading, setFading] = useState(false)

  const cycle = () => {
    setFading(true)
    setTimeout(() => {
      setIdx(i => (i + 1) % QUOTES.length)
      setFading(false)
    }, 300)
  }

  return (
    <div className="pull-quote-wrap" onMouseEnter={cycle}>
      <span className="pull-quote-mark">"</span>
      <p className={`pull-quote-text ${fading ? 'pq-fade' : ''}`}>
        {QUOTES[idx]}
      </p>
      <span className="pull-quote-hint">hover to see more</span>
    </div>
  )
}

/* ─── Main Component ─────────────────────────────────────── */
export default function Home() {
  const heroWordRef = useRef(null)
  const [activeService, setActiveService] = useState(0)
  const [introDone, setIntroDone] = useState(false)

  useReveal()
  useLenis()

  useEffect(() => {
    const fn = () => {
      if (heroWordRef.current)
        heroWordRef.current.style.transform = `translateY(${window.scrollY * 0.18}px)`
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      {/* Intro overlay — shown until dismissed */}
      {!introDone && <IntroOverlay onDone={() => setIntroDone(true)} />}

      <div className={`home ${introDone ? 'home-visible' : 'home-hidden'}`}>

        {/* ═══════════ HERO ════════════════════════════════════════════════ */}
        <section className="hero">
          <div className="hero-bg">
            <div className="hbg-panel hbg-l" />
            <div className="hbg-panel hbg-c" />
            <div className="hbg-panel hbg-r" />
          </div>
          <div className="hero-overlay" />

          {/* SHINE left / DIGITAL right — same size, staggered */}
          <div className="hero-title-block" ref={heroWordRef}>
            <span className="ht-shine">SHINE</span>
            <span className="ht-digital">DIGITAL</span>
          </div>

          {/* Bottom bar */}
          <div className="hero-bottom">
            <p className="hero-sub">
              Marketing that moves.
            </p>
            <div className="hero-actions">
              <Link to="/join-us" className="btn-primary">Start Your Project</Link>
              <Link to="/services" className="btn-ghost">Our Services</Link>
            </div>
          </div>

          {/* bottom right quote */}
          <div className="hero-quote-corner">
            <em>let your brand speak louder<br />than the noise around it.</em>
          </div>

          {/* Strip lines */}
          <div className="hero-lines">
            <div /><div /><div />
          </div>

          <div className="hero-scroll-indicator">
            <span>scroll</span>
            <div className="hsi-line" />
          </div>
        </section>

        {/* ═══════════ ABOUT ═══════════════════════════════════════════════ */}
        <section className="about-section">

          {/* Contrast grid */}
          <div className="about-grid">
            <div className="about-left" data-r>
              <p className="eyebrow">About Us</p>
              <h2 className="about-h2">
                A Digital<br />Partner<br />For Growing<br />Businesses
              </h2>
            </div>

            <div className="about-right" data-r style={{ '--delay': '0.12s' }}>
              <AboutPullQuote />
              <div className="about-body">
                <p>Shine Digital works with businesses that want to grow online in a practical and sustainable way. Our approach combines creativity with clear thinking so every project delivers real value.</p>
                <p>We believe digital success comes from understanding your audience, creating the right message, and presenting it in a way that builds trust. Whether it is a website, a brand identity, or a marketing campaign, everything we create is designed to support your long term growth.</p>
                <Link to="/join-us" className="about-cta">Work With Us →</Link>
              </div>
            </div>
          </div>

          {/* Founder cards 9:16 */}
          <div className="founders-row" data-r style={{ '--delay': '0.2s' }}>
            {[
              { initial: 'S', name: 'Savin Tuscano', title: 'Co-Founder & Creative Director', bio: 'Savin leads creative strategy with a sharp eye for brand and an instinct for what resonates with modern audiences.' },
              { initial: 'K', name: 'Krisha Mehta', title: 'Co-Founder & Strategy Lead', bio: 'Krisha drives growth strategy and client relationships, ensuring every brand achieves tangible, measurable results.' },
            ].map((f, i) => (
              <div key={i} className="founder-card">
                <div className="founder-portrait">
                  <span className="founder-initial">{f.initial}</span>
                  <div className="founder-portrait-overlay" />
                </div>
                <div className="founder-info">
                  <div className="founder-meta">
                    <h3 className="founder-name">{f.name}</h3>
                    <span className="founder-role">{f.title}</span>
                  </div>
                  <p className="founder-bio">{f.bio}</p>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ═══════════ SERVICES ════════════════════════════════════════════ */}
        <section className="services-section">
          <div className="svc-section-head" data-r>
            <p className="eyebrow">What We Do</p>
            <h2 className="svc-section-h2">Our Services</h2>
          </div>
          <div className="svc-list">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className={`svc-item ${activeService === i ? 'open' : ''}`}
                onClick={() => setActiveService(activeService === i ? -1 : i)}
                data-r
                style={{ '--delay': `${i * 0.08}s` }}
              >
                <div className="svc-item-head">
                  <span className="svc-num">{s.num}</span>
                  <h3 className="svc-title">{s.title}</h3>
                  <span className="svc-toggle">{activeService === i ? '−' : '+'}</span>
                </div>
                <div className="svc-item-body">
                  <div>
                    <p className="svc-lead">{s.lead}</p>
                    <div className="svc-items-grid">
                      {s.items.map((item, j) => (
                        <span key={j} className="svc-tag">{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════ WHY US ══════════════════════════════════════════════ */}
        <section className="why-section">
          <div className="why-head" data-r>
            <p className="eyebrow">Why Work With Shine Digital</p>
            <h2 className="why-h2">What Sets<br />Us Apart</h2>
          </div>
          <div className="why-grid">
            {WHY.map((w, i) => (
              <div key={i} className="why-card" data-r style={{ '--delay': `${i * 0.1}s` }}>
                <span className="why-num">0{i + 1}</span>
                <h3 className="why-title">{w.title}</h3>
                <p className="why-body">{w.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════ PROCESS ═════════════════════════════════════════════ */}
        <section className="process-section">
          <div className="process-head" data-r>
            <p className="eyebrow">How We Work</p>
            <h2 className="process-h2">Our Process</h2>
          </div>
          <div className="process-steps">
            {PROCESS.map((p, i) => (
              <div key={i} className="process-step" data-r style={{ '--delay': `${i * 0.1}s` }}>
                <div className="ps-num">{p.num}</div>
                <div className="ps-connector" />
                <div className="ps-content">
                  <h3 className="ps-title">{p.title}</h3>
                  <p className="ps-body">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════ CLOSING CTA ═════════════════════════════════════════ */}
        <section className="closing-section" data-r>
          <div className="closing-inner">
            <p className="eyebrow">Let's Work Together</p>
            <h2 className="closing-h2">Let's Build Your<br />Digital Presence</h2>
            <p className="closing-body">
              Every brand has a story worth sharing. With the right strategy and creative direction, that story can reach the right audience and create lasting impact. If you are looking to strengthen your digital presence, we would love to work with you.
            </p>
            <Link to="/join-us" className="btn-primary btn-large">Get in Touch</Link>
          </div>
          <div className="closing-deco">
            <span className="cd-word">SHINE</span>
            <span className="cd-word cd-ghost">DIGITAL</span>
          </div>
        </section>

        {/* ═══════════ FOOTER ══════════════════════════════════════════════ */}
        <footer className="footer">
          <div className="ft-top">
            <div className="ft-brand">
              <div className="ft-logo">SHINE<span>DIGITAL</span>.</div>
              <p className="ft-tagline">Marketing that moves.</p>
            </div>
            <div className="ft-cols">
              <div className="ft-col">
                <span className="ft-col-head">Navigate</span>
                <Link to="/">Home</Link>
                <Link to="/services">Services</Link>
                <Link to="/portfolio">Portfolio</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/join-us">Join Us</Link>
              </div>
              <div className="ft-col">
                <span className="ft-col-head">Contact</span>
                <a href="mailto:hello@shinedigital.in">hello@shinedigital.in</a>
                <a href="tel:+91XXXXXXXXXX">+91 XX XXXX XXXX</a>
                <span>Mumbai, Maharashtra</span>
                <span>India</span>
              </div>
              <div className="ft-col">
                <span className="ft-col-head">Follow</span>
                <a href="#" target="_blank" rel="noreferrer">Instagram</a>
                <a href="#" target="_blank" rel="noreferrer">LinkedIn</a>
                <a href="#" target="_blank" rel="noreferrer">Twitter</a>
                <a href="#" target="_blank" rel="noreferrer">Behance</a>
              </div>
            </div>
          </div>
          <div className="ft-bottom">
            <span>© 2025 Shine Digital. All rights reserved.</span>
            <span>Made with care in Mumbai ✦</span>
          </div>
        </footer>

      </div>
    </>
>>>>>>> 34f04cda37a2764183c8458f2a2fcd8717baf568
  )
}