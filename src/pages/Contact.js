import React, { useState, useRef, useEffect } from 'react';
import './Contact.css';

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FormField({ label, type = 'text', placeholder, name, value, onChange, required }) {
  return (
    <div className="form-field">
      <label className="form-field__label">{label}{required && ' *'}</label>
      {type === 'textarea' ? (
        <textarea
          className="form-field__input form-field__textarea"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          rows={4}
        />
      ) : (
        <input
          className="form-field__input"
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}

function JoinForm() {
  const [form, setForm] = useState({ name: '', email: '', role: '', portfolio: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) return (
    <div className="form-success">
      <div className="form-success__icon">✓</div>
      <h3>We've got your application.</h3>
      <p>We'll review it and get back to you if there's a match. Thanks for your interest in Shine Digital.</p>
    </div>
  );

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <FormField label="Full Name" placeholder="Your name" name="name" value={form.name} onChange={handleChange} required />
      <FormField label="Email" type="email" placeholder="your@email.com" name="email" value={form.email} onChange={handleChange} required />
      <div className="form-field">
        <label className="form-field__label">Role You're Interested In *</label>
        <select className="form-field__input form-field__select" name="role" value={form.role} onChange={handleChange}>
          <option value="">Select a role</option>
          <option value="video-editor">Video Editor</option>
          <option value="social-media">Social Media Manager</option>
          <option value="graphic-designer">Graphic Designer</option>
          <option value="cinematographer">Cinematographer</option>
          <option value="copywriter">Copywriter</option>
          <option value="other">Other</option>
        </select>
      </div>
      <FormField label="Portfolio / LinkedIn URL" placeholder="https://" name="portfolio" value={form.portfolio} onChange={handleChange} />
      <FormField label="Tell us about yourself" type="textarea" placeholder="Why do you want to work with Shine Digital? What makes you different?" name="message" value={form.message} onChange={handleChange} required />
      <button type="submit" className="form-submit">
        <span>Submit Application</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </form>
  );
}

function EnquiryForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', budget: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) return (
    <div className="form-success">
      <div className="form-success__icon">✓</div>
      <h3>Message received.</h3>
      <p>We'll be in touch within 24 hours to discuss your project. Exciting things ahead.</p>
    </div>
  );

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <FormField label="Full Name" placeholder="Your name" name="name" value={form.name} onChange={handleChange} required />
      <FormField label="Email" type="email" placeholder="your@email.com" name="email" value={form.email} onChange={handleChange} required />
      <FormField label="Company / Brand" placeholder="Your brand name" name="company" value={form.company} onChange={handleChange} />
      <div className="form-field">
        <label className="form-field__label">Service You Need *</label>
        <select className="form-field__input form-field__select" name="service" value={form.service} onChange={handleChange}>
          <option value="">Select a service</option>
          <option value="social-media">Social Media</option>
          <option value="branding">Branding</option>
          <option value="website">Website</option>
          <option value="films">Films</option>
          <option value="full-service">Full Service</option>
        </select>
      </div>
      <div className="form-field">
        <label className="form-field__label">Budget Range</label>
        <select className="form-field__input form-field__select" name="budget" value={form.budget} onChange={handleChange}>
          <option value="">Select a range</option>
          <option value="under-50k">Under ₹50,000</option>
          <option value="50k-2l">₹50,000 – ₹2,00,000</option>
          <option value="2l-5l">₹2,00,000 – ₹5,00,000</option>
          <option value="5l+">₹5,00,000+</option>
        </select>
      </div>
      <FormField label="Project Brief" type="textarea" placeholder="Tell us about your project, goals, and timeline..." name="message" value={form.message} onChange={handleChange} required />
      <button type="submit" className="form-submit">
        <span>Send Enquiry</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </form>
  );
}

export default function Contact() {
  const [heroRef, heroVisible] = useReveal(0.1);
  const [formsRef, formsVisible] = useReveal(0.05);
  const [activeTab, setActiveTab] = useState('enquiry');

  return (
    <div className="contact-page">
      <section className={`contact-hero ${heroVisible ? 'revealed' : ''}`} ref={heroRef}>
        <div className="contact-hero__inner">
          <p className="section-label">Contact</p>
          <h1 className="contact-hero__title">
            Let's make<br />something<br /><em>great.</em>
          </h1>
          <div className="contact-hero__info">
            <div className="contact-info-item">
              <span className="contact-info-item__label">Email</span>
              <a href="mailto:hello@shinedigital.in">hello@shinedigital.in</a>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-item__label">Based In</span>
              <span>Mumbai, India</span>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-item__label">Instagram</span>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">@shinedigital</a>
            </div>
          </div>
        </div>
      </section>

      <section className={`contact-forms ${formsVisible ? 'revealed' : ''}`} ref={formsRef}>
        <div className="contact-forms__tabs">
          <button
            className={`contact-tab ${activeTab === 'enquiry' ? 'active' : ''}`}
            onClick={() => setActiveTab('enquiry')}
          >
            Marketing Enquiry
          </button>
          <button
            className={`contact-tab ${activeTab === 'join' ? 'active' : ''}`}
            onClick={() => setActiveTab('join')}
          >
            Join the Team
          </button>
        </div>

        <div className="contact-forms__body">
          <div className="contact-forms__left">
            <h2 className="contact-forms__heading">
              {activeTab === 'enquiry'
                ? <>Let's build your<br /><em>brand together.</em></>
                : <>Work with the<br /><em>best creatives.</em></>
              }
            </h2>
            <p className="contact-forms__desc">
              {activeTab === 'enquiry'
                ? "Tell us about your project and we'll put together a tailored plan. No generic proposals — just real strategy built around your goals."
                : "We're always looking for obsessive creatives who push boundaries. If that sounds like you, we'd love to hear from you."
              }
            </p>
          </div>
          <div className="contact-forms__right">
            {activeTab === 'enquiry' ? <EnquiryForm /> : <JoinForm />}
          </div>
        </div>
      </section>
    </div>
  );
}
