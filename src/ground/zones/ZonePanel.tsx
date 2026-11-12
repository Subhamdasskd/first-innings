import { Link } from 'react-router-dom'
import { ArrowUpRight, Download, X } from 'lucide-react'
import { profile } from '@/data/profile'
import { experience } from '@/data/experience'
import { education } from '@/data/education'
import { projects } from '@/data/projects'
import { skillGroups } from '@/data/skills'
import { achievements } from '@/data/achievements'
import { resume } from '@/data/resume'
import { socialLinks, stats } from '@/data/site'
import { zoneById, type ZoneId } from './zones'
import { useGroundStore } from '../useGroundStore'
import { cx } from '@/lib/cx'

const total = (id: string) => stats.find((s) => s.id === id)?.value ?? '—'
const publication = achievements.find((a) => a.kind === 'publication')
const certs = achievements.filter((a) => a.kind === 'certification')
const flagship = projects.find((p) => p.tier === 'flagship')
const featured = projects.filter((p) => p.tier === 'featured').slice(0, 3)

/**
 * The zone panel: portfolio content, in the ground.
 * Deliberately compact — it is a doorway into the full section, not a copy of it.
 */
export function ZonePanel() {
  const zoneId = useGroundStore((s) => s.zone)
  const setZone = useGroundStore((s) => s.setZone)
  if (!zoneId) return null
  const zone = zoneById(zoneId)
  if (!zone) return null

  return (
    <aside className={cx('zone', 'is-open')} aria-label={`${zone.label} zone`}>
      <header className="zone__head">
        <div>
          <p className="zone__kicker">{zone.cricket}</p>
          <h2 className="zone__title">{zone.label}</h2>
        </div>
        <button
          type="button"
          className="zone__close"
          onClick={() => setZone(null)}
          aria-label="Close zone panel"
        >
          <X size={14} aria-hidden="true" />
        </button>
      </header>

      <div className="zone__body">{renderBody(zoneId)}</div>

      <footer className="zone__foot">
        <Link to={zone.href} className="btn btn--sm btn--primary">
          Open full section
          <ArrowUpRight size={12} aria-hidden="true" />
        </Link>
        <a className="btn btn--sm" href={resume.href} download={resume.downloadName}>
          <Download size={12} aria-hidden="true" />
          Resume
        </a>
      </footer>
    </aside>
  )
}

function renderBody(id: ZoneId) {
  switch (id) {
    case 'profile':
      return (
        <>
          <p className="zone__lead">
            {profile.role} at {profile.roleOrg}. {profile.location}.
          </p>
          <p className="zone__text">{profile.summary[0]}</p>
          <dl className="zone__facts">
            <div>
              <dt>Education</dt>
              <dd>
                {education[0].qualification}, {education[0].field} · {education[0].result}
              </dd>
            </div>
            <div>
              <dt>Currently focused on</dt>
              <dd>{profile.focus.slice(0, 2).join(' · ')}</dd>
            </div>
          </dl>
        </>
      )

    case 'career':
      return (
        <ul className="zone__list">
          {experience.map((role) => (
            <li key={role.id}>
              <span className="zone__listTitle">{role.title}</span>
              <span className="zone__listMeta">
                {role.organisation} · {role.start} – {role.end}
              </span>
            </li>
          ))}
        </ul>
      )

    case 'projects':
      return (
        <ul className="zone__list">
          {flagship && (
            <li>
              <span className="zone__chip">Flagship</span>
              <span className="zone__listTitle">{flagship.name}</span>
              <span className="zone__listMeta">{flagship.kicker}</span>
              {flagship.links
                .filter((l) => l.kind === 'live')
                .map((l) => (
                  <a
                    key={l.href}
                    className="zone__inlineLink"
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Live demo
                    <ArrowUpRight size={11} aria-hidden="true" />
                  </a>
                ))}
            </li>
          )}
          {featured.map((project) => (
            <li key={project.id}>
              <span className="zone__listTitle">{project.name}</span>
              <span className="zone__listMeta">{project.kicker}</span>
            </li>
          ))}
        </ul>
      )

    case 'skills':
      return (
        <ul className="zone__list zone__list--tight">
          {skillGroups.map((group) => (
            <li key={group.id}>
              <span className="zone__listTitle">
                {group.real}
                <span className="zone__count">{group.items.length}</span>
              </span>
              <span className="zone__listMeta">
                {group.items
                  .slice(0, 4)
                  .map((i) => i.name)
                  .join(' · ')}
              </span>
            </li>
          ))}
        </ul>
      )

    case 'records':
      return (
        <>
          {publication && (
            <div className="zone__pub">
              <span className="zone__chip zone__chip--gold">Publication</span>
              <p className="zone__pubTitle">{publication.title}</p>
              <p className="zone__listMeta">{publication.authors?.join(' · ')}</p>
            </div>
          )}
          <dl className="zone__facts">
            <div>
              <dt>Certifications</dt>
              <dd>{total('certifications')} across two issuers</dd>
            </div>
            <div>
              <dt>Degree</dt>
              <dd>
                {education[0].qualification} · CGPA {education[0].result?.replace('CGPA ', '')}
              </dd>
            </div>
          </dl>
          <ul className="zone__certs">
            {certs.slice(0, 3).map((c) => (
              <li key={c.id}>{c.title}</li>
            ))}
          </ul>
        </>
      )

    case 'contact':
      return (
        <ul className="zone__links">
          {socialLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                target={link.id === 'email' ? undefined : '_blank'}
                rel="noreferrer noopener"
              >
                <span className="zone__linkLabel">{link.label}</span>
                <span className="zone__linkValue">{link.handle}</span>
              </a>
            </li>
          ))}
        </ul>
      )
  }
}
