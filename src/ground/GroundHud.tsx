import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Play, Square, Zap } from 'lucide-react'
import { SHOTS, SHOT_ORDER, useGroundStore } from './useGroundStore'
import type { ShotId } from './useGroundStore'
import { useDelivery } from './delivery/useDelivery'
import { ZONES } from './zones/zones'
import { BallMark } from '@/components/broadcast/BallMark'
import { cx } from '@/lib/cx'

const SEQUENCE: ShotId[] = ['A', 'B', 'C', 'D', 'F', 'G']

/** Broadcast overlay for the ground: zones, camera scenes, delivery controls. */
export function GroundHud() {
  const shot = useGroundStore((s) => s.shot)
  const selectShot = useGroundStore((s) => s.selectShot)
  const playing = useGroundStore((s) => s.playing)
  const setPlaying = useGroundStore((s) => s.setPlaying)
  const zone = useGroundStore((s) => s.zone)
  const setZone = useGroundStore((s) => s.setZone)
  const tray = useGroundStore((s) => s.tray)
  const setTray = useGroundStore((s) => s.setTray)

  const deliveryPhase = useDelivery((s) => s.phase)
  const startDelivery = useDelivery((s) => s.start)
  const stopDelivery = useDelivery((s) => s.stop)

  const [fps, setFps] = useState(0)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    let raf = 0
    let frames = 0
    let last = performance.now()
    const loop = () => {
      frames += 1
      const now = performance.now()
      if (now - last >= 500) {
        setFps(Math.round((frames * 1000) / (now - last)))
        frames = 0
        last = now
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (!playing) {
      window.clearTimeout(timer.current)
      return
    }
    let index = 0
    const step = () => {
      if (index >= SEQUENCE.length) {
        setPlaying(false)
        return
      }
      const id = SEQUENCE[index]
      selectShot(id)
      const hold = SHOTS[id].duration * 1000 + (id === 'D' ? 4200 : 900)
      index += 1
      timer.current = window.setTimeout(step, hold)
    }
    step()
    return () => window.clearTimeout(timer.current)
  }, [playing, selectShot, setPlaying])

  const current = SHOTS[shot]

  return (
    <div className="groundHud">
      <header className="groundHud__top">
        <Link to="/" className="groundHud__brand">
          <span className="groundHud__mark">
            <BallMark size={18} />
          </span>
          <span className="groundHud__brandText">First Innings</span>
        </Link>
        <span className="groundHud__phase">The ground</span>
        <Link to="/" className="groundHud__back">
          <ArrowLeft size={13} aria-hidden="true" />
          Portfolio
        </Link>
      </header>

      <div className="groundHud__readout">
        <span className="groundHud__live">
          <span className="eyebrow__dot" />
          Camera
        </span>
        <span className="groundHud__shotId">{current.id}</span>
        <span className="groundHud__shotName">{current.name}</span>
      </div>

      <div className="groundHud__bottom">
        <div className="groundHud__tray">
          <div className="groundHud__tabs" role="tablist" aria-label="Tray">
            <button
              type="button"
              role="tab"
              aria-selected={tray === 'zones'}
              className={cx('groundHud__tab', tray === 'zones' && 'is-active')}
              onClick={() => setTray('zones')}
            >
              Zones
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tray === 'scenes'}
              className={cx('groundHud__tab', tray === 'scenes' && 'is-active')}
              onClick={() => setTray('scenes')}
            >
              Camera
            </button>
          </div>

          {tray === 'zones' ? (
            <nav className="groundHud__shots" aria-label="Portfolio zones">
              {ZONES.map((z) => (
                <button
                  key={z.id}
                  type="button"
                  className={cx('groundHud__shot', 'groundHud__shot--zone', zone === z.id && 'is-active')}
                  aria-pressed={zone === z.id}
                  onClick={() => {
                    setPlaying(false)
                    selectShot(z.shot)
                    window.setTimeout(() => setZone(z.id), 420)
                  }}
                >
                  <span className="groundHud__shotLabel">{z.label}</span>
                  <span className="groundHud__shotHint">{z.hint}</span>
                </button>
              ))}
            </nav>
          ) : (
            <nav className="groundHud__shots" aria-label="Camera shots">
              {SHOT_ORDER.map((id) => (
                <button
                  key={id}
                  type="button"
                  className={cx('groundHud__shot', shot === id && 'is-active')}
                  onClick={() => {
                    setPlaying(false)
                    selectShot(id)
                  }}
                  aria-pressed={shot === id}
                >
                  <span className="groundHud__shotKey">{id}</span>
                  <span className="groundHud__shotLabel">{SHOTS[id].name}</span>
                </button>
              ))}
            </nav>
          )}
        </div>

        <div className="groundHud__meta">
          <span className="groundHud__fps">
            <span className={cx('groundHud__fpsDot', fps < 40 && 'is-low')} />
            {fps} fps
          </span>
          <button
            type="button"
            className="btn btn--sm"
            onClick={() => {
              setPlaying(false)
              if (deliveryPhase !== 'idle') stopDelivery()
              setZone(null)
              selectShot('F')
              window.setTimeout(startDelivery, 900)
            }}
            disabled={deliveryPhase !== 'idle'}
          >
            <Zap size={12} aria-hidden="true" />
            Bowl a delivery
          </button>
          <button
            type="button"
            className="btn btn--sm btn--primary"
            onClick={() => {
              setZone(null)
              setPlaying(!playing)
            }}
          >
            {playing ? <Square size={12} aria-hidden="true" /> : <Play size={12} aria-hidden="true" />}
            {playing ? 'Stop' : 'Play sequence'}
          </button>
        </div>
      </div>
    </div>
  )
}
