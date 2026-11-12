import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useSettings } from '@/app/providers'
import { projects } from '@/data/projects'
import { ProjectDialog } from './ProjectDialog'

interface ProjectsValue {
  /** Opens a project panel by id. */
  open: (id: string) => void
  /** Opens a project, or jumps to the career timeline for an experience id. */
  openRef: (id: string) => void
}

const ProjectsContext = createContext<ProjectsValue | null>(null)

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const { motionEnabled } = useSettings()

  const open = useCallback((id: string) => setActiveId(id), [])
  const close = useCallback(() => setActiveId(null), [])

  const openRef = useCallback(
    (id: string) => {
      if (projects.some((project) => project.id === id)) {
        setActiveId(id)
        return
      }
      document.getElementById('career')?.scrollIntoView({
        behavior: motionEnabled ? 'smooth' : 'auto',
        block: 'start',
      })
    },
    [motionEnabled],
  )

  const value = useMemo<ProjectsValue>(() => ({ open, openRef }), [open, openRef])
  const active = projects.find((project) => project.id === activeId) ?? null

  return (
    <ProjectsContext.Provider value={value}>
      {children}
      <ProjectDialog project={active} onClose={close} />
    </ProjectsContext.Provider>
  )
}

export function useProjects(): ProjectsValue {
  const value = useContext(ProjectsContext)
  if (!value) throw new Error('useProjects must be used inside <ProjectsProvider>')
  return value
}
