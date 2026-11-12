# THE FINAL INNINGS — PHASE 0
## Source audit, verified profile, and creative blueprint for Subham Das

Prepared 12 November 2026 · Status: **awaiting approval — no code written yet**
Working directory: `C:\SKD Folder\Website Codes`

---

## 1. What I could actually access

| Source | Access | What I did with it |
|---|---|---|
| `Subham Das_Resume.pdf` (350 KB) | ✅ Full text extracted | Primary source for roles, skills, education, certifications |
| `Profile.pdf` (51 KB, "Resume generated from profile", LinkedIn export) | ✅ Full text extracted | Corroborates roles, adds current job, location, publication-adjacent skills |
| `github.com/Subhamdasskd` | ✅ Live via GitHub API | 15 public repos, 11 original, 4 forks. Live URLs, languages, last push dates |
| `www.linkedin.com/in/subham-das-skd` | ⚠️ Login-gated | **Not scraped.** The LinkedIn PDF substitutes for it. Nothing below comes from a page I could not read |
| `Intervyu AI Research Paper.pdf` | ✅ Full text extracted | Verified a real peer-reviewed-style paper with Subham as 3rd author |
| Profile photograph (1280×960 JPEG) | ✅ Inspected | Approved for use; landscape, subject left-of-centre, needs a crop |
| Local project folders (12 codebases) | ✅ Previously audited in `PROJECT-ANALYSIS.md`, re-read | Source of truth for the Projects section — much stronger than the resume's two projects |
| Project screenshots | ❌ **Not supplied** | Blocking for Phase 4 |
| Certificates (PDFs/images) | ❌ **Not supplied** | Cannot verify credential links |
| Company logos (Tata Technologies, Osian Soft Con, Tick my Work) | ❌ Not supplied | Will omit rather than hotlink third-party marks |

**Not accessible / not attempted:** private LinkedIn detail, any employer intranet, anything behind a login.

---

## 2. Verified professional profile

Everything in this section traces to a supplied document or a repository I inspected. Nothing is inferred.

### Identity
- **Name:** Subham Das
- **Current role:** Software Developer, **Tick my Work** — Hyderabad, Telangana, India · Sept 2026 – Present
- **Discipline:** B.Tech, Computer Science & Engineering · Data Science specialisation (per LinkedIn summary)
- **Base:** Hyderabad (current). Previously Pune, Jamshedpur, Greater Noida.
- **Links:** `linkedin.com/in/subham-das-skd` · `github.com/Subhamdasskd` · `subhamdasskd7808@gmail.com`
- **Phone:** `+91 74882 59574` — on both documents, held back pending your approval (see D9)

### Experience — 4 entries, 3 organisations

| # | Organisation | Title | Dates | Location | Verified substance |
|---|---|---|---|---|---|
| 1 | Tick my Work | Software Developer | Sep 2026 – Present | Hyderabad, IN | **LinkedIn only.** No responsibilities listed anywhere. Needs your input before it can appear (D3) |
| 2 | Tata Technologies | Software Engineering Intern *(resume)* / Intern *(LinkedIn)* | Feb 2026 – May 2026 | Pune, IN (on-site) | TENNECO project. Backend automation with OOP and structured data flows in an MES/SCADA environment. Playwright end-to-end test pipelines; code reviews; Agile SDLC |
| 3 | Osian Soft Con | Technical Product Owner, Freelance *(resume)* / Technical Product Manager *(LinkedIn)* | Nov 2025 – May 2026 | Remote | Product requirements and delivery for **IPAAQ**, a logistics and support platform doing invoice and PO management. AI chatbot integration; data annotation and model training. Hands-on code |
| 4 | Tata Technologies Limited | Web Developer Intern *(resume)* / Internship Trainee *(LinkedIn)* | Feb 2025 – May 2025 | Jamshedpur, IN | React interfaces; REST APIs on Node/Express with OOP service layers; MySQL/PostgreSQL complaint lifecycle; normalised schemas; role-based access. Resume claims **−30% query latency** (D5) |

### Education

