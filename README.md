# FIRST INNINGS

An immersive cricket-broadcast portfolio for **Subham Das** — Software Developer.

> Every great career starts with an innings. Here's mine.

Two routes:

| Route | What it is |
|---|---|
| `/` | The full broadcast experience: hero, career innings, project boundary, player attributes, trophy room, contact |
| `/recruiter` | A low-motion, printable quick profile designed to be read in under a minute |

Every cricketing label is followed by its plain-English meaning. Nothing on the site invents a metric, a skill rating, an award or a live demo.

---

## The experience

**Scene 00 — the entrance.** The home route opens on a floodlit stadium drawn entirely in the DOM: an SVG bowl with four curved tiers, four floodlight towers that strike in sequence behind the roofline with their cones and bloom in front, drifting haze, mown grass, and a cricket ball crossing the frame. `ENTER THE STADIUM` pushes the camera in and wipes to the hero; `SKIP INTRO` leaves immediately. Either way the visitor lands on content that is already painted.

- Plays **once per tab session**, never on `/recruiter`, never on a deep link with a hash.
- Force it any time with `?intro=1`.
- Replay it from the match centre — desktop icon at the far right of the bar, or the button in the mobile sheet.
- With reduced motion it renders fully lit and static, with no ball and no transition.

**Sound** is off until the speaker button in the header is pressed, and stays off across reloads until pressed again. Every sound is synthesised with the Web Audio API — there are no audio files in the repository.

**Navigation** is a broadcast match centre pinned to the foot of the viewport, not a conventional navbar: team block, section index, live position and a scroll-progress rail. It stays hidden until you scroll past the hero. Below 900 px it becomes a compact pill that opens a full-screen sheet.

---

## Stack

- **React 19** + **TypeScript**, built with **Vite 8**
- **react-router** — two routes
- **CSS Modules-free, token-driven CSS** (`src/styles/`) — no Tailwind, so scoreboard geometry stays exact
- **lucide-react** for interface icons; GitHub and LinkedIn marks are hand-drawn SVGs
- **Self-hosted fonts** via Fontsource: Barlow Condensed (display), Archivo Variable (body), IBM Plex Mono (data)
- **Zero WebGL** in v1 — by decision, for performance. CSS/SVG/canvas only.

`motion` and `gsap` are installed and reserved for the Phase 2 stadium sequence and Phase 4 ground animation. Nothing imports them yet, so they are not in the bundle.

---

## Commands

Run from `the-final-innings/`:

```bash
# install (pnpm; npm works too)
pnpm install

# development server — http://localhost:5173
pnpm dev

# type-check and production build → dist/
pnpm build

# serve the production build — http://localhost:4173
pnpm preview

# type-check only
pnpm typecheck
```

Windows note: if `tsc` is not on PATH, use `node ./node_modules/typescript/bin/tsc --noEmit -p tsconfig.json`.

---

## Structure

```text
src/
├─ app/            App.tsx (routes + intro gate) · providers.tsx (motion, sound)
├─ sections/       Hero · StatsStrip · PlayerProfile · CareerInnings
│                  BoundaryShots · PlayerAttributes · TrophyRoom · PostMatchInterview
├─ components/
│  ├─ a11y/        SkipLink · MotionToggle · SoundToggle
│  ├─ broadcast/   BallMark · BrandMarks
│  ├─ intro/       StadiumIntro (scene 00)
│  ├─ layout/      Header · Footer · SectionHead · Sheet
│  ├─ navigation/  MatchCentre
│  └─ projects/    ProjectsProvider · ProjectDialog · ProjectSlate
├─ data/           profile · experience · education · projects
│                  skills · achievements · site · resume · types
├─ hooks/          usePersistedSetting · useMediaQuery · useActiveSection
│                  useScrollProgressVar
├─ lib/            audio (synthesised) · cx · motion
├─ pages/          Home · Recruiter · NotFound
└─ styles/         tokens · base · components · layout · navigation · intro
                   sections · pages
```

---

## Editing content

Everything is in `src/data/`. No component holds copy.

| File | Contains |
|---|---|
| `profile.ts` | Name, role, tagline, summary paragraphs, location, focus areas, photo paths |
| `experience.ts` | Every role: title, organisation, dates, location, bullets, stack |
| `education.ts` | Degree and schooling, including the two-phase B.Tech note |
| `projects.ts` | All eight projects, tiers, status, links, screenshots, shipped / not-yet |
| `skills.ts` | Five discipline groups plus core CS; `usedIn` links a skill to a project id |
| `achievements.ts` | Publication, certifications, academic record |
| `site.ts` | Social links, navigation, and the derived statistics strip |
| `resume.ts` | Resume path and download filename |

**Counts are derived.** `site.ts` computes the statistics strip from the arrays — add a project and the "Projects built" number changes. `orgId` on each experience entry exists so "Tata Technologies" and "Tata Technologies Limited" count as one employer.

**Anything unverified is visible.** Certifications with an unknown issuer render an `UNVERIFIED` chip and carry a `pending` string. Projects with no deployment show "No public link" instead of a dead button.

---

## Accessibility and motion

- Skip link, landmarks, one `h1` per page, visible focus ring on every interactive element.
- The intro is a modal dialog and the app shell behind it is `inert`, so focus cannot escape and the background is hidden from assistive technology. Focus moves to ENTER on mount; Escape skips.
- Dialogs use the native `<dialog>` element in modal mode, so focus trapping, `Esc` and focus restoration are the browser's job.
- The motion toggle persists to `localStorage` and mirrors onto `<html data-motion>`. It overrides `prefers-reduced-motion` in both directions.
- With motion off, every `[data-reveal]` element is visible and the intro renders static — no section can be stranded at `opacity: 0`.
- Sound never autoplays. It requires an explicit press and a persistent mute control sits in the header.
- Contrast: body `#F3F0E8` on `#080B0A` is 17.4:1; supporting text 6.3:1; lime on ink 16.7:1.
- The recruiter view prints in black on white.

### Storage keys

| Key | Where | What |
|---|---|---|
| `fi.motion` | `localStorage` | `'system' \| 'on' \| 'off'` |
| `fi.sound` | `localStorage` | `true` once the visitor enables sound |
| `fi.intro.seen` | `sessionStorage` | `'1'` once the intro has been entered or skipped |

No analytics, no cookies, no third-party requests.

---

## Deployment

Static output in `dist/`. Vercel, Netlify or Cloudflare Pages all work with no configuration:

- **Build command:** `pnpm build`
- **Output directory:** `dist`
- **Environment variables:** none yet

`index.html` carries placeholder canonical and Open Graph URLs (`https://subhamdas.dev/`). Replace them with the real domain before launch.

Because the app uses client-side routing, the host needs an SPA rewrite: serve `index.html` for any unmatched path so `/recruiter` resolves on refresh.
