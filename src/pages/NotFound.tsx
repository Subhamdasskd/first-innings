import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <main id="main" className="notFound">
      <div className="shell notFound__inner">
        <p className="eyebrow">No result</p>
        <h1 className="notFound__title">Outside the boundary</h1>
        <p className="notFound__copy">
          This page does not exist. The scorecard, however, is a click away.
        </p>
        <Link to="/" className="btn btn--primary">
          Back to the ground
        </Link>
      </div>
    </main>
  )
}