| Qualification | Institution | Dates | Result |
|---|---|---|---|
| B.Tech, Computer Science & Engineering | IILM University, Greater Noida | Aug 2023 – Aug 2026 *(LinkedIn)* | CGPA **8.34** |
| B.Tech, Computer Science (year 1) | Graphic Era Hill University | Aug 2022 – Jul 2023 | Transfer year — LinkedIn only (D1) |
| Senior Secondary, Science (PCM + CS) | DAV Public School, Bistupur | Apr 2019 – Jul 2021 | CBSE **90%** |
| Secondary | Baldwin Farm Area High School, Jamshedpur | Mar 2018 – Apr 2019 | CBSE **89%** |

### Technical skills — grouped, no invented proficiency

- **Languages:** Java, Python, JavaScript, SQL
- **Web:** Node.js, Express.js, React.js, REST API design, Next.js *(from projects)*, TanStack Start *(from projects)*
- **AI & data:** Pandas, NumPy, LLM API integration (OpenAI, Gemini), prompt engineering, data annotation, model training
- **Databases:** MySQL, MongoDB, PostgreSQL *(from experience and projects)*
- **Tooling:** Git, GitHub, Postman, VS Code, Playwright, Prisma, Vitest, Claude Code *(LinkedIn top skill)*
- **Foundations:** OOP, DBMS, Agile/Scrum, data structures and algorithms

> No percentages, no "expert", no years-of-experience badges. The brief forbids fabricated ratings and I have no defensible numeric measure for any skill.

### Credentials and recognition

1. **"IntervyuAI: An AI-Driven Interview Assessment System"** — Vikas Kumar Tiwari, Tanuj Rai, **Subham Das** (3rd author), School of CSE, IILM University. Full paper supplied; MERN + Gemini, with an empirical user study. *The strongest single item you own and the resume omits it entirely.*
2. **Claude Academy — Claude Code 101** (LinkedIn)
3. **NPTEL — Ethical Hacking & Online Privacy**
4. **NPTEL — DBMS (SQL/DBMS)**, **Artificial Intelligence**, **Agile Development** — written as one run-on line on the resume; issuer and dates unconfirmed (D6)

### Projects — 8 real, inspectable builds

| Project | Stack | State (verified) | Repo | Live |
|---|---|---|---|---|
| **CodeReviewBuddy** — AI-assisted PR review for GitHub | Next.js 16, TypeScript, Prisma, PostgreSQL, NextAuth, Tailwind, Vitest | Repo sync and dashboard working (verified against live account: 16 repos synced); AI review engine not built | ✅ public | ✅ `code-review-buddy-six.vercel.app` |
| **Intervyu AI** — AI interview prep | Express, Mongoose, React 19, Gemini | Complete; needs Mongo URI + API key | ❌ | ❌ |
| **Smart Complaint Management System** | Node, Express, React, PostgreSQL | From resume; full complaint lifecycle, RBAC, normalised schema | ❌ | ❌ |
| **Maxx Café Pantry** — café inventory and orders | Express, Prisma, React | ~85%, layered backend + frontend, mid-migration to Postgres | ❌ | ❌ |
| **MRT Command Center** (Sonic Rail) | TanStack Start, Cloudflare | Recovered from corruption; `tsc` and production build pass | ❌ | ❌ |
| **Team Task Hub** | TanStack Start, Express, SQLite, JWT | ~90%; 12 endpoints, RBAC, seeded demo users; one known priority-mapping bug | ✅ public | ❌ |
| **Boss Dashboard** — task/CR tracker | Next.js 16, Supabase | ~80%; visible placeholders, key hardcoded — **do not deploy as-is** | ❌ | ❌ |
| **Campus Companion AI** — campus chat assistant | TanStack Start, Supabase, AI SDK | Feature-complete; dependencies never installed | ❌ | ❌ |

Excluded: **IPAQ** (ASP.NET WebForms / PHP ERP) — an employer/freelance system, not yours to publish. **Leetcode**, **OS-Lab-Codes**, **IILM_E2*** — coursework, not portfolio material.

