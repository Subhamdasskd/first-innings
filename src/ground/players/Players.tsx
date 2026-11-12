import type { RefObject } from 'react'
import type * as THREE from 'three'
import { Cricketer } from './Cricketer'
import { AWAY_KIT, HOME_KIT } from './kit'
import { useDelivery } from '../delivery/useDelivery'

interface PlayersProps {
  batsmanRef?: RefObject<THREE.Group | null>
  bowlerRef?: RefObject<THREE.Group | null>
}

/**
 * The three figures that make the ground read as a match. Positions are metres
 * from the centre of the wicket:
 *
 *   bowler   z ≈ -12 (runs in from -15.6)
 *   stumps   z = ±10.06
 *   batsman  z = +9.15
 *   keeper   z = +13.9
 *
 * During the scripted delivery the batsman and bowler switch animation mode;
 * the bowler's travel is driven by the director, not by React.
 */
export function Players({ batsmanRef, bowlerRef }: PlayersProps) {
  const phase = useDelivery((s) => s.phase)

  const batsmanMode = phase === 'shot' ? 'swing' : 'stance'
  const bowlerMode =
    phase === 'runup' ? 'runup' : phase === 'flight' ? 'bowl' : 'idle'

  return (
    <group>
      <Cricketer
        role="batsman"
        mode={batsmanMode}
        kit={HOME_KIT}
        position={[0.62, 0, 9.15]}
        rotation={Math.PI + 0.46}
        seed={0.4}
        groupRef={batsmanRef}
      />

      <Cricketer
        role="bowler"
        mode={bowlerMode}
        kit={AWAY_KIT}
        position={[-2.4, 0, -15.6]}
        rotation={0.24}
        seed={1.9}
        groupRef={bowlerRef}
      />

      <Cricketer
        role="keeper"
        mode="crouch"
        kit={AWAY_KIT}
        position={[0, 0, 13.9]}
        rotation={Math.PI}
        seed={3.1}
      />
    </group>
  )
}
