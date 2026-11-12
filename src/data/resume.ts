import type { LinkRef } from './types'

/**
 * The resume served by this site is the exact PDF supplied by Subham —
 * copied byte-for-byte, not a rebuilt or reformatted document.
 */
export const resume = {
  href: '/resume/subham-das-resume.pdf',
  downloadName: 'Subham Das - Resume.pdf',
  updated: 'November 2026',
  note: 'The exact PDF supplied, not a rebuilt document.',
} satisfies { href: string; downloadName: string; updated: string; note: string }

export const resumeLink: LinkRef = {
  label: 'Download resume',
  href: resume.href,
  kind: 'doc',
}
