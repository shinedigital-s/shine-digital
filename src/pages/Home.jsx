import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import './Home.css'
import heroVideo from '../assets/Logo_Animation_Generation_Request (1).mp4'

// ── Services sub-component ───────────────────────────────────────
function ServicesSection({ services }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const cardRefs = useRef([])

  useEffect(() => {
    const observers = []
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i) },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      )
      obs.observe(card)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section className="services">

      {/* LEFT — sticky */}
      <div className="services__left">
        <p className="eyebrow">What We Do</p>
        <h2 className="services__heading">Services</h2>

        <div className="services__video-placeholder">
          {/* swap for <video autoPlay muted loop playsInline src="/services.mp4" /> */}
          <span className="placeholder-label">
            {services[activeIndex]?.id} — {services[activeIndex]?.title.toUpperCase()}
          </span>
        </div>

        {/* Progress dots */}
        <div className="services__progress">
          {services.map((_, i) => (
            <div
              key={i}
              className={`services__dot${i === activeIndex ? ' services__dot--active' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* RIGHT — scrollable cards */}
      <div className="services__right">
        {services.map((s, i) => (
          <div
            key={s.id}
            className="services__card"
            ref={(el) => (cardRefs.current[i] = el)}
          >
            <span className="services__card-num">{s.id}</span>

            <div className="services__card-body">
              <h3 className="services__card-title">{s.title}</h3>
              <p className="services__card-desc">{s.desc}</p>
              <div className="services__tags">
                {s.tags.map((tag) => (
                  <span key={tag} className="services__tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="services__card-arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 13L13 3M13 3H6M13 3v7"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}

// ── Main Home component ──────────────────────────────────────────
export default function Home() {

  // ── Lenis smooth scroll ────────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    window.__lenis = lenis
    return () => lenis.destroy()
  }, [])

  // ── About in-view ──────────────────────────────────────────────
  const aboutRef = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) e.target.classList.add('about--in-view') },
      { threshold: 0.15 }
    )
    if (aboutRef.current) observer.observe(aboutRef.current)
    return () => observer.disconnect()
  }, [])

  // ── Works scroll animation ─────────────────────────────────────
  const worksRef = useRef(null)
  const worksHeadingRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const onScroll = () => {
      const section = worksRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const wh = window.innerHeight
      if (worksHeadingRef.current) {
        const p = Math.max(0, Math.min(1, 1 - rect.top / wh))
        worksHeadingRef.current.style.transform = `translateY(${(1 - p) * 40}px)`
        worksHeadingRef.current.style.opacity = Math.min(1, p * 2)
      }
      cardRefs.current.forEach((card) => {
        if (!card) return
        const cr = card.getBoundingClientRect()
        const p = Math.max(0, Math.min(1, (wh - cr.top) / (wh * 0.6)))
        card.style.opacity = p
        card.style.transform = `translateY(${(1 - p) * 60}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Data ───────────────────────────────────────────────────────
  const works = [
    { id: '01', title: 'Capsule Campaign', category: 'Films', year: '2024' },
    { id: '02', title: 'Zoro Rebrand', category: 'Branding', year: '2023' },
    { id: '03', title: 'Echo Platform', category: 'Web Dev', year: '2024' },
  ]

  const services = [
    { id: '01', title: 'Web Development', desc: 'Performant, beautifully engineered digital experiences. From marketing sites to complex platforms — we build fast, scalable, and visually precise.', tags: ['React', 'Next.js', 'Webflow', 'GSAP'] },
    { id: '02', title: 'Films', desc: 'Cinematic brand films, social content, and documentary-style storytelling. We conceive, shoot, and edit — every frame with intention.', tags: ['Direction', 'Cinematography', 'Post', 'Color'] },
    { id: '03', title: 'Digital Marketing', desc: 'Data-informed strategies that actually convert. Performance campaigns, social ecosystems, and content that earns attention.', tags: ['Paid Media', 'SEO', 'Content', 'Analytics'] },
    { id: '04', title: 'Branding & Creative', desc: 'Identity systems built to last. Logos, visual language, brand books — and the strategic thinking that makes them resonate.', tags: ['Identity', 'Strategy', 'Art Direction', 'Print'] },
  ]

  const brands = [
    { name: 'Zoro', abbr: 'ZR' }, { name: 'Capsule', abbr: 'CP' },
    { name: 'Moov', abbr: 'MV' }, { name: 'Kaze', abbr: 'KZ' },
    { name: 'Drift', abbr: 'DT' }, { name: 'Lumio', abbr: 'LM' },
    { name: 'Arko', abbr: 'AK' }, { name: 'Velo', abbr: 'VL' },
  ]
  const doubled = [...brands, ...brands]

  return (
    <main className="home">

      {/* ═══════════════════════════════════════════════════════════
          HERO — fullscreen video
      ═══════════════════════════════════════════════════════════ */}
      <section className="hero">
        <video
          className="hero__video"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
        />
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ABOUT
      ═══════════════════════════════════════════════════════════ */}
      <section className="about" ref={aboutRef}>
        <div className="about__inner">
          <div className="about__left">
            <div className="about__line" />
            <div className="about__text">
              <p className="eyebrow">About Us</p>
              <h2 className="about__heading">We are a full‑spectrum digital studio built to make brands impossible to ignore.</h2>
              <p className="about__body">From concept to execution, Shine blends strategy, craft, and culture to deliver work that moves people — literally and figuratively.</p>
              <a href="/about" className="about__cta">
                <span>Our Story</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
          <div className="about__right">
            <div className="about__video-placeholder">
              <span className="placeholder-label">ABOUT VIDEO</span>
            </div>
            <div className="about__video-tag">2019 — Present</div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PAST WORKS
      ═══════════════════════════════════════════════════════════ */}
      <section className="works" ref={worksRef}>
        <div className="works__header" ref={worksHeadingRef} style={{ opacity: 0, transform: 'translateY(40px)' }}>
          <p className="eyebrow">Selected Works</p>
          <h2 className="works__heading">Past Works</h2>
        </div>
        <div className="works__grid">
          {works.map((work, i) => (
            <div
              key={work.id}
              className="works__card"
              ref={(el) => (cardRefs.current[i] = el)}
              style={{
                opacity: 0,
                transform: 'translateY(60px)',
                transition: `opacity 0.9s ease ${i * 0.12}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
              }}
            >
              <div className="works__video-wrap">
                <div className="works__video-placeholder">
                  <span className="works__num">{work.id}</span>
                </div>
                <div className="works__overlay">
                  <span className="works__overlay-tag">{work.category}</span>
                </div>
              </div>
              <div className="works__meta">
                <h3 className="works__title">{work.title}</h3>
                <span className="works__year">{work.year}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SERVICES — sticky left, scrolling right
      ═══════════════════════════════════════════════════════════ */}
      <ServicesSection services={services} />

      {/* ═══════════════════════════════════════════════════════════
          BRANDS
      ═══════════════════════════════════════════════════════════ */}
      <section className="brands">
        <div className="brands__header">
          <p className="eyebrow">Trusted By</p>
          <h2 className="brands__heading">Brands We've Worked With</h2>
        </div>

        <div className="brands__marquee-wrap">
          <div className="brands__marquee brands__marquee--left">
            {doubled.map((b, i) => (
              <div className="brands__logo" key={`a-${i}`}>
                <div className="brands__logo-abbr">{b.abbr}</div>
                <span className="brands__logo-name">{b.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="brands__marquee-wrap">
          <div className="brands__marquee brands__marquee--right">
            {doubled.map((b, i) => (
              <div className="brands__logo" key={`b-${i}`}>
                <div className="brands__logo-abbr">{b.abbr}</div>
                <span className="brands__logo-name">{b.name}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="brands__footer">+ many more</p>
      </section>

    </main>
  )
}