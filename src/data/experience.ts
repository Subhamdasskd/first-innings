import type { ExperienceEntry } from './types'

/**
 * Professional experience.
 * Source of truth: "Subham Das_Resume.pdf", corroborated against the LinkedIn
 * export "Profile.pdf". Where the two documents give a different job title, the
 * employment record (resume) is used and the LinkedIn variant is surfaced in
 * `titleNote` so the difference is visible rather than hidden.
 *
 * Deliberately absent: the "30% query latency reduction" and "40% interview
 * preparation error reduction" figures from the resume. Neither is supported by
 * any supplied evidence, so the mechanism is described instead of the number.
 */
export const experience: ExperienceEntry[] = [
  {
    id: 'tick-my-work',
    organisation: 'Tick My Work',
    orgId: 'tick-my-work',
    title: 'Software Developer',
    start: 'Sep 2026',
    end: 'Present',
    duration: 'Ongoing',
    location: 'Hyderabad, India',
    current: true,
    summary:
      'Day-to-day software development on cloud-based business products, working within the wider development team.',
    points: [
      'Work as a Software Developer on day-to-day product development tasks.',
      'Contribute to ongoing product development, feature work and improvements.',
      'Handle maintenance work and general technical problem-solving.',
      'Work across products including Vault (data security), Work Diary (employee work and time management), and Mail Service (custom-domain email solutions).',
    ],
    stack: [],
  },
  {
    id: 'tata-2026',
    organisation: 'Tata Technologies',
    orgId: 'tata-technologies',
    title: 'Software Engineering Intern',
    titleNote: 'Listed as "Intern" on LinkedIn.',
    start: 'Feb 2026',
    end: 'May 2026',
    duration: '4 months',
    location: 'Pune, India',
    mode: 'On-site',
    current: false,
    summary:
      'Backend automation and end-to-end test coverage inside an industrial MES/SCADA environment, on the TENNECO project.',
    points: [
      'Designed and deployed backend automation systems using object-oriented principles and structured data flows to support real-time manufacturing processes in an MES/SCADA environment.',
      'Built and maintained end-to-end automated test pipelines with Playwright, covering application functionality and user workflows.',
      'Automated repetitive test scenarios, reducing manual testing effort and improving how quickly regressions surfaced.',
      'Took part in code reviews with senior engineers and worked within an Agile SDLC with cross-functional teams.',
    ],
    stack: ['Playwright', 'Test automation', 'MES / SCADA', 'OOP', 'Agile'],
  },
  {
    id: 'osian',
    organisation: 'Osian Soft Con',
    orgId: 'osian-soft-con',
    title: 'Technical Product Owner',
    titleNote: 'Freelance. Listed as "Technical Product Manager" on LinkedIn.',
    start: 'Nov 2025',
    end: 'May 2026',
    duration: '7 months',
    location: 'Remote',
    current: false,
    summary:
      'Product ownership and hands-on delivery for IPAAQ, a logistics and support platform handling invoice and purchase-order management.',
    points: [
      'Managed product requirements and coordinated development for IPAAQ, a logistics and support platform handling invoice and purchase-order (PO) management.',
      'Integrated an AI chatbot into the product, working on data annotation and model training to improve response accuracy for logistics and support workflows.',
      'Coordinated between technical and business stakeholders, and supported production issues through to resolution.',
      'Contributed hands-on code alongside the product work.',
    ],
    stack: ['AI chatbot integration', 'Data annotation', 'Model training', 'Product ownership'],
  },
  {
    id: 'tata-2025',
    organisation: 'Tata Technologies Limited',
    orgId: 'tata-technologies',
    title: 'Web Developer Intern',
    titleNote: 'Listed as "Internship Trainee" on LinkedIn.',
    start: 'Feb 2025',
    end: 'May 2025',
    duration: '4 months',
    location: 'Jamshedpur, India',
    mode: 'On-site',
    current: false,
    summary:
      'Full-stack contribution to internal web applications — REST APIs, relational schema design and React interfaces.',
    points: [
      'Engineered backend REST APIs with Node.js and Express.js using object-oriented, structured service layers.',
      'Implemented MySQL/PostgreSQL-backed operations covering the full complaint lifecycle, from submission through to resolution.',
      'Designed normalised relational schemas and tuned queries for CRUD, filtering and role-based data access.',
      'Built user interfaces in React.js and integrated APIs to connect the frontend with backend services.',
    ],
    stack: ['Node.js', 'Express.js', 'React.js', 'MySQL', 'PostgreSQL', 'REST APIs'],
  },
]

export const currentRole = experience.find((entry) => entry.current)
