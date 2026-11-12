import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { GroundScene } from './GroundScene'
import { useGroundStore } from './useGroundStore'

interface Props {
  /** Called once the first frame has been composited. */
  onReady?: () => void
  /** Stop rendering when the stage scrolls out of view. */
  pausable?: boolean
}

function hasWebGL2(): boolean {
  try {
    return Boolean(document.createElement('canvas').getContext('webgl2'))
  } catch {
    return false
  }
}

/**
 * The 3D stadium as a live stage.
 *
 * Mounted only when WebGL2 is available; the container behind it keeps a dark
 * stadium gradient so the composition never flashes white. Rendering pauses
 * when the stage scrolls away.
 */
export function GroundIntroCanvas({ onReady, pausable = true }: Props) {
  const [supported] = useState(hasWebGL2)
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(true)
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!supported) return
    useGroundStore.getState().selectShot('D')
    return () => {
      useGroundStore.getState().setOrbiting(false)
      useGroundStore.getState().selectShot('A')
    }
  }, [supported])

  useEffect(() => {
    if (!pausable) return
    const el = host.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '120px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [pausable])

  if (!supported) return null

  return (
    <div ref={host} className={`stadium__canvas${ready ? ' is-ready' : ''}`} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        shadows={false}
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [26, 9, 0], fov: 44, near: 0.1, far: 900 }}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.62
          window.setTimeout(() => {
            setReady(true)
            onReady?.()
          }, 380)
        }}
      >
        <Suspense fallback={null}>
          <GroundScene crowd={2600} interactive={false} />
        </Suspense>
      </Canvas>
      <div className="stadium__canvasGrade" />
    </div>
  )
}
