import { forwardRef, useImperativeHandle, useState } from 'react'

const TIPS = [
  "try searching 'cc0' ♥",
  "film-grab.com for movie stills ✨",
  "are.na is great for moodboards ♥",
  "google fonts has 1000+ free fonts ★",
  "freesound.org for audio needs ♥",
  "unsplash + remove.bg = magic ✨",
]

function randomTip() {
  return TIPS[Math.floor(Math.random() * TIPS.length)]
}

const KittyDecorations = forwardRef(function KittyDecorations(_, ref) {
  const [glassesVisible, setGlassesVisible] = useState(false)
  const [tip, setTip] = useState(() => randomTip())

  useImperativeHandle(ref, () => ({
    slideIn() { setTip(randomTip()); setGlassesVisible(true) },
    slideOut() { setGlassesVisible(false) },
  }), [])

  return (
    <>

      {/* ── 1. SLEEPY KITTY — bottom left, bobs, tilted ── */}
      <img
        src="/kitty.png"
        className="kitty-decoration"
        alt="" aria-hidden="true"
        style={{
          position: 'fixed', bottom: 20, left: 20,
          width: 70, zIndex: 50, pointerEvents: 'none',
          animation: 'bob 3s ease-in-out infinite',
          transform: 'rotate(-15deg)',
          filter: 'brightness(0.9)',
        }}
      />

      {/* ── 2. COW KITTY — bottom right area, static ── */}
      <img
        src="/kitty.png"
        className="kitty-decoration"
        alt="" aria-hidden="true"
        style={{
          position: 'fixed', bottom: 0, right: 120,
          width: 60, zIndex: 50, pointerEvents: 'none',
        }}
      />

      {/* ── 3. GHOST KITTY — drifts left→right with ghostly blue tint ── */}
      <img
        src="/kitty.png"
        className="kitty-decoration"
        alt="" aria-hidden="true"
        style={{
          position: 'fixed', bottom: 60,
          width: 50, opacity: 0.5, zIndex: 50, pointerEvents: 'none',
          animation: 'drift 20s linear infinite',
          filter: 'brightness(1.5) hue-rotate(180deg)',
        }}
      />

      {/* ── 4. GLASSES KITTY — slides in from right on search focus ── */}
      <div style={{
        position: 'fixed', top: 140,
        right: glassesVisible ? 10 : -80,
        width: 65, zIndex: 150, pointerEvents: 'none',
        transition: 'right 0.4s ease',
      }}>
        {glassesVisible && (
          <div className="speech-bubble">{tip}</div>
        )}

        {/* Kitty with CSS glasses overlay */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img
            src="/kitty.png"
            className="kitty-decoration"
            alt="" aria-hidden="true"
            style={{ width: 65, display: 'block' }}
          />
          {/* Purple glasses — oval over approximate eye area */}
          <div style={{
            position: 'absolute',
            top: '40%', left: '22%',
            width: 20, height: 14,
            border: '3px solid #9B59B6',
            borderRadius: '50%',
            pointerEvents: 'none',
          }} />
        </div>
      </div>

    </>
  )
})

export default KittyDecorations
