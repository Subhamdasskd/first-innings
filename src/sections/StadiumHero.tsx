import { Suspense, lazy, useState } from 'react'
import { ArrowDown, ArrowUpRight, Download, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { profile } from '@/data/profile'
import { resume } from '@/data/resume'
import { stats } from '@/data/site'

const GroundIntroCanvas = lazy(() =>
  import('@/ground/GroundIntroCanvas').then((m) => ({ default: m.GroundIntroCanvas })),
)

const value = (id: string) => stats.find((s) => s.id === id)?.value ?? '—'

/**
 * The opening scene: a live 3D cricket ground with the editorial identity
 * composed over it. The stage belongs to this section.
 */
export function StadiumHero() {
  const [ready, setReady] = useState(false)

  return (
    <section className={`h3d${ready ? ' is-ready' : ''}`} aria-labelledby="h3d-title">
      <div className="h3d__stage" aria-hidden="true">
        <Suspense fallback={null}>
          <GroundIntroCanvas onReady={() => setReady(true)} />
        </Suspense>
      </div>

      <div className="h3d__scrim" aria-hidden="true" />

      <div className="shell h3d__inner">
        <div className="h3d__copy">
          <p className="h3d__meta">
            <span className="eyebrow eyebrow--live">
              <span className="eyebrow__dot" />
              Live from the ground
            </span>
            <span className="h3d__scene">Scene 01 — The opening</span>
          </p>

          <h1 className="h3d__title" id="h3d-title">
            <span className="h3d__wordmark">First Innings</span>
            <span className="h3d__name">
              <span>Subham</span>
              <span className="h3d__nameOutline">Das</span>
            </span>
          </h1>

          <p className="h3d__role">
            <span className="h3d__roleMain">{profile.role}</span>
            <span className="h3d__roleAt">at {profile.roleOrg}</span>
          </p>

          <p className="h3d__tagline">{profile.tagline}</p>

          <div className="h3d__actions">
            <a className="btn btn--primary" href="#profile">
              Enter the stadium
              <ArrowDown size={15} className="btn__icon" aria-hidden="true" />
            </a>
            <Link className="btn btn--ground h3d__ground" to="/ground">
              <span className="h3d__groundDot" aria-hidden="true" />
              Enter the 3D ground
              <ArrowUpRight size={15} className="btn__icon" aria-hidden="true" />
            </Link>
            <Link className="btn" to="/recruiter">
              Quick profile
              <ArrowUpRight size={14} className="btn__icon" aria-hidden="true" />
            </Link>
            <a className="btn btn--ghost" href={resume.href} download={resume.downloadName}>
              Resume
              <Download size={14} className="btn__icon" aria-hidden="true" />
            </a>
          </div>

          <p className="h3d__groundHint">
            <span className="eyebrow__dot" />
            Playable stadium: player introduction, camera sequences and a live delivery
          </p>
        </div>

        <figure className="h3d__card">
          <div className="h3d__cardPhoto">
            <picture>
              <source srcSet={profile.photo.portrait.webp} type="image/webp" />
              <img
                src={profile.photo.portrait.jpg}
                width={profile.photo.portrait.width}
                height={profile.photo.portrait.height}
                alt={profile.photo.alt}
                loading="eager"
                decoding="async"
              />
            </picture>
            <span className="h3d__cardNo" aria-hidden="true">
              01
            </span>
          </div>
          <figcaption className="h3d__cardBody">
            <span className="h3d__cardKicker">
              <Sparkles size={10} aria-hidden="true" />
              Player card
            </span>
            <span className="h3d__cardName">{profile.name}</span>
            <span className="h3d__cardMeta">
              {profile.role} · {profile.location}
            </span>
            <ul className="h3d__cardStats">
              <li>
                <span>Roles</span>
                <strong>{value('roles')}</strong>
              </li>
              <li>
                <span>Projects</span>
                <strong>{value('projects')}</strong>
              </li>
              <li>
                <span>Papers</span>
                <strong>{value('publications')}</strong>
              </li>
            </ul>
          </figcaption>
        </figure>
      </div>

      <div className="h3d__lower">
        <div className="shell h3d__lowerInner">
          <div className="h3d__cell">
            <span className="h3d__cellKey">Match</span>
            <span className="h3d__cellVal">Career XI</span>
          </div>
          <div className="h3d__cell">
            <span className="h3d__cellKey">Player</span>
            <span className="h3d__cellVal">{profile.name}</span>
          </div>
          <div className="h3d__cell">
            <span className="h3d__cellKey">Role</span>
            <span className="h3d__cellVal">{profile.role}</span>
          </div>
          <div className="h3d__cell">
            <span className="h3d__cellKey">Venue</span>
            <span className="h3d__cellVal">{profile.location}</span>
          </div>
          <div className="h3d__cell">
            <span className="h3d__cellKey">Status</span>
            <span className="h3d__cellVal h3d__cellVal--live">
              <span className="eyebrow__dot" />
              In progress
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
