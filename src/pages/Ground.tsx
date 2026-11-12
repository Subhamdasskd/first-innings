import { GroundCanvas } from '@/ground/GroundCanvas'
import { GroundHud } from '@/ground/GroundHud'
import { BroadcastLayer } from '@/ground/broadcast/BroadcastLayer'
import { ZonePanel } from '@/ground/zones/ZonePanel'

/**
 * The 3D ground. A separate route so the portfolio and the recruiter view stay
 * exactly as they were while the stadium is in progress.
 */
export default function Ground() {
  return (
    <main id="main" className="groundPage">
      <GroundCanvas />
      <GroundHud />
      <BroadcastLayer />
      <ZonePanel />
    </main>
  )
}
