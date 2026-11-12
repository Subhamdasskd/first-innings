import { forwardRef } from 'react'
import * as THREE from 'three'
import type { Kit } from './kit'

/**
 * Cricket equipment, built from primitives.
 * Nothing here is imported — every piece is geometry.
 */

export function Helmet({ kit }: { kit: Kit }) {
  return (
    <group>
      {/* shell */}
      <mesh position={[0, 0.02, 0]} castShadow={false}>
        <sphereGeometry args={[0.145, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
        <meshStandardMaterial color={kit.helmet} roughness={0.42} metalness={0.15} />
      </mesh>
      {/* crown stripe, brand accent */}
      <mesh position={[0, 0.1, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.028, 0.02, 0.24]} />
        <meshStandardMaterial color={kit.helmetStripe} roughness={0.4} emissive={kit.helmetStripe} emissiveIntensity={0.35} />
      </mesh>
      {/* brim */}
      <mesh position={[0, 0.015, 0.12]} rotation={[0.16, 0, 0]}>
        <boxGeometry args={[0.26, 0.014, 0.15]} />
        <meshStandardMaterial color={kit.helmet} roughness={0.35} metalness={0.2} />
      </mesh>
      {/* face grille */}
      <group position={[0, -0.03, 0.135]}>
        {[-0.045, 0, 0.045].map((x) => (
          <mesh key={x} position={[x, 0, 0]}>
            <boxGeometry args={[0.008, 0.11, 0.008]} />
            <meshStandardMaterial color="#9aa79c" roughness={0.3} metalness={0.7} />
          </mesh>
        ))}
        {[-0.035, 0.005, 0.045].map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <boxGeometry args={[0.14, 0.007, 0.007]} />
            <meshStandardMaterial color="#9aa79c" roughness={0.3} metalness={0.7} />
          </mesh>
        ))}
      </group>
      {/* ear guards */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.125, -0.02, 0.01]}>
          <sphereGeometry args={[0.055, 10, 8]} />
          <meshStandardMaterial color={kit.helmet} roughness={0.45} metalness={0.15} />
        </mesh>
      ))}
    </group>
  )
}

/** A full-size bat: handle, splice, blade, toe guard. */
export const Bat = forwardRef<THREE.Group, { kit: Kit }>(function Bat({ kit }, ref) {
  return (
    <group ref={ref}>
      {/* handle */}
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.018, 0.02, 0.3, 8]} />
        <meshStandardMaterial color={kit.batHandle} roughness={0.85} />
      </mesh>
      {/* grip rings */}
      {[0.06, 0.12, 0.18, 0.24].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.021, 0.005, 6, 12]} />
          <meshStandardMaterial color="#2b322e" roughness={0.9} />
        </mesh>
      ))}
      {/* splice */}
      <mesh position={[0, -0.03, 0]}>
        <boxGeometry args={[0.055, 0.09, 0.03]} />
        <meshStandardMaterial color={kit.bat} roughness={0.6} />
      </mesh>
      {/* blade */}
      <mesh position={[0, -0.36, 0]}>
        <boxGeometry args={[0.11, 0.58, 0.038]} />
        <meshStandardMaterial color={kit.bat} roughness={0.62} />
      </mesh>
      {/* toe */}
      <mesh position={[0, -0.655, 0]}>
        <boxGeometry args={[0.112, 0.03, 0.04]} />
        <meshStandardMaterial color="#8f8d7c" roughness={0.95} />
      </mesh>
    </group>
  )
})

/** Batting pad: the tall front board plus the straps behind the calf. */
export function Pad({ kit }: { kit: Kit }) {
  return (
    <group>
      <mesh position={[0, -0.02, 0.062]}>
        <boxGeometry args={[0.15, 0.44, 0.085]} />
        <meshStandardMaterial color={kit.pad} roughness={0.85} />
      </mesh>
      {/* vertical stitch lines */}
      {[-0.042, 0, 0.042].map((x) => (
        <mesh key={x} position={[x, -0.02, 0.106]}>
          <boxGeometry args={[0.004, 0.42, 0.004]} />
          <meshStandardMaterial color="#d5d0be" roughness={0.9} />
        </mesh>
      ))}
      {/* straps */}
      {[-0.15, -0.01, 0.13].map((y) => (
        <mesh key={y} position={[0, y, 0.005]}>
          <boxGeometry args={[0.165, 0.018, 0.09]} />
          <meshStandardMaterial color={kit.padStrap} roughness={0.8} />
        </mesh>
      ))}
      {/* knee roll */}
      <mesh position={[0, 0.15, 0.06]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.058, 0.058, 0.152, 10]} />
        <meshStandardMaterial color={kit.pad} roughness={0.85} />
      </mesh>
    </group>
  )
}

/** Batting glove: cuff plus a blocky hand. */
export function Glove({ kit }: { kit: Kit }) {
  return (
    <group>
      <mesh position={[0, -0.02, 0]}>
        <boxGeometry args={[0.085, 0.13, 0.06]} />
        <meshStandardMaterial color={kit.glove} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.075, 0]}>
        <boxGeometry args={[0.095, 0.06, 0.07]} />
        <meshStandardMaterial color={kit.trim} roughness={0.8} />
      </mesh>
      {/* sausage fingers */}
      {[-0.024, 0, 0.024].map((x) => (
        <mesh key={x} position={[x, -0.1, 0.01]}>
          <boxGeometry args={[0.022, 0.05, 0.055]} />
          <meshStandardMaterial color={kit.glove} roughness={0.85} />
        </mesh>
      ))}
    </group>
  )
}

/** Keeping glove — bigger, webbed. */
export function KeepingGlove({ kit }: { kit: Kit }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.12, 0.15, 0.07]} />
        <meshStandardMaterial color={kit.glove} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.085, 0]}>
        <boxGeometry args={[0.13, 0.06, 0.08]} />
        <meshStandardMaterial color={kit.trim} roughness={0.8} />
      </mesh>
      <mesh position={[0, -0.075, 0.045]}>
        <boxGeometry args={[0.13, 0.05, 0.05]} />
        <meshStandardMaterial color={kit.glove} roughness={0.85} />
      </mesh>
    </group>
  )
}
