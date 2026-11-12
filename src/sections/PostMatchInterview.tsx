import { ArrowUpRight, Mail } from 'lucide-react'
import { GitHubMark, LinkedInMark } from '@/components/broadcast/BrandMarks'
import { profile } from '@/data/profile'
import { resume } from '@/data/resume'
import { socialLinks } from '@/data/site'
import { SectionHead } from '@/components/layout/SectionHead'
import { revealDelay } from '@/lib/motion'

const icons = {
  mail: ({ size }: { size?: number }) => <Mail size={size} strokeWidth={1.6} aria-hidden="true" />,
  linkedin: ({ size }: { size?: number }) => <LinkedInMark size={size} />,
  github: ({ size }: { size?: number }) => <GitHubMark size={size} />,
} as const

export function PostMatchInterview() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="shell">
        <SectionHead
          id="contact-title"
          scene="Scene 09 — Post-match interview"
          title="The innings doesn’t end here"
          real="Get in touch"
          lead="If you are hiring, building something interesting, or just want to talk about backend design — the door is open."
        />

        <ul className="contact">
          {socialLinks.map((link, index) => {
            const Icon = icons[link.icon]
            const external = link.id !== 'email'
            return (
              <li key={link.id} data-reveal style={revealDelay(index * 60)}>
                <a
                  className="contact__card panel ticks"
                  href={link.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer noopener' : undefined}
                >
                  <span className="contact__icon" aria-hidden="true">
                    <Icon size={16} />
                  </span>
                  <span className="contact__text">
                    <span className="contact__label">{link.label}</span>
                    <span className="contact__handle">{link.handle}</span>
                  </span>
                  <ArrowUpRight className="contact__arrow" size={15} aria-hidden="true" />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="contact__cta" data-reveal>
          <a
            className="btn btn--primary contact__ctaMain"
            href={`mailto:${socialLinks[0].handle}?subject=Hello%20Subham`}
          >
            Let's build something extraordinary
            <ArrowUpRight size={15} className="btn__icon" aria-hidden="true" />
          </a>
          <a className="btn" href={resume.href} download={resume.downloadName}>
            Download resume
          </a>
        </div>

        <p className="contact__foot" data-reveal>
          {profile.name} · {profile.role} · {profile.location}
        </p>
      </div>
    </section>
  )
}
