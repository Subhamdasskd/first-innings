import { Sparkles } from 'lucide-react'
import { useSettings } from '@/app/providers'

/**
 * Motion is a user choice, not an assumption. Flips the preference between
 * on and off, persists it, and mirrors the result onto <html data-motion>.
 */
export function MotionToggle() {
  const { motionEnabled, toggleMotion, motionPreference } = useSettings()

  const label = motionEnabled ? 'Turn animations off' : 'Turn animations on'
  const state =
    motionPreference === 'system' ? 'following system setting' : motionEnabled ? 'on' : 'reduced'

  return (
    <button
      type="button"
      className="iconBtn"
      onClick={toggleMotion}
      aria-pressed={motionEnabled}
      aria-label={label}
      title={`${label} — currently ${state}`}
    >
      <Sparkles size={15} strokeWidth={1.6} aria-hidden="true" />
    </button>
  )
}
