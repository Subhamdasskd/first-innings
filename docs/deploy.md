# Deploying FIRST INNINGS

Static Vite build. No server, no database, no environment variables.

```bash
pnpm install
pnpm build      # outputs dist/
pnpm preview    # local production check on :4173
```

---

## Recommended: Vercel (free)

Best fit here — free Hobby tier, Git deploys, preview URLs per branch, global CDN.

**Via dashboard**

1. Push the project to GitHub.
2. vercel.com → **Add New → Project** → import the repo.
3. Vercel detects Vite. Confirm:
   - Framework preset: **Vite**
   - Build command: `pnpm build`
   - Output directory: `dist`
4. Deploy.

`vercel.json` is already in the repo, so the SPA rewrite and cache headers are handled — `/ground` and `/recruiter` will not 404 on refresh.

**Via CLI**

```bash
pnpm dlx vercel          # preview
pnpm dlx vercel --prod   # production
```

---

## Alternative: Netlify (free)

1. netlify.com → **Add new site → Import an existing project**.
2. Build command `pnpm build`, publish directory `dist`.
3. Add a `public/_redirects` file containing:

```
/*  /index.html  200
```

Without that file the deep routes break on refresh.

---

## Alternative: Cloudflare Pages (free)

Build command `pnpm build`, output `dist`. Add `_redirects` in `public/` with the same line as Netlify. Unlimited bandwidth on the free tier, which is the reason to pick it.

---

## Why not GitHub Pages

Project Pages serve from a subpath (`/repo-name/`), so every absolute asset path breaks unless you set `base` in `vite.config.ts` and rebuild. Doable, but Vercel/Netlify/Cloudflare are less work for the same result.

---

## Before you publish

1. **Point the canonical and OG URLs at the real domain.** `index.html` still has placeholder `https://subhamdas.dev/` values in the canonical link and the Open Graph/Twitter tags. A wrong canonical hurts search ranking and produces broken link previews.
2. **Add the real domain to `robots.txt` / `sitemap.xml`** if you keep them.
3. **Check the OG image** at 1200×630 — LinkedIn and WhatsApp cache aggressively, so test with a fresh URL.
4. **Test the four routes after deploy:** `/`, `/recruiter`, `/ground`, and a refresh on `/ground` (this is where a missing rewrite shows up).
5. **Resume download** — confirm `Content-Type: application/pdf` and a working `download` attribute.

---

## Bundles after deploy

| Chunk | Raw | Gzip |
|---|---|---|
| Portfolio (`/`, `/recruiter`) | ~350 KB | ~105 KB |
| Ground (`/ground`, lazy) | ~1.02 MB | ~280 KB |

The 3D chunk only loads on `/ground` and behind the hero. A recruiter landing on `/recruiter` never downloads three.js.
