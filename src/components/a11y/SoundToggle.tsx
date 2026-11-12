import { Volume2, VolumeX } from 'lucide-react'
import { useSettings } from '@/app/providers'

/**
 * Persistent mute control. Sound starts off: the visitor has to ask for it,
 * which is also what the browser's autoplay policy requires.
 */
export function SoundToggle() {
  const { soundEnabled, toggleSound } = useSettings()

  const label = soundEnabled ? 'Mute match sound' : 'Enable match sound'

  return (
    <button
      type="button"
      className="iconBtn soundToggle"
      onClick={toggleSound}
      aria-pressed={soundEnabled}
      aria-label={label}
      title={soundEnabled ? `${label} — on` : `${label} — sound starts off`}
    >
      {soundEnabled ? (
        <Volume2 size={15} strokeWidth={1.6} aria-hidden="true" />
      ) : (
        <VolumeX size={15} strokeWidth={1.6} aria-hidden="true" />
      )}
    </button>
  )
}
