import React, { useState, useEffect } from 'react'
import './JoinUs.css'

const roles = ['Brand Strategy', 'Digital Marketing', 'Content Creation', 'Social Media', 'Web Design', 'Performance Ads', 'Creative Direction', 'Business Development']

export default function JoinUs() {
  const [form, setForm] = useState({ name: '', email: '', role: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      document.querySelector('.ju-hero')?.classList.add('revealed')
    }, 100)
  }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    window.location.href = `mailto:hello@shinedigital.in?subject=New Inquiry from ${form.name}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nInterested In: ${form.role}\n\nMessage:\n${form.message}`)}`
    setSubmitted(true)
  }

  return (
    <div className="joinus-page">
      <div className="ju-hero">
        <div className="ju-hero-inner">
          <span className="ju-tag">Join Us / Work With Us</span>
          <h1 className="ju-title">
            LET'S<br/>
            <span className="ju-title-accent">CREATE</span><br/>
            <span className="ju-title-outline">TOGETHER.</span>
          </h1>
        </div>
      </div>

      <div className="ju-content">
        <div className="ju-left">
          <div className="ju-info-block">
            <span className="ju-info-label">Email Us</span>
            <a href="mailto:hello@shinedigital.in" className="ju-info-value">hello@shinedigital.in</a>
          </div>
          <div className="ju-info-block">
            <span className="ju-info-label">Call Us</span>
            <a href="tel:+91XXXXXXXXXX" className="ju-info-value">+91 XX XXXX XXXX</a>
          </div>
          <div className="ju-info-block">
            <span className="ju-info-label">Location</span>
            <span className="ju-info-value">Mumbai, Maharashtra, India</span>
          </div>
          <div className="ju-info-block">
            <span className="ju-info-label">Follow Us</span>
            <div className="ju-socials">
              {[
                { name: 'Instagram', url: 'https://instagram.com/shinedigital' },
                { name: 'LinkedIn', url: 'https://linkedin.com/company/shinedigital' },
                { name: 'Twitter', url: 'https://twitter.com/shinedigital' },
                { name: 'Behance', url: 'https://behance.net/shinedigital' },
              ].map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="ju-social">
                  {s.name} ↗
                </a>
              ))}
            </div>
          </div>

          <div className="ju-vibe">
            <span className="ju-vibe-label">We're looking for</span>
            <div className="ju-roles-list">
              {['Designers', 'Strategists', 'Content Creators', 'Media Buyers', 'Developers'].map(r => (
                <span key={r} className="ju-role-tag">{r}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="ju-right">
          {submitted ? (
            <div className="ju-success">
              <span className="ju-success-icon">✦</span>
              <h2>Message sent!</h2>
              <p>We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form className="ju-form" onSubmit={handleSubmit}>
              <div className="ju-form-row">
                <div className="ju-field">
                  <label className="ju-label">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="ju-input"
                    placeholder="What should we call you?"
                    required
                  />
                </div>
                <div className="ju-field">
                  <label className="ju-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="ju-input"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              <div className="ju-field">
                <label className="ju-label">I'm interested in</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="ju-input ju-select"
                  required
                >
                  <option value="">Select a service area</option>
                  {roles.map(r => <option key={r} value={r}>{r}</option>)}
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Join the Team">Join the Team</option>
                </select>
              </div>
              <div className="ju-field">
                <label className="ju-label">Tell us about your project</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="ju-input ju-textarea"
                  placeholder="What are you building? What's the dream?"
                  rows="6"
                  required
                />
              </div>
              <button type="submit" className="ju-submit">
                <span>Send It</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="page-footer">
        <div className="pf-inner">
          <div className="footer-logo-sm">
            <span style={{color:'var(--white)'}}>SHINE</span>
            <span style={{color:'var(--grey-text)'}}>DIGITAL</span>
            <span style={{color:'var(--white)', marginLeft:'3px'}}>.</span>
          </div>
          <div className="pf-links">
            <a href="mailto:hello@shinedigital.in">hello@shinedigital.in</a>
            <a href="https://instagram.com/shinedigital" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
            <a href="https://linkedin.com/company/shinedigital" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          </div>
        </div>
        <div className="pf-copy">© 2025 Shine Digital. All rights reserved. · Mumbai, India</div>
      </footer>
    </div>
  )
}
