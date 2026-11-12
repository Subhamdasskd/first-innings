import { Link } from 'react-router-dom'
import { RotateCcw, X } from 'lucide-react'
import { profile } from '@/data/profile'
import { stats } from '@/data/site'
import { useGroundStore } from '../useGroundStore'
import { useDelivery } from '../delivery/useDelivery'
import { cx } from '@/lib/cx'

const pick = (id: string) => stats.find((s) => s.id === id)

const TOTAL_ROLES = pick('roles')?.value ?? '—'
const TOTAL_PROJECTS = pick('projects')?.value ?? '—'
const TOTAL_PAPERS = pick('publications')?.value ?? '—'

/**
 * The broadcast layer. Deliberately restrained: one score strip, one lower
 * third, one result card. Everything factual comes from the portfolio data —
 * only the cricket score is simulated, and it says so.
 */
export function BroadcastLayer() {
  const shot = useGroundStore((s) => s.shot)
  const phase = useDelivery((s) => s.phase)
  const result = useDelivery((s) => s.result)
  const detail = useDelivery((s) => s.detail)
  const start = useDelivery((s) => s.start)
  const stop = useDelivery((s) => s.stop)

  const hasResult = Boolean(result)
  const runs = hasResult ? (result === 'FOUR' ? '4' : '0') : '0'
  const overs = hasResult ? '0.1' : '0.0'

  return (
    <div className="bc" aria-live="polite">
      {/* ---------- score strip ---------- */}
      <div className="bc__score">
        <div className="bc__scoreHead">
          <span className="bc__sim">Sim</span>
          <span className="bc__team">Career XI</span>
        </div>
        <div className="bc__scoreBody">
          <span className="bc__runs tnum">
            {runs}
            <span className="bc__wickets">/0</span>
          </span>
          <span className="bc__meta">
            <span className="bc__metaKey">Overs</span>
            <span className="bc__metaVal tnum">{overs}</span>
          </span>
          <span className="bc__meta">
            <span className="bc__metaKey">Balls</span>
            <span className="bc__metaVal tnum">{hasResult ? '1' : '0'}</span>
          </span>
        </div>
        <p className="bc__disclaimer">Simulated delivery · not a career statistic</p>
      </div>

      {/* ---------- player introduction ---------- */}
      <div className={cx('bc__lower', shot === 'C' && 'is-on')} aria-hidden={shot !== 'C'}>
        <span className="bc__lowerBar" />
        <p className="bc__lowerKicker">Player introduction</p>
        <p className="bc__lowerName">{profile.name}</p>
        <p className="bc__lowerRole">
          {profile.role} · {profile.roleOrg}
        </p>
        <ul className="bc__lowerStats">
          <li>
            <span className="bc__lowerKey">Roles</span>
            <span className="bc__lowerVal tnum">{TOTAL_ROLES}</span>
          </li>
          <li>
            <span className="bc__lowerKey">Projects</span>
            <span className="bc__lowerVal tnum">{TOTAL_PROJECTS}</span>
          </li>
          <li>
            <span className="bc__lowerKey">Paper</span>
            <span className="bc__lowerVal tnum">{TOTAL_PAPERS}</span>
          </li>
        </ul>
      </div>

      {/* ---------- delivery result ---------- */}
      <div className={cx('bc__result', hasResult && 'is-on')} role="status">
        <span className="bc__resultBar" />
        <p className="bc__resultKicker">Delivery complete</p>
        <p className="bc__resultValue">{result ?? '—'}</p>
        <p className="bc__resultDetail">{detail}</p>
        <div className="bc__resultActions">
          <button
            type="button"
            className="btn btn--sm btn--primary"
            onClick={() => {
              stop()
              window.setTimeout(start, 240)
            }}
          >
            <RotateCcw size={12} aria-hidden="true" />
            Bowl again
          </button>
          <button type="button" className="btn btn--sm" onClick={stop}>
            <X size={12} aria-hidden="true" />
            Dismiss
          </button>
        </div>
      </div>

      {/* ---------- running delivery hint ---------- */}
      {phase !== 'idle' && !hasResult && (
        <div className="bc__live">
          <span className="eyebrow__dot" />
          <span>{labelFor(phase)}</span>
        </div>
      )}

      <Link to="/recruiter" className="bc__recruiter">
        Recruiter view
      </Link>
    </div>
  )
}

function labelFor(phase: string) {
  switch (phase) {
    case 'runup':
      return 'Bowler running in'
    case 'flight':
      return 'Ball in flight'
    case 'shot':
      return 'Shot played'
    default:
      return 'Live'
  }
}
