import * as THREE from 'three'

/**
 * Every texture in the ground is generated at runtime on a canvas.
 * No image files, no downloads, no licensing: the whole stadium ships as code.
 */

const cache = new Map<string, THREE.Texture>()

function canvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const ctx = c.getContext('2d')
  if (!ctx) throw new Error('2D canvas unavailable')
  return [c, ctx]
}

function toTexture(c: HTMLCanvasElement, repeat?: [number, number]): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.anisotropy = 4
  if (repeat) tex.repeat.set(repeat[0], repeat[1])
  return tex
}

function noise(ctx: CanvasRenderingContext2D, w: number, h: number, amount: number, alpha: number) {
  const img = ctx.getImageData(0, 0, w, h)
  const d = img.data
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * amount
    d[i] = Math.max(0, Math.min(255, d[i] + n))
    d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + n))
    d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + n))
    d[i + 3] = alpha
  }
  ctx.putImageData(img, 0, 0)
}

/* ------------------------------------------------------------------ seats */
export function seatTexture(): THREE.Texture {
  const key = 'seats'
  const hit = cache.get(key)
  if (hit) return hit

  const S = 128
  const [c, ctx] = canvas(S, S)
  ctx.fillStyle = '#243530'
  ctx.fillRect(0, 0, S, S)

  // one seat cell with a shadow gap beneath it
  const g = ctx.createLinearGradient(0, 18, 0, 92)
  g.addColorStop(0, '#5f7568')
  g.addColorStop(0.65, '#42544a')
  g.addColorStop(1, '#28362f')
  ctx.fillStyle = g
  ctx.fillRect(14, 20, 100, 66)

  ctx.fillStyle = 'rgba(255,255,255,0.10)'
  ctx.fillRect(14, 20, 100, 4)
  ctx.fillStyle = 'rgba(0,0,0,0.5)'
  ctx.fillRect(0, 88, S, 40)

  // aisle highlight every few seats
  ctx.fillStyle = 'rgba(198,255,61,0.07)'
  ctx.fillRect(0, 0, 3, S)

  noise(ctx, S, S, 14, 255)
  const tex = toTexture(c, [220, 26])
  cache.set(key, tex)
  return tex
}

