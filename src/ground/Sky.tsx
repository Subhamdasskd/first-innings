import { useMemo } from 'react'
import * as THREE from 'three'

/** Night sky dome: deep navy overhead falling to a green-tinted horizon glow. */
export function Sky() {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: {
        top: { value: new THREE.Color('#02040a') },
        mid: { value: new THREE.Color('#061019') },
        horizon: { value: new THREE.Color('#12331f') },
      },
      vertexShader: `
        varying vec3 vPos;
        void main() {
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 top;
        uniform vec3 mid;
        uniform vec3 horizon;
        varying vec3 vPos;
        void main() {
          float h = clamp(normalize(vPos).y, -1.0, 1.0);
          vec3 colour = mix(horizon, mid, smoothstep(-0.02, 0.22, h));
          colour = mix(colour, top, smoothstep(0.18, 0.75, h));
          gl_FragColor = vec4(colour, 1.0);
        }
      `,
    })
  }, [])

  return (
    <mesh material={material} scale={[1, 1, 1]}>
      <sphereGeometry args={[420, 32, 24]} />
    </mesh>
  )
}
