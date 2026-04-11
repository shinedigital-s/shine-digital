import React, { useState } from 'react'
import './Contact.css'

function EnquiryForm() {
  const [form, setForm] = useState({ name:'', email:'', company:'', service:'', message:'' })
  const update = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const submit = e => { e.preventDefault(); alert('Thank you! We will be in touch soon.') }
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="cf-row">
        <div className="cf-field">
          <label>Full Name *</label>
          <input name="name" value={form.name} onChange={update} placeholder="Your name" required />
        </div>
        <div className="cf-field">
          <label>Email *</label>
          <input name="email" type="email" value={form.email} onChange={update} placeholder="your@email.com" required />
        </div>
      </div>
      <div className="cf-row">
        <div className="cf-field">
          <label>Company</label>
          <input name="company" value={form.company} onChange={update} placeholder="Your company" />
        </div>
        <div className="cf-field">
          <label>Service Interested In</label>
          <select name="service" value={form.service} onChange={update}>
            <option value="">Select a service</option>
            <option>Social Media</option>
            <option>Branding</option>
            <option>Website Development</option>
            <option>Films</option>
            <option>Multiple Services</option>
          </select>
        </div>
      </div>
      <div className="cf-field">
        <label>Message *</label>
        <textarea name="message" value={form.message} onChange={update} placeholder="Tell us about your project..." rows={5} required />
      </div>
      <button type="submit" className="cf-submit">Send Message →</button>
    </form>
  )
}

function JoinUsForm() {
  const [form, setForm] = useState({ name:'', email:'', role:'', portfolio:'', message:'' })
  const update = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const submit = e => { e.preventDefault(); alert('Application received! We will review and reach out.') }
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="cf-row">
        <div className="cf-field">
          <label>Full Name *</label>
          <input name="name" value={form.name} onChange={update} placeholder="Your name" required />
        </div>
        <div className="cf-field">
          <label>Email *</label>
          <input name="email" type="email" value={form.email} onChange={update} placeholder="your@email.com" required />
        </div>
      </div>
      <div className="cf-row">
        <div className="cf-field">
          <label>Role You're Applying For *</label>
          <select name="role" value={form.role} onChange={update} required>
            <option value="">Select a role</option>
            <option>Social Media Manager</option>
            <option>Graphic Designer</option>
            <option>Videographer / Editor</option>
            <option>Web Developer</option>
            <option>Copywriter</option>
            <option>Other</option>
          </select>
        </div>
        <div className="cf-field">
          <label>Portfolio / LinkedIn URL</label>
          <input name="portfolio" value={form.portfolio} onChange={update} placeholder="https://..." />
        </div>
      </div>
      <div className="cf-field">
        <label>Why Shine Digital?</label>
        <textarea name="message" value={form.message} onChange={update} placeholder="Tell us a little about yourself..." rows={5} />
      </div>
      <button type="submit" className="cf-submit">Submit Application →</button>
    </form>
  )
}

export default function Contact() {
  const [tab, setTab] = useState('enquiry')
  return (
    <div className="contact-page">
      <div className="cp-header">
        <p className="cp-eyebrow">Get In Touch</p>
        <h1 className="cp-headline">Let's Work<br/>Together</h1>
        <p className="cp-sub">Whether you have a project in mind or just want to explore, we'd love to hear from you.</p>
      </div>

      <div className="cp-body">
        {/* Tab switcher */}
        <div className="cp-tabs">
          <button className={`cp-tab${tab === 'enquiry' ? ' active' : ''}`} onClick={() => setTab('enquiry')}>
            Project Enquiry
          </button>
          <button className={`cp-tab${tab === 'join' ? ' active' : ''}`} onClick={() => setTab('join')}>
            Join the Team
          </button>
        </div>

        <div className="cp-form-wrap">
          {tab === 'enquiry' ? <EnquiryForm /> : <JoinUsForm />}
        </div>

        {/* Info column */}
        <div className="cp-info">
          <div className="cp-info-block">
            <span className="cp-info-label">Email</span>
            <a href="mailto:hello@shinedigital.in">hello@shinedigital.in</a>
          </div>
          <div className="cp-info-block">
            <span className="cp-info-label">Phone</span>
            <a href="tel:+91XXXXXXXXXX">+91 XX XXXX XXXX</a>
          </div>
          <div className="cp-info-block">
            <span className="cp-info-label">Location</span>
            <span>Mumbai, Maharashtra, India</span>
          </div>
          <div className="cp-info-block">
            <span className="cp-info-label">Follow</span>
            <div className="cp-socials">
              <a href="#" target="_blank" rel="noreferrer">Instagram</a>
              <a href="#" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="#" target="_blank" rel="noreferrer">Behance</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