/* --------------------------------------------------------------- outfield */
export function outfieldTexture(): THREE.Texture {
  const key = 'outfield'
  const hit = cache.get(key)
  if (hit) return hit

  const S = 1024
  const [c, ctx] = canvas(S, S)
  const r = S / 2

  ctx.fillStyle = '#0c2117'
  ctx.fillRect(0, 0, S, S)

  // straight mowing strips — the way a ground is actually cut, not a starburst
  const bands = 14
  const bw = S / bands
  for (let i = 0; i < bands; i += 1) {
    ctx.fillStyle = i % 2 === 0 ? '#112e1d' : '#193d25'
    ctx.fillRect(Math.floor(i * bw), 0, Math.ceil(bw) + 1, S)
  }

  // patchy growth, so the strips are not flat colour fields
  for (let i = 0; i < 1100; i += 1) {
    const x = Math.random() * S
    const y = Math.random() * S
    const rad = 6 + Math.random() * 46
    ctx.beginPath()
    ctx.arc(x, y, rad, 0, Math.PI * 2)
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(220,255,225,0.012)' : 'rgba(0,0,0,0.016)'
    ctx.fill()
  }

  // lighter wear ring where the fielders walk
  ctx.beginPath()
  ctx.arc(r, r, r * 0.34, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(200,255,200,0.02)'
  ctx.lineWidth = 26
  ctx.stroke()

  // concentric growth rings, very faint
  for (let i = 1; i < 12; i += 1) {
    ctx.beginPath()
    ctx.arc(r, r, (r * i) / 12, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(210,255,210,0.012)'
    ctx.lineWidth = 5
    ctx.stroke()
  }

  // falloff toward the rope so the centre reads brighter
  const g = ctx.createRadialGradient(r, r, r * 0.05, r, r, r)
  g.addColorStop(0, 'rgba(160,235,170,0.20)')
  g.addColorStop(0.45, 'rgba(90,170,110,0.06)')
  g.addColorStop(1, 'rgba(0,0,0,0.42)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, S, S)

  noise(ctx, S, S, 10, 255)
  const tex = toTexture(c)
  tex.wrapS = THREE.ClampToEdgeWrapping
  tex.wrapT = THREE.ClampToEdgeWrapping
  cache.set(key, tex)
  return tex
}

/* ------------------------------------------------------------------ pitch */
export function pitchTexture(): THREE.Texture {
  const key = 'pitch'
  const hit = cache.get(key)
  if (hit) return hit

  const W = 256
  const H = 1024
  const [c, ctx] = canvas(W, H)

  const g = ctx.createLinearGradient(0, 0, 0, H)
  g.addColorStop(0, '#7d7259')
  g.addColorStop(0.5, '#8a7f63')
  g.addColorStop(1, '#7a7057')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)

  // rolled wear patches at each crease
  for (const cy of [H * 0.12, H * 0.88]) {
    const wg = ctx.createRadialGradient(W / 2, cy, 6, W / 2, cy, W * 0.7)
    wg.addColorStop(0, 'rgba(120,108,82,0.55)')
    wg.addColorStop(1, 'rgba(120,108,82,0)')
    ctx.fillStyle = wg
    ctx.fillRect(0, cy - H * 0.1, W, H * 0.2)
  }

  // creases
  ctx.strokeStyle = 'rgba(245,242,232,0.85)'
  ctx.lineWidth = 4
  for (const cy of [H * 0.115, H * 0.885]) {
    ctx.beginPath()
    ctx.moveTo(W * 0.14, cy)
    ctx.lineTo(W * 0.86, cy)
    ctx.stroke()
    // popping crease
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(W * 0.2, cy + (cy < H / 2 ? 22 : -22))
    ctx.lineTo(W * 0.8, cy + (cy < H / 2 ? 22 : -22))
    ctx.stroke()
    ctx.lineWidth = 4
  }

  noise(ctx, W, H, 16, 255)
  const tex = toTexture(c)
  tex.wrapS = THREE.ClampToEdgeWrapping
  tex.wrapT = THREE.ClampToEdgeWrapping
  cache.set(key, tex)
  return tex
}

/* ------------------------------------------------------------- ad boards */
export function adBoardTexture(): THREE.Texture {
  const key = 'ads'
  const hit = cache.get(key)
  if (hit) return hit

  const W = 512
  const H = 128
  const [c, ctx] = canvas(W, H)

  ctx.fillStyle = '#0a1210'
  ctx.fillRect(0, 0, W, H)

  const palette = ['#123024', '#101c18', '#0f1a2a', '#1a2b1f']
  const bars = ['#c6ff3d', '#e2b23f', '#f3f0e8', '#3f7a5c']

  let x = 0
  let i = 0
  while (x < W) {
    const w = 46 + Math.random() * 54
    ctx.fillStyle = palette[i % palette.length]
    ctx.fillRect(x, 0, w - 4, H)
    ctx.fillStyle = bars[i % bars.length]
    ctx.globalAlpha = 0.5
    ctx.fillRect(x + 8, H * 0.44, w * 0.5, 7)
    ctx.globalAlpha = 0.18
    ctx.fillRect(x + 8, H * 0.62, w * 0.28, 5)
    ctx.globalAlpha = 1
    x += w
    i += 1
  }

  const tex = toTexture(c)
  tex.wrapS = THREE.ClampToEdgeWrapping
  tex.wrapT = THREE.ClampToEdgeWrapping
  cache.set(key, tex)
  return tex
}

/* ----------------------------------------------------------------- crowd */
export function crowdTexture(): THREE.Texture {
  const key = 'crowd'
  const hit = cache.get(key)
  if (hit) return hit

  const W = 64
  const H = 96
  const [c, ctx] = canvas(W, H)
  ctx.clearRect(0, 0, W, H)

  // head
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.ellipse(W / 2, H * 0.24, W * 0.19, H * 0.14, 0, 0, Math.PI * 2)
  ctx.fill()

  // shoulders / torso
  ctx.beginPath()
  ctx.moveTo(W * 0.18, H)
  ctx.quadraticCurveTo(W * 0.2, H * 0.44, W * 0.5, H * 0.4)
  ctx.quadraticCurveTo(W * 0.8, H * 0.44, W * 0.82, H)
  ctx.closePath()
  ctx.fill()

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  cache.set(key, tex)
  return tex
}

/* ------------------------------------------------------------------ glow */
export function glowTexture(): THREE.Texture {
  const key = 'glow'
  const hit = cache.get(key)
  if (hit) return hit

  const S = 128
  const [c, ctx] = canvas(S, S)
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.25, 'rgba(220,255,200,0.55)')
  g.addColorStop(0.55, 'rgba(170,230,160,0.14)')
  g.addColorStop(1, 'rgba(120,200,140,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, S, S)

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  cache.set(key, tex)
  return tex
}

/* ------------------------------------------------------------- light pool */
export function poolTexture(): THREE.Texture {
  const key = 'pool'
  const hit = cache.get(key)
  if (hit) return hit

  const S = 256
  const [c, ctx] = canvas(S, S)
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2)
  g.addColorStop(0, 'rgba(190,255,190,0.30)')
  g.addColorStop(0.4, 'rgba(160,240,170,0.12)')
  g.addColorStop(1, 'rgba(140,220,160,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, S, S)

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  cache.set(key, tex)
  return tex
}
