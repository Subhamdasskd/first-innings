import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Stadium } from './Stadium'
import { Crowd } from './Crowd'
import { Outfield, Pitch } from './Pitch'
import { Floodlights } from './Floodlights'
import { Sky } from './Sky'
import { CameraRig } from './CameraRig'
import { Ball } from './Ball'
import { Players } from './players/Players'
import { DeliveryDirector } from './delivery/DeliveryDirector'
import { glowTexture } from './textures'

export function GroundScene({
  crowd = 9000,
  interactive = true,
}: {
  crowd?: number
  /** false = backdrop only: no delivery director, no ball. */
  interactive?: boolean
}) {
  const glow = useMemo(() => glowTexture(), [])
  const ballRef = useRef<THREE.Group>(null)
  const batsmanRef = useRef<THREE.Group>(null)
  const bowlerRef = useRef<THREE.Group>(null)

  return (
    <>
      <color attach="background" args={['#050a0c']} />
      <fogExp2 attach="fog" args={['#0b1713', 0.0035]} />

      <hemisphereLight args={['#4d7a64', '#101d17', 2.0]} />
      <ambientLight intensity={0.32} />
      <directionalLight position={[-46, 72, -34]} intensity={2.9} color="#eefbf0" />
      <directionalLight position={[48, 54, 44]} intensity={0.75} color="#a8dcb8" />

      <Sky />
      <Outfield />
      <Pitch />
      <Stadium />
      <Crowd count={crowd} />
      <Players batsmanRef={batsmanRef} bowlerRef={bowlerRef} />
      {interactive && <Ball ref={ballRef} />}
      <Floodlights glowMap={glow} />

      {interactive && <DeliveryDirector ballRef={ballRef} bowlerRef={bowlerRef} />}
      <CameraRig />
    </>
  )
}
