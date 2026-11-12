import type { SkillGroup } from './types'

/**
 * Skills.
 *
 * Grouped by discipline, deliberately without percentages, ratings, "expert"
 * labels or years-of-experience badges: none of those are defensible from the
 * supplied sources. Where a skill can be attributed to a specific build, the
 * project id is recorded in `usedIn` and the UI links to it.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    discipline: 'Batting',
    real: 'Frontend & interface',
    blurb: 'Interfaces that have to survive real data, real latency and real users.',
    items: [
      { name: 'React.js', usedIn: ['intervyu-ai'] },
      { name: 'Next.js', usedIn: ['codereviewbuddy'] },
      { name: 'TanStack Start',  },
      { name: 'Tailwind CSS', usedIn: ['codereviewbuddy'] },
      { name: 'HTML & CSS' },
      { name: 'Responsive layout' },
    ],
  },
  {
    id: 'backend',
    discipline: 'Bowling',
    real: 'Backend & APIs',
    blurb: 'Service layers, endpoints and the contracts between them.',
    items: [
      { name: 'Node.js', usedIn: ['intervyu-ai'] },
      { name: 'Express.js', usedIn: ['intervyu-ai'] },
      { name: 'REST API design', usedIn: ['intervyu-ai'] },
      { name: 'Prisma', usedIn: ['codereviewbuddy'] },
      { name: 'NextAuth', usedIn: ['codereviewbuddy'] },
      { name: 'JWT & role-based access',  },
    ],
  },
  {
    id: 'data',
    discipline: 'Fielding',
    real: 'Data & storage',
    blurb: 'Schemas that make the right query the easy one.',
    items: [
      { name: 'PostgreSQL', usedIn: ['codereviewbuddy'] },
      { name: 'SQL', usedIn: ['codereviewbuddy'] },
      { name: 'MySQL', usedIn: ['tata-2025'] },
      { name: 'MongoDB', usedIn: ['intervyu-ai'] },
      { name: 'Relational schema design',  },
      { name: 'Normalisation & query tuning' },
    ],
  },
  {
    id: 'tooling',
    discipline: 'All-rounder',
    real: 'Testing, tooling & delivery',
    blurb: 'The unglamorous work that decides whether a build holds.',
    items: [
      { name: 'Playwright', usedIn: ['tata-2026'] },
      { name: 'Vitest', usedIn: ['codereviewbuddy'] },
      { name: 'Git & GitHub' },
      { name: 'Postman' },
      { name: 'Agile / Scrum', usedIn: ['tata-2026'] },
      { name: 'Claude Code', note: 'Listed as a top skill on LinkedIn' },
    ],
  },
  {
    id: 'ai',
    discipline: 'Specialist',
    real: 'AI & data science',
    blurb: 'Data science training applied to products rather than notebooks.',
    items: [
      { name: 'Python' },
      { name: 'Pandas & NumPy' },
      { name: 'Gemini API', usedIn: ['intervyu-ai', 'codereviewbuddy'] },
      { name: 'OpenAI API', usedIn: ['codereviewbuddy'] },
      { name: 'Prompt engineering', usedIn: ['intervyu-ai', 'codereviewbuddy'] },
      { name: 'Data annotation & model training', usedIn: ['osian'] },
    ],
  },
  {
    id: 'core',
    discipline: 'Technique',
    real: 'Core computer science',
    blurb: 'The fundamentals the rest of it rests on.',
    items: [
      { name: 'Java' },
      { name: 'Object-oriented design' },
      { name: 'DBMS' },
      { name: 'Data structures & algorithms' },
      { name: 'Problem decomposition' },
    ],
  },
]

/** Skills with no verifiable project attribution, shown without a link. */
export const attributionNote =
  'Linked skills point to a project or role in this portfolio. Unlinked skills are listed on the resume but have no single build to point at.'
