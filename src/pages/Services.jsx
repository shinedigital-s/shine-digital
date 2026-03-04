import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Services.css'

const services = [
  {
    num: '01',
    title: 'BRAND\nSTRATEGY',
    sub: 'Build the foundation',
    desc: 'We craft brand identities that are impossible to ignore. From naming and visual identity to positioning and messaging, we help you stand out in a crowded market.',
    tags: ['Brand Identity', 'Positioning', 'Naming', 'Visual Systems'],
  },
  {
    num: '02',
    title: 'DIGITAL\nMARKETING',
    sub: 'Scale with precision',
    desc: 'Full-funnel digital strategies that drive measurable results. We engineer campaigns that convert, retain, and grow your audience at every stage.',
    tags: ['SEO & SEM', 'Email Marketing', 'Analytics', 'Growth Hacking'],
  },
  {
    num: '03',
    title: 'CONTENT\nCREATION',
    sub: 'Stories that resonate',
    desc: 'Video, photography, copywriting — content that actually hits. We create material that speaks to your audience and drives them to act.',
    tags: ['Video Production', 'Photography', 'Copywriting', 'Storytelling'],
  },
  {
    num: '04',
    title: 'PERFORMANCE\nADS',
    sub: 'ROI-obsessed campaigns',
    desc: 'Data-driven paid media across Google, Meta, and beyond. We optimize every rupee of your ad spend for maximum impact and measurable returns.',
    tags: ['Google Ads', 'Meta Ads', 'Programmatic', 'Retargeting'],
  },
  {
    num: '05',
    title: 'SOCIAL\nMEDIA',
    sub: 'Build your community',
    desc: 'Platform-native strategy and community management that drives real loyalty. We make your brand the one people actually want to follow.',
    tags: ['Strategy', 'Community Mgmt', 'Influencer', 'Viral Campaigns'],
  },
  {
    num: '06',
    title: 'WEB\nDESIGN',
    sub: 'Experiences that convert',
    desc: 'We design and develop digital experiences that are as beautiful as they are functional. Your website is your 24/7 salesperson — make it count.',
    tags: ['UI/UX Design', 'Development', 'E-commerce', 'CRO'],
  },
  {
    num: '07',
    title: 'CREATIVE\nDIRECTION',
    sub: 'Vision brought to life',
    desc: 'Big-picture thinking for campaigns, launches, and rebrands. We bring creative direction that ties every touchpoint into one unforgettable narrative.',
    tags: ['Art Direction', 'Campaign Concept', 'Shoot Direction', 'Brand Refresh'],
  },
  {
    num: '08',
    title: 'START\nWORKING →',
    sub: 'Let\'s build together',
    desc: 'Ready to take your brand to the next level? We\'re always looking for ambitious partners to create something extraordinary with.',
    tags: [],
    isCta: true,
  },
]

export default function Services() {
  const stickyRef = useRef(null)
  const cardsRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    let lenis
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true })

      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)

      // Horizontal scroll logic
      lenis.on('scroll', ({ progress }) => {
        const section = stickyRef.current
        const cards = cardsRef.current
        if (!section || !cards) return

        const rect = section.getBoundingClientRect()
        const sectionProgress = -rect.top / (section.offsetHeight - window.innerHeight)
        const clampedProgress = Math.max(0, Math.min(1, sectionProgress))

        const maxScroll = cards.scrollWidth - window.innerWidth + 120
        cards.style.transform = `translateX(${-clampedProgress * maxScroll}px)`

        if (progressRef.current) {
          progressRef.current.style.width = `${clampedProgress * 100}%`
        }
      })
    })

    // Reveal hero
    setTimeout(() => {
      document.querySelector('.sv-hero')?.classList.add('revealed')
    }, 100)

    return () => lenis?.destroy()
  }, [])

  return (
    <div className="services-page">
      {/* Hero */}
      <div className="sv-hero">
        <div className="sv-hero-inner">
          <span className="sv-tag">What We Do</span>
          <h1 className="sv-title">
            OUR<br />
            <span className="sv-title-outline">SERVICES</span>
            <span className="sv-title-dot">.</span>
          </h1>
          <p className="sv-subtitle">Scroll to explore everything we bring to the table.</p>
        </div>
        <div className="sv-hero-stats">
          <div className="sv-stat"><span>7</span><small>Service Areas</small></div>
          <div className="sv-stat"><span>120+</span><small>Projects Delivered</small></div>
          <div className="sv-stat"><span>5+</span><small>Years of Hustle</small></div>
        </div>
      </div>

      {/* Sticky horizontal scroll section */}
      <div className="sv-sticky-section" ref={stickyRef}>
        <div className="sv-sticky-inner">
          <div className="sv-sticky-label">
            <span className="sv-brings">SHINE BRINGS</span>
            <span className="sv-heat">THE HEAT</span>
          </div>

          <div className="sv-progress-bar">
            <div className="sv-progress-fill" ref={progressRef} />
          </div>

          <div className="sv-cards-viewport">
            <div className="sv-cards-track" ref={cardsRef}>
              {services.map((s, i) => (
                <div key={i} className={`sv-card ${s.isCta ? 'sv-card--cta' : ''}`}>
                  <div className="sv-card-num">{s.num}</div>
                  <div className="sv-card-body">
                    <h3 className="sv-card-title">{s.title}</h3>
                    <span className="sv-card-sub">{s.sub}</span>
                    <p className="sv-card-desc">{s.desc}</p>
                    {s.tags.length > 0 && (
                      <div className="sv-card-tags">
                        {s.tags.map((t, j) => <span key={j} className="sv-tag-pill">{t}</span>)}
                      </div>
                    )}
                    {s.isCta && (
                      <Link to="/join-us" className="btn btn--primary" style={{marginTop: '2rem', alignSelf: 'flex-start'}}>
                        Start a Project
                      </Link>
                    )}
                  </div>
                  <div className="sv-card-accent" />
                </div>
              ))}
            </div>
          </div>

          <div className="sv-scroll-hint">
            <span>← scroll to explore →</span>
          </div>
        </div>
      </div>

      {/* Process section */}
      <div className="sv-process">
        <div className="sv-process-header">
          <span className="sv-label">How We Work</span>
          <h2 className="sv-process-title">OUR<br/><span className="plain-text">PROCESS.</span></h2>
        </div>
        <div className="sv-process-steps">
          {[
            { num: '01', title: 'Discovery', desc: 'We deep dive into your brand, audience, and goals.' },
            { num: '02', title: 'Strategy', desc: 'We craft a data-backed plan tailored to your objectives.' },
            { num: '03', title: 'Create', desc: 'Our team executes with precision and creative excellence.' },
            { num: '04', title: 'Launch & Scale', desc: 'We deploy, measure, and optimize for maximum impact.' },
          ].map((s, i) => (
            <div key={i} className="sv-step">
              <span className="sv-step-num">{s.num}</span>
              <div>
                <h3 className="sv-step-title">{s.title}</h3>
                <p className="sv-step-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer inline */}
      <footer className="page-footer">
        <div className="pf-inner">
          <h2 className="pf-cta">Ready to start?<br/><Link to="/join-us" className="plain-text">Let's talk →</Link></h2>
          <div className="pf-links">
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/join-us">Join Us</Link>
          </div>
        </div>
        <div className="pf-copy">© 2025 Shine Digital · Mumbai, India · hello@shinedigital.in</div>
      </footer>
    </div>
  )
}
