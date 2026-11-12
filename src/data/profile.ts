import type { Profile } from './types'

/**
 * Identity and copy.
 * Sources: "Subham Das_Resume.pdf" (Nov 2026), "Profile.pdf" (LinkedIn export,
 * 12 Nov 2026), and the supplied photograph. Nothing here is inferred.
 */
export const profile: Profile = {
  name: 'Subham Das',
  displayName: 'Subham',
  brand: 'First Innings',
  brandMark: 'FI',
  tagline: "Every great career starts with an innings. Here's mine.",
  role: 'Software Developer',
  roleOrg: 'Tick My Work',
  positioning: 'Software Developer · Full-stack & AI applications',
  summary: [
    'I build software that has to keep working: REST APIs, relational schemas, React interfaces, and the automated tests that prove they hold. I am currently a Software Developer at Tick My Work, working on cloud-based business products — Vault, Work Diary and Mail Service.',
    'Before that, two internships at Tata Technologies: backend automation in an industrial MES/SCADA environment, and REST APIs backed by MySQL and PostgreSQL. In between, a freelance product role at Osian Soft Con where I owned requirements and helped ship an AI chatbot into a logistics platform.',
    'I am a Computer Science & Engineering graduate specialising in Data Science, and a co-author on a published paper on AI-driven interview assessment. The patterns I care about are the unglamorous ones: clean service layers, schemas that make the right query easy, and tests that fail loudly when something breaks.',
  ],
  location: 'Hyderabad, India',
  availability: 'Open to software engineering conversations',
  focus: [
    'Cloud business software',
    'Full-stack product development',
    'LLM integration in real products',
    'Data science foundations',
  ],
  interests: ['Watching sport', 'Video games', 'Building side projects'],
  photo: {
    portrait: {
      webp: '/assets/profile/portrait.webp',
      jpg: '/assets/profile/portrait.jpg',
      width: 480,
      height: 600,
    },
    wide: {
      webp: '/assets/profile/wide.webp',
      jpg: '/assets/profile/wide.jpg',
      width: 1280,
      height: 800,
    },
    alt: 'Subham Das, software developer, photographed at his workplace in a white polo shirt and glasses.',
  },
}
