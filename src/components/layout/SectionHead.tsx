interface SectionHeadProps {
  /** Matches the section's aria-labelledby so the heading is the accessible name. */
  id: string
  scene: string
  title: string
  /** Plain-English meaning of the cricket label. Never omitted. */
  real: string
  lead?: string
}

export function SectionHead({ id, scene, title, real, lead }: SectionHeadProps) {
  return (
    <header className="sectionHead" data-reveal>
      <div className="sectionHead__top">
        <span className="eyebrow">{scene}</span>
        <span className="sectionHead__rule" aria-hidden="true" />
      </div>
      <h2 className="sectionHead__title" id={id}>
        {title}
      </h2>
      <p className="sectionHead__real">{real}</p>
      {lead && <p className="sectionHead__lead">{lead}</p>}
    </header>
  )
}
