import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import {
  BOUNDARY_R,
  CONCOURSE_R,
  CONCOURSE_Y,
  LOWER_INNER_R,
  LOWER_INNER_Y,
  LOWER_TOP_R,
  LOWER_TOP_Y,
  ROOF_R,
  ROOF_Y,
  UPPER_INNER_R,
  UPPER_TOP_R,
  UPPER_TOP_Y,
  WALL_R,
  WALL_Y,
} from './dimensions'
import { adBoardTexture, seatTexture } from './textures'

function lathe(points: [number, number][], segments = 128): THREE.LatheGeometry {
  return new THREE.LatheGeometry(
    points.map(([r, y]) => new THREE.Vector2(r, y)),
    segments,
  )
}

/* --------------------------------------------------------------- seating */
function Tier({
  profile,
  colour,
  map,
}: {
  profile: [number, number][]
  colour: string
  map?: THREE.Texture
}) {
  const geometry = useMemo(() => lathe(profile), [profile])
  return (
    <mesh geometry={geometry} receiveShadow={false}>
      <meshStandardMaterial
        map={map}
        color={colour}
        roughness={0.88}
        metalness={0.02}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

/* ---------------------------------------------------------- boundary ads */
function AdvertisingBoards() {
  const count = 92
  const ref = useRef<THREE.InstancedMesh>(null)
  const texture = useMemo(() => adBoardTexture(), [])

  useLayoutEffect(() => {
    const mesh = ref.current
    if (!mesh) return
    const dummy = new THREE.Object3D()
    for (let i = 0; i < count; i += 1) {
      const a = (i / count) * Math.PI * 2
      const r = BOUNDARY_R + 0.55
      dummy.position.set(Math.cos(a) * r, 0.62, Math.sin(a) * r)
      dummy.rotation.set(0, -a + Math.PI / 2, 0)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
  }, [])

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]} castShadow={false}>
      <planeGeometry args={[4.35, 1.05]} />
      <meshStandardMaterial
        map={texture}
        emissiveMap={texture}
        emissive="#ffffff"
        emissiveIntensity={0.32}
        roughness={0.7}
        metalness={0}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  )
}

/* ------------------------------------------------------------------ roof */
function Roof() {
  const profile = useMemo<[number, number][]>(
    () => [
      [ROOF_R, ROOF_Y],
      [ROOF_R - 4, ROOF_Y + 0.7],
      [ROOF_R - 10.5, ROOF_Y + 0.55],
      [84.4, ROOF_Y - 1.1],
    ],
    [],
  )
  const geometry = useMemo(() => lathe(profile, 128), [profile])

  const ribs = useMemo(() => {
    const items: { pos: [number, number, number]; rotY: number }[] = []
    const n = 44
    for (let i = 0; i < n; i += 1) {
      const a = (i / n) * Math.PI * 2
      items.push({
        pos: [Math.cos(a) * (ROOF_R - 5.2), ROOF_Y + 0.15, Math.sin(a) * (ROOF_R - 5.2)],
        rotY: -a,
      })
    }
    return items
  }, [])

  return (
    <group>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#0c1210" roughness={0.88} metalness={0.2} side={THREE.DoubleSide} />
      </mesh>
      {ribs.map((rib, i) => (
        <mesh key={i} position={rib.pos} rotation={[0, rib.rotY, 0]}>
          <boxGeometry args={[0.34, 0.9, 9.6]} />
          <meshStandardMaterial color="#0e1513" roughness={0.7} metalness={0.4} />
        </mesh>
      ))}
    </group>
  )
}

/* ------------------------------------------------------------- perimeter */
function Perimeter() {
  return (
    <group>
      {/* low wall behind the boards */}
      <mesh position={[0, WALL_Y / 2, 0]}>
        <cylinderGeometry args={[WALL_R, WALL_R, WALL_Y, 128, 1, true]} />
        <meshStandardMaterial color="#0a1310" roughness={0.95} side={THREE.DoubleSide} />
      </mesh>

      {/* boundary rope */}
      <mesh position={[0, 0.11, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[BOUNDARY_R, 0.09, 6, 180]} />
        <meshStandardMaterial color="#dfe6da" roughness={0.8} emissive="#3d4a3c" emissiveIntensity={0.25} />
      </mesh>
    </group>
  )
}

export function Stadium() {
  const seats = useMemo(() => seatTexture(), [])

  const lowerProfile = useMemo<[number, number][]>(
    () => [
      [WALL_R + 0.2, WALL_Y],
      [LOWER_INNER_R - 0.4, WALL_Y],
      [LOWER_INNER_R, LOWER_INNER_Y],
      [LOWER_TOP_R, LOWER_TOP_Y],
      [CONCOURSE_R - 0.5, CONCOURSE_Y],
    ],
    [],
  )

  const upperProfile = useMemo<[number, number][]>(
    () => [
      [CONCOURSE_R - 0.2, CONCOURSE_Y],
      [UPPER_INNER_R, CONCOURSE_Y + 0.3],
      [UPPER_TOP_R, UPPER_TOP_Y],
      [UPPER_TOP_R + 0.6, UPPER_TOP_Y + 0.25],
    ],
    [],
  )

  const concourseProfile = useMemo<[number, number][]>(
    () => [
      [CONCOURSE_R - 0.6, CONCOURSE_Y],
      [CONCOURSE_R + 0.1, CONCOURSE_Y],
    ],
    [],
  )

  return (
    <group>
      <Tier profile={lowerProfile} colour="#ffffff" map={seats} />
      <Tier profile={concourseProfile} colour="#46544d" />
      <Tier profile={upperProfile} colour="#f2f6f2" map={seats} />
      <AdvertisingBoards />
      <Perimeter />
      <Roof />
    </group>
  )
}
