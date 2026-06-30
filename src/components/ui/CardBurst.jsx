import './CardBurst.css'

// Deterministic particles: angle, distance, color, size, duration, delay
const PALETTE = ['#C8FF00', '#FF3EA5', '#00F0FF', '#FFD700', '#FF6B00']
// angle, dist, colorIndex, size, duration, delay
// Distances 260-320px: must exceed card half-width(244px) and half-height(212px) to protrude visibly
const RAW = [
  [  0, 290, 0, 5, 2.4, 0.0],
  [ 22, 270, 1, 3, 1.9, 0.4],
  [ 45, 310, 2, 6, 2.9, 1.1],
  [ 67, 260, 3, 4, 2.1, 0.7],
  [ 90, 285, 4, 5, 3.2, 0.2],
  [112, 275, 0, 3, 2.0, 1.5],
  [135, 320, 1, 7, 2.6, 0.9],
  [157, 265, 2, 4, 1.8, 0.5],
  [180, 295, 3, 5, 2.7, 1.3],
  [202, 268, 4, 3, 2.3, 0.0],
  [225, 305, 0, 6, 3.0, 0.8],
  [247, 260, 1, 4, 2.2, 1.6],
  [270, 280, 2, 5, 2.5, 0.3],
  [292, 272, 3, 3, 1.9, 1.0],
  [315, 315, 4, 6, 2.8, 0.6],
  [337, 262, 0, 4, 2.1, 1.4],
]

const PARTICLES = RAW.map(([angle, dist, ci, size, dur, delay]) => {
  const rad = (angle * Math.PI) / 180
  return {
    tx: Math.cos(rad) * dist,
    ty: Math.sin(rad) * dist,
    color: PALETTE[ci],
    size,
    dur,
    delay,
  }
})

export default function CardBurst() {
  return (
    <div className="card-burst-root">
      {PARTICLES.map((p, i) => (
        <div key={i} className="card-burst-particle"
          style={{
            '--tx':    `${p.tx.toFixed(1)}px`,
            '--ty':    `${p.ty.toFixed(1)}px`,
            '--dur':   `${p.dur}s`,
            '--delay': `${p.delay}s`,
            width:     p.size,
            height:    p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 1}px ${p.color}cc`,
          }}
        />
      ))}
    </div>
  )
}
