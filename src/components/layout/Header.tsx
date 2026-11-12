import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { BallMark } from '@/components/broadcast/BallMark'
import { MotionToggle } from '@/components/a11y/MotionToggle'
import { SoundToggle } from '@/components/a11y/SoundToggle'
import { profile } from '@/data/profile'
import { cx } from '@/lib/cx'

/**
 * Top chrome: identity and preferences only. Navigation lives in the match
 * centre at the foot of the viewport, which is where a broadcast puts it.
 */
export function Header() {
  const [stuck, setStuck] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      setStuck(window.scrollY > 24)
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

  return (
    <header ref={headerRef} className={cx('siteHeader', stuck && 'is-stuck')}>
      <div className="shell siteHeader__inner">
        <Link to="/" className="brand" aria-label={`${profile.brand} — home`}>
          <span className="brand__mark" aria-hidden="true">
            <BallMark size={24} />
          </span>
          <span className="brand__text">
            <span className="brand__name">{profile.brand}</span>
            <span className="brand__sub">
              {profile.name} · {profile.role}
            </span>
          </span>
        </Link>

        <div className="siteHeader__actions">
          <SoundToggle />
          <MotionToggle />
          <Link to="/ground" className="btn btn--sm btn--ground siteHeader__ground">
            <span className="siteHeader__groundDot" aria-hidden="true" />
            <span className="siteHeader__groundFull">Enter the 3D ground</span>
            <span className="siteHeader__groundShort" aria-hidden="true">
              3D ground
            </span>
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
          <Link to="/recruiter" className="btn btn--sm siteHeader__qp">
            Quick profile
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  )
}
