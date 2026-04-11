import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Blog from './pages/Blog'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'

/* ─── Magnetic cursor ──────────────────────────────────────
   Dot snaps instantly. Ring lerps with lag (0.10 = heavy feel).
   On hover: dot expands + ring grows.
   On video/reel elements: ring becomes a big circle with "PLAY".
─────────────────────────────────────────────────────────── */
function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)
  const mouse = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const rafId = useRef(null)
  const state = useRef('default') // default | hover | play

  useEffect(() => {
    const dot = dotRef.current
    const rng = ringRef.current
    const lbl = labelRef.current
    if (!dot || !rng) return

    const setPos = (el, x, y) => {
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
    }

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      setPos(dot, e.clientX, e.clientY)
    }

    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.10
      ring.current.y += (mouse.current.y - ring.current.y) * 0.10
      setPos(rng, ring.current.x, ring.current.y)
      rafId.current = requestAnimationFrame(tick)
    }

    const setState = (s) => {
      state.current = s
      dot.className = `cur-dot  cur-${s}`
      rng.className = `cur-ring cur-${s}`
      lbl.textContent = s === 'play' ? 'PLAY' : ''
      lbl.style.opacity = s === 'play' ? '1' : '0'
    }

    const onEnter = (e) => {
      const t = e.target.closest(
        '.reel-media, .about-video, .about-video-card, .hero-placeholder, .gumlet-wrap'
      )
      if (t) { setState('play'); return }
      if (e.target.closest('a, button')) setState('hover')
    }
    const onLeave = () => setState('default')

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    rafId.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      <div className="cur-dot  cur-default" ref={dotRef} />
      <div className="cur-ring cur-default" ref={ringRef}>
        <span className="cur-label" ref={labelRef} />
      </div>
    </>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

/* ─── Video intro ────────────────────────────────────────── */
function VideoIntro({ onDone }) {
  const videoRef = useRef(null)
  const [fading, setFading] = useState(false)

  const dismiss = () => {
    setFading(true)
    setTimeout(onDone, 700)
  }

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.addEventListener('ended', dismiss)
    return () => v.removeEventListener('ended', dismiss)
  }, [])

  return (
    <div className={`video-intro${fading ? ' vi-fading' : ''}`}>
      <video
        ref={videoRef}
        src="/intro.mp4"
        autoPlay
        muted
        playsInline
        className="vi-video"
      />
      <button className="vi-skip" onClick={dismiss}>Skip ›</button>
    </div>
  )
}

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const SKIP_INTRO = true // flip to false when intro video is ready

  return (
    <BrowserRouter>
      <div className="noise-overlay" />
      <Cursor />
      {!introDone && !SKIP_INTRO && (
        <VideoIntro onDone={() => setIntroDone(true)} />
      )}
      <div className={`app-content${(!introDone && !SKIP_INTRO) ? ' app-hidden' : ''}`}>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}