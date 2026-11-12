import { ArrowUpRight } from 'lucide-react'
import { attributionNote, skillGroups } from '@/data/skills'
import { SectionHead } from '@/components/layout/SectionHead'
import { useProjects } from '@/components/projects/ProjectsProvider'
import { revealDelay } from '@/lib/motion'

export function PlayerAttributes() {
  const { openRef } = useProjects()

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="shell">
        <SectionHead
          id="skills-title"
          scene="Scene 05 — Player attributes"
          title="Player attributes"
          real="Technical skills, grouped by discipline"
          lead="No percentages, no skill bars, no “expert” badges — none of those would be honest. Each item points at the build or role where it was actually used."
        />

        <div className="attrs">
          {skillGroups.map((group, index) => (
            <article className="attr panel" key={group.id} data-reveal style={revealDelay(index * 55)}>
              <header className="attr__head">
                <span className="attr__discipline">{group.discipline}</span>
                <h3 className="attr__real">{group.real}</h3>
              </header>
              <p className="attr__blurb">{group.blurb}</p>

              <ul className="attr__list">
                {group.items.map((item) => {
                  const refs = item.usedIn
                  if (refs && refs.length > 0) {
                    const label = `${item.name} — used in ${refs.length} ${refs.length === 1 ? 'build' : 'builds'}. Open one.`
                    return (
                      <li key={item.name}>
                        <button
                          type="button"
                          className="attr__item attr__item--linked"
                          onClick={() => openRef(refs[0])}
                          aria-label={label}
                          title={label}
                        >
                          <span>{item.name}</span>
                          <ArrowUpRight size={11} aria-hidden="true" />
                        </button>
                      </li>
                    )
                  }
                  return (
                    <li key={item.name}>
                      <span className="attr__item">{item.name}</span>
                    </li>
                  )
                })}
              </ul>
            </article>
          ))}
        </div>

        <div className="attrs__foot" data-reveal>
          <p className="attrs__note">{attributionNote}</p>
        </div>
      </div>
    </section>
  )
}
