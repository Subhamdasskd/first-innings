import type { Project } from '@/data/types'

/**
 * Deliberately a designed placeholder, not a fake interface.
 * The site must never imply a screenshot exists when one has not been supplied.
 */
export function ProjectSlate({ project }: { project: Project }) {
  const initials = project.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      className="projSlate"
      role="img"
      aria-label={`${project.name}. No screenshot supplied yet — the project is described in full below.`}
    >
      <span className="projSlate__arcs" aria-hidden="true" />
      <span className="projSlate__initials" aria-hidden="true">
        {initials}
      </span>
      <span className="projSlate__label">Screenshot pending</span>
      <span className="projSlate__name">{project.name}</span>
    </div>
  )
}