Only **one** project has a live URL and only **two** have public repos. That constrains the Projects scene, and I will not fake the rest.

### Counts the "player statistics" strip will derive automatically
4 roles · 3 organisations · 8 projects · 1 live demo · 2 public repos · 1 publication · 5 certifications · 1 degree · CGPA 8.34 · 15 public repos

---

## 3. Conflicts and gaps — decisions needed

Each of these is a real contradiction or hole in your sources. None of them will be papered over.

- **D1 · Education dates.** Resume: IILM 2022–2026. LinkedIn: Graphic Era 2022–2023, then IILM 2023–2026. **Recommendation:** show IILM Aug 2023 – Aug 2026, and either omit the transfer year or add it as a one-line note. A recruiter who checks LinkedIn will otherwise spot the mismatch.
- **D2 · Osian Soft Con title.** Resume says *Technical Product Owner (Freelance)*; LinkedIn says *Technical Product Manager*. **Recommendation:** use the LinkedIn title and keep "Freelance" — LinkedIn is the version a recruiter verifies against.
- **D3 · Tick my Work is an empty shell.** Your current role has no description anywhere. This is the **biggest content gap** — it is the first thing every visitor reads. I need 2–4 bullets (what you build, stack, team, one concrete thing you shipped).
- **D4 · Two Tata Technologies titles for two different internships.** "Software Engineering Intern" and "Web Developer Intern" — fine, they are different years. Confirm both titles are correct as written.
- **D5 · Unverifiable performance metrics.** Resume claims "reduced query latency by 30%" and "reducing interview preparation errors by 40%". Neither is measurable from anything supplied, and the paper reports *different* numbers (+25% / +23% / +22% / 4.65-out-of-5). **Recommendation:** drop both resume percentages; describe the mechanism instead ("normalised schema and indexed queries for the complaint lifecycle"). Keep the paper's figures only if you can attach the paper.
- **D6 · NPTEL certification ambiguity.** One line reads "Database Management Systems (SQL/DBMS), Artificial Intelligence, Agile Development | NPTEL: Ethical Hacking". Are the first three also NPTEL? Do certificates exist with IDs and dates? I need issuer, date and credential URL for each, or the item gets dropped.
- **D7 · Publication metadata.** I have the title, authors and affiliation. I do **not** have the venue, year, DOI or a link. Needed before it goes in the trophy room.
- **D8 · No screenshots.** Phase 4 requires real UI. I will not substitute stock imagery or mock up a fake interface. Two options: you capture 2–3 screenshots per project, or those cards ship text-only with a designed "scorecard" treatment — no fake app chrome.
- **D9 · Private contact details.** Phone, home address and personal email are all in the PDFs. **Recommendation:** publish email + LinkedIn + GitHub only; omit phone and address entirely.
- **D10 · Brand name semantics.** "THE FINAL INNINGS" reads as *the last innings* — a retirement frame. For someone three months into their first full-time role it undersells you. **Options:** keep it as the given brief; or **"FIRST INNINGS"** / **"OPENING INNINGS"**, which fit a career that is starting. Your call, and I will build whichever you choose.
- **D11 · Palette tension.** The brief specifies charcoal + stadium green + electric lime. Your employer's mark is navy + orange. **Recommendation:** keep the stadium palette (it is yours, not their brand) and use no employer colours at all.
- **D12 · Project build order.** Eight projects, but only CodeReviewBuddy is genuinely demonstrable. Recommending we lead with it, carry Intervyu AI on the paper's credibility, and group the rest honestly by state.

---

## 4. Creative direction

### 4.1 The idea, in one line
A **night broadcast of a career**, not a cricket fan page. The chrome is a premium sports broadcast package — lower thirds, score bug, match centre, ball-by-ball strip. The payload is completely literal, plain-English professional information. **Every cricket label is paired with its real meaning**, always, in the same visual unit.

### 4.2 Palette

