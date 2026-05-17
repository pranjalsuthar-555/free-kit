import { useState, useEffect } from 'react'

export default function SavedFreebsPanel({ open, onClose }) {
  const [freebs, setFreebs] = useState([])

  useEffect(() => {
    if (open) {
      try { setFreebs(JSON.parse(localStorage.getItem('savedFreebs') || '[]')) }
      catch { setFreebs([]) }
    }
  }, [open])

  function handleClearAll() {
    localStorage.removeItem('savedFreebs')
    setFreebs([])
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 8999,
          background: 'rgba(0,0,0,0.35)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 360,
        background: 'var(--pink-light)',
        borderLeft: '2px solid var(--black)',
        boxShadow: open ? '-6px 0 0 var(--black)' : 'none',
        zIndex: 9000,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '"Press Start 2P", monospace',
        overflow: 'hidden',
      }}>

        {/* Win98 title bar */}
        <div style={{
          background: 'linear-gradient(90deg, var(--pink-hot) 0%, var(--lavender) 100%)',
          padding: '5px 10px',
          display: 'flex', alignItems: 'center', gap: 5,
          borderBottom: '2px solid var(--black)',
          flexShrink: 0,
        }}>
          <span style={{ width: 14, height: 12, background: '#FF5F56', border: '2px solid var(--black)', display: 'inline-block' }} />
          <span style={{ width: 14, height: 12, background: '#FFBD2E', border: '2px solid var(--black)', display: 'inline-block' }} />
          <span style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 8, textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}>
            MY FREEBS ♥
          </span>
          <button
            onClick={onClose}
            style={{
              background: '#FF5F56', border: '2px solid var(--black)',
              color: '#fff', fontFamily: '"Press Start 2P"',
              fontSize: 8, padding: '2px 7px', cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>

        {/* Sub-header count */}
        <div style={{
          padding: '8px 14px',
          background: 'var(--white)',
          borderBottom: '2px solid var(--black)',
          fontSize: 7, color: 'var(--lavender)',
          flexShrink: 0,
        }}>
          {freebs.length} resource{freebs.length !== 1 ? 's' : ''} caught ♥
        </div>

        {/* Scrollable list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {freebs.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '48px 16px',
              color: 'var(--lavender)', fontSize: 7, lineHeight: 2.5,
            }}>
              no freebs yet!<br />
              play the game<br />
              to catch some ♥
            </div>
          ) : (
            freebs.map((r, i) => (
              <div key={i} style={{
                background: 'var(--white)',
                border: '2px solid var(--black)',
                boxShadow: '3px 3px 0 var(--black)',
              }}>
                {/* Card title bar */}
                <div style={{
                  background: 'linear-gradient(90deg, var(--pink-hot), var(--lavender))',
                  padding: '4px 8px',
                  borderBottom: '2px solid var(--black)',
                }}>
                  <span style={{
                    display: 'block', color: '#fff', fontSize: 7, lineHeight: 1.8,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {r.name}
                  </span>
                </div>
                {/* Card body */}
                <div style={{ padding: '8px 10px', background: 'var(--pink-light)' }}>
                  {r.category && (
                    <div style={{ fontSize: 6, color: 'var(--lavender)', marginBottom: 8 }}>
                      {r.category}
                    </div>
                  )}
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      fontFamily: '"Press Start 2P"', fontSize: 7,
                      background: 'var(--pink-hot)', color: '#fff',
                      border: '2px solid var(--black)', boxShadow: '2px 2px 0 var(--black)',
                      padding: '5px 10px', textDecoration: 'none',
                    }}
                  >
                    VISIT →
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Clear all footer */}
        {freebs.length > 0 && (
          <div style={{
            padding: 14, borderTop: '2px solid var(--black)',
            background: 'var(--white)', flexShrink: 0,
          }}>
            <button
              onClick={handleClearAll}
              style={{
                width: '100%', fontFamily: '"Press Start 2P"', fontSize: 7,
                background: 'var(--black)', color: 'var(--pink-hot)',
                border: '2px solid var(--pink-hot)', boxShadow: '3px 3px 0 var(--pink-hot)',
                padding: '11px 16px', cursor: 'pointer',
              }}
            >
              CLEAR ALL ✕
            </button>
          </div>
        )}
      </div>
    </>
  )
}
