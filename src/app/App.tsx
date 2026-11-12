import { Suspense, lazy, useCallback } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { SettingsProvider } from './providers'
import { SkipLink } from '@/components/a11y/SkipLink'
import { RevealController } from '@/components/RevealController'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MatchCentre } from '@/components/navigation/MatchCentre'
import { Home } from '@/pages/Home'
import { Recruiter } from '@/pages/Recruiter'
import { NotFound } from '@/pages/NotFound'

/** The 3D ground is code-split: the portfolio route streams it in behind the hero. */
const Ground = lazy(() => import('@/pages/Ground'))

export default function App() {
  const { pathname } = useLocation()
  const onGround = pathname === '/ground'

  // "Replay the introduction" now means: back to the top of the stadium stage.
  const replayIntro = useCallback(() => {
    const reduce = document.documentElement.dataset.motion === 'off'
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }, [])

  return (
    <SettingsProvider>
      <RevealController />

      <div className="appShell">
        <SkipLink />
        {!onGround && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recruiter" element={<Recruiter />} />
          <Route
            path="/ground"
            element={
              <Suspense fallback={<div className="groundBoot" />}>
                <Ground />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {!onGround && <Footer />}
        {pathname === '/' && <MatchCentre onReplayIntro={replayIntro} />}
      </div>
    </SettingsProvider>
  )
}
