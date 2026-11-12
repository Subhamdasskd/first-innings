import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {
  LOWER_INNER_R,
  LOWER_TOP_R,
  UPPER_INNER_R,
  UPPER_TOP_R,
  lowerTierY,
  upperTierY,
} from './dimensions'
import { crowdTexture } from './textures'

const CLOTHES = [
  '#0d1216', '#101820', '#131a1e', '#0b1013', '#161d22',
  '#1d2730', '#2a2e33', '#332b28', '#232d29', '#1a2126',
  '#b9b4a6', '#8d9088', '#5e6468', '#3d4750',
]
const ACCENTS = ['#e2b23f', '#c6ff3d', '#d9d3c2']

/**
 * A crowd, not a particle field: every figure is a textured billboard facing the
 * pitch, tinted from a wardrobe palette, standing on the actual seating ramp.
 */
export function Crowd({ count = 9000 }: { count?: number }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const material = useRef<THREE.MeshStandardMaterial>(null)
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])
  const texture = useMemo(() => crowdTexture(), [])

  useLayoutEffect(() => {
    const mesh = ref.current
    if (!mesh) return

    const dummy = new THREE.Object3D()
    const colour = new THREE.Color()
    const lowerCount = Math.floor(count * 0.74)

    for (let i = 0; i < count; i += 1) {
      const lower = i < lowerCount
      const angle = Math.random() * Math.PI * 2
      const r = lower
        ? LOWER_INNER_R + 1 + Math.random() * (LOWER_TOP_R - LOWER_INNER_R - 2)
        : UPPER_INNER_R + 1 + Math.random() * (UPPER_TOP_R - UPPER_INNER_R - 2)
      const y = lower ? lowerTierY(r) : upperTierY(r)

      dummy.position.set(Math.cos(angle) * r, y + 0.42, Math.sin(angle) * r)
      dummy.lookAt(0, dummy.position.y, 0)
      const s = 0.78 + Math.random() * 0.42
      // roughly one in five is on their feet, which is what a crowd looks like
      const standing = Math.random() > 0.78 ? 1.2 : 1
      dummy.scale.set(s, s * standing, s)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)

      const roll = Math.random()
      if (roll > 0.982) colour.set(ACCENTS[Math.floor(Math.random() * ACCENTS.length)])
      else colour.set(CLOTHES[Math.floor(Math.random() * CLOTHES.length)])
      mesh.setColorAt(i, colour)
    }

    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [count])

  // A standing crowd is never still. This bobs each instance on its own phase.
  useLayoutEffect(() => {
    const mat = material.current
    if (!mat) return
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uniforms.uTime
      shader.vertexShader = `uniform float uTime;\n${shader.vertexShader}`.replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        #ifdef USE_INSTANCING
          float phase = instanceMatrix[3].x * 0.31 + instanceMatrix[3].z * 0.23;
          transformed.y += sin(uTime * 2.1 + phase) * 0.045;
        #endif`,
      )
    }
    mat.customProgramCacheKey = () => 'crowd-bob'
    mat.needsUpdate = true
  }, [uniforms])

  useFrame((_, delta) => {
    uniforms.uTime.value += delta
  })

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]} frustumCulled={false}>
      <planeGeometry args={[0.44, 0.66]} />
      <meshStandardMaterial
        ref={material}
        map={texture}
        transparent
        alphaTest={0.42}
        side={THREE.DoubleSide}
        roughness={0.95}
        metalness={0}
      />
    </instancedMesh>
  )
}
