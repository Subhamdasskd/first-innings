import * as THREE from 'three'

/**
 * A tiny mutable bridge between the delivery director and the camera rig, so a
 * per-frame ball-follow never touches React state.
 */
export const cameraState = {
  /** World point the camera should glance at, or null. */
  follow: null as THREE.Vector3 | null,
  /** 0 = ignore, 1 = look straight at it. */
  weight: 0,
}

export function setFollow(point: THREE.Vector3 | null, weight: number) {
  if (point) {
    if (!cameraState.follow) cameraState.follow = new THREE.Vector3()
    cameraState.follow.copy(point)
  }
  cameraState.weight = weight
}

export function clearFollow() {
  cameraState.weight = 0
}
