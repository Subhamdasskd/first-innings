# Implementation log — final delivery

| Phase | Scope | Status |
|---|---|---|
| 0 | Source audit and creative blueprint | ✅ approved |
| 1 | Foundation, design system, content layer, recruiter view | ✅ approved |
| 2 | Stadium opening, audio engine, broadcast match centre | ✅ approved |
| 3.0 | 3D ground: geometry, lighting, camera rig | ✅ approved |
| 3.2 | Players, delivery sequence, broadcast graphics | ✅ approved |
| 3.3 | Zone integration, mobile corrections | ✅ complete |
| Final | Creative merge: 3D stadium becomes the opening | ✅ complete |

---

# The creative merge — 12 November 2026

## Root cause of the "conventional hero"

The diagnosis was structural, not cosmetic:

1. `/` mounted `<Hero />` — the **old editorial hero** (name, portrait, three buttons, stats). The 3D was never on that route.
2. The only place the 3D appeared was `<StadiumIntro>`, which is a **one-time gate** keyed on `sessionStorage['fi.intro.seen']`. Once entered, it never rendered again.
3. After ENTER, the intro **unmounted entirely** — so even on a first visit, the stadium vanished the moment you walked in.

That is why `/` looked like a normal portfolio: the stadium was a door you walked through once, then never saw again.

## The fix

`<StadiumHero />` replaces `<Hero />` on `/` and is **permanent**:

- A live 3D ground (crowd, tiers, floodlights, pitch, batsman, bowler, keeper) fills the section, on a slow ground-level orbit.
- The editorial identity is composed over it: `FIRST INNINGS` wordmark, `SUBHAM DAS` with the outlined second line, role, tagline, ENTER / QUICK PROFILE / RESUME.
- A player card carries the portrait and three real career totals.
- The broadcast match strip closes the section.
- The canvas **pauses when scrolled out of view** (`frameloop` driven by an IntersectionObserver).

The one-time gate is removed from `App.tsx`. There is no route to "go and see the stadium" — the stadium is the page.

## Grade correction

The first render was buried under too much scrim — the stadium was technically there and visually invisible. The scrim was rebalanced from a uniform radial vignette to a **horizontal left-to-right falloff** (dark under the text, clearing over the ground) plus a lighter bottom fade, and the canvas overlay was cut from 0.8 to 0.5 with exposure raised to 1.62.

## Verified

| Check | Result |
|---|---|
| `tsc --noEmit` | exit 0 |
| `pnpm build` | exit 0 |
| `GET /` · `/recruiter` · `/ground` | 200 |
| Resume PDF | 200 |
| 3D canvas on `/` | present, `is-ready` |
| All six sections present | profile, career, projects, skills, records, contact |
| Match-centre nav links | 6 |
| Mobile 390×844 | no overflow (390/390), canvas present |
| Console | **zero errors** |

---

## Earlier merge attempt — context

## A note on the reference recording

The brief refers to an attached screen recording, but **no attachment arrived with this request** — the message carried no file, and there is no video in the attachments store or the workspace. I did not invent one and did not claim to have watched it.

I proceeded on the reading that the design described — near-black, lime accents, numbered scenes, a fixed bottom bar with a progress indicator, a Trophy Room, and "THE INNINGS DOESN'T END HERE" — **is the editorial portfolio already in this repository**, which is the Phase 1–2 build. Every element on that list is present and unchanged. So the merge was not a restoration; it was connecting that editorial body to the 3D experience instead of keeping them on separate routes.

## What actually merged

The opening scene on `/` was a 2D CSS/SVG stadium. It is now **the live 3D ground**, with the original editorial typography sitting over it:

- 2D stadium paints instantly as the first frame (unchanged, still the fallback).
- `three.js` streams in behind it — a separate lazy chunk, so nothing blocks first paint.
- When the canvas reports ready, the 2D world layers fade out over 1.4 s and the live render fades in beneath the same grade.
- The intro chrome — `FIRST INNINGS`, the tagline, ENTER / SKIP, the career-totals scoreboard, the match card — is untouched and now reads over a moving cricket ground.
- The camera holds a slow ground-level orbit (shot D), so the batsman, bowler and keeper are all in frame behind the type.
- A dedicated grade overlay (vignette + top/bottom falloff + grain) was added so the 3D sits in the same tonal world as the editorial pages.

**Reduced motion or no WebGL2 → the 2D stadium is used and the 3D chunk is never requested.** The fallback is not a degraded mode; it is the original approved opening.