| Token | Hex | Use |
|---|---|---|
| `--ink-950` | `#080B0A` | Page background |
| `--ink-900` | `#0D1211` | Raised surfaces |
| `--pitch-900` | `#0C1A13` | Stadium green, secondary surface |
| `--pitch-700` | `#123024` | Field fills, hairlines on dark |
| `--lime-400` | `#C6FF3D` | Live indicators, primary CTA, focus ring |
| `--chalk` | `#F3F0E8` | Primary text |
| `--ash-400` | `#8D938C` | Supporting text (6.3:1 on ink-950) |
| `--gold-400` | `#E2B23F` | Records, trophies — max 5% of any screen |
| `--ball-500` | `#B4232F` | Single accent for the ball/impact only |

Discipline: lime appears **once per viewport**. Gold only in the trophy room. No gradients except one radial floodlight bloom, used twice in the whole site.

### 4.3 Typography

- **Display — Archivo Expanded (variable, 700–800).** Condensed-grotesque authority; reads as broadcast furniture, not a startup landing page.
- **Statistics — IBM Plex Mono, tabular numerals.** Scoreboard digits must not shift width when they animate. This is non-negotiable for the digit-roll.
- **Body — Inter (variable).** Legibility first; form labels, project copy, resume text.
- Scale: `11 / 13 / 15 / 17 / 21 / 28 / 38 / 52 / 72 / 104px` with fluid `clamp()` only above 38px.
- Self-hosted via `@fontsource-variable/*`, `font-display: swap`, two files max preloaded.

### 4.4 Motion language

Three verbs, nothing else:

1. **Bloom** — light arriving. Floodlights, section reveals, focus rings. `expo-out`, 560–900 ms.
2. **Roll** — mechanical precision. Scoreboard digits, ball-by-ball strip, counters. `quint-in-out`, 120–320 ms.
3. **Impact** — one sharp hit. Ball contact, six reveal, trophy settle. 90 ms overshoot then 140 ms settle.

Tokens: `--ease-bloom: cubic-bezier(.16,1,.3,1)` · `--ease-roll: cubic-bezier(.83,0,.17,1)` · `--ease-impact: cubic-bezier(.2,1.6,.4,1)`.
Durations `90 / 160 / 240 / 400 / 640 ms`.

Hard rules: transform and opacity only; no scroll hijacking; nothing animates after it leaves the viewport; every scene's content is fully present at `prefers-reduced-motion: reduce`; a visible **Motion: On/Off** toggle in the match centre persists to `localStorage`.

### 4.5 The signature device — the "translation line"

Every cricketing label carries its literal meaning directly beneath it, in mono, at small size. It is one component, reused everywhere:

```
CAREER INNINGS
PROFESSIONAL EXPERIENCE · 4 ROLES
```

This single pattern is what stops the site becoming a gimmick. It is also the honest answer to "will a recruiter understand this?"

---

## 5. The visitor journey

Single scrolling experience, 10 scenes, two routes (`/` and `/recruiter`). Every scene is reachable in one click from the match centre; nothing is gated behind animation or gameplay.

| # | Scene | Cricket frame → real content | Primary action | Reduced-motion / low-power version |
|---|---|---|---|---|
| 1 | **Stadium opening** | Floodlights on in four stages, haze, ball sweeps across frame → name, verified title, tagline | **ENTER THE STADIUM** | Static lit-stadium still, content immediately visible, no auto-advance |
| 2 | **Live scoreboard** | Match card → player profile: photo, intro, education, current focus, interests | **VIEW RESUME** · **EXPLORE CAREER** | Scoreboard renders complete, no digit roll |
| 3 | **Career innings** | Match timeline → 4 roles with real titles, dates, locations, responsibilities, stack | Expand any match card | Cards all expanded, no scroll-triggered reveal |
| 4 | **Boundary shots** | Interactive ground, 8 markers in 3 tiers → 8 projects with honest state labels | Select marker → detail panel | Ground replaced by the list view, identical content |
| 5 | **Player attributes** | Attribute panels grouped by discipline → real skills, each labelled with *where you used it* | Filter by category | Static grouped lists (default view) |
| 6 | **Trophy room** | Display cases → publication, certifications, degree, CGPA | Open a case | Grid of cases, no rotation |
| 7 | **Take your shot** | Playable 2D cricket game | **PLAY** (also `G`) | Playable without ball trail or particles; results announced in text |
| 8 | **Beyond the boundary** | → watching sport, video games, learning goals | — | Static |
| 9 | **Post-match interview** | Press room → contact | Email / LinkedIn / GitHub + form | Static |
| 10 | **Player card** | Trading card with photo, title, skills, links → **DOWNLOAD RESUME** (the real PDF) | Download / share card | Static |

