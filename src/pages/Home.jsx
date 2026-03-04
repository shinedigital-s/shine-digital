import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

/* ─── data ──────────────────────────────────────────────────────── */
const SERVICES = [
  { num: '01', name: 'Brand Strategy',    desc: 'Identity systems, positioning, and narratives engineered to dominate.' },
  { num: '02', name: 'Digital Marketing', desc: 'Full-funnel campaigns built for measurable, scalable growth.' },
  { num: '03', name: 'Content Creation',  desc: 'Video, photo, copy — content that actually lands.' },
  { num: '04', name: 'Performance Ads',   desc: 'Data-driven paid media optimised for ROI at every rupee.' },
  { num: '05', name: 'Social Media',      desc: 'Platform-native strategy and community that drives real loyalty.' },
  { num: '06', name: 'Web Design',        desc: 'Experiences as functional as they are unforgettable.' },
  { num: '07', name: 'Creative Direction','desc': 'Big-picture vision for campaigns, launches, and rebrands.' },
]

/* Portfolio: each has a gradient pair for bg (all grey tones) */
const PORTFOLIO = [
  { num: '01', title: 'Velocity Rebrand',    cat: 'Brand Identity',   year: '2024', desc: 'Full rebrand transforming Velocity Sports from dated to dominant.', grad: ['#080808','#141414'] },
  { num: '02', title: 'NexGen Launch',       cat: 'Digital Campaign', year: '2024', desc: '360° launch campaign — 2.3M impressions in two weeks.',            grad: ['#111111','#1e1e1e'] },
  { num: '03', title: 'Pulse Community',     cat: 'Social Media',     year: '2023', desc: '100K+ community built from zero through strategic content.',        grad: ['#080808','#0d0d0d'] },
  { num: '04', title: 'Echo Web Experience', cat: 'Web Design',       year: '2023', desc: 'Award-winning website. Conversions up 340%.',                      grad: ['#141414','#222222'] },
  { num: '05', title: 'Flux Performance',    cat: 'Paid Media',       year: '2023', desc: 'ROAS scaled from 1.8× to 5.2× through iterative optimisation.',    grad: ['#080808','#181818'] },
]

