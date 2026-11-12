import type { Project } from './types'

/**
 * Projects — every entry below was inspected in the workspace or verified against
 * a public repository and live deployment. Nothing is described that is not built.
 *
 * `links` only ever contains a real, reachable URL. Projects with no public
 * repository and no deployment have an empty list, and the UI renders a designed
 * scorecard instead of a dead button.
 */
export const projects: Project[] = [
  {
    id: 'codereviewbuddy',
    name: 'CodeReviewBuddy',
    kicker: 'AI-assisted code review for GitHub',
    tier: 'flagship',
    year: '2026',
    status: { label: 'Live · v1.0', tone: 'live' },
    summary:
      'Connect a GitHub account, sync repositories and pull requests, and get structured review findings — security, bug and style — each with a file, a line and a suggested fix.',
    problem:
      'Reviewers spend their attention on mechanical problems — a leaked key, an unsafe API, an obvious null dereference — before they reach the parts of a change that actually need judgement. That work is repetitive, and it is exactly the kind of work a deterministic rule set is good at.',
    solution:
      'Sign in with GitHub, import every repository you can access, and run a review on any pull request. The engine parses the diff, runs a rule set over the added lines only, optionally asks a language model for a second pass, then merges, de-duplicates and ranks the findings by severity. Findings are tied to file and line, can be dismissed and restored, and any pull request can be re-reviewed on demand or automatically when GitHub fires a webhook.',
    highlights: [
      {
        title: 'GitHub OAuth, no tokens to paste',
        body: 'One-click sign-in through NextAuth with database sessions. Access tokens are stored encrypted with AES-256-GCM rather than in plain text.',
      },
      {
        title: 'Repository and pull-request sync',
        body: 'Imports every repository the account can reach, with language, stars, visibility and recent pull requests. Sync is idempotent, so running it twice creates nothing twice.',
      },
      {
        title: '17-rule review engine',
        body: 'Deterministic rules for secrets, injection, XSS, unsafe APIs and common bugs. Rules run over added lines only, tracked to their line number in the new version of the file.',
      },
      {
        title: 'Optional AI pass that cannot fail the review',
        body: 'If a Gemini or OpenAI key is present, a model is asked for additional findings. If the model call fails, the rule-based review still completes and is still stored.',
      },
      {
        title: 'Findings that are actually actionable',
        body: 'Grouped by severity, filterable, dismissible and restorable, each with file:line, an explanation and a suggested fix.',
      },
      {
        title: 'Webhook reviews',
        body: 'GitHub notifies the app when a pull request is opened, reopened or updated, and the review runs automatically — no manual trigger needed.',
      },
    ],
    contribution:
      'Designed and built end to end: the Prisma schema, GitHub client and sync pipeline, the unified-diff parser, the rule engine and the LLM merge step, the Next.js UI and the Vitest suite.',
    stack: [
      'Next.js 16',
      'TypeScript',
      'Tailwind CSS v4',
      'NextAuth',
      'Prisma',
      'PostgreSQL',
      'Vitest',
      'GitHub REST API',
    ],
    links: [
      { label: 'Live demo', href: 'https://code-review-buddy-six.vercel.app/', kind: 'live' },
      {
        label: 'Source',
        href: 'https://github.com/Subhamdasskd/CodeReviewBuddy',
        kind: 'repo',
      },
      {
        label: 'Sample review',
        href: 'https://code-review-buddy-six.vercel.app/demo/review',
        kind: 'doc',
      },
    ],
    media: [
      {
        src: '/assets/projects/codereviewbuddy/dashboard.png',
        alt: 'CodeReviewBuddy dashboard showing repository, pull request, finding and high-severity counts above a grid of synced repositories.',
        width: 1440,
        height: 900,
        caption: 'The workspace after a sync — totals, then each repository with language, stars and pull requests.',
      },
      {
        src: '/assets/projects/codereviewbuddy/review.png',
        alt: 'A pull request review screen listing security, bug and style findings with file, line and suggested fixes.',
        width: 1440,
        height: 900,
        caption: 'A review, grouped by severity, with the file, the line and a suggested fix for each finding.',
      },
    ],
    shipped: [
      'GitHub OAuth sign-in',
      'Repository and pull-request sync',
      '17-rule review engine with optional AI pass',
      'Findings dashboard with severity filters',
      'Re-run a review on demand',
      'Webhook-triggered reviews',
      'Encrypted access tokens',
    ],
    notYet: [
      'Team analytics',
      'Custom rule sets',
      'Pattern memory across pull requests',
      'Slack and Jira integrations',
      'VS Code extension',
    ],
    challenge:
      'Unified-diff parsing. GitHub returns each changed file as a patch, but a review only cares about added lines — so the parser has to walk every hunk and map each retained line back to its number in the new version of the file. Get that arithmetic wrong and every finding points confidently at the wrong line, which is worse than no finding at all.',
    learned:
      'A review tool earns trust by being quiet and precise. Seventeen deterministic rules that fire rarely and correctly are worth more than an AI pass that comments on everything — which is why the rule engine runs first and the model is optional.',
  },
  {
    id: 'intervyu-ai',
    name: 'Intervyu AI',
    kicker: 'AI interview preparation and assessment',
    tier: 'featured',
    year: '2026',
    status: { label: 'Live · v1.0', tone: 'live' },
    summary:
      'A preparation platform that generates domain-specific interview questions, evaluates the answers and tracks how a candidate performs over time.',
    problem:
      'Interview practice is slow to give feedback. Recorded lectures and fixed question banks cannot respond to what a candidate actually said, so the gap between practice and a real interview never really closes.',
    solution:
      'A candidate picks a domain, answers generated questions, and receives scored feedback on each response. Sessions and results are persisted per user so progress is visible rather than assumed. The system is written up as a paper — see the Trophy Room.',
    highlights: [
      {
        title: 'Domain-aware question generation',
        body: 'Questions are generated per domain through the Gemini API instead of drawn from a static list.',
      },
      {
        title: 'Answer evaluation pipeline',
        body: 'Each response is assessed against its question and returned with structured feedback rather than a bare score.',
      },
      {
        title: 'Performance tracking',
        body: 'A MongoDB schema records session history per user, so improvement is something you can look at.',
      },
      {
        title: 'Modular service layer',
        body: 'An OOP-structured Express backend exposing REST endpoints for AI inference, session management and performance analytics.',
      },
    ],
    contribution:
      'Backend architecture and REST API design, the evaluation pipeline, the performance schema, and co-authorship of the paper describing the system.',
    stack: ['Node.js', 'Express.js', 'MongoDB', 'React.js', 'Gemini API', 'REST APIs'],
    links: [
      { label: 'Live demo', href: 'https://intervyuai.lovable.app/', kind: 'live' },
    ],
    media: [
      {
        src: '/assets/projects/intervyu-ai/01.jpg',
        alt: 'Intervyu AI landing page: the headline Crack your next interview with an AI coach, beside a dark panel of glowing 3D shapes and a 92 percent confidence badge.',
        width: 1600,
        height: 821,
        caption: 'The landing page - resume upload, role selection and mock interview practice.',
      },
    ],
    challenge:
      'Evaluation, not generation. Producing a plausible interview question is easy; deciding consistently whether an answer was good is the entire product, and it is where a language model has to be constrained rather than trusted.',
    learned:
      'Structured output beats prose. Once evaluation returned a schema — criterion, verdict, reasoning — the feedback became comparable across sessions instead of a paragraph someone has to interpret.',
  },
]

export const flagship = projects.find((p) => p.tier === 'flagship') ?? projects[0]

export const tierMeta: Record<
  Project['tier'],
  { label: string; metaphor: string; order: number }
> = {
  flagship: { label: 'Flagship', metaphor: 'Six', order: 0 },
  featured: { label: 'Featured', metaphor: 'Four', order: 1 },
  experimental: { label: 'Exploratory', metaphor: 'Single', order: 2 },
}
