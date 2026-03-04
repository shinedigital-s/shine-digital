import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Portfolio.css'

const projects = [
  { num: '01', title: 'Velocity Rebrand', cat: 'Brand Identity', year: '2024', tags: ['Identity', 'Strategy'], desc: 'A full rebrand for Velocity Sports, transforming their visual identity from dated to dominant.' },
  { num: '02', title: 'NexGen Launch', cat: 'Digital Campaign', year: '2024', tags: ['Ads', 'Social'], desc: 'A 360° product launch campaign that drove 2.3M impressions in the first two weeks.' },
  { num: '03', title: 'Pulse Community', cat: 'Social Media', year: '2023', tags: ['Social', 'Content'], desc: 'Built a 100K+ community from scratch through strategic content and engagement.' },
  { num: '04', title: 'Echo Web Experience', cat: 'Web Design', year: '2023', tags: ['UI/UX', 'Dev'], desc: 'An award-winning website for Echo that increased conversions by 340%.' },
  { num: '05', title: 'Flux Performance Ads', cat: 'Paid Media', year: '2023', tags: ['Google', 'Meta'], desc: 'Scaled Flux\'s ROAS from 1.8x to 5.2x through iterative ad optimization.' },
  { num: '06', title: 'Prism Content Series', cat: 'Content Creation', year: '2022', tags: ['Video', 'Copy'], desc: 'A 12-episode content series that established Prism as a thought leader.' },
]

export default function Portfolio() {
  const stickyRef = useRef(null)
  const trackRef = useRef(null)
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

      lenis.on('scroll', () => {
        const section = stickyRef.current
        const track = trackRef.current
        if (!section || !track) return

        const rect = section.getBoundingClientRect()
        const progress = -rect.top / (section.offsetHeight - window.innerHeight)
        const clamped = Math.max(0, Math.min(1, progress))

        const maxScroll = track.scrollWidth - window.innerWidth + 120
        track.style.transform = `translateX(${-clamped * maxScroll}px)`

        if (progressRef.current) {
          progressRef.current.style.width = `${clamped * 100}%`
        }
      })
    })

    // Reveal
    setTimeout(() => {
      document.querySelector('.pf-hero')?.classList.add('revealed')
    }, 100)

    // Scroll reveal for below
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed')
          observer.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el))

    return () => {
      lenis?.destroy()
      observer.disconnect()
    }
  }, [])

  return (
    <div className="portfolio-page">
      {/* Hero */}
      <div className="pf-hero">
        <div className="pf-hero-inner">
          <span className="pf-tag">Our Work</span>
          <h1 className="pf-title">
            WHAT<br/>
            <span className="pf-title-accent">WE'VE</span><br/>
            <span className="pf-title-outline">BUILT.</span>
          </h1>
          <p className="pf-hero-sub">Real work. Real results. Scroll to explore.</p>
        </div>
      </div>

      {/* Sticky horizontal scroll */}
      <div className="pf-sticky-section" ref={stickyRef}>
        <div className="pf-sticky-inner">
          <div className="pf-progress-bar">
            <div className="pf-progress-fill" ref={progressRef} />
          </div>

          <div className="pf-cards-viewport">
            <div className="pf-cards-track" ref={trackRef}>
              {projects.map((p, i) => (
                <div key={i} className="pf-card">
                  <div className="pf-card-visual">
                    <div className="pf-card-visual-inner">
                      <span className="pf-card-visual-num">{p.num}</span>
                    </div>
                    <div className="pf-card-hover-overlay">VIEW</div>
                  </div>
                  <div className="pf-card-info">
                    <div className="pf-card-meta">
                      <span className="pf-card-cat">{p.cat}</span>
                      <span className="pf-card-year">{p.year}</span>
                    </div>
                    <h3 className="pf-card-title">{p.title}</h3>
                    <p className="pf-card-desc">{p.desc}</p>
                    <div className="pf-card-tags">
                      {p.tags.map((t, j) => <span key={j} className="pf-tag-pill">{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}

              {/* End CTA card */}
              <div className="pf-card pf-card--end">
                <div className="pf-card-end-inner">
                  <span className="pf-end-num">✦</span>
                  <h3>Your brand<br/>could be next.</h3>
                  <Link to="/join-us" className="btn-pf">Start a Project →</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="pf-scroll-hint">← drag to scroll →</div>
        </div>
      </div>

      {/* Stats section */}
      <div className="pf-stats-section" data-reveal>
        <div className="pf-stats-grid">
          {[
            { num: '120+', label: 'Projects Completed' },
            { num: '98%', label: 'Client Retention' },
            { num: '50+', label: 'Brand Partners' },
            { num: '5+', label: 'Years of Impact' },
          ].map((s, i) => (
            <div key={i} className="pf-stat-item">
              <span className="pf-stat-num">{s.num}</span>
              <span className="pf-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="page-footer">
        <div className="pf-inner">
          <h2 className="pf-cta">Let's build<br/><Link to="/join-us" className="plain-text">something →</Link></h2>
          <div className="pf-links">
            <Link to="/services">Services</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/join-us">Join Us</Link>
          </div>
        </div>
        <div className="pf-copy">© 2025 Shine Digital · Mumbai, India · hello@shinedigital.in</div>
      </footer>
    </div>
  )
}
