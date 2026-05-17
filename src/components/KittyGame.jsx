import { useEffect, useRef, useState } from 'react'
import { loadKitty } from '../utils/loadKitty.js'


// ── Constants ──────────────────────────────────────────────────────────
const CARD_W        = 120
const CARD_H        = 40
const PLAYER_W      = 80
const PLAYER_H      = 80
const PLAYER_SPEED  = 6
const SPAWN_MS      = 1500
const FALL_BASE     = 2
const FALL_INC      = 0.1
const CATCH_PER_INC = 10
const PLAYER_Y_OFFSET = 100   // canvas.height - this = player top-left y

// ── Helpers ────────────────────────────────────────────────────────────
function persistResource(resource) {
  try {
    const list = JSON.parse(localStorage.getItem('savedFreebs') || '[]')
    if (!list.find(r => r.url === resource.url)) {
      list.push({ name: resource.name, url: resource.url, category: resource.category })
      localStorage.setItem('savedFreebs', JSON.stringify(list))
    }
  } catch { /* storage unavailable */ }
}

function recordScore(score) {
  try {
    const list = JSON.parse(localStorage.getItem('kittyHighScores') || '[]')
    list.push({ score, date: new Date().toLocaleDateString() })
    list.sort((a, b) => b.score - a.score)
    list.splice(3)
    localStorage.setItem('kittyHighScores', JSON.stringify(list))
    return list
  } catch { return [] }
}

function fitText(ctx, text, maxW) {
  if (ctx.measureText(text).width <= maxW) return text
  let t = text
  while (t.length > 1 && ctx.measureText(t + '…').width > maxW) t = t.slice(0, -1)
  return t + '…'
}

