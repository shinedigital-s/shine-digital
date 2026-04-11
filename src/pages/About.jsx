import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './About.css'

const VALUES = [
  { num: '01', title: 'Strategy First', desc: 'Every creative decision is rooted in research, data, and a clear understanding of your audience and goals.' },
  { num: '02', title: 'Craft Over Quantity', desc: 'We take on fewer projects so we can give each one the depth and attention it deserves.' },
  { num: '03', title: 'Transparency Always', desc: 'No hidden fees, no vague deliverables. We communicate clearly at every stage of the process.' },
  { num: '04', title: 'Results That Last', desc: 'We build brands and digital presences designed to grow with you, not just look good for a moment.' },
]

const STATS = [
  { num: '50+', label: 'Brands Worked With' },
  { num: '3+',  label: 'Years of Experience' },
  { num: '100%', label: 'Client Satisfaction' },
  { num: '4',   label: 'Core Services' },
]

export default function About() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) } }),
      { threshold: 0.07 }
    )
    document.querySelectorAll('[data-r]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="about-page">

      {/* Hero */}
      <section className="ap-hero">
        <p className="ap-eyebrow" data-r>About Us</p>
        <h1 className="ap-headline" data-r>
          We Are<br/><span className="ap-outline">Shine</span><br/>Digital.
        </h1>
        <p className="ap-sub" data-r>
          A Mumbai-based digital marketing agency built for brands that want to grow with intention.
        </p>
      </section>

      {/* About body */}
      <section className="ap-body">
        <div className="ap-body-inner">
          <div className="ap-body-text" data-r>
            <p className="ap-eyebrow">Our Story</p>
            <h2 className="ap-body-h2">Built on the belief that great marketing changes everything.</h2>
          </div>
          <div className="ap-body-paras" data-r style={{ '--delay': '0.1s' }}>
            <p>Shine Digital was founded with a simple conviction — that small and mid-sized businesses deserve the same quality of creative and strategic work that the biggest brands in the world get. We started as a small team of marketers, designers, and filmmakers who believed that purpose-driven creativity was the key to building lasting brands.</p>
            <p>Today, we work with founders, startups, and established businesses across India to build their digital presence from the ground up or take it to the next level. Our work spans social media, branding, web development, and film — but the thread running through all of it is the same: strategy-led, craft-driven, results-focused.</p>
            <p>We are based in Mumbai, but we work with clients across the country and beyond. If you are building something worth talking about, we want to help you tell that story.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="ap-stats">
        {STATS.map((s, i) => (
          <div key={s.label} className="ap-stat" data-r style={{ '--delay': `${i * 0.08}s` }}>
            <span className="ap-stat-num">{s.num}</span>
            <span className="ap-stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* Values */}
      <section className="ap-values">
        <div className="ap-values-head" data-r>
          <p className="ap-eyebrow">What We Stand For</p>
          <h2 className="ap-values-h2">Our Values</h2>
        </div>
        <div className="ap-values-grid">
          {VALUES.map((v, i) => (
            <div key={v.num} className="ap-value-card" data-r style={{ '--delay': `${i * 0.1}s` }}>
              <span className="ap-value-num">{v.num}</span>
              <h3 className="ap-value-title">{v.title}</h3>
              <p className="ap-value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="ap-cta" data-r>
        <h2 className="ap-cta-h2">Ready to build something great?</h2>
        <div className="ap-cta-btns">
          <Link to="/contact" className="btn-ap-primary">Start a Project</Link>
          <Link to="/services" className="btn-ap-ghost">See Our Services</Link>
        </div>
      </section>

    </div>
  )
}
