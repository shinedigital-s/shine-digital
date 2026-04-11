import React from 'react'
import './Blog.css'

export default function Blog() {
  return (
<<<<<<< HEAD
    <div className="blog-maintenance">
      <div className="bm-inner">
        <p className="bm-eyebrow">Blog</p>
        <h1 className="bm-headline">Under<br/>Maintenance</h1>
        <div className="bm-line" />
        <p className="bm-sub">
          We are working on something worth reading.<br />
          Check back soon.
        </p>
=======
    <div className="blog-page">
      <div className="blog-hero">
        <div className="blog-coming-soon">
          <span className="blog-tag">Blog</span>
          <h1 className="blog-title">
            COMING<br/>
            <span className="blog-title-outline">SOON</span>
            <span className="blog-dot">.</span>
          </h1>
          <p className="blog-sub">
            We're crafting something worth reading.<br/>
            Check back soon — or follow us while you wait.
          </p>
          <div className="blog-socials">
            {['Instagram', 'LinkedIn', 'Twitter'].map(s => (
              <a key={s} href="#" className="blog-social-link">{s} ↗</a>
            ))}
          </div>
        </div>
>>>>>>> 34f04cda37a2764183c8458f2a2fcd8717baf568
      </div>
    </div>
  )
}