Plus, outside the scroll: **match centre** (persistent, collapsible, section progress), **recruiter view** (`/recruiter`, low-motion summary page, reachable from the header on every screen), **accessibility panel** (motion, sound, contrast), **command palette** (`Ctrl/⌘+K` → jump to any scene or project).

---

## 6. Technical architecture

### 6.1 Stack — and one deliberate deviation

| Layer | Choice | Why |
|---|---|---|
| Build | **Vite + React 19 + TypeScript** | Static output, fast HMR, no SSR complexity for a single-page experience |
| Styling | **CSS Modules + design tokens in `:root`** | No Tailwind: this design needs precise control over scoreboard geometry and broadcast alignment |
| Routing | **react-router** — 2 routes | `/` and `/recruiter`. Deep-linkable project panels via `?project=slug` |
| Scene motion | **GSAP + ScrollTrigger** | Coordinated floodlight sequence and timeline progression; unmatched timeline control |
| Component motion | **Motion (Framer Motion)** | Panel/dialog/drawer transitions, layout animation, exit states |
| Game | **Canvas 2D, hand-written loop** | Deterministic timing, 60 fps on mid-range mobile, ~6 KB |
| Icons | **lucide-react** | Tree-shaken, consistent stroke |
| Fonts | **@fontsource-variable** | Self-hosted, no third-party request, no FOUT flash of wrong face |

**Deliberate deviation: no Three.js / WebGL in v1.**

The brief lists R3F as preferred. I am recommending against it for launch, and here is the honest trade-off: a WebGL stadium competes with the LCP, needs a 3D artist to look premium rather than amateur, doubles the fallback surface, and drains mobile batteries — for a scene visitors see for four seconds. A layered CSS/SVG/canvas composition with real lighting gradients and a canvas particle field can look 90% as good at 5% of the cost. **If you want the 3D ball/stadium, it becomes an optional Phase 8 module loaded behind an interaction, with the 2D version as the default.** I will not build a mediocre WebGL scene and call it cinematic.

### 6.2 Structure

```text
the-final-innings/
├─ public/
│  ├─ resume/subham-das-resume.pdf        # the supplied PDF, unmodified
│  ├─ og/og-card.jpg
│  └─ favicon.svg
├─ src/
│  ├─ app/            App.tsx · routes.tsx · providers.tsx
│  ├─ sections/       StadiumIntro · ScoreboardProfile · CareerInnings
│  │                  ProjectGround · PlayerAttributes · TrophyRoom
│  │                  TakeYourShot · BeyondBoundary · PostMatch · PlayerCard
│  ├─ components/
│  │  ├─ broadcast/   ScoreBug · LowerThird · TranslationLine · BallByBallStrip
│  │  ├─ layout/      MatchCentre · SectionShell · PageFrame
│  │  ├─ game/        GameCanvas · GameHUD · GameInstructions · useGameLoop
│  │  ├─ projects/    GroundSVG · ProjectMarker · ProjectPanel · ProjectList
│  │  └─ a11y/        MotionToggle · SoundToggle · SkipLink · LiveRegion
│  ├─ data/           profile · experience · education · projects
│  │                  skills · achievements · socialLinks · resume
│  ├─ hooks/          useReducedMotion · useMediaQuery · useLocalStorage
│  │                  useActiveSection · usePersistedSetting
│  ├─ lib/            audio (synthesised) · seo · prng · format
│  └─ styles/         tokens.css · global.css · type.css · motion.css
└─ docs/              phase-0-blueprint.md · content-decisions.md
```

