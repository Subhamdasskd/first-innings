import { useCallback, useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { SHOTS, useGroundStore } from './useGroundStore'
import { cameraState } from './cameraState'

interface Rig {
  x: number
  y: number
  z: number
  tx: number
  ty: number
  tz: number
  fov: number
}

const ORBIT_RADIUS = 26
const ORBIT_HEIGHT = 9
const ORBIT_SPEED = 0.20

/**
 * A scripted camera: GSAP moves one plain rig object, and the frame loop copies
 * it onto the real camera. Because the rig is the single source of truth, any
 * new shot can interrupt a running move without a snap.
 */
export function CameraRig() {
  const { camera } = useThree()
  const rig = useRef<Rig>({
    x: SHOTS.A.pos[0],
    y: SHOTS.A.pos[1],
    z: SHOTS.A.pos[2],
    tx: 0,
    ty: 0,
    tz: 0,
    fov: SHOTS.A.fov,
  })
  const orbit = useRef({ active: false, angle: Math.PI / 2 })

  const shot = useGroundStore((s) => s.shot)
  const nonce = useGroundStore((s) => s.nonce)
  const setOrbiting = useGroundStore((s) => s.setOrbiting)

  const applyShot = useCallback(
    (id: keyof typeof SHOTS) => {
      const s = SHOTS[id]
      gsap.killTweensOf(rig.current)
      orbit.current.active = false
      gsap.to(rig.current, {
        x: s.pos[0],
        y: s.pos[1],
        z: s.pos[2],
        tx: s.target[0],
        ty: s.target[1],
        tz: s.target[2],
        fov: s.fov,
        duration: s.duration,
        ease: 'power2.inOut',
        overwrite: true,
        onComplete: () => {
          if (id === 'D') {
            orbit.current.angle = Math.atan2(rig.current.z, rig.current.x)
            orbit.current.active = true
            setOrbiting(true)
          }
        },
      })
    },
    [setOrbiting],
  )

  useEffect(() => {
    if (shot !== 'D') setOrbiting(false)
    applyShot(shot)
  }, [shot, nonce, applyShot, setOrbiting])

  useEffect(() => {
    return () => {
      gsap.killTweensOf(rig.current)
    }
  }, [])

  useFrame((_, delta) => {
    const r = rig.current

    if (orbit.current.active) {
      orbit.current.angle += delta * ORBIT_SPEED
      r.x = Math.cos(orbit.current.angle) * ORBIT_RADIUS
      r.z = Math.sin(orbit.current.angle) * ORBIT_RADIUS
      r.y = ORBIT_HEIGHT
      r.tx = 0
      r.ty = 0.9
      r.tz = 0
    }

    camera.position.set(r.x, r.y, r.z)

    // the delivery director can borrow the aim for a beat, to follow the ball
    let tx = r.tx
    let ty = r.ty
    let tz = r.tz
    const follow = cameraState.follow
    const w = cameraState.weight
    if (follow && w > 0.001) {
      const k = Math.min(1, w)
      tx += (follow.x - tx) * k
      ty += (follow.y - ty) * k
      tz += (follow.z - tz) * k
    }
    camera.lookAt(tx, ty, tz)

    if (Math.abs((camera as THREE_Perspective).fov - r.fov) > 0.02) {
      ;(camera as THREE_Perspective).fov = r.fov
      ;(camera as THREE_Perspective).updateProjectionMatrix()
    }
  })

  return null
}

/** Minimal structural type so we do not import three here just for a cast. */
interface THREE_Perspective {
  fov: number
  updateProjectionMatrix: () => void
}