/* ─── hooks ─────────────────────────────────────────────────────── */
function useLenis(onScrollCb) {
  useEffect(() => {
    let lenis
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
      if (onScrollCb) lenis.on('scroll', onScrollCb)
    })
    return () => lenis?.destroy()
  }, [])
}

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('[data-r]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

/* ─── component ─────────────────────────────────────────────────── */
export default function Home() {
  const heroTitleRef   = useRef(null)
  const pfWrapRef      = useRef(null)
  const pfLeftRef      = useRef(null)
  const pfRightRef     = useRef(null)
  const pfProgressRef  = useRef(null)
  const [pfIdx, setPfIdx] = useState(0)

  useReveal()

  /* hero parallax on native scroll (before lenis init) */
  useEffect(() => {
    const fn = () => {
      if (heroTitleRef.current)
        heroTitleRef.current.style.transform = `translateY(${window.scrollY * 0.22}px)`
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useLenis(({ scroll }) => {
    /* ── portfolio sticky ── */
    const wrap = pfWrapRef.current
    if (wrap) {
      const rect      = wrap.getBoundingClientRect()
      const total     = wrap.offsetHeight - window.innerHeight
      const prog      = Math.max(0, Math.min(1, -rect.top / total))
      const rawIdx    = prog * (PORTFOLIO.length - 1)
      const idx       = Math.min(PORTFOLIO.length - 1, Math.floor(prog * PORTFOLIO.length))
      setPfIdx(idx)

      /* move progress bar inside right pane */
      if (pfProgressRef.current)
        pfProgressRef.current.style.width = `${prog * 100}%`
    }
  })

  const cur  = PORTFOLIO[pfIdx]
  const next = PORTFOLIO[Math.min(pfIdx + 1, PORTFOLIO.length - 1)]

  return (
    <div className="home">

      {/* ═══════════════════════════════════ HERO ══════════════════════════════ */}
      <section className="hero">
        {/* Three vertical photo-like panels — real dark image feel */}
        <div className="hero-panels">
          <div className="hero-panel hp--l" />
          <div className="hero-panel hp--c" />
          <div className="hero-panel hp--r" />
        </div>
        <div className="hero-overlay" />

        {/* Top-left meta (like Move. magazine) */}
        <div className="hero-tl">
          <span>Est. 2020</span>
          <span>Mumbai, India</span>
          <span>Creative Agency</span>
        </div>

        <div className="hero-tr">
          <span>shinedigital.in</span>
        </div>

        {/* Giant centred title */}
        <div className="hero-title-wrap" ref={heroTitleRef}>
          <h1 className="hero-title">
            <span className="ht-l1">SHINE</span>
            <span className="ht-l2">DIGITAL</span>
            <span className="ht-dot">.</span>
          </h1>
        </div>

        {/* Bottom-left tagline */}
        <div className="hero-bl">
          <p>marketing<br/>that moves.</p>
        </div>

        {/* Bottom-right quote + buttons */}
        <div className="hero-br">
          <em className="hero-quote">
            let your brand speak louder<br/>than the noise around it.
          </em>
          <div className="hero-btns">
            <Link to="/services" className="hbtn hbtn--fill">Services</Link>
            <Link to="/portfolio" className="hbtn hbtn--ghost">Portfolio</Link>
          </div>
        </div>

        {/* Divider strips */}
        <div className="hero-strips">
          <div /><div /><div />
        </div>

        <div className="hero-scr">
          <span>scroll</span>
          <div className="hero-scr-line" />
        </div>
      </section>

      {/* ═══════════════════════════════════ ABOUT ═════════════════════════════ */}
      <section className="about">
        <div className="about-head" data-r>
          <p className="sec-label">About Us</p>
          <h2 className="about-h">
            We build brands<br/>that can't be<br/><em>ignored.</em>
          </h2>
        </div>
        <div className="about-body" data-r>
          <p>Shine Digital is a youth-led creative marketing agency from Mumbai. We exist at the intersection of strategy, culture, and craft — building brands that speak to the next generation.</p>
          <p>Every campaign we run, every brand we build — engineered to perform. No fluff. No filler. Just work that shines.</p>
        </div>

        {/* Founders — 9:16 portrait ratio */}
        <div className="founders" data-r>
          <div className="founder">
            <div className="founder-img">
              <div className="founder-placeholder"><span>S</span></div>
            </div>
            <div className="founder-info">
              <h3 className="founder-name">Savin Tuscano</h3>
              <span className="founder-role">Co-Founder & Creative Director</span>
              <p className="founder-bio">Savin leads creative strategy, bringing a sharp eye for brand and an instinct for what resonates with modern audiences.</p>
            </div>
          </div>
          <div className="founder">
            <div className="founder-img">
              <div className="founder-placeholder"><span>K</span></div>
            </div>
            <div className="founder-info">
              <h3 className="founder-name">Krisha Mehta</h3>
              <span className="founder-role">Co-Founder & Strategy Lead</span>
              <p className="founder-bio">Krisha drives growth strategy and client relationships, ensuring every brand achieves tangible, measurable results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ SERVICES ══════════════════════════ */}
      {/* Diagonal stacked cards — each drops on top of the previous */}
      <section className="services-section">
        <div className="svc-header" data-r>
          <p className="sec-label">What We Do</p>
          <h2 className="svc-main-title">OUR<br/><span className="svc-title-ghost">SERVICES</span></h2>
        </div>

        <div className="svc-stack">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className="svc-stack-card"
              style={{ '--i': i, '--total': SERVICES.length }}
              data-r
            >
              <span className="ssc-num">{s.num}</span>
              <h3 className="ssc-name">{s.name}</h3>
              <p className="ssc-desc">{s.desc}</p>
              <div className="ssc-bar" />
            </div>
          ))}
          {/* CTA card at end */}
          <div className="svc-stack-card svc-cta-card" style={{ '--i': SERVICES.length }} data-r>
            <span className="ssc-num">↗</span>
            <h3 className="ssc-name">Start a Project</h3>
            <p className="ssc-desc">Ready to build something that actually matters?</p>
            <Link to="/join-us" className="ssc-link">Get in touch</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ BLOG ══════════════════════════════ */}
      <section className="blog-tease" data-r>
        <p className="sec-label">Blog</p>
        <h2 className="bt-title">THOUGHTS<br/><span className="bt-ghost">INCOMING.</span></h2>
        <p className="bt-sub">We're writing things worth reading. Check back soon.</p>
        <Link to="/blog" className="txt-link">Visit Blog →</Link>
      </section>

      {/* ═══════════════════════════════════ PORTFOLIO ═════════════════════════ */}
      {/* Left stays sticky. Right content + background changes smoothly with scroll */}
      <section className="pf-wrap" ref={pfWrapRef}
        style={{ height: `${(PORTFOLIO.length + 1) * 100}vh` }}>

        <div className="pf-sticky">
          {/* LEFT — completely static */}
          <div className="pf-left" ref={pfLeftRef}>
            <p className="sec-label">Selected Work</p>
            <h2 className="pf-title">SELECTED<br/>WORK.</h2>
            <div className="pf-dots">
              {PORTFOLIO.map((_, i) => (
                <div key={i} className={`pf-dot ${pfIdx === i ? 'active' : ''}`} />
              ))}
            </div>
            <div className="pf-counter">
              <span className="pf-cur">{String(pfIdx + 1).padStart(2,'0')}</span>
              <span className="pf-sep"> / </span>
              <span className="pf-tot">{String(PORTFOLIO.length).padStart(2,'0')}</span>
            </div>
          </div>

          {/* RIGHT — transitions smoothly */}
          <div className="pf-right" ref={pfRightRef}>
            {/* Gradient background — each project gets a slightly different dark tone */}
            <div
              className="pf-bg"
              style={{
                background: `linear-gradient(160deg, ${cur.grad[0]} 0%, ${cur.grad[1]} 100%)`
              }}
            />

            {/* Progress bar along top of right pane */}
            <div className="pf-prog-track">
              <div className="pf-prog-fill" ref={pfProgressRef} />
            </div>

            {/* Large ghost number */}
            <div className="pf-ghost-num">{cur.num}</div>

            {/* Project info */}
            <div className="pf-info">
              <div className="pf-meta">
                <span className="pf-cat">{cur.cat}</span>
                <span className="pf-year">{cur.year}</span>
              </div>
              <h3 className="pf-proj-title">{cur.title}</h3>
              <p className="pf-proj-desc">{cur.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ JOIN US ═══════════════════════════ */}
      <JoinUsSection />

      {/* ═══════════════════════════════════ FOOTER ════════════════════════════ */}
      <footer className="footer">
        <div className="ft-top">
          <div className="ft-logo">SHINE<span>DIGITAL</span>.</div>
          <nav className="ft-nav">
            <Link to="/services">Services</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/join-us">Join Us</Link>
          </nav>
        </div>
        <div className="ft-mid">
          {[
            { l: 'Email',    v: 'hello@shinedigital.in',   href: 'mailto:hello@shinedigital.in' },
            { l: 'Phone',    v: '+91 XX XXXX XXXX',         href: 'tel:+91XXXXXXXXXX' },
            { l: 'Location', v: 'Mumbai, Maharashtra, India' },
          ].map(b => (
            <div key={b.l} className="ft-block">
              <span className="ft-block-label">{b.l}</span>
              {b.href
                ? <a href={b.href}>{b.v}</a>
                : <span>{b.v}</span>
              }
            </div>
          ))}
          <div className="ft-block">
            <span className="ft-block-label">Follow</span>
            {['Instagram','LinkedIn','Twitter','Behance'].map(s => (
              <a key={s} href="#" className="ft-social">{s}</a>
            ))}
          </div>
        </div>
        <div className="ft-bottom">
          <span>© 2025 Shine Digital. All rights reserved.</span>
          <span>Made in Mumbai ✦</span>
        </div>
      </footer>
    </div>
  )
}

