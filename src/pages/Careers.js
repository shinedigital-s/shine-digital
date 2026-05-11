import React, { useEffect, useRef, useState } from 'react';
import './Careers.css';

/* ── Reveal on scroll ── */
function useReveal(threshold = 0.15) {
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

/* ── Scramble text ── */
function useScramble(text, trigger, duration = 1000) {
    const [display, setDisplay] = useState(text);
    const chars = '!@#$%^&*<>?/abcdefghijklmnopqrstuvwxyz0123456789';
    useEffect(() => {
        if (!trigger) return;
        let frame = 0;
        const totalFrames = Math.floor(duration / 30);
        const interval = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            setDisplay(
                text.split('').map((char, i) => {
                    if (char === ' ') return ' ';
                    const revealAt = i / text.length;
                    if (progress > revealAt) return char;
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('')
            );
            if (frame >= totalFrames) { setDisplay(text); clearInterval(interval); }
        }, 30);
        return () => clearInterval(interval);
    }, [trigger]);
    return display;
}

/* ── Marquee Bar ── */
function MarqueeBar() {
    const items = ['Grow', 'Create', 'Lead', 'Build', 'Dare', 'Shine', 'Shape'];
    const doubled = [...items, ...items, ...items, ...items];
    return (
        <div className="careers-marquee">
            <div className="careers-marquee__inner">
                {doubled.map((w, i) => (
                    <React.Fragment key={i}>
                        <span>{w}</span>
                        <span className="dot">✦</span>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

/* ── Roles ── */
const ROLES = [
    { id: 'social', label: 'Social Media Executive' },
    { id: 'design', label: 'Brand & Graphic Designer' },
    { id: 'video', label: 'Video Editor / Filmmaker' },
    { id: 'web', label: 'Web Developer' },
    { id: 'strategy', label: 'Brand Strategist' },
    { id: 'intern', label: 'Creative Intern' },
    { id: 'other', label: 'Something Else Entirely' },
];

/* ── Why Cards ── */
const WHY_ITEMS = [
    {
        num: '01',
        title: 'Real Work, Real Impact',
        desc: "You won't be fetching coffee. From day one you'll be shaping brands, solving real problems, and leaving your mark on work that actually ships.",
    },
    {
        num: '02',
        title: 'Learn by Doing',
        desc: "We move fast and figure things out together. If you're hungry to grow, you'll get more hands-on experience here than anywhere else.",
    },
    {
        num: '03',
        title: 'A Team That Gets It',
        desc: 'We are young, driven, and obsessed with doing great work. No bureaucracy. No politics. Just a crew building something worth building.',
    },
    {
        num: '04',
        title: 'Your Ideas Matter',
        desc: 'Good ideas win here regardless of title or tenure. If you see a better way, say it. We are always listening.',
    },
];

/* ── Application Form ── */
function ApplicationForm() {
    const [formRef, formVisible] = useReveal(0.1);
    const [selected, setSelected] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [focused, setFocused] = useState('');
    const [values, setValues] = useState({
        name: '', email: '', role: '', portfolio: '', message: '',
    });

    const handleChange = (e) => {
        setValues(v => ({ ...v, [e.target.name]: e.target.value }));
        if (e.target.name === 'role') setSelected(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="careers-form-wrap" ref={formRef}>
                <div className="careers-form__success">
                    <div className="careers-form__success-icon">✓</div>
                    <h3>We've got your application.</h3>
                    <p>We go through every submission carefully. If we think there's a fit, you'll hear from us. Stay sharp.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`careers-form-wrap ${formVisible ? 'revealed' : ''}`} ref={formRef}>
            <form className="careers-form" onSubmit={handleSubmit}>

                {/* Name + Email */}
                <div className="careers-form__row">
                    <div className={`careers-field ${focused === 'name' || values.name ? 'active' : ''}`}>
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name" name="name" type="text" required
                            value={values.name} onChange={handleChange}
                            onFocus={() => setFocused('name')}
                            onBlur={() => setFocused('')}
                            placeholder="Your full name"
                        />
                        <div className="careers-field__bar" />
                    </div>
                    <div className={`careers-field ${focused === 'email' || values.email ? 'active' : ''}`}>
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email" name="email" type="email" required
                            value={values.email} onChange={handleChange}
                            onFocus={() => setFocused('email')}
                            onBlur={() => setFocused('')}
                            placeholder="you@example.com"
                        />
                        <div className="careers-field__bar" />
                    </div>
                </div>

                {/* Role selector */}
                <div className="careers-field careers-field--full">
                    <label>What role interests you?</label>
                    <div className="careers-roles">
                        {ROLES.map((r) => (
                            <button
                                type="button"
                                key={r.id}
                                className={`careers-role-chip ${selected === r.id ? 'selected' : ''}`}
                                onClick={() => { setSelected(r.id); setValues(v => ({ ...v, role: r.id })); }}
                            >
                                {r.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Portfolio */}
                <div className={`careers-field careers-field--full ${focused === 'portfolio' || values.portfolio ? 'active' : ''}`}>
                    <label htmlFor="portfolio">Portfolio / LinkedIn / Instagram</label>
                    <input
                        id="portfolio" name="portfolio" type="url"
                        value={values.portfolio} onChange={handleChange}
                        onFocus={() => setFocused('portfolio')}
                        onBlur={() => setFocused('')}
                        placeholder="https://your-work.com"
                    />
                    <div className="careers-field__bar" />
                </div>

                {/* Message */}
                <div className={`careers-field careers-field--full ${focused === 'message' || values.message ? 'active' : ''}`}>
                    <label htmlFor="message">Tell us about yourself</label>
                    <textarea
                        id="message" name="message" rows={6} required
                        value={values.message} onChange={handleChange}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused('')}
                        placeholder="What drives you? What have you built? What do you want to create here?"
                    />
                    <div className="careers-field__bar" />
                </div>

                <button type="submit" className="careers-submit">
                    <span>Send Application</span>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M3 9H15M15 9L9 3M15 9L9 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </form>
        </div>
    );
}

/* ── Page ── */
export default function Careers() {
    const [heroRef, heroVisible] = useReveal(0.1);
    const [whyRef, whyVisible] = useReveal(0.1);
    const [applyRef, applyVisible] = useReveal(0.1);

    const scrambled = useScramble('your move.', heroVisible, 1100);

    return (
        <div className="careers-page">

            {/* ── Hero ── */}
            <section className={`careers-hero ${heroVisible ? 'revealed' : ''}`} ref={heroRef}>
                <div className="careers-hero__inner">
                    <p className="section-label">Careers at Shine Digital</p>
                    <h1 className="careers-hero__title">
                        <span>Big ideas.</span>
                        <span>Bold work.</span>
                        <em>{scrambled}</em>
                    </h1>
                    <p className="careers-hero__sub">
                        We are not looking for people who want a job. We are looking
                        for people who want to build something. If that's you read on.
                    </p>
                    <a href="#apply" className="careers-hero__cta">
                        <span>Apply Now</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
                <div className="careers-hero__ticker">
                    {['Mumbai Based', 'Youth Driven', 'Creatively Led', 'Growing Fast'].map((t, i) => (
                        <div key={i} className="careers-hero__ticker-item" style={{ '--i': i }}>
                            <span className="dot">✦</span>
                            <span>{t}</span>
                        </div>
                    ))}
                </div>
            </section>

            <MarqueeBar />

            {/* ── Why Shine ── */}
            <section className={`careers-why ${whyVisible ? 'revealed' : ''}`} ref={whyRef}>
                <div className="careers-why__header">
                    <p className="section-label">Why Shine Digital</p>
                    <h2 className="careers-why__title">
                        A place where<br /><em>you actually grow.</em>
                    </h2>
                    <p className="careers-why__sub">
                        We built Shine Digital because we wanted to do things differently.
                        That spirit lives in how we work and who we work with.
                    </p>
                </div>
                <div className="careers-why__grid">
                    {WHY_ITEMS.map((item, i) => (
                        <div key={i} className="careers-why-card" style={{ '--i': i }}>
                            <span className="careers-why-card__num">{item.num}</span>
                            <h3 className="careers-why-card__title">{item.title}</h3>
                            <p className="careers-why-card__desc">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <MarqueeBar />

            {/* ── Open Roles Banner ── */}
            <section className="careers-open">
                <div className="careers-open__inner">
                    <p className="section-label">Open Roles</p>
                    <h2>We are always looking for<br /><em>exceptional people.</em></h2>
                    <p>
                        We hire across all levels from fresh graduates to seasoned
                        creatives. If you are sharp, hungry, and ready to do the best
                        work of your life, there is a place for you here.
                    </p>
                </div>
                <div className="careers-open__roles">
                    {ROLES.filter(r => r.id !== 'other').map((r, i) => (
                        <div key={i} className="careers-open__role-row" style={{ '--i': i }}>
                            <span className="careers-open__role-num">0{i + 1}</span>
                            <span className="careers-open__role-name">{r.label}</span>
                            <span className="careers-open__role-tag">Open</span>
                            <span className="careers-open__role-arrow">→</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Apply Form ── */}
            <section className={`careers-apply ${applyVisible ? 'revealed' : ''}`} ref={applyRef} id="apply">
                <div className="careers-apply__header">
                    <p className="section-label">Apply</p>
                    <h2 className="careers-apply__title">
                        Think you belong here?<br /><em>Show us.</em>
                    </h2>
                    <p className="careers-apply__sub">
                        Drop us your details and tell us what you want to build.
                        We read every application ourselves no bots, no filters.
                    </p>
                </div>
                <ApplicationForm />
            </section>

        </div>
    );
}