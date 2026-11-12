import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import { profile } from '@/data/profile'
import { resume } from '@/data/resume'

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__scene" aria-hidden="true">
        <span className="hero__glow hero__glow--a" />
        <span className="hero__glow hero__glow--b" />
        <span className="hero__beam" />
        <span className="hero__pitch" />
        <span className="hero__grain" />
      </div>

      <div className="shell hero__inner">
        <div className="hero__copy">
          <p className="hero__meta">
            <span className="eyebrow eyebrow--live">
              <span className="eyebrow__dot" />
              Career in progress
            </span>
            <span className="hero__sceneLabel">Scene 01 — The opening</span>
          </p>

          <h1 className="hero__name" id="hero-title">
            <span className="hero__line">Subham</span>
            <span className="hero__line hero__line--outline">Das</span>
          </h1>

          <div className="hero__roleRow">
            <span className="hero__role">{profile.role}</span>
            <span className="hero__roleAt">at {profile.roleOrg}</span>
          </div>

          <p className="hero__tagline">{profile.tagline}</p>

          <div className="hero__actions">
            <a className="btn btn--primary" href="#profile">
              Enter the stadium
              <ArrowDown size={15} className="btn__icon" aria-hidden="true" />
            </a>
            <Link to="/recruiter" className="btn">
              Quick profile
              <ArrowUpRight size={14} className="btn__icon" aria-hidden="true" />
            </Link>
            <a className="btn btn--ghost" href={resume.href} download={resume.downloadName}>
              Resume
              <Download size={14} className="btn__icon" aria-hidden="true" />
            </a>
          </div>
        </div>

        <figure className="hero__figure">
          <div className="hero__frame">
            <picture>
              <source srcSet={profile.photo.portrait.webp} type="image/webp" />
              <img
                src={profile.photo.portrait.jpg}
                width={profile.photo.portrait.width}
                height={profile.photo.portrait.height}
                alt={profile.photo.alt}
                fetchPriority="high"
                decoding="async"
              />
            </picture>
            <span className="hero__frameNo" aria-hidden="true">
              01
            </span>
          </div>
          <figcaption className="hero__caption">
            <span>{profile.location}</span>
            <span className="hero__captionDot" aria-hidden="true" />
            <span>{profile.availability}</span>
          </figcaption>
        </figure>
      </div>

      <div className="hero__lower">
        <div className="shell hero__lowerInner">
          <div className="hero__lowerCell">
            <span className="hero__lowerKey">Match</span>
            <span className="hero__lowerVal">Career XI</span>
          </div>
          <div className="hero__lowerCell">
            <span className="hero__lowerKey">Player</span>
            <span className="hero__lowerVal">Subham Das</span>
          </div>
          <div className="hero__lowerCell">
            <span className="hero__lowerKey">Role</span>
            <span className="hero__lowerVal">{profile.role}</span>
          </div>
          <div className="hero__lowerCell">
            <span className="hero__lowerKey">Status</span>
            <span className="hero__lowerVal hero__lowerVal--live">
              <span className="eyebrow__dot" />
              In progress
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
