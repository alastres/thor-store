import './CardBurst.css'

// Deterministic particles: angle, distance, color, size, duration, delay
const PALETTE = ['#C8FF00', '#FF3EA5', '#00F0FF', '#FFD700', '#FF6B00']
// angle, dist, colorIndex, size, duration, delay
// Distances 260-320px: must exceed card half-width(244px) and half-height(212px) to protrude visibly
const RAW = [
  [  0, 290, 0, 6, 2.4, 0.0],
  [ 16, 300, 1, 4, 1.7, 0.35],
  [ 22, 270, 1, 4, 1.9, 0.4],
  [ 45, 310, 2, 7, 2.9, 1.1],
  [ 56, 330, 2, 3, 1.6, 1.7],
  [ 67, 260, 3, 5, 2.1, 0.7],
  [ 90, 285, 4, 6, 3.2, 0.2],
  [101, 300, 4, 3, 1.5, 1.2],
  [112, 275, 0, 4, 2.0, 1.5],
  [135, 320, 1, 8, 2.6, 0.9],
  [146, 268, 1, 3, 1.8, 0.15],
  [157, 265, 2, 5, 1.8, 0.5],
  [180, 295, 3, 6, 2.7, 1.3],
  [191, 330, 3, 3, 2.2, 1.9],
  [202, 268, 4, 4, 2.3, 0.0],
  [225, 305, 0, 7, 3.0, 0.8],
  [236, 275, 0, 3, 1.6, 1.55],
  [247, 260, 1, 5, 2.2, 1.6],
  [270, 280, 2, 6, 2.5, 0.3],
  [281, 315, 2, 3, 1.9, 1.05],
  [292, 272, 3, 4, 1.9, 1.0],
  [315, 315, 4, 7, 2.8, 0.6],
  [326, 285, 4, 3, 1.7, 0.05],
  [337, 262, 0, 5, 2.1, 1.4],
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
            boxShadow: [
              `0 0 ${p.size * 0.6}px #fff8`,
              `0 0 ${p.size * 1.2}px ${p.color}`,
              `0 0 ${p.size * 2.4}px ${p.color}77`,
            ].join(', '),
          }}
        />
      ))}
    </div>
  )
}
