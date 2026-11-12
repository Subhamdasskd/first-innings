import { BookOpen, Award, GraduationCap } from 'lucide-react'
import { achievements } from '@/data/achievements'
import { SectionHead } from '@/components/layout/SectionHead'
import { revealDelay } from '@/lib/motion'
import { cx } from '@/lib/cx'

const publication = achievements.find((item) => item.kind === 'publication')
const certifications = achievements.filter((item) => item.kind === 'certification')
const academic = achievements.filter((item) => item.kind === 'academic')

export function TrophyRoom() {
  return (
    <section id="records" className="section" aria-labelledby="records-title">
      <div className="shell">
        <SectionHead
          id="records-title"
          scene="Scene 06 — Trophy room"
          title="Trophy room"
          real="Records, publications & credentials"
          lead="Everything in here is traceable to a document. Where a detail is still unverified, it says so."
        />

        {publication && (
          <article className="pub panel ticks" data-reveal>
            <div className="pub__badge">
              <BookOpen size={14} aria-hidden="true" />
              Publication
            </div>

            <div className="pub__body">
              <h3 className="pub__title">{publication.title}</h3>

              <ul className="pub__authors" aria-label="Authors">
                {publication.authors?.map((author, index) => (
                  <li key={author} className={cx(author === 'Subham Das' && 'is-self')}>
                    <span className="pub__authorIndex">{String(index + 1).padStart(2, '0')}</span>
                    {author}
                    {author === 'Subham Das' && <span className="pub__selfTag">co-author</span>}
                  </li>
                ))}
              </ul>

              <p className="pub__context">{publication.context}</p>

              <dl className="pub__meta">
                <div>
                  <dt>Affiliation</dt>
                  <dd>{publication.issuer}</dd>
                </div>
                {publication.pending && (
                  <div>
                    <dt>Pending</dt>
                    <dd className="pub__pending">{publication.pending}</dd>
                  </div>
                )}
              </dl>
            </div>
          </article>
        )}

        <div className="trophy">
          <div className="trophy__col" data-reveal>
            <h3 className="trophy__heading">
              <Award size={15} aria-hidden="true" />
              Certifications
              <span className="trophy__count tnum">{String(certifications.length).padStart(2, '0')}</span>
            </h3>

            <ul className="certList">
              {certifications.map((item, index) => (
                <li className="cert" key={item.id} style={revealDelay(index * 40)}>
                  <div className="cert__top">
                    <span className="cert__title">{item.title}</span>
                    {item.pending && (
                      <span className="chip chip--muted" title={item.pending}>
                        Unverified
                      </span>
                    )}
                  </div>
                  <p className="cert__issuer">{item.issuer ?? 'Issuer to be confirmed'}</p>
                  <p className="cert__context">{item.context}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="trophy__col" data-reveal style={revealDelay(80)}>
            <h3 className="trophy__heading">
              <GraduationCap size={15} aria-hidden="true" />
              Academic record
            </h3>

            <ul className="certList">
              {academic.map((item) => (
                <li className="cert" key={item.id}>
                  <div className="cert__top">
                    <span className="cert__title">{item.title}</span>
                    {item.date && <span className="chip chip--gold">{item.date}</span>}
                  </div>
                  <p className="cert__issuer">{item.issuer}</p>
                  <p className="cert__context">{item.context}</p>
                </li>
              ))}
            </ul>

            <p className="trophy__note">
              One degree, in two phases: first year at Graphic Era Hill University, the remainder at
              IILM University, Greater Noida.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
