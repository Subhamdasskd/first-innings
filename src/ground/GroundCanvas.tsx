import { Suspense, useCallback, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { GroundScene } from './GroundScene'
import { useGroundStore } from './useGroundStore'

function supportsWebGL2(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2'))
  } catch {
    return false
  }
}

function deviceCrowd(): number {
  const nav = navigator as Navigator & { deviceMemory?: number }
  const mem = nav.deviceMemory ?? 8
  const coarse = window.matchMedia('(pointer: coarse)').matches
  if (coarse || mem <= 4) return 2600
  return 9000
}

/**
 * The 3D ground. If WebGL is unavailable we say so plainly and hand the visitor
 * back to the full portfolio rather than showing a blank canvas.
 */
export function GroundCanvas() {
  const [supported] = useState(supportsWebGL2)
  const [ready, setReady] = useState(false)
  const [crowd] = useState(deviceCrowd)
  const orbiting = useGroundStore((s) => s.orbiting)

  const onCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 1.52
    // give the first frame a beat to compose before lifting the curtain
    window.setTimeout(() => setReady(true), 260)
  }, [])

  useEffect(() => {
    return () => setReady(false)
  }, [])

  if (!supported) {
    return (
      <div className="groundFallback" role="status">
        <p className="eyebrow">3D ground unavailable</p>
        <h1>This browser can&apos;t run the 3D stadium</h1>
        <p>
          WebGL 2 is not available here, so the ground cannot be rendered. The full portfolio — every
          role, project, skill and certificate — is still available in the standard view.
        </p>
        <a className="btn btn--primary" href="/">
          Open the portfolio
        </a>
      </div>
    )
  }

  return (
    <div className={`groundCanvases${ready ? ' is-ready' : ''}`}>
      <Canvas
        dpr={[1, 1.75]}
        shadows={false}
        camera={{ position: [0, 58, -46], fov: 45, near: 0.1, far: 900 }}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
        onCreated={onCreated}
        frameloop={orbiting ? 'always' : 'always'}
      >
        <Suspense fallback={null}>
          <GroundScene crowd={crowd} />
        </Suspense>
      </Canvas>

      {/* the loading curtain, in the same language as the 2D stadium */}
      <div className="groundCurtain" aria-hidden={ready}>
        <div className="groundCurtain__inner">
          <span className="groundCurtain__dot" />
          <span className="groundCurtain__label">Lighting the ground</span>
          <span className="groundCurtain__bar">
            <span />
          </span>
        </div>
      </div>
    </div>
  )
}
