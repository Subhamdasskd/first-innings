import { create } from 'zustand'

export type ShotId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'

export interface Shot {
  id: ShotId
  name: string
  note: string
  pos: [number, number, number]
  target: [number, number, number]
  fov: number
  duration: number
}

export const SHOTS: Record<ShotId, Shot> = {
  A: {
    id: 'A',
    name: 'Aerial establish',
    note: '96 m · wide',
    pos: [0, 96, -128],
    target: [0, 0, 14],
    fov: 40,
    duration: 2.6,
  },
  B: {
    id: 'B',
    name: 'Descent',
    note: 'crane down · dolly in',
    pos: [0, 17, -42],
    target: [0, 2.2, 6],
    fov: 44,
    duration: 3.2,
  },
  C: {
    id: 'C',
    name: 'Player introduction',
    note: '3/4 at the crease',
    pos: [3.15, 1.42, 5.4],
    target: [0.5, 1.02, 9.2],
    fov: 32,
    duration: 2.4,
  },
  D: {
    id: 'D',
    name: 'Orbit',
    note: '26 m radius · 9 m high',
    pos: [26, 9, 0],
    target: [0, 1.2, 0],
    fov: 44,
    duration: 1.8,
  },
  E: {
    id: 'E',
    name: 'Boundary approach',
    note: 'stand · mid tier',
    pos: [-34, 4.2, -8],
    target: [-56, 7, -8],
    fov: 42,
    duration: 2.2,
  },
  F: {
    id: 'F',
    name: 'Behind the batsman',
    note: 'over the keeper’s shoulder',
    pos: [1.15, 1.82, 12.95],
    target: [0.15, 1.02, -5],
    fov: 42,
    duration: 1.8,
  },
  G: {
    id: 'G',
    name: 'Closing aerial',
    note: '62 m · tilt down',
    pos: [0, 62, -74],
    target: [0, 0, 6],
    fov: 52,
    duration: 3.0,
  },
}

export const SHOT_ORDER: ShotId[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

export type ZoneKey = 'profile' | 'career' | 'projects' | 'skills' | 'records' | 'contact'

interface GroundState {
  shot: ShotId
  /** Bumped on every request so re-selecting the same shot replays the move. */
  nonce: number
  orbiting: boolean
  playing: boolean
  /** Which portfolio zone panel is open, if any. */
  zone: ZoneKey | null
  /** Bottom tray: portfolio zones or camera scenes. */
  tray: 'zones' | 'scenes'
  selectShot: (id: ShotId) => void
  setOrbiting: (value: boolean) => void
  setPlaying: (value: boolean) => void
  setZone: (zone: ZoneKey | null) => void
  setTray: (tray: 'zones' | 'scenes') => void
}

export const useGroundStore = create<GroundState>((set) => ({
  shot: 'A',
  nonce: 0,
  orbiting: false,
  playing: false,
  zone: null,
  tray: 'zones',
  selectShot: (id) =>
    set((state) => ({
      shot: id,
      nonce: state.nonce + 1,
      orbiting: id === 'D',
      zone: null,
    })),
  setOrbiting: (value) => set({ orbiting: value }),
  setPlaying: (value) => set({ playing: value }),
  setZone: (zone) => set({ zone }),
  setTray: (tray) => set({ tray }),
}))
