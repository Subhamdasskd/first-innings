import type { SocialLink, NavSection, StatItem } from './types'
import { experience } from './experience'
import { projects } from './projects'
import { achievements } from './achievements'
import { education } from './education'

/**
 * Published contact points only.
 * The phone number and home address on the supplied documents are deliberately
 * excluded — they are not published anywhere on this site.
 */
export const socialLinks: SocialLink[] = [
  {
    id: 'email',
    label: 'Email',
    handle: 'subhamdasskd7808@gmail.com',
    href: 'mailto:subhamdasskd7808@gmail.com',
    icon: 'mail',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'in/subham-das-skd',
    href: 'https://www.linkedin.com/in/subham-das-skd',
    icon: 'linkedin',
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: 'Subhamdasskd',
    href: 'https://github.com/Subhamdasskd',
    icon: 'github',
  },
]

export const primaryEmail = 'subhamdasskd7808@gmail.com'

export const navSections: NavSection[] = [
  { id: 'profile', index: '02', label: 'Profile', cricket: 'Player profile' },
  { id: 'career', index: '03', label: 'Career', cricket: 'Career innings' },
  { id: 'projects', index: '04', label: 'Projects', cricket: 'Boundary shots' },
  { id: 'skills', index: '05', label: 'Skills', cricket: 'Player attributes' },
  { id: 'records', index: '06', label: 'Records', cricket: 'Trophy room' },
  { id: 'contact', index: '09', label: 'Contact', cricket: 'Post-match interview' },
]

/**
 * Counts are derived from the content files, never typed by hand — edit a data
 * file and every number on the site follows.
 */
const certifications = achievements.filter((a) => a.kind === 'certification')
const publications = achievements.filter((a) => a.kind === 'publication')
const liveProjects = projects.filter((p) => p.links.some((l) => l.kind === 'live'))
const publicRepos = projects.filter((p) => p.links.some((l) => l.kind === 'repo'))
const organisations = new Set(experience.map((e) => e.orgId))

const two = (n: number) => String(n).padStart(2, '0')

export const stats: StatItem[] = [
  {
    id: 'roles',
    value: two(experience.length),
    label: 'Professional roles',
    note: `Across ${organisations.size} organisations`,
  },
  {
    id: 'projects',
    value: two(projects.length),
    label: 'Projects built',
    note: `${publicRepos.length} with a public repository`,
  },
  {
    id: 'live',
    value: two(liveProjects.length),
    label: 'Live deployment',
    note: liveProjects.length ? 'Working and publicly reachable' : 'None public yet',
  },
  {
    id: 'publications',
    value: two(publications.length),
    label: 'Publication',
    note: 'AI interview assessment',
  },
  {
    id: 'certifications',
    value: two(certifications.length),
    label: 'Certifications',
    note: 'Two issuers',
  },
  {
    id: 'degree',
    value: education[0]?.result?.replace('CGPA ', '') ?? '—',
    label: 'CGPA',
    note: 'B.Tech, Computer Science & Engineering',
  },
]

/** Flagship count is used for the tier legend on the project ground. */
export const tierCounts = {
  flagship: projects.filter((p) => p.tier === 'flagship').length,
  featured: projects.filter((p) => p.tier === 'featured').length,
  experimental: projects.filter((p) => p.tier === 'experimental').length,
}
