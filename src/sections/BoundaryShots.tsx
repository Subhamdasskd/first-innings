import { ArrowUpRight, PlayCircle } from 'lucide-react'
import { GitHubMark } from '@/components/broadcast/BrandMarks'
import { projects, tierMeta } from '@/data/projects'
import { tierCounts } from '@/data/site'
import type { Project } from '@/data/types'
import { SectionHead } from '@/components/layout/SectionHead'
import { useProjects } from '@/components/projects/ProjectsProvider'
import { revealDelay } from '@/lib/motion'
import { cx } from '@/lib/cx'

const flagship = projects.filter((project) => project.tier === 'flagship')
const featured = projects.filter((project) => project.tier === 'featured')
const exploratory = projects.filter((project) => project.tier === 'experimental')

function ProjectCard({ project }: { project: Project }) {
  const { open } = useProjects()
  const live = project.links.find((link) => link.kind === 'live')
  const repo = project.links.find((link) => link.kind === 'repo')
  const isFlagship = project.tier === 'flagship'
  const cover = project.media[0]
  const visibleStack = project.stack.slice(0, isFlagship ? 5 : 4)
  const extra = project.stack.length - visibleStack.length

  return (
    <article className={cx('projCard', isFlagship && 'projCard--flagship')}>
      {cover && (
        <div className="projCard__cover">
          <img
            src={cover.src}
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      <div className="projCard__body">
        <div className="projCard__head">
          <span className={cx('chip', isFlagship && 'chip--lime')}>{tierMeta[project.tier].label}</span>
          <span className={cx('chip', project.status.tone === 'live' && 'chip--lime')}>
            {project.status.label}
          </span>
        </div>

        <h3 className="projCard__name">{project.name}</h3>
        <p className="projCard__kicker">{project.kicker}</p>
        <p className="projCard__summary">{project.summary}</p>

        <ul className="projCard__stack" aria-label="Technical stack">
          {visibleStack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
          {extra > 0 && <li className="projCard__more">+{extra}</li>}
        </ul>

        <div className="projCard__actions">
          <button type="button" className="btn btn--sm" onClick={() => open(project.id)}>
            Project detail
          </button>
          {live && (
            <a
              className="btn btn--sm btn--primary"
              href={live.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              <PlayCircle size={13} aria-hidden="true" />
              Live demo
            </a>
          )}
          {repo && (
            <a
              className="btn btn--sm"
              href={repo.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.name} source on GitHub`}
            >
              <GitHubMark size={13} />
              Source
            </a>
          )}
          {!live && !repo && (
            <span className="projCard__noLink" title="No public repository or deployment exists">
              <ArrowUpRight size={12} aria-hidden="true" />
              No public link
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export function BoundaryShots() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="shell">
        <SectionHead
          id="projects-title"
          scene="Scene 04 — Boundary shots"
          title="Boundary shots"
          real={`Selected projects — ${projects.length} builds, ${tierCounts.flagship} flagship`}
          lead="Eight working builds, presented at the weight they have earned. The flagship is live and public; the rest are described from the actual code, and nothing without a deployment claims to have one."
        />

        <ul className="projLegend" data-reveal>
          {(['flagship', 'featured', 'experimental'] as const).map((tier) => (
            <li key={tier}>
              <span className={cx('chip', tier === 'flagship' && 'chip--lime')}>
                {tierMeta[tier].label}
              </span>
              <span className="projLegend__count">
                {tierCounts[tier]} {tierCounts[tier] === 1 ? 'project' : 'projects'}
              </span>
            </li>
          ))}
          <li className="projLegend__note">
            Visual categories only — they say nothing about business impact or performance.
          </li>
        </ul>

        <ul className="projGrid projGrid--flagship">
          {flagship.map((project) => (
            <li key={project.id} data-reveal>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>

        <ul className="projGrid projGrid--featured">
          {featured.map((project, index) => (
            <li key={project.id} data-reveal style={revealDelay(index * 50)}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>

        {exploratory.length > 0 && (
        <ul className="projGrid projGrid--explore">
          {exploratory.map((project, index) => (
            <li key={project.id} data-reveal style={revealDelay(index * 50)}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      )}
      </div>
    </section>
  )
}