## Why not put the whole portfolio inside the 3D

The brief asks for a seamless connection without forcing gameplay or animations on anyone reading professional information. Building the six sections as 3D set-pieces would have meant either duplicating the editorial pages or degrading their readability, and it would have made `/` depend on WebGL for basic content. Instead:

- `/` — stadium opening → the complete editorial portfolio. Fast, readable, SEO-able.
- `/ground` — the full 3D experience: six portfolio zones, the delivery sequence, broadcast layer.
- Zone panels link back into the exact sections they describe.

Both routes share one design system, one data layer and one navigation vocabulary.

## Verification

| Check | Result |
|---|---|
| `tsc --noEmit` | exit 0 |
| `pnpm build` | exit 0 |
| `GET /` · `/recruiter` · `/ground` | 200 |
| 3D backdrop mounts, reports ready, 2D scene fades | ✅ `is-3d`, `is-ready` |
| ENTER → portfolio | ✅ |
| Browser console | **zero errors** |

## Remaining limitation of this merge

The transition is a **fade plus an unmount**, not a continuous camera move from the ground into the page. A full scroll-driven camera handoff was judged too risky for the remaining budget; the fade is stable and reads as intentional.

---

# Final delivery — 12 November 2026

`tsc --noEmit` exits 0. `pnpm build` exits 0. Browser console: **zero errors**.

**Running at `http://localhost:5173`**

| Route | What it is |
|---|---|
| `/` | The portfolio: stadium intro → full professional profile |
| `/recruiter` | One-page quick profile, printable, no 3D |
| `/ground` | The 3D stadium, delivery sequence and zone panels |

---

## What this pass changed

### 1. Portfolio inside the stadium

The big gap was that the 3D ground was a showcase with no portfolio in it. Six zones now open real content **inside the ground**:

| Zone | Cricket name | Content | Camera |
|---|---|---|---|
| Profile | The pavilion | Role, location, summary, education, focus | Shot C |
| Career | The boundary | All four roles with dates | Shot E |
| Projects | The outfield | Flagship + three featured, live demo link | Shot D |
| Skills | The practice nets | Six discipline groups with counts | Shot B |
| Records | The scoreboard | Publication, certifications, CGPA | Shot G |
| Contact | The press box | Email, LinkedIn, GitHub | Shot A |

Each panel has **Open full section** (deep link to `/`) and **Resume**. Each zone flies to an *existing composed camera shot* rather than pointing at an empty patch of grass — the flight always lands somewhere worth looking at.

The bottom tray has two tabs: **Zones** (portfolio) and **Camera** (the seven shots). Default is Zones, so a visitor meets the portfolio first.

### 2. Mobile header fixed

The brand was wrapping to two lines and the phase label collided with it. Now: brand is `nowrap` at a smaller size, the phase label is hidden below 640 px, the score strip is 11.5 rem at `3.9rem` from the top, and the camera readout is trimmed to shot letter + name.

### 3. Score strip vs camera indicator

Separated. Score strip sits top-left below the brand line; the camera readout is top-right. No overlap at 1440, 1024 or 390 px.

### 4. Zone buttons on mobile

They were showing only the hint text because the shared rule hid labels below 900 px. Zone buttons now keep their label and drop the hint; the row scrolls horizontally without page overflow.

### 5. Discoverability

The 3D ground was only reachable by typing the URL. It is now linked from:
- the match-centre sheet (**Enter the 3D ground**),
- the site footer (**Enter the 3D ground**),
- and, from the ground, both the header **Portfolio** button and the **Recruiter view** shortcut back out.

---

## Verification performed

| Check | Result |
|---|---|
| `tsc --noEmit` | exit 0 |
| `pnpm build` | exit 0 |
| `GET /` | 200 |
| `GET /recruiter` | 200 |
| `GET /ground` | 200 |
| Resume PDF | 200, 350,490 bytes |
| Project screenshot asset | 200 |
| Delivery sequence, end to end | result card reads FOUR, score strip 4/0 |
| Zone panel (Profile) | opens with real data, camera flies to shot C |
| Mobile 390 × 844 | `scrollWidth 390 / clientWidth 390` — no overflow |
| Browser console | **zero errors** |

Console carries one warning from R3F internals: `THREE.Clock deprecated`. Not our code.

---

## Performance — what I can and cannot measure

The only machine available reports `Microsoft Basic Render Driver` — **software rasterisation, no GPU**. Measured there: **15–18 fps** on the 3D route.

