# Phase 3.0 — the 3D ground · **complete**

Built 12 November 2026. `tsc --noEmit` and `pnpm build` both exit 0.

**Route:** `http://localhost:5173/ground` — a separate route, so `/` and `/recruiter` are untouched.

---

## What was built

### 1. Three.js environment
`three` 0.187 + `@react-three/fiber` 9 + `zustand`, all inside a **lazy-loaded chunk**. The portfolio's main bundle does not pay for three.js: it only downloads when someone opens `/ground`.

### 2. Stadium geometry — all procedural, no imported models

| Element | How |
|---|---|
| Lower tier | `LatheGeometry` from a 5-point profile, 128 segments |
| Upper tier | Second lathe, set back behind a concourse ring |
| Roof | Lathe band with a 44-rib instanced truss ring |
| Seating | Procedural canvas seat texture, tiled 220 × 26 |
| Advertising boards | 92 instanced planes with a generated LED-board texture |
| Boundary | Torus rope + low perimeter wall |
| Floodlight towers | 4 masts at 101 m, 44 m tall, 18 emissive lamps each, canted 20° at the pitch |

### 3. Pitch and outfield
- Pitch plane with a generated texture: rolled wear at both ends, popping and bowling creases, six stumps.
- Outfield with a generated 18-sector mowing pattern, growth rings, radial light falloff and grain.

### 4. Lighting and atmosphere
- Hemisphere + ambient + two directionals. **No shadow maps** — deliberate, per the blueprint.
- ACES Filmic tone mapping, exposure 1.52.
- Four additive volumetric cones plus four light pools on the grass.
- `FogExp2` at 0.0035 — tuned down from 0.0062 after the first render, which was eating the far stand.
- Sky dome with a gradient shader.

### 5. The crowd
9,000 instanced billboards (2,600 on coarse pointers), each textured, wardrobe-tinted, and **bobbing on its own phase** through an injected vertex shader. They stand on the real seating ramp, not floating.

### 6. CameraDirector
`src/ground/CameraRig.tsx`. GSAP tweens a plain rig object; the frame loop copies it onto the camera. Because the rig is the single source of truth, a new shot interrupts a running move without a snap. Seven shots A–G, plus a continuous orbit at 26 m / 9 m.

`Play sequence` runs A→B→C→D(orbit)→F→G.

### 7. Loading handoff and fallback
- Curtain in the StadiumIntro visual language, lifted on the first frame.
- WebGL2 probe. If absent, a plain explanation and a link back to the portfolio — no blank canvas.
- The Phase 2 SVG stadium remains the home intro and the documented L2 fallback tier.

---

## Verified

| Check | Result |
|---|---|
| `/`, `/recruiter`, `/ground` | all 200 |
| Canvas + WebGL2 context | present |
| Curtain → ready class | ✅ `groundCanvases is-ready` |
| Camera buttons | 7 rendered, clicking changes the shot |
| Full sequence A→G | completed |
| Console | **one warning**, no errors: `THREE.Clock deprecated` from R3F internals |
| `/` and `/recruiter` | unchanged; header/footer hidden only on `/ground` |

## Honest limitations

1. **I could not measure real performance.** This machine's headless Chrome reports `Microsoft Basic Render Driver` — software rasterisation. It runs at 14–16 fps here, which says nothing about a real GPU. **The fps figure in the HUD is the only honest measurement, and it must be read on your machine.**
2. **No players yet.** Shot F is called "behind the batsman" and there is no batsman. Player models are Phase 3.2, as sequenced.
3. **The seating texture visibly tiles** at close range.
4. **The roof reads as a dark band** from the aerial rather than architecture.
5. **The ground chunk is 985 KB raw / 277 KB gzip.** Acceptable because it is lazy, but it is the largest single asset in the project.
6. **No zone content, no markers, no game.** Deliberately out of scope for 3.0.

## Next

3.1 camera polish (banking, pointer parallax, reduced-motion cut mode) or straight to 3.2 players. Your call after you look at it.
