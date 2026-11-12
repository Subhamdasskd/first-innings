import { forwardRef, useMemo } from 'react'
import * as THREE from 'three'
import { glowTexture } from './textures'

/** The match ball: leather, a pale seam, and a soft glow so it reads at distance. */
export const Ball = forwardRef<THREE.Group>(function Ball(_props, ref) {
  const glow = useMemo(() => glowTexture(), [])

  return (
    <group ref={ref} visible={false}>
      <mesh>
        <sphereGeometry args={[0.038, 14, 12]} />
        <meshStandardMaterial
          color="#b4232f"
          roughness={0.42}
          metalness={0.05}
          emissive="#5c0d14"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* seam */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.032, 0.005, 5, 18]} />
        <meshStandardMaterial color="#efe6d4" roughness={0.7} />
      </mesh>
      <sprite scale={[0.42, 0.42, 1]}>
        <spriteMaterial
          map={glow}
          color="#ff8a72"
          transparent
          opacity={0.34}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </sprite>
    </group>
  )
})
