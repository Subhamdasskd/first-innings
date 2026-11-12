import { Download, MapPin, GraduationCap, Target } from 'lucide-react'
import { profile } from '@/data/profile'
import { education } from '@/data/education'
import { resume } from '@/data/resume'
import { socialLinks } from '@/data/site'
import { SectionHead } from '@/components/layout/SectionHead'
import { revealDelay } from '@/lib/motion'

const degree = education[0]

export function PlayerProfile() {
  return (
    <section id="profile" className="section" aria-labelledby="profile-title">
      <div className="shell">
        <SectionHead
          id="profile-title"
          scene="Scene 02 — Player profile"
          title="The player"
          real="About Subham Das"
        />

        <div className="profile">
          <div className="profile__aside">
            <figure className="profile__photo" data-reveal>
              <picture>
                <source srcSet={profile.photo.wide.webp} type="image/webp" />
                <img
                  src={profile.photo.wide.jpg}
                  width={profile.photo.wide.width}
                  height={profile.photo.wide.height}
                  alt={profile.photo.alt}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <figcaption className="profile__photoCap">
                <span className="eyebrow">
                  <span className="eyebrow__dot" />
                  Current innings
                </span>
              </figcaption>
            </figure>

            <dl className="profile__facts" data-reveal>
              <div className="profile__fact">
                <dt>
                  <MapPin size={13} aria-hidden="true" /> Based in
                </dt>
                <dd>{profile.location}</dd>
              </div>
              <div className="profile__fact">
                <dt>
                  <Target size={13} aria-hidden="true" /> Current role
                </dt>
                <dd>
                  {profile.role}, {profile.roleOrg}
                </dd>
              </div>
              <div className="profile__fact">
                <dt>
                  <GraduationCap size={13} aria-hidden="true" /> Education
                </dt>
                <dd>
                  {degree.qualification}, {degree.field}
                  <br />
                  {degree.institution} · {degree.result}
                </dd>
              </div>
            </dl>

            <div className="profile__actions" data-reveal>
              <a className="btn btn--primary" href={resume.href} download={resume.downloadName}>
                <Download size={14} className="btn__icon" aria-hidden="true" />
                View resume
              </a>
              <a className="btn" href="#career">
                Explore career
              </a>
            </div>
          </div>

          <div className="profile__body">
            <div className="profile__copy" data-reveal>
              {profile.summary.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <div className="profile__focus" data-reveal style={revealDelay(80)}>
              <h3 className="profile__focusTitle">Currently focused on</h3>
              <ul className="profile__chips">
                {profile.focus.map((item) => (
                  <li className="chip chip--lime" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="profile__links" data-reveal style={revealDelay(140)}>
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  className="profile__link"
                  href={link.href}
                  target={link.id === 'email' ? undefined : '_blank'}
                  rel="noreferrer noopener"
                >
                  <span className="profile__linkLabel">{link.label}</span>
                  <span className="profile__linkHandle">{link.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
