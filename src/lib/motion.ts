import type { CSSProperties } from 'react'

/** Set a per-element reveal delay without inline-style type gymnastics. */
export function revealDelay(ms: number): CSSProperties {
  return { '--reveal-delay': `${ms}ms` } as unknown as CSSProperties
}
