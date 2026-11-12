import { stats } from '@/data/site'
import { revealDelay } from '@/lib/motion'

/**
 * The facts strip. Every number is derived in `data/site.ts` from the content
 * files, so it cannot drift from what the site actually contains.
 */
export function StatsStrip() {
  return (
    <section className="stats" aria-label="Career at a glance">
      <div className="shell">
        <ul className="stats__grid">
          {stats.map((stat, index) => (
            <li className="stats__cell" key={stat.id} data-reveal style={revealDelay(index * 60)}>
              <span className="stats__value tnum">{stat.value}</span>
              <span className="stats__label">{stat.label}</span>
              <span className="stats__note">{stat.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