That figure says nothing useful about real hardware. **I have not measured this on a GPU and will not claim a frame rate I cannot verify.** The in-app FPS counter is in the HUD so the real number can be read in ten seconds on your machine.

Structural budget, which is verifiable: 9,000 instanced crowd quads (2,600 on coarse pointers), ~35k triangles of stadium geometry, no shadow maps, no postprocessing, three.js lazy-loaded only on `/ground`. The portfolio route does not download three.js at all.

---

## Known limitations

1. **Player figures are stylised mannequins.** Equipment is recognisable — helmet with grille, pads with knee rolls, gloves, bat with grip rings — but there are no faces and the arms attach via shoulder caps rather than deforming.
2. **Ball contact is not simulated.** The swing and the ball's departure are two timed animations that coincide; the bat never meets the ball.
3. **The ball is hard to see** at some angles — 4 cm across, in flight for under a second.
4. **No six-ball gameplay.** One scripted delivery, as scoped.
5. **Zone panels are doorways, not the sections.** They show real content, but the full sections live at `/`.
6. **Seven project screenshots are still missing.** LinkedIn returns HTTP 999 to automated requests; the posts could not be read. The two CodeReviewBuddy screenshots came from the project's own public repository. Nothing was invented or substituted.
7. **Certifications remain partly unverified** — DBMS, Artificial Intelligence and Agile Development have no issuer or date in any supplied document, and render with an `UNVERIFIED` chip.
8. **Publication metadata incomplete** — venue and DOI unknown, shown as "Pending".
9. **Osian Soft Con title** shows the resume version with the LinkedIn variant footnoted.

---

## Running it

```bash
cd "C:\SKD Folder\Website Codes\the-final-innings"
pnpm install     # first time only
pnpm dev         # http://localhost:5173
```

`pnpm build` → `dist/`. `pnpm preview` → port 4173. No environment variables, no API keys, no database.

Deployment: static host with SPA rewrite (Vercel/Netlify/Cloudflare Pages, output `dist`). Replace the placeholder `https://subhamdas.dev/` canonical and OG URLs in `index.html` before launch.

---

## Documentation index

| File | Contents |
|---|---|
| `docs/phase-0-blueprint.md` | Original audit, verified profile, creative direction |
| `docs/revised-blueprint.md` | Direction C, camera architecture, concept frames |
| `docs/phase-3.0-log.md` | 3D foundation |
| `docs/phase-3.2-log.md` | Players, delivery, broadcast |
| `docs/assets-needed.md` | Every missing asset, with the exact data edit |
| `docs/screenshots/final/` | The final capture set |

---

# Final unification � one stadium, one portfolio

## The architectural change

The portfolio no longer sits *below* a stadium section; the stadium is now the
**fixed environment behind the entire route**.

- `Home` mounts exactly **one** `GroundIntroCanvas`, `position: fixed`, `inset: 0`, at `z-index: 0`. It never unmounts while you are on `/`.
- `StadiumHero` lost its own canvas and became a pure overlay � the player introduction now floats over the live ground rather than containing it.
- The six portfolio sections sit in a `.deck` above the stage. Each is a translucent panel (`rgba(5,9,8,.88)` + `backdrop-blur`) with real gaps between them, so the crowd, pitch and floodlights are visible at the edges and between cards.
- A `useSectionCamera` observer watches the six section ids. As one crosses the middle band of the viewport, the stadium camera moves to that section's shot: profile ? C, career ? E, projects ? D, skills ? B, records ? G, contact ? A. The environment responds to reading position.
- Under `prefers-reduced-motion` the observer disconnects and the canvas dims, so no camera motion competes with reading.

`/ground` still exists as the full interactive ground (zones, delivery, camera tray). It mounts its own canvas � but the two routes are never on screen together, so no duplicate renderer is ever alive at once.

## Verified

| Check | Result |
|---|---|
| `tsc --noEmit` | exit 0 |
| `pnpm build` | exit 0 |
| `/` � `/recruiter` � `/ground` | 200 |
| Canvas on `/` | mounted, `is-ready` |
| Six sections | all present |
| Match-centre nav | 6 links |
| Resume | 200 |
| Mobile 390�844 | no overflow |
| Console | zero errors |

## Known limitation of this pass

The deck panels are opaque enough to guarantee readability, which means the stadium reads as a deep backdrop behind them rather than as a fully visible environment. Pushing the panels more transparent would compromise text contrast � readability was given priority, as instructed.
