# Assets still needed

The visual architecture is in place. Every project without a screenshot renders a
designed placeholder slate — never a fake interface and never stock imagery.

> **LinkedIn could not be read.** `linkedin.com/in/subham-das-skd/recent-activity/all/`
> returns **HTTP 999**, LinkedIn's automated-access block. Posts and images behind
> that wall are not retrievable from here, and nothing has been substituted for them.
> To use them, save the images from your posts and drop them into the folders below —
> or paste the images directly into the chat.

## How to add a project screenshot

1. Drop the file into `public/assets/projects/<project-id>/` using a 2-digit name:
   `01.png`, `02.png`, …
2. Open `src/data/projects.ts`, find the project, and add to its `media` array:

```ts
media: [
  {
    src: '/assets/projects/intervyu-ai/01.png',
    alt: 'Intervyu AI question screen showing a generated question and a scored answer.',
    width: 1600,
    height: 1000,
    caption: 'A generated question with the scored answer beneath it.',
  },
],
```

3. Alt text describes what is actually in the frame. Captions are one sentence.

Recommended capture size: **1600 × 1000** (16:10), PNG, under 400 KB.
The flagship card crops to the top, the dialog shows the full frame.

---

## What is needed, by project

| Project id | Folder | Needed | Priority |
|---|---|---|---|
| `codereviewbuddy` | `public/assets/projects/codereviewbuddy/` | ✅ **Supplied** — `dashboard.png`, `review.png` | done |
| `intervyu-ai` | `public/assets/projects/intervyu-ai/` | 2 frames: a question, and the scored feedback | high — the paper makes this credible |
| `mrt-command-center` | `public/assets/projects/mrt-command-center/` | 2 frames: the console, and the announcement composer | high |
| `complaint-system` | `public/assets/projects/complaint-system/` | 2 frames: the complaint list, and a detail view | high |
| `maxx-cafe` | `public/assets/projects/maxx-cafe/` | 2 frames: inventory, and an order | medium |
| `team-task-hub` | `public/assets/projects/team-task-hub/` | 1–2 frames: the task board, and the login | medium |
| `campus-companion` | `public/assets/projects/campus-companion/` | 1 frame: a threaded conversation | low |
| `boss-dashboard` | `public/assets/projects/boss-dashboard/` | 1 frame: the task table | low |

---

## Other assets

| Asset | Path | Notes |
|---|---|---|
| Open Graph card | `public/assets/og/og-card.jpg` | ⚠️ **Generated placeholder in place.** Replace with a designed 1200×630 card if preferred |
| Certificate PDFs / images | — | Only needed if you want a credential link on each certification |
| Company logos | — | Deliberately omitted. Third-party marks will not be hotlinked |
| Paper PDF or DOI | — | Would let the Trophy Room link to the actual publication |
| Pattern / pitch textures | — | Not needed; all texture is generated in CSS |

## Before launch

- Replace the `https://subhamdas.dev/` canonical and Open Graph URLs in `index.html`.
- Delete `public/assets/profile/_check.jpg` (a crop used during review).
- Confirm the five certifications in `src/data/achievements.ts` — three currently
  carry an `UNVERIFIED` chip because the issuer is not recorded in the sources.
