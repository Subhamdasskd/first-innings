import { create } from 'zustand'

export type DeliveryPhase = 'idle' | 'runup' | 'delivery' | 'flight' | 'shot' | 'result'

export type DeliveryResult = 'FOUR' | 'SIX' | 'TWO' | 'DOT' | null

export interface DeliveryState {
  phase: DeliveryPhase
  playing: boolean
  result: DeliveryResult
  /** Increments on every start so a replay re-runs the timeline. */
  runId: number
  /** Extra info for the result card. */
  detail: string
  start: () => void
  stop: () => void
  /** Ends the run but leaves the result card up until the visitor dismisses it. */
  finish: () => void
  setPhase: (phase: DeliveryPhase) => void
  setResult: (result: DeliveryResult, detail: string) => void
}

/**
 * The delivery is a fixed, deterministic timeline — not a simulation.
 * Everyone who presses play sees the same ball, the same timing and the same
 * result, which is the only way a scripted sequence can feel intentional.
 */
export const useDelivery = create<DeliveryState>((set) => ({
  phase: 'idle',
  playing: false,
  result: null,
  runId: 0,
  detail: '',
  start: () =>
    set((state) => ({
      playing: true,
      phase: 'runup',
      result: null,
      detail: '',
      runId: state.runId + 1,
    })),
  stop: () => set({ playing: false, phase: 'idle', result: null }),
  finish: () => set({ playing: false }),
  setPhase: (phase) => set({ phase }),
  setResult: (result, detail) => set({ result, detail, phase: 'result' }),
}))

/* ------------------------------------------------------------------ timing */
/** Seconds from the start of the run to each beat. */
export const BEATS = {
  runupStart: 0.35,
  release: 2.35,
  contact: 3.45,
  boundary: 5.1,
  result: 5.25,
  end: 8.2,
} as const

export const DELIVERY_TOTAL = BEATS.end
