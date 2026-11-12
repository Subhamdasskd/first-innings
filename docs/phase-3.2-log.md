# Phase 3.2 — players, delivery sequence, broadcast graphics · **complete**

Built 12 November 2026. `tsc --noEmit` and `pnpm build` both exit 0.

**URL:** `http://localhost:5173/ground` · `/` and `/recruiter` untouched.

---

## 1. Players

Three figures, each a joint hierarchy (spine, neck, 2 shoulders, 2 elbows, 2 hips, 2 knees) driven every frame by an animation loop.

| Figure | Equipment | Animation |
|---|---|---|
| **Batsman** | Helmet with grille and lime crown stripe, ivory shirt and trousers, green trim, batting pads with knee rolls and straps, gloves, bat with grip rings and toe guard | `stance` (weight shift, bat tap), `swing` (four-keyframe shot) |
| **Bowler** | Same kit, no pads | `idle`, `runup` (9.5 Hz stride, forward lean), `bowl` (gather → load → release → follow-through) |
| **Wicketkeeper** | Pads and oversized keeping gloves | `crouch` with breathing |

All geometry is primitives — no imported models, no external animation files.

## 2. The delivery sequence

A fixed 8.2-second timeline in `DeliveryDirector.tsx`. Deterministic: every play is the same ball, the same timing, the same result.

| Beat | Time | What happens |
|---|---|---|
| Run-up | 0.35 – 2.35 s | Bowler travels from the mark to the crease, stride animation |
| Release | 2.35 s | Ball leaves the hand at 2.05 m |
| Flight | 2.35 – 3.45 s | Ball falls to a bounce at z ≈ −1.6, rises to the bat |
| Contact | 3.45 s | Batsman plays a four-keyframe cover drive |
| Shot | 3.45 – 5.10 s | Ball arcs to the cover boundary; camera glances after it |
| Result | 5.25 s | Broadcast result card, score strip updates to 4/0 |

Interruptible: selecting any camera shot or pressing "Bowl a delivery" again resets the clock. The result card persists until dismissed — it does not auto-clear.

## 3. Camera

- Seven shots preserved. Shot C reframed to the bowler's side so it shows the batsman's **front**.
- Shot F rebuilt as an over-the-shoulder camera at `(1.15, 1.82, 12.95)`.
- Ball follow is damped: the aim moves only **30 %** of the way toward the ball, so the batsman never leaves frame.
- No camera movement while a broadcast panel is open.

## 4. Stadium

- **Grass:** 14 straight parallel mowing strips replacing the radial starburst, plus mottled growth, a worn walkers' ring and faint growth rings.
- **Crowd:** one in five spectators stands at 1.2× height; wider wardrobe palette.
- **Lighting:** hemisphere 2.0, ambient 0.32, two directionals, exposure 1.52, fog 0.0035.
- **Aerial:** reframed to 96 m, which removed the dark foreground ring.

## 5. Broadcast layer

`src/ground/broadcast/BroadcastLayer.tsx` + `src/styles/broadcast.css`.

- **Score strip** — SIM badge, team, runs/wickets, overs, balls, and the line *"Simulated delivery · not a career statistic"*.
- **Lower third** — appears on shot C: name, role, and three **real** career totals (roles 04, projects 08, paper 01).
- **Result card** — "FOUR / cover drive · along the ground" with Bowl again and Dismiss.
- **Live ticker** — bowler running in / ball in flight / shot played.
- **Recruiter link** — persistent escape hatch to `/recruiter`.

Simulated cricket numbers are visually separated from career facts: the score strip carries a gold `SIM` badge and a disclaimer; the lower third's numbers come straight from `src/data/site.ts`.

## 6. Verification

| Check | Result |
|---|---|
| `tsc --noEmit` | 0 |
| `pnpm build` | 0 |
| `/`, `/recruiter`, `/ground` | 200 |
| Delivery runs end to end | ✅ result card reads FOUR, score 4/0 |
| Lower third on shot C | ✅ |
| Mobile 390 × 844 | no horizontal overflow (390/390) |
| Console | **zero errors**; one warning (`THREE.Clock`, R3F internal) |

## 7. Performance — measured, honestly

The only machine available for measurement is this one, and its headless Chrome reports `Microsoft Basic Render Driver` — **software rasterisation, no GPU**. Measured there: **12–18 fps**.

That number is not a verdict on real hardware; it is the only number I can honestly report. The in-app FPS counter exists so you can read the real figure on your own GPU.

Structural budget: 9,000 instanced crowd quads (2,600 on coarse pointers), ~35k triangles of stadium geometry, no shadow maps, no postprocessing.

## 8. Known limitations

1. **Figures remain stylised mannequins.** Equipment is recognisable; faces are not. Arms connect to the torso via shoulder caps rather than deforming.
2. **The ball is invisible at some angles** — it is 4 cm across and the flight is under a second.
3. **Contact is not physically simulated.** The bat does not meet the ball; the swing and the ball's departure are two separate timed animations that coincide.
4. **Mobile header is cramped** — the brand wraps to two lines and the score strip crowds the camera readout.
5. **Not built (out of scope):** six-ball gameplay, scoring, wicket animations, ball-by-ball strip, bowler statistics, VIP boxes, stadium scoreboard.

## 9. Next

Six-ball gameplay, then the remaining broadcast furniture.
