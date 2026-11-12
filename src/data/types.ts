/**
 * Content model for FIRST INNINGS.
 * Every field here is populated from a supplied source (resume, LinkedIn export,
 * published paper, or an inspected repository). Fields that could not be verified
 * are optional and carry a `pending` flag rather than an invented value.
 */

export type Tier = 'flagship' | 'featured' | 'experimental'

export type StatusTone = 'live' | 'built' | 'progress'

export interface Status {
  /** Short, literal state — never a cricket metaphor. */
  label: string
  tone: StatusTone
}

export interface LinkRef {
  label: string
  href: string
  /** `external` opens in a new tab with rel="noreferrer noopener". */
  kind: 'live' | 'repo' | 'doc' | 'paper' | 'profile'
}

export interface MediaItem {
  src: string
  alt: string
  width: number
  height: number
  caption: string
}

export interface Profile {
  name: string
  displayName: string
  brand: string
  brandMark: string
  tagline: string
  role: string
  roleOrg: string
  positioning: string
  summary: string[]
  location: string
  availability: string
  focus: string[]
  interests: string[]
  photo: {
    portrait: { webp: string; jpg: string; width: number; height: number }
    wide: { webp: string; jpg: string; width: number; height: number }
    alt: string
  }
}

export interface ExperienceEntry {
  id: string
  organisation: string
  /**
   * Stable organisation key. "Tata Technologies" and "Tata Technologies Limited"
   * are the same company written two ways, so counts must group on this, not on
   * the display name.
   */
  orgId: string
  /** Exact title from the employment record. */
  title: string
  /** Title as it appears on LinkedIn, when it differs. Shown as a footnote. */
  titleNote?: string
  start: string
  end: string
  /** Human-readable duration, pre-computed so it never drifts. */
  duration: string
  location: string
  mode?: 'On-site' | 'Remote' | 'Hybrid'
  current: boolean
  summary: string
  points: string[]
  stack: string[]
  /** Only real, verifiable links — no placeholders. */
  link?: LinkRef
}

export interface EducationEntry {
  id: string
  qualification: string
  field: string
  institution: string
  location: string
  start: string
  end: string
  result?: string
  note?: string
  kind: 'degree' | 'school'
}

export interface Project {
  id: string
  name: string
  kicker: string
  tier: Tier
  year: string
  status: Status
  summary: string
  problem: string
  solution: string
  /** Real, implemented capabilities — checked against the repository. */
  highlights: { title: string; body: string }[]
  contribution: string
  stack: string[]
  links: LinkRef[]
  media: MediaItem[]
  /** Honest scope: what works, and what is deliberately not built yet. */
  shipped?: string[]
  notYet?: string[]
  challenge?: string
  learned?: string
}

export interface SkillItem {
  name: string
  /** Where it was actually used. Omitted when there is no defensible attribution. */
  usedIn?: string[]
  note?: string
}

export interface SkillGroup {
  id: string
  /** Cricket role — a framing device only. */
  discipline: string
  /** What the group actually is. Always displayed next to the metaphor. */
  real: string
  blurb: string
  items: SkillItem[]
}

export type AchievementKind = 'publication' | 'certification' | 'academic'

export interface Achievement {
  id: string
  kind: AchievementKind
  title: string
  issuer?: string
  date?: string
  context: string
  authors?: string[]
  /** True when a required field could not be verified from the sources. */
  pending?: string
  link?: { label: string; href: string }
}

export interface SocialLink {
  id: string
  label: string
  handle: string
  href: string
  icon: 'mail' | 'linkedin' | 'github'
}

export interface NavSection {
  id: string
  index: string
  label: string
  cricket: string
}

export interface StatItem {
  id: string
  value: string
  label: string
  note: string
}
