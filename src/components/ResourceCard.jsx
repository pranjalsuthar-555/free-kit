import { useState } from 'react'
import { confetti } from '../utils/confetti.js'

const CATEGORY_ICONS = {
  'Images':                            '🖼️',
  'Vector':                            '🎨',
  'Audio':                             '🎵',
  'Video':                             '🎬',
  'Fonts':                             '🔤',
  'Templates':                         '📄',
  'Visual Reference & Inspiration':    '🔍',
  'Design Tools & References':         '🛠️',
  'Color & Photography References':    '🎨',
  'Creative Professional Tools':       '🛠️',
  'Collections':                       '📦',
}

export default function ResourceCard({ name, description, url, category, isNew, isCommunityPick }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy(e) {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      confetti(e.clientX, e.clientY, 12)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard API unavailable (non-secure context etc.)
    }
  }

  function handleVisit(e) {
    confetti(e.clientX, e.clientY, 24)
  }

  return (
    <div className="win98-card">

      {/* ── Title bar ── */}
      <div className="win98-card__titlebar">
        <div className="win98-card__controls">
          <span className="win-btn win-btn--close">✕</span>
          <span className="win-btn win-btn--min">─</span>
          <span className="win-btn win-btn--max">□</span>
        </div>
        <span className="win98-card__title">{name}</span>
        {isNew && <span className="badge-new">NEW ✨</span>}
      </div>

      {/* ── Body ── */}
      <div className="win98-card__body">

        {/* Category + community pick row */}
        <div className="card-meta-row">
          {category && (
            <span className="category-badge">
              <span>{CATEGORY_ICONS[category] ?? '🔗'}</span>
              {category}
            </span>
          )}
          {isCommunityPick && (
            <span className="badge-community">⭐ COMMUNITY PICK</span>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="win98-card__desc">{description}</p>
        )}

        {/* Actions */}
        <div className="card-action-row">
          <a
            className="card-visit-btn"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleVisit}
          >
            VISIT →
          </a>

          <div className="card-copy-wrap">
            <button
              className="card-copy-btn"
              onClick={handleCopy}
              aria-label="Copy URL to clipboard"
              title="Copy URL"
            >
              📋
            </button>
            {copied && (
              <span className="card-copy-tooltip" role="status">
                COPIED! ♥
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