/* ─── Join Us inline ─────────────────────────────────────────────── */
function JoinUsSection() {
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [sent, setSent] = useState(false)
  const chg = e => setForm({ ...form, [e.target.name]: e.target.value })
  const sub = e => {
    e.preventDefault()
    window.location.href = `mailto:hello@shinedigital.in?subject=New Inquiry from ${form.name}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
    setSent(true)
  }
  return (
    <section className="joinus" data-r>
      <div className="ju-wrap">
        <div className="ju-l">
          <p className="sec-label">Work With Us</p>
          <h2 className="ju-heading">LET'S<br/>BUILD<br/>TOGETHER.</h2>
          <a href="mailto:hello@shinedigital.in" className="ju-email">hello@shinedigital.in</a>
          <div className="ju-socials">
            {['Instagram ↗','LinkedIn ↗','Twitter ↗','Behance ↗'].map(s => (
              <a key={s} href="#" className="ju-social">{s}</a>
            ))}
          </div>
        </div>
        <div className="ju-r">
          {sent ? (
            <div className="ju-sent">
              <span>✦</span>
              <h3>Message sent.</h3>
              <p>We'll be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={sub} className="ju-form">
              {[
                { n:'name',    t:'text',  p:'What should we call you?', l:'Name' },
                { n:'email',   t:'email', p:'your@email.com',           l:'Email' },
              ].map(f => (
                <div key={f.n} className="ju-field">
                  <label>{f.l}</label>
                  <input type={f.t} name={f.n} value={form[f.n]} onChange={chg} placeholder={f.p} required />
                </div>
              ))}
              <div className="ju-field">
                <label>Project</label>
                <textarea name="message" value={form.message} onChange={chg} rows="5" placeholder="What are you building?" required />
              </div>
              <button type="submit" className="ju-submit">Send it →</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