// ── Component ──────────────────────────────────────────────────────────
export default function KittyGame({ resources, onClose }) {
  const canvasRef  = useRef(null)
  const onCloseRef = useRef(onClose)
  useEffect(() => { onCloseRef.current = onClose }, [onClose])

  // Live game state — all refs, no re-renders from the RAF loop
  const phaseRef   = useRef('rules')
  const scoreRef   = useRef(0)
  const livesRef   = useRef(3)
  const playerXRef = useRef(0)
  const cardsRef   = useRef([])
  const floatsRef  = useRef([])
  const keysRef    = useRef(new Set())
  const speedRef   = useRef(FALL_BASE)
  const catchRef   = useRef(0)
  const rafRef     = useRef(null)
  const spawnRef   = useRef(null)
  const missTimer  = useRef(null)
  const starsRef   = useRef([])
  const restartRef = useRef(null)

  // Canvas sprite sources loaded via loadKitty()
  const playerCanvasRef = useRef(null)   // 80px — game player + game over

  // React state for HTML overlays only
  const [uiPhase,     setUiPhase]     = useState('rules')
  const [board,       setBoard]       = useState([])
  const [showMiss,    setShowMiss]    = useState(false)
  const [rulesDataUrl, setRulesDataUrl] = useState(null)  // 120px for rules screen img

  // ── Load sprites via loadKitty ────────────────────────────────────────
  useEffect(() => {
    loadKitty(80).then(c => { playerCanvasRef.current = c })
    loadKitty(120).then(c => setRulesDataUrl(c.toDataURL('image/png')))
  }, [])

  // ── Main game effect ──────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    playerXRef.current = canvas.width / 2

    starsRef.current = Array.from({ length: 70 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      s: 1 + Math.random() * 2.5,
      color: i % 2 === 0 ? 'rgba(255,105,180,0.8)' : 'rgba(255,182,193,0.8)',
    }))

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // ── Input ────────────────────────────────────────────────────────
    function onKeyDown(e) {
      keysRef.current.add(e.key)
      if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(e.key))
        e.preventDefault()
      if (e.key === 'Escape') onCloseRef.current()
    }
    function onKeyUp(e) { keysRef.current.delete(e.key) }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup',   onKeyUp)

    // ── Spawn ────────────────────────────────────────────────────────
    function spawnCard() {
      if (phaseRef.current !== 'playing' || !resources.length) return
      const res = resources[Math.floor(Math.random() * resources.length)]
      cardsRef.current.push({
        x: Math.random() * (canvas.width - CARD_W),
        y: -CARD_H,
        name: res.name,
        resource: res,
      })
    }
    spawnRef.current = setInterval(spawnCard, SPAWN_MS)

    // ── Draw helpers ──────────────────────────────────────────────────
    function drawBackground() {
      const bg = ctx.createLinearGradient(0, 0, 0, canvas.height)
      bg.addColorStop(0, '#1a0a2e')
      bg.addColorStop(1, '#2d1b4e')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      starsRef.current.forEach(({ x, y, s, color }) => {
        ctx.fillStyle = color
        ctx.fillRect(x, y, s, s)
      })
    }

    function drawPlayer() {
      const src = playerCanvasRef.current
      const px  = playerXRef.current - PLAYER_W / 2
      const py  = canvas.height - PLAYER_Y_OFFSET
      ctx.imageSmoothingEnabled = false
      if (src) {
        ctx.drawImage(src, px, py, PLAYER_W, PLAYER_H)
      } else {
        ctx.fillStyle = '#FF69B4'
        ctx.fillRect(px, py, PLAYER_W, PLAYER_H)
        ctx.fillStyle = '#fff'
        ctx.font = '24px serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('♥', px + PLAYER_W / 2, py + PLAYER_H / 2)
      }
    }

    function drawCard(card) {
      ctx.fillStyle = '#1a1a1a'
      ctx.fillRect(card.x + 3, card.y + 3, CARD_W, CARD_H)
      ctx.fillStyle = '#FF69B4'
      ctx.fillRect(card.x, card.y, CARD_W, CARD_H)
      ctx.strokeStyle = '#1a1a1a'
      ctx.lineWidth = 2
      ctx.strokeRect(card.x, card.y, CARD_W, CARD_H)
      ctx.fillStyle = '#C8A2C8'
      ctx.fillRect(card.x, card.y, CARD_W, 10)
      ctx.strokeStyle = '#1a1a1a'
      ctx.lineWidth = 1
      ctx.strokeRect(card.x, card.y, CARD_W, 10)
      ctx.fillStyle = '#FFFFFF'
      ctx.font = '6px "Press Start 2P"'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(fitText(ctx, card.name, CARD_W - 10), card.x + CARD_W / 2, card.y + CARD_H / 2 + 4)
    }

    function drawHUD() {
      ctx.textBaseline = 'top'
      ctx.font = '14px "Press Start 2P"'
      ctx.fillStyle = '#FF69B4'
      ctx.textAlign = 'left'
      ctx.fillText('♥'.repeat(Math.max(0, livesRef.current)), 20, 20)
      ctx.textAlign = 'right'
      ctx.fillText(`SCORE: ${String(scoreRef.current).padStart(3, '0')}`, canvas.width - 20, 20)
    }

    function drawFloats() {
      floatsRef.current.forEach(f => {
        ctx.globalAlpha = f.opacity
        ctx.font = '13px "Press Start 2P"'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = '#FF69B4'
        ctx.fillText(f.text, f.x, f.y)
      })
      ctx.globalAlpha = 1
    }

    function drawGameOver() {
      ctx.fillStyle = 'rgba(0,0,0,0.78)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      const kitty = playerCanvasRef.current
      ctx.imageSmoothingEnabled = false
      if (kitty) {
        ctx.drawImage(kitty, canvas.width / 2 - 40, canvas.height / 2 - 230, 80, 80)
      }
      ctx.fillStyle = '#FF69B4'
      ctx.font = '26px "Press Start 2P"'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 100)
      ctx.fillStyle = '#FFFFFF'
      ctx.font = '13px "Press Start 2P"'
      ctx.fillText(`SCORE: ${String(scoreRef.current).padStart(3, '0')}`, canvas.width / 2, canvas.height / 2 - 65)
    }

    // ── Collision ─────────────────────────────────────────────────────
    function checkCollisions() {
      const px = playerXRef.current - PLAYER_W / 2
      const py = canvas.height - PLAYER_Y_OFFSET

      cardsRef.current = cardsRef.current.filter(card => {
        const hit = px < card.x + CARD_W && px + PLAYER_W > card.x &&
                    py < card.y + CARD_H && py + PLAYER_H > card.y
        if (hit) {
          scoreRef.current += 10
          catchRef.current += 1
          if (catchRef.current % CATCH_PER_INC === 0) speedRef.current += FALL_INC
          persistResource(card.resource)
          floatsRef.current.push({
            x: card.x + CARD_W / 2, y: card.y,
            text: '+10 ♥', opacity: 1, vy: -1.5,
          })
          return false
        }
        if (card.y > canvas.height) {
          livesRef.current = Math.max(0, livesRef.current - 1)
          setShowMiss(true)
          clearTimeout(missTimer.current)
          missTimer.current = setTimeout(() => setShowMiss(false), 800)
          if (livesRef.current === 0) {
            phaseRef.current = 'gameover'
            clearInterval(spawnRef.current)
            setBoard(recordScore(scoreRef.current))
            setUiPhase('gameover')
          }
          return false
        }
        return true
      })
    }

    // ── Game loop ──────────────────────────────────────────────────────
    function loop() {
      drawBackground()
      const phase = phaseRef.current

      if (phase === 'playing') {
        const keys = keysRef.current
        if (keys.has('ArrowLeft') || keys.has('a') || keys.has('A'))
          playerXRef.current = Math.max(PLAYER_W / 2, playerXRef.current - PLAYER_SPEED)
        if (keys.has('ArrowRight') || keys.has('d') || keys.has('D'))
          playerXRef.current = Math.min(canvas.width - PLAYER_W / 2, playerXRef.current + PLAYER_SPEED)

        cardsRef.current.forEach(c => { c.y += speedRef.current })
        floatsRef.current = floatsRef.current.filter(f => {
          f.y += f.vy; f.opacity -= 0.022; return f.opacity > 0
        })
        checkCollisions()
        cardsRef.current.forEach(drawCard)
        drawPlayer()
        drawFloats()
        drawHUD()
      } else if (phase === 'gameover') {
        drawGameOver()
      }
      // 'rules' phase: background only — HTML overlay handles the rest

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    restartRef.current = function restart() {
      phaseRef.current   = 'playing'
      scoreRef.current   = 0
      livesRef.current   = 3
      playerXRef.current = canvas.width / 2
      cardsRef.current   = []
      floatsRef.current  = []
      speedRef.current   = FALL_BASE
      catchRef.current   = 0
      keysRef.current    = new Set()
      clearInterval(spawnRef.current)
      spawnRef.current   = setInterval(spawnCard, SPAWN_MS)
      setUiPhase('playing')
      setShowMiss(false)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearInterval(spawnRef.current)
      clearTimeout(missTimer.current)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup',   onKeyUp)
      document.body.style.overflow = prevOverflow
      restartRef.current = null
    }
  }, [resources])

  function handleStart() {
    phaseRef.current = 'playing'
    setUiPhase('playing')
  }

  // ── Render ──────────────────────────────────────────────────────────
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      fontFamily: '"Press Start 2P", monospace',
      userSelect: 'none',
    }}>
      <canvas ref={canvasRef} style={{ display: 'block', imageRendering: 'pixelated' }} />

      {uiPhase === 'playing' && (
        <div style={{
          position: 'absolute', top: 54, left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(200,162,200,0.7)', fontSize: 7,
          pointerEvents: 'none', whiteSpace: 'nowrap',
        }}>
          ← → or A / D to move &nbsp;·&nbsp; ESC to quit
        </div>
      )}

      {showMiss && (
        <div style={{
          position: 'absolute', top: '38%', left: '50%',
          transform: 'translate(-50%,-50%)',
          color: '#ff2222', fontSize: 32,
          pointerEvents: 'none', textShadow: '3px 3px 0 #000',
        }}>
          MISS!
        </div>
      )}

      {/* ── PRE-GAME RULES SCREEN ── */}
      {uiPhase === 'rules' && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: 'linear-gradient(180deg, #e8d5f5 0%, #ffd6e8 100%)',
            border: '3px solid #FF69B4',
            boxShadow: '0 0 0 6px #C8A2C8',
            padding: '36px 44px',
            maxWidth: 460, width: '90vw',
            textAlign: 'center',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 18,
          }}>
            {rulesDataUrl && (
              <img src={rulesDataUrl} alt="" aria-hidden="true"
                style={{ width: 120, height: 120, imageRendering: 'pixelated' }} />
            )}
            <h2 style={{
              color: '#FF69B4', fontSize: 15, lineHeight: 1.9,
              fontFamily: '"Press Start 2P"', margin: 0,
            }}>
              FREE KIT<br />CATCHER ♥
            </h2>
            <div style={{ color: '#1a0a2e', fontSize: 7.5, lineHeight: 2.4, fontFamily: '"Press Start 2P"' }}>
              catch falling resource cards!<br />
              miss 3 → game over<br />
              +10 points per catch<br />
              speed increases every 10 catches
            </div>
            <div style={{
              color: '#1a0a2e', fontSize: 7.5, lineHeight: 2.4,
              fontFamily: '"Press Start 2P"',
              background: 'rgba(255,105,180,0.12)',
              border: '2px solid #FF69B4',
              padding: '10px 20px', width: '100%',
            }}>
              ← → or A / D to move<br />
              ESC to quit
            </div>
            <button onClick={handleStart} style={{
              fontFamily: '"Press Start 2P"', fontSize: 12,
              background: '#FF69B4', color: '#fff',
              border: '2px solid #1a0a2e', boxShadow: '4px 4px 0 #1a0a2e',
              padding: '14px 32px', cursor: 'pointer', marginTop: 4,
            }}>
              START ♥
            </button>
          </div>
        </div>
      )}

      {/* ── GAME OVER HTML OVERLAY ── */}
      {uiPhase === 'gameover' && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'flex-end',
          paddingBottom: 60, gap: 20,
        }}>
          <div style={{
            background: '#0e0e1a', border: '2px solid #FF69B4',
            boxShadow: '4px 4px 0 #FF69B4',
            padding: '20px 32px', minWidth: 300,
          }}>
            <div style={{ color: '#FF69B4', fontSize: 10, textAlign: 'center', marginBottom: 20, letterSpacing: 1 }}>
              ★ BEST SCORES ★
            </div>
            {board.length === 0 && (
              <div style={{ color: '#444', fontSize: 8, textAlign: 'center' }}>no scores yet</div>
            )}
            {board.map((entry, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                gap: 28, fontSize: 8, marginBottom: 12, color: '#fff',
              }}>
                <span style={{ color: ['#FFD700','#C0C0C0','#CD7F32'][i], fontSize: 14 }}>{['①','②','③'][i]}</span>
                <span>{String(entry.score).padStart(5, '0')}</span>
                <span style={{ color: '#555', fontSize: 7 }}>{entry.date}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <button onClick={() => restartRef.current?.()} style={{
              fontFamily: '"Press Start 2P"', fontSize: 10,
              background: '#FF69B4', color: '#fff',
              border: '2px solid #1a1a1a', boxShadow: '4px 4px 0 #1a1a1a',
              padding: '13px 22px', cursor: 'pointer',
            }}>TRY AGAIN ♥</button>
            <button onClick={() => onCloseRef.current()} style={{
              fontFamily: '"Press Start 2P"', fontSize: 10,
              background: '#C8A2C8', color: '#fff',
              border: '2px solid #1a1a1a', boxShadow: '4px 4px 0 #1a1a1a',
              padding: '13px 22px', cursor: 'pointer',
            }}>QUIT</button>
          </div>
        </div>
      )}
    </div>
  )
}
