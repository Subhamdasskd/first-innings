import { Link } from 'react-router-dom'
import { ArrowUp, Sparkles } from 'lucide-react'
import { profile } from '@/data/profile'

export function Footer() {
  return (
    <footer className="siteFooter">
      <div className="shell siteFooter__inner">
        <div className="siteFooter__brand">
          <span className="siteFooter__brandName">{profile.brand}</span>
          <p className="siteFooter__note">{profile.tagline}</p>
        </div>

        <div className="siteFooter__meta">
          <span>
            {profile.name} · {profile.role}
          </span>
          <span>React · TypeScript · Vite</span>
          <Link className="siteFooter__ground" to="/ground">
            <Sparkles size={11} aria-hidden="true" />
            Enter the 3D ground
          </Link>
          <a className="siteFooter__top" href="#top">
            Back to top
            <ArrowUp size={12} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
