import { useRef, useCallback, useEffect } from 'react'
import './BorderGlow.css'

// Brand palette mappings:
//   lime  → #C9F105  HSL ≈ 72  97  48
//   pink  → #FA2588  HSL ≈ 334 95  57
//   offwhite → #FBFBF8
const BRAND = {
  lime:  { colors: ['#C9F105', '#d4ff12', '#e8ff6a'], glowColor: '72 97 48' },
  pink:  { colors: ['#FA2588', '#ff3d95', '#C9F105'], glowColor: '334 95 57' },
  mixed: { colors: ['#C9F105', '#FA2588', '#FBFBF8'], glowColor: '72 97 48' },
}

function parseHSL(str) {
  const m = str.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/)
  if (!m) return { h: 72, s: 97, l: 48 }
  return { h: parseFloat(m[1]), s: parseFloat(m[2]), l: parseFloat(m[3]) }
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor)
  const base = `${h}deg ${s}% ${l}%`
  const ops  = [100, 60, 50, 40, 30, 20, 10]
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10']
  const v = {}
  for (let i = 0; i < ops.length; i++)
    v[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(ops[i] * intensity, 100)}%)`
  return v
}

const GPOS  = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%']
const GKEYS = ['--gradient-one','--gradient-two','--gradient-three','--gradient-four','--gradient-five','--gradient-six','--gradient-seven']
const CMAP  = [0, 1, 2, 0, 1, 2, 1]

function buildGradientVars(colors) {
  const v = {}
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(CMAP[i], colors.length - 1)]
    v[GKEYS[i]] = `radial-gradient(at ${GPOS[i]}, ${c} 0px, transparent 50%)`
  }
  v['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`
  return v
}

function easeOut(x) { return 1 - Math.pow(1 - x, 3) }
function easeIn(x)  { return x * x * x }

function animVal({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOut, onUpdate, onEnd }) {
  const t0 = performance.now() + delay
  function tick() {
    const t = Math.min((performance.now() - t0) / duration, 1)
    onUpdate(start + (end - start) * ease(t))
    if (t < 1) requestAnimationFrame(tick)
    else if (onEnd) onEnd()
  }
  setTimeout(() => requestAnimationFrame(tick), delay)
}

export default function BorderGlow({
  children,
  className = '',
  variant = 'lime',          // 'lime' | 'pink' | 'mixed' — or override with colors/glowColor
  edgeSensitivity = 28,
  glowColor,
  backgroundColor = '#0c0c10',
  borderRadius = 16,
  glowRadius = 36,
  glowIntensity = 1.1,
  coneSpread = 25,
  animated = false,
  colors,
  fillOpacity = 0.45,
}) {
  const preset    = BRAND[variant] ?? BRAND.lime
  const finalColors    = colors    ?? preset.colors
  const finalGlowColor = glowColor ?? preset.glowColor

  const cardRef = useRef(null)

  const getCenter = useCallback((el) => {
    const { width, height } = el.getBoundingClientRect()
    return [width / 2, height / 2]
  }, [])

  const getEdge = useCallback((el, x, y) => {
    const [cx, cy] = getCenter(el)
    const dx = x - cx, dy = y - cy
    let kx = Infinity, ky = Infinity
    if (dx !== 0) kx = cx / Math.abs(dx)
    if (dy !== 0) ky = cy / Math.abs(dy)
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1)
  }, [getCenter])

  const getAngle = useCallback((el, x, y) => {
    const [cx, cy] = getCenter(el)
    const dx = x - cx, dy = y - cy
    if (dx === 0 && dy === 0) return 0
    let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90
    if (deg < 0) deg += 360
    return deg
  }, [getCenter])

  const sweepRef = useRef(null)

  const cancelSweep = useCallback((card) => {
    if (sweepRef.current) {
      clearTimeout(sweepRef.current)
      sweepRef.current = null
    }
    card.classList.remove('sweep-active')
    card.style.setProperty('--edge-proximity', '0')
  }, [])

  const onMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const edgeVal = getEdge(card, x, y)
    card.classList.add('sweep-active')
    card.style.setProperty('--edge-proximity',   (edgeVal * 100).toFixed(2))
    card.style.setProperty('--cursor-angle',      `${getAngle(card, x, y).toFixed(2)}deg`)
    card.style.setProperty('--cursor-x',          `${((x / rect.width)  * 100).toFixed(2)}%`)
    card.style.setProperty('--cursor-y',          `${((y / rect.height) * 100).toFixed(2)}%`)
    card.style.setProperty('--center-proximity',  (1 - edgeVal).toFixed(3))
  }, [getEdge, getAngle])

  const onDown = useCallback(() => {}, [])

  const onLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.classList.remove('sweep-active')
    card.style.setProperty('--edge-proximity', '0')
  }, [])

  useEffect(() => {
    if (!animated || !cardRef.current) return
    const card = cardRef.current
    card.classList.add('sweep-active')
    card.style.setProperty('--cursor-angle', '110deg')
    animVal({ duration: 500, onUpdate: v => card.style.setProperty('--edge-proximity', v) })
    animVal({ ease: easeIn,  duration: 1500, end: 50, onUpdate: v => card.style.setProperty('--cursor-angle', `${(465-110)*(v/100)+110}deg`) })
    animVal({ ease: easeOut, duration: 2250, delay: 1500, start: 50, end: 100, onUpdate: v => card.style.setProperty('--cursor-angle', `${(465-110)*(v/100)+110}deg`) })
    animVal({ ease: easeIn,  duration: 1500, delay: 2500, start: 100, end: 0,
      onUpdate: v => card.style.setProperty('--edge-proximity', v),
      onEnd:    () => card.classList.remove('sweep-active'),
    })
  }, [animated])

  return (
    <div
      ref={cardRef}
      onPointerMove={onMove}
      onPointerDown={onDown}
      onPointerLeave={onLeave}
      className={`border-glow-card ${className}`}
      style={{
        '--card-bg':          backgroundColor,
        '--edge-sensitivity': edgeSensitivity,
        '--border-radius':    `${borderRadius}px`,
        '--glow-padding':     `${glowRadius}px`,
        '--cone-spread':      coneSpread,
        '--fill-opacity':     fillOpacity,
        ...buildGlowVars(finalGlowColor, glowIntensity),
        ...buildGradientVars(finalColors),
      }}
    >
      <span className="edge-light" />
      <span className="center-glow" />
      <div className="border-glow-inner">
        {children}
      </div>
    </div>
  )
}
