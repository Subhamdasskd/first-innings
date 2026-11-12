import type { Achievement } from './types'

/**
 * Records — publication, certifications and academic results.
 * `pending` marks a field that could not be verified from the supplied documents.
 * Those items are shown with a visible "unverified" state rather than a guess.
 */
export const achievements: Achievement[] = [
  {
    id: 'intervyu-paper',
    kind: 'publication',
    title: 'IntervyuAI: An AI-Driven Interview Assessment System',
    issuer: 'School of CSE, IILM University',
    authors: ['Vikas Kumar Tiwari', 'Tanuj Rai', 'Subham Das'],
    context:
      'A paper describing the Intervyu AI system: domain-specific question generation and instant answer evaluation built on the MERN stack and the Gemini API, with an empirical user study of the results. Subham is the third author.',
    pending: 'Publication venue, year and DOI to be confirmed.',
  },
  {
    id: 'claude-code-101',
    kind: 'certification',
    title: 'Claude Academy: Claude Code 101',
    issuer: 'Anthropic · Claude Academy',
    context: 'Listed on the LinkedIn profile. Credential link not yet supplied.',
  },
  {
    id: 'nptel-ethical-hacking',
    kind: 'certification',
    title: 'Ethical Hacking & Online Privacy',
    issuer: 'NPTEL',
    context: 'Listed under certifications on the resume.',
    pending: 'Date and credential link to be confirmed.',
  },
  {
    id: 'dbms',
    kind: 'certification',
    title: 'Database Management Systems (SQL / DBMS)',
    context: 'Listed under certifications on the resume.',
    pending: 'Issuer, date and credential link to be confirmed.',
  },
  {
    id: 'artificial-intelligence',
    kind: 'certification',
    title: 'Artificial Intelligence',
    context: 'Listed under certifications on the resume.',
    pending: 'Issuer, date and credential link to be confirmed.',
  },
  {
    id: 'agile',
    kind: 'certification',
    title: 'Agile Development',
    context: 'Listed under certifications on the resume.',
    pending: 'Issuer, date and credential link to be confirmed.',
  },
  {
    id: 'btech',
    kind: 'academic',
    title: 'B.Tech, Computer Science & Engineering — Data Science',
    issuer: 'IILM University, Greater Noida',
    date: '2023 – 2026',
    context: 'Degree completed with a CGPA of 8.34. First year read at Graphic Era Hill University.',
  },
]
