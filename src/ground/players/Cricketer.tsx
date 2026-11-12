import { useEffect, useMemo, useRef } from 'react'
import type { Ref } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Kit } from './kit'
import { Bat, Glove, Helmet, KeepingGlove, Pad } from './gear'

export type PlayerRole = 'batsman' | 'bowler' | 'keeper'
export type PlayerMode = 'stance' | 'idle' | 'walk' | 'runup' | 'bowl' | 'crouch' | 'swing'

interface CricketerProps {
  role: PlayerRole
  mode: PlayerMode
  kit: Kit
  position: [number, number, number]
  rotation?: number
  /** Phase offset so two figures never breathe in sync. */
  seed?: number
  /** Optional handle so a director can move this figure. */
  groupRef?: Ref<THREE.Group>
}

/* ---------------------------------------------------------------- proportions
   A 1.80 m figure:
     feet 0 · knees 0.48 · hips 0.95 · chest 1.28 · shoulders 1.44 · crown 1.80
   ------------------------------------------------------------------------- */
const HIP_Y = 0.95
const SHOULDER_DROP = 0.5
const SHOULDER_X = 0.185
const HIP_X = 0.095
const UPPER_ARM = 0.29
const FOREARM = 0.27

export function Cricketer({ role, mode, kit, position, rotation = 0, seed = 0, groupRef }: CricketerProps) {
  const root = useRef<THREE.Group>(null)
  const spine = useRef<THREE.Group>(null)
  const neck = useRef<THREE.Group>(null)
  const shoulderL = useRef<THREE.Group>(null)
  const shoulderR = useRef<THREE.Group>(null)
  const elbowL = useRef<THREE.Group>(null)
  const elbowR = useRef<THREE.Group>(null)
  const hipL = useRef<THREE.Group>(null)
  const hipR = useRef<THREE.Group>(null)
  const kneeL = useRef<THREE.Group>(null)
  const kneeR = useRef<THREE.Group>(null)
  const batPivot = useRef<THREE.Group>(null)
  const clock = useRef(seed)
  const swingClock = useRef(0)
  const previousMode = useRef<PlayerMode>(mode)

  if (previousMode.current !== mode) {
    if (mode === 'swing') swingClock.current = 0
    previousMode.current = mode
  }

  useEffect(() => {
    if (!groupRef) return
    if (typeof groupRef === 'function') groupRef(root.current)
    else (groupRef as { current: THREE.Group | null }).current = root.current
  }, [groupRef])

  const skin = useMemo(
    () => new THREE.MeshStandardMaterial({ color: kit.skin, roughness: 0.86 }),
    [kit.skin],
  )

  useFrame((_, delta) => {
    clock.current += delta
    const t = clock.current

    const s = spine.current
    const n = neck.current
    const sl = shoulderL.current
    const sr = shoulderR.current
    const el = elbowL.current
    const er = elbowR.current
    const hl = hipL.current
    const hr = hipR.current
    const kl = kneeL.current
    const kr = kneeR.current
    const bat = batPivot.current
    if (!s || !n || !sl || !sr || !el || !er || !hl || !hr || !kl || !kr) return

    s.rotation.set(0, 0, 0)
    s.position.set(0, HIP_Y, 0)
    n.rotation.set(0, 0, 0)
    if (root.current) root.current.position.y = 0

    if (mode === 'stance' || mode === 'idle') {
      const breathe = Math.sin(t * 1.5)
      const sway = Math.sin(t * 1.1)
      s.position.y = HIP_Y + breathe * 0.006
      s.rotation.z = sway * 0.012

      if (mode === 'stance') {
        s.rotation.y = -0.32
        hl.rotation.x = 0.1
        hr.rotation.x = 0.22
        kl.rotation.x = -0.14
        kr.rotation.x = -0.3
        sl.rotation.set(0.34, 0, 0.16)
        sr.rotation.set(0.2, 0, -0.12)
        el.rotation.set(-0.55, 0, 0)
        er.rotation.set(-0.32, 0, 0)

        const tap = Math.sin(t * 2.1)
        const lift = tap > 0.86 ? (tap - 0.86) * 3.2 : 0
        if (bat) {
          bat.rotation.x = 0.12 + lift * 0.3
          bat.rotation.z = -0.06
        }
      } else {
        sl.rotation.set(0.05 + breathe * 0.02, 0, 0.09)
        sr.rotation.set(0.05 - breathe * 0.02, 0, -0.09)
        el.rotation.set(-0.22, 0, 0)
        er.rotation.set(-0.22, 0, 0)
      }
    }

    if (mode === 'walk') {
      const cycle = t * 5.0
      const swing = Math.sin(cycle)
      hl.rotation.set(swing * 0.5, 0, 0)
      hr.rotation.set(-swing * 0.5, 0, 0)
      kl.rotation.set(Math.max(0, -swing) * 0.7, 0, 0)
      kr.rotation.set(Math.max(0, swing) * 0.7, 0, 0)
      sl.rotation.set(-swing * 0.4, 0, 0.09)
      sr.rotation.set(swing * 0.4, 0, -0.09)
      el.rotation.set(-0.32, 0, 0)
      er.rotation.set(-0.32, 0, 0)
      s.position.y = HIP_Y + Math.abs(Math.sin(cycle)) * 0.02
      s.rotation.y = Math.sin(cycle * 0.5) * 0.04
      if (bat) bat.rotation.x = -0.4
    }

    if (mode === 'runup') {
      const cycle = t * 9.5
      const swing = Math.sin(cycle)
      hl.rotation.set(swing * 0.75, 0, 0)
      hr.rotation.set(-swing * 0.75, 0, 0)
      kl.rotation.set(Math.max(0, -swing) * 1.0, 0, 0)
      kr.rotation.set(Math.max(0, swing) * 1.0, 0, 0)
      sl.rotation.set(-swing * 0.7, 0, 0.12)
      sr.rotation.set(swing * 0.7, 0, -0.12)
      el.rotation.set(-0.9, 0, 0)
      er.rotation.set(-0.9, 0, 0)
      s.rotation.x = 0.24
      s.position.y = HIP_Y + Math.abs(Math.sin(cycle)) * 0.03
    }

    if (mode === 'swing') {
      swingClock.current += delta
      const k = Math.min(1, swingClock.current / 0.62)

      // stance → backlift → contact → follow-through
      const keys = [
        { sy: -0.3, slx: 0.34, erx: -0.55, srx: 0.2, srz: -0.12, lx: 0.1, rx: 0.22 },
        { sy: -0.95, slx: -0.7, erx: -1.2, srx: -0.45, srz: -0.3, lx: 0.05, rx: 0.1 },
        { sy: 0.45, slx: 0.95, erx: -0.12, srx: 0.55, srz: 0.12, lx: 0.25, rx: -0.05 },
        { sy: 0.85, slx: 1.35, erx: -0.38, srx: 0.95, srz: 0.34, lx: 0.35, rx: -0.15 },
      ]

      let a = 0
      let b = 1
      let u = 0
      if (k < 0.32) {
        a = 0
        b = 1
        u = k / 0.32
      } else if (k < 0.5) {
        a = 1
        b = 2
        u = (k - 0.32) / 0.18
      } else {
        a = 2
        b = 3
        u = Math.min(1, (k - 0.5) / 0.5)
      }

      const ease = u * u * (3 - 2 * u)
      const A = keys[a]
      const B = keys[b]
      const mix = (x: number, y: number) => x + (y - x) * ease

      s.rotation.y = mix(A.sy, B.sy)
      s.rotation.x = 0.06
      sl.rotation.set(mix(A.slx, B.slx), 0, 0.16)
      sr.rotation.set(mix(A.srx, B.srx), 0, mix(A.srz, B.srz))
      el.rotation.set(mix(A.erx, B.erx), 0, 0)
      er.rotation.set(mix(A.erx * 0.6, B.erx * 0.6), 0, 0)
      hl.rotation.set(mix(A.lx, B.lx), 0, 0)
      hr.rotation.set(mix(A.rx, B.rx), 0, 0)

      if (bat) {
        bat.rotation.x = 0.1 + mix(0.1, -0.5)
        bat.rotation.z = -0.06
      }
    }

    if (mode === 'bowl') {
      const cycle = (t * 1.2) % 1
      const load = Math.min(1, cycle / 0.55)
      const release = Math.max(0, Math.min(1, (cycle - 0.55) / 0.2))
      const follow = Math.max(0, (cycle - 0.75) / 0.25)

      sr.rotation.set(1.7 - load * 1.0 - release * 2.5 - follow * 0.8, 0, -0.32)
      er.rotation.set(-0.55 + load * 0.2, 0, 0)
      sl.rotation.set(0.45 + load * 0.4, 0, 0.26)
      el.rotation.set(-0.45, 0, 0)

      s.rotation.x = 0.14 - release * 0.42 + follow * 0.16
      s.rotation.y = -0.4 + load * 0.2 + release * 0.45
      hl.rotation.set(0.28 - load * 0.55, 0, 0)
      hr.rotation.set(-0.18 + release * 0.45, 0, 0)
      kl.rotation.set(-0.38 + load * 0.3, 0, 0)
      kr.rotation.set(-0.14, 0, 0)

      if (root.current) root.current.position.y = Math.sin(cycle * Math.PI) * 0.035
    }

    if (mode === 'crouch') {
      const bounce = Math.sin(t * 1.3) * 0.007
      s.position.y = HIP_Y - 0.26 + bounce
      s.rotation.x = 0.3
      hl.rotation.set(0.95, 0, 0)
      hr.rotation.set(1.02, 0, 0)
      kl.rotation.set(-1.35, 0, 0)
      kr.rotation.set(-1.4, 0, 0)
      sl.rotation.set(0.8, 0, 0.2)
      sr.rotation.set(0.8, 0, -0.2)
      el.rotation.set(-0.5, 0, 0)
      er.rotation.set(-0.5, 0, 0)
    }
  })

  const isKeeper = role === 'keeper'
  const padded = role === 'batsman' || isKeeper

  return (
    <group ref={root} position={position} rotation={[0, rotation, 0]}>
      <group ref={spine} position={[0, HIP_Y, 0]}>
        {/* ---- torso: tapered, elliptical in section ---- */}
        <mesh position={[0, 0.24, 0]} scale={[1, 1, 0.66]}>
          <cylinderGeometry args={[0.185, 0.15, 0.46, 12]} />
          <meshStandardMaterial color={kit.shirt} roughness={0.84} />
        </mesh>
        {/* chest shading, front only */}
        <mesh position={[0, 0.3, 0.1]}>
          <boxGeometry args={[0.2, 0.22, 0.008]} />
          <meshStandardMaterial color={kit.shirtShade} roughness={0.88} />
        </mesh>
        {/* collar */}
        <mesh position={[0, 0.47, 0]} scale={[1, 1, 0.7]}>
          <cylinderGeometry args={[0.115, 0.135, 0.05, 12]} />
          <meshStandardMaterial color={kit.trim} roughness={0.7} />
        </mesh>
        {/* shoulder caps, so the arms do not float */}
        {[1, -1].map((side) => (
          <mesh key={side} position={[side * 0.175, 0.46, 0]}>
            <sphereGeometry args={[0.082, 12, 10]} />
            <meshStandardMaterial color={kit.shirt} roughness={0.84} />
          </mesh>
        ))}

        {/* ---- head ---- */}
        <group ref={neck} position={[0, 0.53, 0]}>
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.042, 0.052, 0.07, 8]} />
            <primitive object={skin} attach="material" />
          </mesh>
          <mesh position={[0, 0.115, 0]}>
            <sphereGeometry args={[0.105, 16, 12]} />
            <primitive object={skin} attach="material" />
          </mesh>
          <group position={[0, 0.125, 0]}>
            <Helmet kit={kit} />
          </group>
        </group>

        {/* ---- left arm ---- */}
        <group ref={shoulderL} position={[SHOULDER_X, SHOULDER_DROP, 0]}>
          <mesh position={[0, -UPPER_ARM * 0.5, 0]}>
            <capsuleGeometry args={[0.05, UPPER_ARM - 0.08, 4, 8]} />
            <meshStandardMaterial color={kit.shirt} roughness={0.86} />
          </mesh>
          <group ref={elbowL} position={[0, -UPPER_ARM, 0]}>
            <mesh position={[0, -FOREARM * 0.45, 0]}>
              <capsuleGeometry args={[0.041, FOREARM - 0.08, 4, 8]} />
              <primitive object={skin} attach="material" />
            </mesh>
            <group position={[0, -FOREARM, 0]}>
              {isKeeper ? <KeepingGlove kit={kit} /> : <Glove kit={kit} />}
            </group>
          </group>
        </group>

        {/* ---- right arm (holds the bat) ---- */}
        <group ref={shoulderR} position={[-SHOULDER_X, SHOULDER_DROP, 0]}>
          <mesh position={[0, -UPPER_ARM * 0.5, 0]}>
            <capsuleGeometry args={[0.05, UPPER_ARM - 0.08, 4, 8]} />
            <meshStandardMaterial color={kit.shirt} roughness={0.86} />
          </mesh>
          <group ref={elbowR} position={[0, -UPPER_ARM, 0]}>
            <mesh position={[0, -FOREARM * 0.45, 0]}>
              <capsuleGeometry args={[0.041, FOREARM - 0.08, 4, 8]} />
              <primitive object={skin} attach="material" />
            </mesh>
            <group position={[0, -FOREARM, 0]}>
              {isKeeper ? <KeepingGlove kit={kit} /> : <Glove kit={kit} />}
              {role === 'batsman' && (
                <group ref={batPivot} rotation={[0.1, 0, 0]}>
                  <Bat kit={kit} />
                </group>
              )}
            </group>
          </group>
        </group>

        {/* ---- left leg ---- */}
        <group ref={hipL} position={[HIP_X, 0, 0]}>
          <mesh position={[0, -0.22, 0]}>
            <capsuleGeometry args={[0.072, 0.3, 4, 8]} />
            <meshStandardMaterial color={kit.trouser} roughness={0.9} />
          </mesh>
          <group ref={kneeL} position={[0, -0.45, 0]}>
            <mesh position={[0, -0.2, 0]}>
              <capsuleGeometry args={[0.058, 0.26, 4, 8]} />
              <meshStandardMaterial color={kit.trouser} roughness={0.9} />
            </mesh>
            {padded && (
              <group position={[0, -0.19, 0]}>
                <Pad kit={kit} />
              </group>
            )}
            <mesh position={[0, -0.42, 0.03]}>
              <boxGeometry args={[0.1, 0.06, 0.23]} />
              <meshStandardMaterial color={kit.shoe} roughness={0.7} />
            </mesh>
          </group>
        </group>

        {/* ---- right leg ---- */}
        <group ref={hipR} position={[-HIP_X, 0, 0]}>
          <mesh position={[0, -0.22, 0]}>
            <capsuleGeometry args={[0.072, 0.3, 4, 8]} />
            <meshStandardMaterial color={kit.trouser} roughness={0.9} />
          </mesh>
          <group ref={kneeR} position={[0, -0.45, 0]}>
            <mesh position={[0, -0.2, 0]}>
              <capsuleGeometry args={[0.058, 0.26, 4, 8]} />
              <meshStandardMaterial color={kit.trouser} roughness={0.9} />
            </mesh>
            {padded && (
              <group position={[0, -0.19, 0]}>
                <Pad kit={kit} />
              </group>
            )}
            <mesh position={[0, -0.42, 0.03]}>
              <boxGeometry args={[0.1, 0.06, 0.23]} />
              <meshStandardMaterial color={kit.shoe} roughness={0.7} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
}
