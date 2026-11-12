/** The ground's dimensions, in metres. Everything else derives from these. */
export const BOUNDARY_R = 68
export const WALL_R = 69.1
export const WALL_Y = 0.95

export const LOWER_INNER_R = 69.5
export const LOWER_INNER_Y = 1.75
export const LOWER_TOP_R = 86.6
export const LOWER_TOP_Y = 14.8

export const CONCOURSE_R = 87.3
export const CONCOURSE_Y = 15.05

export const UPPER_INNER_R = 88.3
export const UPPER_TOP_R = 92.8
export const UPPER_TOP_Y = 21.2

export const ROOF_R = 94.6
export const ROOF_Y = 23.9

/** Height of the seating ramp at a given radius (for placing the crowd). */
export function lowerTierY(r: number): number {
  const t = (r - LOWER_INNER_R) / (LOWER_TOP_R - LOWER_INNER_R)
  return LOWER_INNER_Y + t * (LOWER_TOP_Y - LOWER_INNER_Y)
}

export function upperTierY(r: number): number {
  const t = (r - UPPER_INNER_R) / (UPPER_TOP_R - UPPER_INNER_R)
  return CONCOURSE_Y + t * (UPPER_TOP_Y - CONCOURSE_Y)
}

/** Pitch: 22 yards long, 3.05 m wide, running along z. */
export const PITCH_LENGTH = 20.12
export const PITCH_WIDTH = 3.05
export const CREASE_Z = PITCH_LENGTH / 2
