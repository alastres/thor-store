import NumberTicker from '@/components/ui/NumberTicker'

const STATS = [
  { value: 15,    suffix: '+',  label: 'Años de Experiencia' },
  { value: 10, suffix: 'K+', label: 'Animales Felices' },
  { value: 100,   suffix: '%',  label: 'Natural sin Aditivos' },
  { fixed: '24h',              label: 'Soporte al Cliente' },
]

export default function Stats() {
  return (
    <div className="relative overflow-hidden px-8 py-8 glow-lime" style={{ background: 'transparent' }}>
      {/* scanline */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent 0%,rgba(201,241,5,.6) 50%,transparent 100%)' }} />
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.label} className={`text-center py-3 ${i < 3 ? 'border-r border-lime/14' : ''}`}>
            <div className="text-[36px] font-black text-lime leading-tight" style={{ textShadow: '0 0 20px rgba(201,241,5,.5)' }}>
              {s.fixed ?? <NumberTicker value={s.value} suffix={s.suffix} />}
            </div>
            <div className="text-[11px] font-semibold text-lime/50 mt-1.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
