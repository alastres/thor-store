import NumberTicker from '@/components/ui/NumberTicker'

const STATS = [
  { value: 15,  suffix: '+',  label: 'Años de Experiencia', color: '#C8FF00', glow: 'rgba(200,255,0,.5)'   },
  { value: 10,  suffix: 'K+', label: 'Animales Felices',    color: '#00F0FF', glow: 'rgba(0,240,255,.5)'   },
  { value: 100, suffix: '%',  label: 'Natural sin Aditivos',color: '#FFD700', glow: 'rgba(255,215,0,.5)'   },
  { fixed: '24h',             label: 'Soporte al Cliente',  color: '#FF6B00', glow: 'rgba(255,107,0,.5)'   },
]

export default function Stats() {
  return (
    <div className="relative overflow-hidden px-8 py-8" style={{ background: 'transparent' }}>
      {/* scanline */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent 0%,rgba(200,255,0,.6) 50%,transparent 100%)' }} />
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.label} className={`text-center py-3 ${i < 3 ? 'border-r border-white/8' : ''}`}>
            <div className="text-[36px] font-black leading-tight" style={{ color: s.color, textShadow: `0 0 20px ${s.glow}` }}>
              {s.fixed ?? <NumberTicker value={s.value} suffix={s.suffix} />}
            </div>
            <div className="text-[11px] font-semibold mt-1.5" style={{ color: `${s.color}70` }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
