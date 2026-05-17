import { useState } from 'react'

export default function Header({ resources = [], onPlay, onFreebs }) {
  const [spinning, setSpinning] = useState(false)

  function handleSurprise() {
    if (!resources.length) return
    const pick = resources[Math.floor(Math.random() * resources.length)]
    window.open(pick.url, '_blank', 'noopener,noreferrer')
    setSpinning(true)
  }

  return (
    <header className="site-header">
      <div className="header-titlebar">
        <span className="win-btn win-btn--close">✕</span>
        <span className="win-btn win-btn--min">─</span>
        <span className="win-btn win-btn--max">□</span>
        <span className="header-titlebar-label">free-kit.exe — Resource Directory for Creative Professionals</span>
      </div>

      <div className="header-body">
        <div>
          <h1 className="site-logo">FREE KIT ♥</h1>
          <p className="site-tagline">All the free stuff, in one very cute place</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <img
            src="/kitty.png"
            width="32" height="32"
            className={`kitty-decoration${spinning ? ' kitty-spin' : ''}`}
            onAnimationEnd={() => setSpinning(false)}
            alt="" aria-hidden="true"
          />
          <button className="pixel-btn" onClick={handleSurprise}>
            ✨ SURPRISE ME
          </button>
          <button className="pixel-btn pixel-btn--lavender" onClick={onFreebs}>
            MY FREEBS ♥
          </button>
          <button
            className="pixel-btn"
            onClick={onPlay}
            style={{ background: 'var(--black)', border: '2px solid var(--pink-hot)', boxShadow: '4px 4px 0 var(--pink-hot)' }}
          >
            🎮 PLAY ♥
          </button>
        </div>
      </div>
    </header>
  )
}
