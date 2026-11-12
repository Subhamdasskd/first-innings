import { useMemo } from 'react'
import { PITCH_LENGTH, PITCH_WIDTH } from './dimensions'
import { outfieldTexture, pitchTexture } from './textures'

export function Outfield() {
  const texture = useMemo(() => outfieldTexture(), [])
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[70, 128]} />
      <meshStandardMaterial map={texture} roughness={0.95} metalness={0} />
    </mesh>
  )
}

export function Pitch() {
  const texture = useMemo(() => pitchTexture(), [])

  const stumps = useMemo(() => {
    const out: [number, number][] = []
    for (const z of [PITCH_LENGTH / 2, -PITCH_LENGTH / 2]) {
      for (const x of [-0.12, 0, 0.12]) out.push([x, z])
    }
    return out
  }, [])

  return (
    <group>
      {/* a whisper of height so it never z-fights the outfield */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
        <planeGeometry args={[PITCH_WIDTH, PITCH_LENGTH]} />
        <meshStandardMaterial map={texture} roughness={0.96} metalness={0} />
      </mesh>

      {stumps.map(([x, z], i) => (
        <mesh key={i} position={[x, 0.35, z]}>
          <cylinderGeometry args={[0.018, 0.018, 0.7, 6]} />
          <meshStandardMaterial
            color="#e6e2d4"
            roughness={0.55}
            emissive="#3a4038"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}