Content lives **only** in `src/data/*.ts`, typed by `data/types.ts`. Counts in the stats strip, the trophy total and the project tiers are all derived with `Array.length` — never typed by hand — so editing one file updates the site.

### 6.3 Accessibility contract (built in, not retrofitted)

Semantic landmarks and one `h1`; skip link to `#main`; visible `:focus-visible` ring at 3px lime with 2px offset on every interactive element; dialogs trap focus, restore it on close, and close on `Esc`; the game never captures `Space` unless the game region has focus and the user pressed **Start**; outcomes announced through a polite live region; every text token meets 4.5:1 (body `--chalk` on `--ink-950` is 17.4:1, `--ash-400` is 6.3:1, lime on ink is 16.7:1); nothing conveyed by colour alone — outcomes carry icon + word; full keyboard parity for the ground (markers are real buttons in a roving-tabindex group, not SVG hit areas); `prefers-reduced-motion` honoured at the CSS layer *and* the GSAP layer; no sound before a user gesture, ever.

### 6.4 Contact form — the honest version

There is no backend. Two options:

- **A (recommended for launch):** a real form with full validation that composes a `mailto:` and tells the visitor plainly — *"This opens your email client; no data is sent to a server."* Slightly more friction, zero infrastructure, zero provider dependency, and it cannot silently fail.
- **B:** a serverless function + Resend/Web3Forms free tier. Needs an API key and your sign-off on a third party receiving submissions.

I will not ship a form that fakes a success state. Choose in D13.

---

## 7. The mini-game: **TAKE YOUR SHOT**

Not decorative. One over, six balls, decided entirely by your timing.

### 7.1 Loop

