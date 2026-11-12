import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { BEATS, useDelivery } from './useDelivery'
import { clearFollow, setFollow } from '../cameraState'

interface Props {
  ballRef: React.RefObject<THREE.Group | null>
  bowlerRef: React.RefObject<THREE.Group | null>
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const P_RELEASE = new THREE.Vector3(-0.05, 2.05, -11.9)
const P_BOUNCE = new THREE.Vector3(0.05, 0.075, -1.6)
const P_CONTACT = new THREE.Vector3(0.55, 0.92, 8.35)
const P_BOUNDARY = new THREE.Vector3(-44, 0.25, -18)

const AIM_BASE = new THREE.Vector3(0.15, 1.02, -5)
const BOWLER_MARK = new THREE.Vector3(-2.4, 0, -15.6)
const BOWLER_CREASE = new THREE.Vector3(-0.55, 0, -11.9)

/** Flight from release, through the bounce, up to the bat. */
function flightAt(u: number, out: THREE.Vector3) {
  if (u < 0.62) {
    const k = u / 0.62
    out.lerpVectors(P_RELEASE, P_BOUNCE, k)
    out.y += Math.sin(Math.PI * k) * 0.22
  } else {
    const k = (u - 0.62) / 0.38
    out.lerpVectors(P_BOUNCE, P_CONTACT, k)
    out.y += Math.sin(Math.PI * k) * 0.5
  }
}

/** The shot: from the bat to the cover boundary, with a low arc. */
function shotAt(u: number, out: THREE.Vector3) {
  out.lerpVectors(P_CONTACT, P_BOUNDARY, u)
  out.y += Math.sin(Math.PI * Math.min(1, u * 1.3)) * 2.4
}

/**
 * Runs the scripted delivery. One clock, one fixed outcome, no physics engine —
 * the aim is a believable beat, not a simulation.
 */
export function DeliveryDirector({ ballRef, bowlerRef }: Props) {
  const { playing, runId, phase, setPhase, setResult, finish } = useDelivery()
  const clock = useRef(0)
  const seen = useRef<string>('idle')
  const scratch = useRef(new THREE.Vector3())
  const aim = useRef(new THREE.Vector3())
  const finished = useRef(false)

  useEffect(() => {
    clock.current = 0
    seen.current = 'idle'
    finished.current = false
    clearFollow()
  }, [runId])

  useEffect(() => {
    if (!playing) {
      clearFollow()
      if (bowlerRef.current) {
        bowlerRef.current.position.copy(BOWLER_MARK)
      }
      if (ballRef.current) ballRef.current.visible = false
    }
  }, [playing, bowlerRef, ballRef])

  useFrame((_, delta) => {
    if (!playing) return

    // never advance more than 100 ms in one frame — a stalled tab must not skip
    // the whole delivery
    clock.current += Math.min(delta, 0.1)
    const t = clock.current

    // ---- bowler run-up ----
    if (bowlerRef.current) {
      const k = clamp01((t - BEATS.runupStart) / (BEATS.release - BEATS.runupStart))
      const e = k * k * (3 - 2 * k)
      bowlerRef.current.position.x = lerp(BOWLER_MARK.x, BOWLER_CREASE.x, e)
      bowlerRef.current.position.z = lerp(BOWLER_MARK.z, BOWLER_CREASE.z, e)
    }

    // ---- ball ----
    const ball = ballRef.current
    if (ball) {
      if (t >= BEATS.release && t < BEATS.contact) {
        const u = (t - BEATS.release) / (BEATS.contact - BEATS.release)
        ball.visible = true
        flightAt(u, scratch.current)
        ball.position.copy(scratch.current)
        ball.rotation.x += delta * 22
        ball.rotation.z += delta * 6
      } else if (t >= BEATS.contact && t < BEATS.boundary) {
        const u = (t - BEATS.contact) / (BEATS.boundary - BEATS.contact)
        ball.visible = true
        shotAt(u, scratch.current)
        ball.position.copy(scratch.current)
        ball.rotation.x += delta * 14
        // The camera glances at the ball — it does not swing onto it. The aim
        // moves only a third of the way, so the batsman stays in frame.
        aim.current
          .set(AIM_BASE.x, AIM_BASE.y, AIM_BASE.z)
          .lerp(ball.position, 0.3)
        setFollow(aim.current, Math.min(1, u * 2.2))
      } else {
        ball.visible = false
      }
    }

    if (t > BEATS.boundary) clearFollow()

    // ---- phases, set only when they change ----
    let next: string = 'idle'
    if (t >= BEATS.runupStart && t < BEATS.release) next = 'runup'
    else if (t >= BEATS.release && t < BEATS.contact) next = 'flight'
    else if (t >= BEATS.contact && t < BEATS.result) next = 'shot'
    else if (t >= BEATS.result) next = 'result'

    if (next !== seen.current) {
      seen.current = next
      if (next === 'result') {
        setResult('FOUR', 'Cover drive · along the ground')
      } else {
        setPhase(next as never)
      }
    }

    if (t >= BEATS.end && !finished.current) {
      finished.current = true
      clearFollow()
      finish()
    }

    if (phase === 'idle' && t > 0) {
      // no-op: keeps the linter honest about the dependency
    }
  })

  return null
}
