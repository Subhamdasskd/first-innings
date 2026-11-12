import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, ChevronUp, RotateCcw, Sparkles } from 'lucide-react'
import { navSections, socialLinks } from '@/data/site'
import { profile } from '@/data/profile'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollProgressVar } from '@/hooks/useScrollProgressVar'
import { useMediaQuery } from '@/hooks/usePersistedSetting'
import { Sheet } from '@/components/layout/Sheet'
import { cx } from '@/lib/cx'

const SECTION_IDS = navSections.map((section) => section.id)
const NO_SECTIONS: string[] = []
const TOTAL = navSections.length

interface MatchCentreProps {
  onReplayIntro: () => void
}

/**
 * The broadcast match centre: a persistent score-bug strip pinned to the foot of
 * the viewport. It replaces the conventional navbar with the furniture of a
 * televised match — team block, section index, and a progress rail.
 */
export function MatchCentre({ onReplayIntro }: MatchCentreProps) {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const active = useActiveSection(onHome ? SECTION_IDS : NO_SECTIONS)
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)
  const compact = useMediaQuery('(max-width: 900px)')

  useScrollProgressVar(barRef)

  // The hero carries its own broadcast strip, so the bar stays away until the
  // visitor starts reading. Two stacked score bugs would just be noise.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setVisible(window.scrollY > 80)
    }
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Reserve room so the fixed bar never covers the end of the page.
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--matchbar-space', compact ? '3.5rem' : '4.25rem')
    return () => {
      root.style.removeProperty('--matchbar-space')
    }
  }, [compact])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const activeIndex = navSections.findIndex((section) => section.id === active)
  const current = activeIndex >= 0 ? navSections[activeIndex] : null
  const position = activeIndex >= 0 ? activeIndex + 1 : 0

  const compactLabel = useMemo(() => {
    if (!current) return 'Match centre'
    return `Match centre — section ${position} of ${TOTAL}, ${current.label}`
  }, [current, position])

  const closeSheet = useCallback(() => setOpen(false), [])

  const replay = useCallback(() => {
    setOpen(false)
    onReplayIntro()
  }, [onReplayIntro])

  return (
    <>
      <div className={cx('matchCentre', visible && 'is-visible')} ref={barRef}>
        <div className="matchCentre__progress" aria-hidden="true">
          <span />
        </div>

        {compact ? (
          <button
            type="button"
            className="matchCentre__compact"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-label={compactLabel}
          >
            <span className="matchCentre__compactLeft">
              <span className="eyebrow__dot" aria-hidden="true" />
              <span className="matchCentre__compactIndex tnum" aria-hidden="true">
                {current ? current.index : '00'}
              </span>
              <span className="matchCentre__compactLabel">{current ? current.label : 'Match centre'}</span>
            </span>
            <span className="matchCentre__compactRight">
              <span className="matchCentre__dots" aria-hidden="true">
                {navSections.map((section, index) => (
                  <span
                    key={section.id}
                    className={cx('matchCentre__dot', index <= activeIndex && 'is-on')}
                  />
                ))}
              </span>
              <ChevronUp size={14} aria-hidden="true" />
            </span>
          </button>
        ) : (
          <div className="matchCentre__inner">
            <div className="matchCentre__status">
              <span className="matchCentre__live">
                <span className="eyebrow__dot" aria-hidden="true" />
                Career XI
              </span>
              <span className="matchCentre__name">{profile.name}</span>
            </div>

            <nav className="matchCentre__nav" aria-label="Sections">
              <ul>
                {navSections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className={cx('matchCentre__link', active === section.id && 'is-active')}
                      aria-current={active === section.id ? 'location' : undefined}
                    >
                      <span className="matchCentre__index tnum" aria-hidden="true">
                        {section.index}
                      </span>
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="matchCentre__meta">
              <span className="matchCentre__count tnum">
                {String(position).padStart(2, '0')}
                <span className="matchCentre__countSep">/</span>
                {String(TOTAL).padStart(2, '0')}
              </span>
              <button
                type="button"
                className="matchCentre__replay"
                onClick={onReplayIntro}
                title="Replay the stadium introduction"
                aria-label="Replay the stadium introduction"
              >
                <RotateCcw size={12} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>

      <Sheet open={open} onClose={closeSheet} label="Match centre">
        <div className="sheet__head">
          <span className="eyebrow">
            <span className="eyebrow__dot" />
            Match centre
          </span>
          <button type="button" className="btn btn--sm" onClick={closeSheet}>
            Close
          </button>
        </div>

        <nav className="sheet__nav" aria-label="Sections">
          <ul>
            {navSections.map((section) => (
              <li key={section.id}>
                <a href={`/#${section.id}`} onClick={closeSheet}>
                  <span className="sheet__index" aria-hidden="true">
                    {section.index}
                  </span>
                  <span className="sheet__label">{section.cricket}</span>
                  <span className="sheet__real">{section.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sheet__foot">
          <Link to="/recruiter" className="btn btn--primary btn--block" onClick={closeSheet}>
            Quick profile for recruiters
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>

          <Link to="/ground" className="btn btn--block" onClick={closeSheet}>
            <Sparkles size={13} aria-hidden="true" />
            Enter the 3D ground
          </Link>

          <button type="button" className="btn btn--block sheet__replay" onClick={replay}>
            <RotateCcw size={13} aria-hidden="true" />
            Replay the introduction
          </button>

          <ul className="sheet__social">
            {socialLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  target={link.id === 'email' ? undefined : '_blank'}
                  rel="noreferrer noopener"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Sheet>
    </>
  )
}
