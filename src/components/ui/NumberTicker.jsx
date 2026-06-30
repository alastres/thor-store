import { useEffect, useRef, useState } from 'react'

export default function NumberTicker({ value, suffix = '', duration = 1800 }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const s = performance.now()
        const tick = (now) => {
          const p = Math.min((now - s) / duration, 1)
          setN(Math.round((1 - Math.pow(1 - p, 3)) * value))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [value, duration])

  return <span ref={ref}>{n}{suffix}</span>
}
