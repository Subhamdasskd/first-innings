import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useMediaQuery, usePersistedSetting } from '@/hooks/usePersistedSetting'
import { audio } from '@/lib/audio'

export type MotionPreference = 'system' | 'on' | 'off'

interface SettingsValue {
  systemPrefersReduced: boolean
  motionPreference: MotionPreference
  motionEnabled: boolean
  setMotionPreference: (preference: MotionPreference) => void
  toggleMotion: () => void

  /** Sound is off until the visitor turns it on. Never autoplayed. */
  soundEnabled: boolean
  toggleSound: () => void
}

const SettingsContext = createContext<SettingsValue | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const systemPrefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [motionPreference, setMotionPreference] = usePersistedSetting<MotionPreference>(
    'fi.motion',
    'system',
  )
  const [soundEnabled, setSoundEnabled] = usePersistedSetting<boolean>('fi.sound', false)
  const [soundArmed, setSoundArmed] = useState(false)

  const motionEnabled =
    motionPreference === 'on' ? true : motionPreference === 'off' ? false : !systemPrefersReduced

  // Single place that mirrors the resolved preference onto <html>, so CSS and
  // any script can read the same answer.
  useEffect(() => {
    document.documentElement.dataset.motion = motionEnabled ? 'on' : 'off'
  }, [motionEnabled])

  // A returning visitor with sound enabled still needs one gesture before the
  // browser will let audio run — so arm it on the first interaction.
  useEffect(() => {
    if (!soundEnabled || soundArmed) return

    const arm = () => {
      void audio.unlock().then((ok) => {
        if (ok) {
          audio.setMuted(false)
          setSoundArmed(true)
        }
      })
    }

    window.addEventListener('pointerdown', arm, { once: true })
    window.addEventListener('keydown', arm, { once: true })
    return () => {
      window.removeEventListener('pointerdown', arm)
      window.removeEventListener('keydown', arm)
    }
  }, [soundEnabled, soundArmed])

  const toggleMotion = useCallback(() => {
    setMotionPreference(motionEnabled ? 'off' : 'on')
  }, [motionEnabled, setMotionPreference])

  const toggleSound = useCallback(() => {
    if (soundEnabled) {
      audio.setMuted(true)
      setSoundEnabled(false)
      return
    }

    // Flip the control immediately — waiting on an audio context before
    // acknowledging a click is how toggles end up feeling broken.
    setSoundEnabled(true)
    void audio.unlock().then((ok) => {
      if (!ok) {
        setSoundEnabled(false)
        return
      }
      audio.setMuted(false)
      audio.play('click')
      setSoundArmed(true)
    })
  }, [soundEnabled, setSoundEnabled])

  const value = useMemo<SettingsValue>(
    () => ({
      systemPrefersReduced,
      motionPreference,
      motionEnabled,
      setMotionPreference,
      toggleMotion,
      soundEnabled,
      toggleSound,
    }),
    [systemPrefersReduced, motionPreference, motionEnabled, setMotionPreference, toggleMotion, soundEnabled, toggleSound],
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings(): SettingsValue {
  const value = useContext(SettingsContext)
  if (!value) throw new Error('useSettings must be used inside <SettingsProvider>')
  return value
}
