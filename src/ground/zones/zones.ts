import type { ShotId } from '../useGroundStore'

export type ZoneId = 'profile' | 'career' | 'projects' | 'skills' | 'records' | 'contact'

export interface Zone {
  id: ZoneId
  /** Cricket framing. */
  cricket: string
  /** Plain English name. */
  label: string
  /** Which composed camera shot this zone flies to. */
  shot: ShotId
  /** Where the full section lives on the portfolio route. */
  href: string
  hint: string
}

/**
 * Six zones. Each flies to an existing composed camera shot rather than an empty
 * patch of grass, so the flight always lands somewhere worth looking at.
 */
export const ZONES: Zone[] = [
  {
    id: 'profile',
    cricket: 'The pavilion',
    label: 'Profile',
    shot: 'C',
    href: '/#profile',
    hint: 'Who is at the crease',
  },
  {
    id: 'career',
    cricket: 'The boundary',
    label: 'Career',
    shot: 'E',
    href: '/#career',
    hint: 'Four roles, three organisations',
  },
  {
    id: 'projects',
    cricket: 'The outfield',
    label: 'Projects',
    shot: 'D',
    href: '/#projects',
    hint: 'Eight builds, one flagship',
  },
  {
    id: 'skills',
    cricket: 'The practice nets',
    label: 'Skills',
    shot: 'B',
    href: '/#skills',
    hint: 'Grouped by discipline',
  },
  {
    id: 'records',
    cricket: 'The scoreboard',
    label: 'Records',
    shot: 'G',
    href: '/#records',
    hint: 'Publication and credentials',
  },
  {
    id: 'contact',
    cricket: 'The press box',
    label: 'Contact',
    shot: 'A',
    href: '/#contact',
    hint: 'Post-match interview',
  },
]

export const zoneById = (id: ZoneId) => ZONES.find((z) => z.id === id)
