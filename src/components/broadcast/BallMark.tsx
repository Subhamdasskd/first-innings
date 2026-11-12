/** The seam mark — used as the site's small brand glyph. */
export function BallMark({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      <circle cx="12" cy="12" r="9.1" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.7 17.3C9.6 14.1 14.4 9.9 17.3 6.7"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.45"
        strokeLinecap="round"
      />
      <g stroke="currentColor" strokeWidth="0.95" opacity="0.9" strokeLinecap="round">
        <path d="M8.3 5.6v2.1M10.5 4.7v2.1M12.6 4.3v2.1M14.7 4.5v2.1" />
        <path d="M8.3 18.4v-2.1M10.5 19.3v-2.1M12.6 19.7v-2.1M14.7 19.5v-2.1" />
      </g>
    </svg>
  )
}
