import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * One IntersectionObserver drives every [data-reveal] element on the page.
 * Elements are unobserved once revealed, so scrolling back up never re-animates.
 * With motion off or reduced, the CSS keeps everything visible and this is inert.
 */
export function RevealController() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          el.dataset.revealed = 'true'
          observer.unobserve(el)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  return null
}
