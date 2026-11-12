import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { ArrowRight, CornerDownLeft } from 'lucide-react'
import { BallMark } from '@/components/broadcast/BallMark'
import { useSettings } from '@/app/providers'
import { audio } from '@/lib/audio'
import { profile } from '@/data/profile'
import { stats } from '@/data/site'
import type { StatItem } from '@/data/types'
import { cx } from '@/lib/cx'

/** three.js is lazy: the 2D stadium paints first, this streams in behind it. */
const GroundIntroCanvas = lazy(() =>
  import('@/ground/GroundIntroCanvas').then((m) => ({ default: m.GroundIntroCanvas })),
)

interface StadiumIntroProps {
  onEnter: () => void
  onSkip: () => void
}

/**
 * Four towers, two depths. Near pair strikes left then right; the far pair
 * comes up together a beat later. `--d` carries each tower's delay into CSS.
 */
const TOWERS = [
  { name: 'left-near', delay: 240 },
  { name: 'right-near', delay: 520 },
  { name: 'left-far', delay: 860 },
  { name: 'right-far', delay: 960 },
] as const

const LAMPS = Array.from({ length: 18 }, (_, index) => index)

/** Mast and lamp bank — painted behind the stands so they rise from the roof. */
function TowerMast({ name, delay }: { name: string; delay: number }) {
  return (
    <span
      className={cx('fixture', `fixture--${name}`, 'tower')}
      style={{ '--d': `${delay}ms` } as CSSProperties}
    >
      <span className="tower__mast" />
      <span className="tower__bank">
        {LAMPS.map((lamp) => (
          <span className="tower__lamp" key={lamp} />
        ))}
      </span>
    </span>
  )
}

/** Bloom, cone and flare — painted in front, over the ground. */
function TowerLight({ name, delay }: { name: string; delay: number }) {
  return (
    <span
      className={cx('fixture', `fixture--${name}`, 'towerLight')}
      style={{ '--d': `${delay}ms` } as CSSProperties}
    >
      <span className="tower__cone" />
      <span className="tower__bloom" />
      <span className="tower__flare" />
    </span>
  )
}

const BOARD_IDS = ['roles', 'projects', 'publications', 'certifications'] as const

const boardRows = BOARD_IDS.map((id) => stats.find((stat) => stat.id === id)).filter(
  (stat): stat is StatItem => Boolean(stat),
)