Bowler runs in → ball releases → travels toward the crease over a **950–1250 ms** window (varies per delivery by line and length, telegraphed by the bowler's animation) → you swing → outcome resolves → ball-by-ball strip updates → next ball. Six balls. Result screen with a shareable scoreline and a **Play again**.

### 7.2 Timing is the only input

`Δ = t_press − t_impact` in milliseconds. No randomness in the outcome — the same timing always produces the same result, which is what makes it feel fair and learnable.

| |Δ| | Outcome | Feedback |
|---|---|---|
| ≤ 35 ms | **SIX** | Full impact frame, bat swing, crowd swell (if sound on) |
| 36–80 ms | **FOUR** | Boundary sweep |
| 81–140 ms | **2 runs** | Placed into the gap |
| 141–200 ms | **1 run** | Nudged away |
| 201–260 ms | **Dot ball** | Played and missed |
| > 260 ms or no swing | **Dot**, or **WICKET** if the delivery was a "straight one" | Late/early indicator shown on screen |

Swinging **before release** is a wicket (bowled, playing too early). Three consecutive dots triggers a visible "pressure" state and slightly faster deliveries — a difficulty curve, not a fake metric.

On-screen: `RUNS 0/0 · OVERS 0.0 · SR 0.0 · SIXES 0 · BALLS ●●●○○○`.
Controls: `Space` / `Enter` / click / tap the **SWING** button. `R` restarts. `Esc` leaves. A 3-step tutorial overlays the first time and is skippable and reopenable.

### 7.3 Fairness and honesty
- Delivery speed is displayed as a *game* number, never presented as a real statistic.
- High score is `localStorage` only, labelled *"Saved on this device only — nothing is sent anywhere."*
- A six reveals a featured project card **once per session**. Every project is always reachable without playing. The game is a shortcut, never a gate.

### 7.4 Sound
Synthesised with the Web Audio API — a filtered noise burst for the bat crack, a shaped envelope for the crowd. **Zero audio files, zero licensing risk, zero payload**, off by default, opt-in, with a persistent mute in the match centre. If it sounds cheap in Phase 6, it gets cut rather than shipped half-done.

---

## 8. Performance, mobile, and recruiter speed

- **Budget:** ≤ 180 KB JS gzip for the initial route; game and recruiter route code-split; LCP ≤ 2.0 s on a throttled mid-tier mobile profile; CLS < 0.02.
- Scene 1 is pure CSS/SVG plus one canvas — no image waits, no font-blocked render.
- The game canvas is created only when the game scrolls into view and its loop `pause()`s on `visibilitychange` and on exit from viewport.
- GSAP timelines and ScrollTriggers are killed on unmount; one `IntersectionObserver` per section, not per element.
- Images: the photograph exported at 3 widths in AVIF/WebP with a JPEG fallback, `width`/`height` always set, `loading="lazy"` below the fold.
- **Recruiter path:** a persistent **QUICK PROFILE** button in the header on every viewport → `/recruiter`, a single column, no motion, no canvas, no game: summary, all four roles, grouped skills, eight projects, education, download, links. Under 60 seconds to read. This is the page most visitors will actually use, so it gets designed properly rather than left as a fallback.
- **Reduced data / no WebGL / no JS at all:** content is real HTML; with JS disabled the scores, roles, projects and links all still read (motion and the game degrade to a static graphic and a note).

---

## 9. Delivery plan

| Phase | Deliverable | Gate |
|---|---|---|
| **0** | This document | **You approve, and answer D1–D13** |
| **1** | Project skeleton, tokens, type system, data files with your real content, `/recruiter`, match centre shell, a11y primitives | `npm run build` clean, all content renders |
| **2** | Stadium intro, floodlight sequence, skip, sound scaffold, responsive + reduced-motion fallbacks | Intro never blocks access |
| **3** | Scoreboard profile + career innings + resume download | Content re-verified against sources |
| **4** | Interactive ground + panels + accessible list view | Needs screenshots (D8) |
| **5** | Attribute panels + trophy room | No fabricated claims |
| **6** | The game | Playable on keyboard, mouse, touch, reduced motion |
| **7** | Beyond the boundary, contact, player card, share card | No dead links, honest form |
| **8** | Polish, Lighthouse run, real device tests, WebGL module *if* approved | Report measured scores, not hopes |
| **9** | Deploy to Vercel, domain and metadata guidance | Pre-launch checklist signed off |

Each phase ends with a **test checklist for you to run** and a short implementation log: done / pending / known issues / next.

---

## 10. What I need from you

**Content (blocking Phase 3):**
1. **D3** — 2–4 bullets on your current Tick my Work role.
2. **D1, D2, D4** — sign off the education dates and the two title conflicts.
3. **D6, D7** — certification issuers, dates and credential links; the paper's venue and DOI.

**Decisions (blocking Phase 1):**
4. **D10** — keep **THE FINAL INNINGS** or switch to **FIRST INNINGS**?
5. **D12** — the 8-project shortlist: lead with CodeReviewBuddy, carry Intervyu AI on the paper, group the other six by state?
6. **D13** — contact form: `mailto:` fallback (A) or serverless + Resend (B)?
7. **D9** — publish email + LinkedIn + GitHub only, or include the phone number?
8. **D5** — drop the two resume percentages and keep the paper's reported figures?
9. **WebGL** — accept the no-WebGL v1 with an optional 3D module later, or insist on 3D from Phase 2?

**Assets (blocking Phase 4):**
10. **D8** — project screenshots (2–3 per featured project), or accept text-only scorecards?

**Nice to have, not blocking:** a clean portrait crop permission for the player card; company logos; any awards or hackathons not in the documents; a domain you own.

---

## 11. Implementation log

**Completed:** every supplied source read and cross-checked; GitHub and the 12 local codebases corroborated; verified profile, counts and project states written down; discrepancies isolated; visual identity, scene map, architecture, game design and delivery plan drafted.

**Pending:** your approval, D1–D13, screenshots.

**Known issues:** current employer role has no content; five certifications unverified; only one project is publicly demonstrable; the photograph needs a crop for card and portrait use; the brand name may misframe a career that is beginning rather than ending.

**Next step:** phase 1 scaffold once D1–D13 are answered. Say **"approved"** and answer what you can — I will build against the remaining defaults and mark anything I had to assume.
