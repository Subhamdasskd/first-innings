import { useMemo } from 'react'
import * as THREE from 'three'
import { poolTexture } from './textures'

const ANGLES = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4]
const TOWER_R = 101
const TOWER_H = 44
const COLS = 6
const ROWS = 3

const LAMPS = Array.from({ length: COLS * ROWS }, (_, i) => ({
  col: i % COLS,
  row: Math.floor(i / COLS),
}))

function Tower({ angle, glowMap }: { angle: number; glowMap: THREE.Texture }) {
  const x = Math.cos(angle) * TOWER_R
  const z = Math.sin(angle) * TOWER_R

  const beam = useMemo(() => {
    const from = new THREE.Vector3(x, TOWER_H - 1, z)
    // aim ~55% of the way in, so the beam lands on the outfield rather than
    // converging on the pitch and painting an X across the whole ground
    const to = new THREE.Vector3(x * 0.45, 0, z * 0.45)
    const dir = new THREE.Vector3().subVectors(to, from)
    const length = dir.length()
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.clone().normalize().negate(),
    )
    const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5)
    return { position: mid, quaternion, length }
  }, [x, z])

  const pool = useMemo(() => poolTexture(), [])

  return (
    <group>
      {/* mast */}
      <mesh position={[x, TOWER_H / 2, z]}>
        <cylinderGeometry args={[0.42, 1.5, TOWER_H, 10]} />
        <meshStandardMaterial color="#2b3733" roughness={0.7} metalness={0.45} />
      </mesh>

      {/* lamp bank, canted toward the pitch */}
      <group position={[x, TOWER_H, z]} rotation={[0, -angle + Math.PI, 0]}>
        <group rotation={[0.34, 0, 0]}>
          <mesh>
            <boxGeometry args={[9.4, 3.6, 0.55]} />
            <meshStandardMaterial color="#121a17" roughness={0.6} metalness={0.5} />
          </mesh>
          {LAMPS.map(({ col, row }, i) => (
            <mesh
              key={i}
              position={[-4.1 + col * 1.64, 1.2 - row * 1.2, 0.32]}
            >
              <boxGeometry args={[1.24, 0.86, 0.12]} />
              <meshStandardMaterial
                color="#f2ffe6"
                emissive="#eaffd8"
                emissiveIntensity={4.2}
                toneMapped={false}
              />
            </mesh>
          ))}
        </group>

        {/* the bloom that sells it */}
        <sprite scale={[26, 26, 1]} position={[0, 0.3, 1.1]}>
          <spriteMaterial
            map={glowMap}
            color="#d8ffc6"
            transparent
            opacity={0.62}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </sprite>
      </group>

      {/* volumetric beam */}
      <mesh position={beam.position} quaternion={beam.quaternion}>
        <coneGeometry args={[beam.length * 0.075, beam.length, 20, 1, true]} />
        <meshBasicMaterial
          color="#bfe8b0"
          transparent
          opacity={0.028}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* where the light lands */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[x * 0.5, 0.03, z * 0.5]}>
        <planeGeometry args={[64, 64]} />
        <meshBasicMaterial
          map={pool}
          color="#bdf0b4"
          transparent
          opacity={0.42}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

export function Floodlights({ glowMap }: { glowMap: THREE.Texture }) {
  return (
    <group>
      {ANGLES.map((a) => (
        <Tower key={a} angle={a} glowMap={glowMap} />
      ))}
    </group>
  )
}