export function StadiumIntro({ onEnter, onSkip }: StadiumIntroProps) {
  const { motionEnabled, soundEnabled } = useSettings()
  const [lit, setLit] = useState(!motionEnabled)
  const [entering, setEntering] = useState(false)
  const [is3d, setIs3d] = useState(false)
  const enterRef = useRef<HTMLButtonElement>(null)
  const cued = useRef(false)

  // Staged ignition — skipped entirely when motion is off.
  useEffect(() => {
    if (!motionEnabled) {
      setLit(true)
      return
    }
    const timer = window.setTimeout(() => setLit(true), 420)
    return () => window.clearTimeout(timer)
  }, [motionEnabled])

  // One lamp-bank thump, only if sound was already enabled by the visitor.
  useEffect(() => {
    if (!lit || cued.current) return
    cued.current = true
    if (soundEnabled) audio.play('floodlight')
  }, [lit, soundEnabled])

  // Lock the page, start at the top, focus the primary action, honour Escape.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)

    const focusTimer = window.setTimeout(() => enterRef.current?.focus({ preventScroll: true }), 80)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onSkip()
      }
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onSkip])

  const handleEnter = useCallback(() => {
    if (entering) return
    if (soundEnabled) audio.play('crowd')
    if (!motionEnabled) {
      onEnter()
      return
    }
    setEntering(true)
    window.setTimeout(onEnter, 820)
  }, [entering, motionEnabled, onEnter, soundEnabled])

  const handleSkip = useCallback(() => {
    if (entering) return
    onSkip()
  }, [entering, onSkip])

  return (
    <div
      className={cx('stadium', lit && 'is-lit', entering && 'is-entering', is3d && 'is-3d')}
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
      aria-describedby="intro-desc"
    >
      {/* ---------- the ground ---------- */}
      {motionEnabled && (
        <Suspense fallback={null}>
          <GroundIntroCanvas onReady={() => setIs3d(true)} />
        </Suspense>
      )}

      <div className="stadium__scene" aria-hidden="true">
        <div className="stadium__sky" />
        <div className="stadium__horizon" />

        {/* far structure sits behind the bowl */}
        <div className="stadium__fixtures stadium__fixtures--back">
          {TOWERS.map((tower) => (
            <TowerMast key={tower.name} name={tower.name} delay={tower.delay} />
          ))}
        </div>

        <svg
          className="stadium__stands"
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          focusable="false"
        >
          <defs>
            <linearGradient id="farTierFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0c1714" />
              <stop offset="1" stopColor="#070f0c" />
            </linearGradient>
            <linearGradient id="nearTierFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#101d18" />
              <stop offset="1" stopColor="#070e0c" />
            </linearGradient>
            <pattern id="crowdTexture" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2.6" r="0.9" fill="rgba(232,240,230,0.2)" />
              <circle cx="5.9" cy="6.1" r="0.7" fill="rgba(232,240,230,0.11)" />
              <circle cx="4" cy="1" r="0.5" fill="rgba(198,255,61,0.16)" />
            </pattern>
            <pattern id="adBoards" width="72" height="26" patternUnits="userSpaceOnUse">
              <rect x="3" y="4" width="64" height="16" fill="rgba(243,240,232,0.05)" />
              <rect x="8" y="9" width="20" height="3" fill="rgba(198,255,61,0.22)" />
              <rect x="34" y="9" width="14" height="3" fill="rgba(226,178,63,0.18)" />
            </pattern>
          </defs>

          {/* bowl mass behind the tiers */}
          <path d="M0,188 Q720,120 1440,188 L1440,300 L0,300 Z" fill="#040a08" />

          {/* advertising boards at the boundary */}
          <path
            className="stadium__ads"
            d="M0,196 Q720,128 1440,196 L1440,222 Q720,154 0,222 Z"
            fill="url(#adBoards)"
          />

          {/* lower tier, with the crowd */}
          <path d="M0,118 Q720,50 1440,118 L1440,190 Q720,122 0,190 Z" fill="url(#nearTierFill)" />
          <path d="M0,124 Q720,56 1440,124 L1440,176 Q720,108 0,176 Z" fill="url(#crowdTexture)" />

          {/* upper tier */}
          <path d="M0,66 Q720,0 1440,66 L1440,120 Q720,54 0,120 Z" fill="url(#farTierFill)" />

          {/* roof */}
          <path d="M0,40 Q720,-26 1440,40 L1440,66 Q720,0 0,66 Z" fill="#050b09" />

          {/* rim light on each edge — this is what makes the bowl read */}
          <path d="M0,40 Q720,-26 1440,40" fill="none" stroke="rgba(243,240,232,0.13)" strokeWidth="1.2" />
          <path d="M0,66 Q720,0 1440,66" fill="none" stroke="rgba(198,255,61,0.18)" strokeWidth="1" />
          <path d="M0,120 Q720,54 1440,120" fill="none" stroke="rgba(198,255,61,0.1)" strokeWidth="1" />
          <path d="M0,190 Q720,122 1440,190" fill="none" stroke="rgba(243,240,232,0.08)" strokeWidth="1" />
        </svg>

        <div className="stadium__field" />
        <div className="stadium__stripes" />
        <div className="stadium__pitch">
          <span className="stadium__crease stadium__crease--far" />
          <span className="stadium__crease stadium__crease--near" />
          <span className="stadium__stumps" />
        </div>
        <div className="stadium__pools" />

        {/* light in front of the ground */}
        <div className="stadium__fixtures stadium__fixtures--front">
          {TOWERS.map((tower) => (
            <TowerLight key={tower.name} name={tower.name} delay={tower.delay} />
          ))}
        </div>

        <div className="stadium__haze stadium__haze--a" />
        <div className="stadium__haze stadium__haze--b" />

        {/* keeps the copy legible where the scene is busy — small screens only */}
        <div className="stadium__scrim" />

        <span className="stadium__ball" />
        <span className="stadium__ball stadium__ball--trail" />

        <div className="stadium__grade" />
        <div className="stadium__grain" />
      </div>

      {/* ---------- chrome ---------- */}
      <header className="stadium__top">
        <span className="stadium__brand">
          <span className="stadium__brandMark">
            <BallMark size={20} />
          </span>
          {profile.brand}
        </span>

        <span className="stadium__topRight">
          <span className="stadium__live">
            <span className="eyebrow__dot" />
            Night match
          </span>
          <button type="button" className="btn btn--sm stadium__skipTop" onClick={handleSkip}>
            Skip intro
            <ArrowRight size={13} aria-hidden="true" />
          </button>
        </span>
      </header>

      <div className="stadium__main">
        <div className="stadium__copy">
          <p className="stadium__eyebrow">Scene 00 — The entrance</p>

          <h1 className="stadium__title" id="intro-title">
            <span className="stadium__titleLine">First</span>
            <span className="stadium__titleLine stadium__titleLine--outline">Innings</span>
          </h1>

          <p className="stadium__player" id="intro-desc">
            {profile.name} — {profile.role}
          </p>

          <p className="stadium__tagline">{profile.tagline}</p>

          <div className="stadium__actions">
            <button
              ref={enterRef}
              type="button"
              className="btn btn--primary stadium__enter"
              onClick={handleEnter}
            >
              Enter the stadium
              <ArrowRight size={15} className="btn__icon" aria-hidden="true" />
            </button>
            <button type="button" className="btn stadium__skip" onClick={handleSkip}>
              Skip intro
            </button>
          </div>

          <p className="stadium__hint">
            <CornerDownLeft size={12} aria-hidden="true" />
            Press Enter to walk out
          </p>
        </div>

        <aside className="stadium__board" aria-hidden="true">
          <div className="stadium__boardHead">
            <span>Career totals</span>
            <span className="stadium__boardDot" />
          </div>
          <dl className="stadium__boardRows">
            {boardRows.map((row) => (
              <div className="stadium__boardRow" key={row.id}>
                <dt>{row.label}</dt>
                <dd className="tnum">{row.value}</dd>
              </div>
            ))}
          </dl>
          <div className="stadium__boardFoot">Innings 01 · in progress</div>
        </aside>
      </div>

      <div className="stadium__matchCard">
        <div className="stadium__matchCell">
          <span className="stadium__matchKey">Match</span>
          <span className="stadium__matchVal">Career XI</span>
        </div>
        <div className="stadium__matchCell">
          <span className="stadium__matchKey">Player</span>
          <span className="stadium__matchVal">{profile.name}</span>
        </div>
        <div className="stadium__matchCell">
          <span className="stadium__matchKey">Role</span>
          <span className="stadium__matchVal">{profile.role}</span>
        </div>
        <div className="stadium__matchCell">
          <span className="stadium__matchKey">Venue</span>
          <span className="stadium__matchVal">{profile.location}</span>
        </div>
        <div className="stadium__matchCell">
          <span className="stadium__matchKey">Status</span>
          <span className="stadium__matchVal stadium__matchVal--live">
            <span className="eyebrow__dot" />
            In progress
          </span>
        </div>
      </div>

      {entering && <span className="stadium__wipe" aria-hidden="true" />}
    </div>
  )
}
