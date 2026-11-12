import { experience } from '@/data/experience'
import { SectionHead } from '@/components/layout/SectionHead'
import { revealDelay } from '@/lib/motion'
import { cx } from '@/lib/cx'

const organisations = new Set(experience.map((entry) => entry.orgId))

export function CareerInnings() {
  return (
    <section id="career" className="section" aria-labelledby="career-title">
      <div className="shell">
        <SectionHead
          id="career-title"
          scene="Scene 03 — Career innings"
          title="Career innings"
          real={`Professional experience — ${experience.length} roles across ${organisations.size} organisations`}
          lead="Real job titles, real dates, real responsibilities. Where a document disagrees with another, the difference is shown rather than smoothed over."
        />

        <ol className="career">
          {experience.map((entry, index) => (
            <li
              key={entry.id}
              className={cx('career__item', entry.current && 'is-current')}
              data-reveal
              style={revealDelay(index * 60)}
            >
              <div className="career__rail" aria-hidden="true">
                <span className="career__node" />
              </div>

              <div className="career__meta">
                <span className="career__dates">
                  {entry.start} — {entry.end}
                </span>
                <span className="career__duration">{entry.duration}</span>
                <span className="career__place">
                  {entry.location}
                  {entry.mode ? ` · ${entry.mode}` : ''}
                </span>
                {entry.current && (
                  <span className="chip chip--lime career__current">
                    <span className="eyebrow__dot" />
                    Current
                  </span>
                )}
              </div>

              <article className="career__card panel">
                <header className="career__head">
                  <h3 className="career__title">{entry.title}</h3>
                  <p className="career__org">{entry.organisation}</p>
                  {entry.titleNote && <p className="career__titleNote">{entry.titleNote}</p>}
                </header>

                <p className="career__summary">{entry.summary}</p>

                <ul className="career__points">
                  {entry.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                {entry.stack.length > 0 && (
                  <ul className="career__stack" aria-label="Technologies used">
                    {entry.stack.map((tech) => (
                      <li className="chip chip--muted" key={tech}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
