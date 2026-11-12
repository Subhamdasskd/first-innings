import { Link } from 'react-router-dom'
import { ArrowLeft, Download, Printer, ArrowUpRight } from 'lucide-react'
import { profile } from '@/data/profile'
import { experience } from '@/data/experience'
import { education } from '@/data/education'
import { projects } from '@/data/projects'
import { skillGroups } from '@/data/skills'
import { achievements } from '@/data/achievements'
import { resume } from '@/data/resume'
import { socialLinks } from '@/data/site'

const certifications = achievements.filter((item) => item.kind === 'certification')
const publication = achievements.find((item) => item.kind === 'publication')

/**
 * The recruiter view: no canvas, no scroll choreography, no game.
 * One column, everything readable, printable.
 */
export function Recruiter() {
  return (
    <main id="main" className="recruiter">
      <div className="shell recruiter__shell">
        <div className="recruiter__bar">
          <Link to="/" className="recruiter__back">
            <ArrowLeft size={14} aria-hidden="true" />
            Full experience
          </Link>
          <div className="recruiter__barActions">
            <button type="button" className="btn btn--sm" onClick={() => window.print()}>
              <Printer size={13} aria-hidden="true" />
              Print
            </button>
            <a className="btn btn--sm btn--primary" href={resume.href} download={resume.downloadName}>
              <Download size={13} aria-hidden="true" />
              Download resume
            </a>
          </div>
        </div>

        <header className="recruiter__header">
          <p className="eyebrow">Quick profile · low motion</p>
          <h1 className="recruiter__name">{profile.name}</h1>
          <p className="recruiter__role">
            {profile.role} at {profile.roleOrg} · {profile.location}
          </p>
          <ul className="recruiter__links">
            {socialLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  target={link.id === 'email' ? undefined : '_blank'}
                  rel="noreferrer noopener"
                >
                  {link.id === 'email' ? link.handle : link.label}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <section className="rcSection" aria-labelledby="rc-summary">
          <h2 id="rc-summary">Summary</h2>
          {profile.summary.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </section>

        <section className="rcSection" aria-labelledby="rc-experience">
          <h2 id="rc-experience">Experience</h2>
          <ul className="rcList">
            {experience.map((entry) => (
              <li key={entry.id} className="rcItem">
                <div className="rcItem__head">
                  <h3>
                    {entry.title} · {entry.organisation}
                  </h3>
                  <span className="rcItem__date">
                    {entry.start} – {entry.end} · {entry.duration}
                  </span>
                </div>
                <p className="rcItem__meta">
                  {entry.location}
                  {entry.mode ? ` · ${entry.mode}` : ''}
                </p>
                <ul className="rcBullets">
                  {entry.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section className="rcSection" aria-labelledby="rc-projects">
          <h2 id="rc-projects">Selected projects</h2>
          <ul className="rcList">
            {projects.slice(0, 6).map((project) => (
              <li key={project.id} className="rcItem">
                <div className="rcItem__head">
                  <h3>{project.name}</h3>
                  <span className="rcItem__date">{project.year}</span>
                </div>
                <p className="rcItem__meta">{project.stack.join(' · ')}</p>
                <p>{project.summary}</p>
                {project.links.length > 0 && (
                  <p className="rcItem__links">
                    {project.links.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noreferrer noopener">
                        {link.label}
                        <ArrowUpRight size={11} aria-hidden="true" />
                      </a>
                    ))}
                  </p>
                )}
              </li>
            ))}
          </ul>
          <p className="rcNote">
            Full detail for all {projects.length} projects is available in the main experience.
          </p>
        </section>

        <section className="rcSection" aria-labelledby="rc-skills">
          <h2 id="rc-skills">Skills</h2>
          <dl className="rcSkills">
            {skillGroups.map((group) => (
              <div key={group.id}>
                <dt>{group.real}</dt>
                <dd>{group.items.map((item) => item.name).join(', ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rcSection" aria-labelledby="rc-education">
          <h2 id="rc-education">Education</h2>
          <ul className="rcList">
            {education.map((entry) => (
              <li key={entry.id} className="rcItem">
                <div className="rcItem__head">
                  <h3>
                    {entry.qualification}, {entry.field}
                  </h3>
                  <span className="rcItem__date">
                    {entry.start} – {entry.end}
                  </span>
                </div>
                <p className="rcItem__meta">
                  {entry.institution}
                  {entry.result ? ` · ${entry.result}` : ''}
                </p>
                {entry.note && <p className="rcItem__note">{entry.note}</p>}
              </li>
            ))}
          </ul>
        </section>

        <section className="rcSection" aria-labelledby="rc-publications">
          <h2 id="rc-publications">Publication & certifications</h2>
          {publication && (
            <p className="rcPub">
              <strong>{publication.title}</strong> — {publication.authors?.join(', ')}.{' '}
              {publication.issuer}.
            </p>
          )}
          <ul className="rcCerts">
            {certifications.map((item) => (
              <li key={item.id}>
                {item.title}
                {item.issuer ? ` — ${item.issuer}` : ''}
              </li>
            ))}
          </ul>
        </section>

        <footer className="recruiter__foot">
          <a className="btn btn--primary" href={resume.href} download={resume.downloadName}>
            <Download size={14} aria-hidden="true" />
            Download resume (PDF)
          </a>
          <Link to="/" className="btn">
            Explore the full experience
          </Link>
        </footer>
      </div>
    </main>
  )
}
