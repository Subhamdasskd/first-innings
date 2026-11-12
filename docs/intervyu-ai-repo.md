# Intervyu AI — GitHub repo checklist

I cannot push to `github.com/Subhamdasskd/IntervyuAI` — I have no access to your
GitHub account, and I will not pretend otherwise. Below is everything the repo
needs, ready to paste. It mirrors how CodeReviewBuddy is set up.

---

## 1. About panel (the three fields above the file list)

| Field | Value |
|---|---|
| Description | `AI interview preparation platform — resume parsing, role-specific mock interviews, structured feedback.` |
| Website | `https://intervyuai.lovable.app/` |
| Topics | `react` `typescript` `supabase` `ai` `interview-preparation` `tailwindcss` `vite` |

Topics matter more than they look: they are how GitHub search and the Explore
page surface the repo.

---

## 2. README.md

```markdown
# Intervyu AI

AI interview preparation platform. Upload a resume, pick a role, practise
realistic mock interviews — HR, technical and project rounds — and get
structured feedback on each answer.

**Live:** https://intervyuai.lovable.app/

![Intervyu AI landing page](docs/screenshot.png)

## What it does

- **Resume parsing** — reads an uploaded resume and extracts skills, projects
  and experience to ground the interview.
- **Role selection** — HR, technical and project rounds, each with its own
  question style.
- **Mock interviews** — generated questions with a confidence signal per answer.
- **Structured feedback** — a score per session and a running history, so
  improvement is visible rather than assumed.

## Stack

React · TypeScript · Vite · Tailwind CSS · Supabase (auth + Postgres)

## Running locally

```bash
git clone https://github.com/Subhamdasskd/IntervyuAI.git
cd IntervyuAI
npm install
npm run dev
```

Create a `.env.local` with your Supabase project URL and anon key:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## Status

v1.0, deployed. Resume parsing and both interview modes are working;
company-wise question banks are the next planned addition.
```

---

## 3. Screenshot

Put the landing-page capture at `docs/screenshot.png` in the repo so the README
image resolves. The same file is already used on the portfolio at
`public/assets/projects/intervyu-ai/01.jpg` — copy it from there.

---

## 4. Repo hygiene that CodeReviewBuddy already has

- [ ] `.gitignore` with `node_modules`, `dist`, `.env`, `.env.local`
- [ ] `LICENSE` (MIT is the usual choice for a portfolio repo)
- [ ] Commit history that reads as work, not one "initial commit"
- [ ] No secrets in the tree — check `.env` was never committed
      (`git log --all -- .env`)
- [ ] `npm run build` passes on a clean clone

---

## 5. The one thing that actually moves the needle

**A live link plus a screenshot in the first screen of the README.** Recruiters
and other developers decide in seconds; the description and the image do more
work than any amount of prose underneath.

---

## 6. While you are there: CodeReviewBuddy

Its README already links to `https://code-review-buddy-six.vercel.app/`. Worth
adding the same `docs/screenshot.png` treatment so both repos look consistent
when someone opens your profile.
