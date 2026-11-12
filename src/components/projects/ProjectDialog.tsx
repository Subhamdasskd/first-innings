import { useEffect, useRef } from 'react'
import { ArrowUpRight, Check, CircleDashed } from 'lucide-react'
import type { Project } from '@/data/types'
import { tierMeta } from '@/data/projects'
import { cx } from '@/lib/cx'
import { ProjectSlate } from './ProjectSlate'

interface Props {
  project: Project | null
  onClose: () => void
}

const linkClass = (kind: string) =>
  cx('btn', 'btn--sm', kind === 'live' && 'btn--primary')

/**
 * Native <dialog> in modal mode — the browser supplies the focus trap, the Esc
 * key, the top layer and focus restoration.
 */
export function ProjectDialog({ project, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (project && !el.open) el.showModal()
    if (!project && el.open) el.close()
    if (project) el.scrollTop = 0
  }, [project])

  useEffect(() => {
    if (!project) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [project])

  return (
    <dialog
      ref={ref}
      className="pDialog"
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
    >
      {project && (
        <div className="pDialog__sheet">
          <header className="pDialog__head">
            <div className="pDialog__meta">
              <span className="chip">{tierMeta[project.tier].label}</span>
              <span className={cx('chip', project.status.tone === 'live' && 'chip--lime')}>
                {project.status.label}
              </span>
              <span className="chip chip--muted">{project.year}</span>
            </div>
            <button type="button" className="btn btn--sm" onClick={onClose}>
              Close
            </button>
          </header>

          <div className="pDialog__body">
            <div className="pDialog__intro">
              <h2 className="pDialog__title" id="project-dialog-title">
                {project.name}
              </h2>
              <p className="pDialog__kicker">{project.kicker}</p>
              <p className="pDialog__summary">{project.summary}</p>

              {project.links.length > 0 ? (
                <div className="pDialog__links">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      className={linkClass(link.kind)}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {link.label}
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="pDialog__noLinks">
                  No public repository or deployment for this project. Everything described here was
                  verified from the working build.
                </p>
              )}
            </div>

            <div className="pDialog__media">
              {project.media.length > 0 ? (
                <div className="pGallery">
                  {project.media.map((item) => (
                    <figure className="pGallery__item" key={item.src}>
                      <img
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        loading="lazy"
                        decoding="async"
                      />
                      <figcaption>{item.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                <ProjectSlate project={project} />
              )}
            </div>

            <div className="pDialog__grid">
              <section className="pBlock">
                <h3 className="pBlock__title">The problem</h3>
                <p>{project.problem}</p>
              </section>

              <section className="pBlock">
                <h3 className="pBlock__title">The approach</h3>
                <p>{project.solution}</p>
              </section>

              <section className="pBlock pBlock--wide">
                <h3 className="pBlock__title">What it actually does</h3>
                <ul className="pFeatures">
                  {project.highlights.map((item) => (
                    <li key={item.title}>
                      <span className="pFeatures__title">{item.title}</span>
                      <span className="pFeatures__body">{item.body}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="pBlock">
                <h3 className="pBlock__title">My contribution</h3>
                <p>{project.contribution}</p>
              </section>

              <section className="pBlock">
                <h3 className="pBlock__title">Stack</h3>
                <ul className="career__stack">
                  {project.stack.map((tech) => (
                    <li className="chip chip--muted" key={tech}>
                      {tech}
                    </li>
                  ))}
                </ul>
              </section>

              {project.shipped && (
                <section className="pBlock">
                  <h3 className="pBlock__title">Working today</h3>
                  <ul className="pList pList--done">
                    {project.shipped.map((item) => (
                      <li key={item}>
                        <Check size={13} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {project.notYet && (
                <section className="pBlock">
                  <h3 className="pBlock__title">Not built yet</h3>
                  <ul className="pList pList--todo">
                    {project.notYet.map((item) => (
                      <li key={item}>
                        <CircleDashed size={13} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {project.challenge && (
                <section className="pBlock">
                  <h3 className="pBlock__title">The hard part</h3>
                  <p>{project.challenge}</p>
                </section>
              )}

              {project.learned && (
                <section className="pBlock">
                  <h3 className="pBlock__title">What I took from it</h3>
                  <p>{project.learned}</p>
                </section>
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
