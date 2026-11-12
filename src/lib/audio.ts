/**
 * Synthesised broadcast audio.
 *
 * Design constraints:
 * - Nothing is downloaded. Every sound is generated with the Web Audio API, so
 *   there are no audio files, no licensing questions and no extra payload.
 * - The context is created only inside a user gesture, and the master gain starts
 *   at zero. The browser's autoplay policy and the visitor's consent are the same
 *   gate.
 * - Level is deliberately conservative: ambience sits far under speech volume.
 */

export type SoundName = 'floodlight' | 'crowd' | 'click' | 'whoosh'

type AudioContextCtor = typeof AudioContext

function resolveContext(): AudioContextCtor | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as {
    AudioContext?: AudioContextCtor
    webkitAudioContext?: AudioContextCtor
  }
  return w.AudioContext ?? w.webkitAudioContext ?? null
}

class AudioEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private noiseBuffer: AudioBuffer | null = null
  private muted = true
  private unlocked = false

  get ready(): boolean {
    return this.ctx !== null && this.ctx.state === 'running'
  }

  /**
   * Prepares the graph. Deliberately does not wait on `resume()`: a synthetic
   * click is not a user activation, and the promise can stay pending forever.
   * The graph is created now; sound starts flowing the moment the browser lets
   * the context run.
   */
  async unlock(): Promise<boolean> {
    const Ctor = resolveContext()
    if (!Ctor) return false

    if (!this.ctx) {
      try {
        this.ctx = new Ctor()
      } catch {
        return false
      }
      this.master = this.ctx.createGain()
      this.master.gain.value = this.muted ? 0 : 0.42
      this.master.connect(this.ctx.destination)
      this.noiseBuffer = this.createNoise(this.ctx)
      this.ctx.addEventListener('statechange', () => {
        if (this.ctx?.state === 'running') this.unlocked = true
      })
    }

    if (this.ctx.state === 'suspended') {
      try {
        void this.ctx.resume()
      } catch {
        /* stays suspended until a real gesture arrives */
      }
    }

    this.unlocked = true
    return true
  }

  setMuted(muted: boolean): void {
    this.muted = muted
    const ctx = this.ctx
    const master = this.master
    if (!ctx || !master) return
    const now = ctx.currentTime
    master.gain.cancelScheduledValues(now)
    master.gain.setTargetAtTime(muted ? 0 : 0.42, now, 0.09)
  }

  play(name: SoundName): void {
    const ctx = this.ctx
    const master = this.master
    if (!ctx || !master || !this.noiseBuffer) return
    if (this.muted || !this.unlocked) return
    // While the context is suspended, `currentTime` does not advance — anything
    // scheduled now would all fire at once on resume. Skip instead.
    if (ctx.state !== 'running') return

    const now = ctx.currentTime

    switch (name) {
      case 'click': {
        this.burst({ when: now, dur: 0.05, freq: 3400, q: 1.6, gain: 0.16, type: 'highpass' })
        break
      }
      case 'floodlight': {
        // A low thump with a charge hiss on top — a lamp bank striking.
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(132, now)
        osc.frequency.exponentialRampToValueAtTime(46, now + 0.42)
        gain.gain.setValueAtTime(0.0001, now)
        gain.gain.exponentialRampToValueAtTime(0.5, now + 0.016)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6)
        osc.connect(gain).connect(master)
        osc.start(now)
        osc.stop(now + 0.65)
        this.burst({ when: now, dur: 0.28, freq: 2100, q: 0.9, gain: 0.09, type: 'bandpass' })
        break
      }
      case 'whoosh': {
        const src = ctx.createBufferSource()
        src.buffer = this.noiseBuffer
        const filter = ctx.createBiquadFilter()
        filter.type = 'bandpass'
        filter.Q.value = 1.1
        filter.frequency.setValueAtTime(240, now)
        filter.frequency.exponentialRampToValueAtTime(2600, now + 0.5)
        const gain = ctx.createGain()
        gain.gain.setValueAtTime(0.0001, now)
        gain.gain.exponentialRampToValueAtTime(0.22, now + 0.09)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.62)
        src.connect(filter).connect(gain).connect(master)
        src.start(now)
        src.stop(now + 0.7)
        break
      }
      case 'crowd': {
        // A slow swell of filtered noise: the sound of a stand noticing.
        const src = ctx.createBufferSource()
        src.buffer = this.noiseBuffer
        src.loop = true
        const band = ctx.createBiquadFilter()
        band.type = 'bandpass'
        band.frequency.value = 640
        band.Q.value = 0.55
        const low = ctx.createBiquadFilter()
        low.type = 'lowpass'
        low.frequency.value = 2200
        const gain = ctx.createGain()
        gain.gain.setValueAtTime(0.0001, now)
        gain.gain.exponentialRampToValueAtTime(0.3, now + 0.55)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4)
        src.connect(band).connect(low).connect(gain).connect(master)
        src.start(now)
        src.stop(now + 2.5)
        break
      }
    }
  }

  /** Short filtered noise hit, used by several sounds above. */
  private burst(opts: {
    when: number
    dur: number
    freq: number
    q: number
    gain: number
    type: BiquadFilterType
  }): void {
    const ctx = this.ctx
    const master = this.master
    if (!ctx || !master || !this.noiseBuffer) return

    const src = ctx.createBufferSource()
    src.buffer = this.noiseBuffer
    const filter = ctx.createBiquadFilter()
    filter.type = opts.type
    filter.frequency.value = opts.freq
    filter.Q.value = opts.q
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, opts.when)
    gain.gain.exponentialRampToValueAtTime(opts.gain, opts.when + 0.008)
    gain.gain.exponentialRampToValueAtTime(0.0001, opts.when + opts.dur)

    src.connect(filter).connect(gain).connect(master)
    src.start(opts.when)
    src.stop(opts.when + opts.dur + 0.05)
  }

  private createNoise(ctx: AudioContext): AudioBuffer {
    const seconds = 2
    const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    // Brown-ish noise: smoother than white, closer to a crowd than a hiss.
    let last = 0
    for (let i = 0; i < data.length; i += 1) {
      const white = Math.random() * 2 - 1
      last = (last + 0.02 * white) / 1.02
      data[i] = last * 3.2
    }
    return buffer
  }
}

export const audio = new AudioEngine()
