const CHARS  = ['♥', '★']
const COLORS = ['#FF69B4', '#FFB6C1', '#C8A2C8', '#FFFFFF']

export function confetti(x, y, count = 24) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span')
    el.textContent = CHARS[Math.floor(Math.random() * CHARS.length)]

    const size = 12 + Math.random() * 10

    el.style.cssText = [
      'position:fixed',
      `left:${x}px`,
      `top:${y}px`,
      `font-size:${size}px`,
      `color:${COLORS[Math.floor(Math.random() * COLORS.length)]}`,
      'pointer-events:none',
      'user-select:none',
      'z-index:99999',
      'line-height:1',
    ].join(';')

    document.body.appendChild(el)

    // Each particle gets an independent physics state
    const angle = Math.random() * Math.PI * 2
    const speed = 2.5 + Math.random() * 4.5
    let vx      = Math.cos(angle) * speed
    let vy      = Math.sin(angle) * speed - 3.5  // upward bias
    let px      = x
    let py      = y
    let opacity = 1

    ;(function tick() {
      vx      *= 0.97          // horizontal drag
      vy      += 0.18          // gravity
      px      += vx
      py      += vy
      opacity -= 0.018

      el.style.left    = px + 'px'
      el.style.top     = py + 'px'
      el.style.opacity = opacity

      if (opacity > 0) {
        requestAnimationFrame(tick)
      } else {
        el.remove()
      }
    })()
  }
}
