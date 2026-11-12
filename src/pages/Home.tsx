import { StadiumHero } from '@/sections/StadiumHero'
import { StatsStrip } from '@/sections/StatsStrip'
import { PlayerProfile } from '@/sections/PlayerProfile'
import { CareerInnings } from '@/sections/CareerInnings'
import { BoundaryShots } from '@/sections/BoundaryShots'
import { PlayerAttributes } from '@/sections/PlayerAttributes'
import { TrophyRoom } from '@/sections/TrophyRoom'
import { PostMatchInterview } from '@/sections/PostMatchInterview'
import { ProjectsProvider } from '@/components/projects/ProjectsProvider'

export function Home() {
  return (
    <ProjectsProvider>
      <div id="top">
        <StadiumHero />
        <main id="main">
          <StatsStrip />
          <PlayerProfile />
          <CareerInnings />
          <BoundaryShots />
          <PlayerAttributes />
          <TrophyRoom />
          <PostMatchInterview />
        </main>
      </div>
    </ProjectsProvider>
  )
}
