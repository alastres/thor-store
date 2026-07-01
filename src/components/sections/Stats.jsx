import { Trophy, Heart, Leaf, Headset } from '@phosphor-icons/react'
import NumberTicker from '@/components/ui/NumberTicker'

const STATS = [
  { Icon: Trophy, value: 15,  suffix: '+',  label: 'Años de Experiencia',  color: '#C8FF00', bg: 'rgba(200,255,0,.06)',  border: 'rgba(200,255,0,.16)'  },
  { Icon: Heart,  value: 10,  suffix: 'K+', label: 'Animales Felices',     color: '#00F0FF', bg: 'rgba(0,240,255,.06)',  border: 'rgba(0,240,255,.16)'  },
  { Icon: Leaf,   value: 100, suffix: '%',  label: 'Natural sin Aditivos', color: '#FFD700', bg: 'rgba(255,215,0,.06)',  border: 'rgba(255,215,0,.16)'  },
  { Icon: Headset, fixed: '24h',            label: 'Soporte al Cliente',   color: '#FF6B00', bg: 'rgba(255,107,0,.06)',  border: 'rgba(255,107,0,.16)'  },
]

export default function Stats() {
  return (
    <div className="relative overflow-hidden px-6 md:px-8 py-10">
      {/* scanline */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent 0%,rgba(200,255,0,.6) 50%,transparent 100%)' }} />
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
        {STATS.map(({ Icon, value, suffix, fixed, label, color, bg, border }) => (
          <div key={label}
            className="group flex flex-col items-center text-center gap-2.5 rounded-2xl px-4 py-6 transition-transform duration-200 hover:-translate-y-0.5"
            style={{ background: bg, border: `1px solid ${border}` }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
              <Icon size={17} weight="duotone" style={{ color }} />
            </div>
            <div className="text-[32px] font-black leading-tight" style={{ color, textShadow: `0 0 20px ${color}80` }}>
              {fixed ?? <NumberTicker value={value} suffix={suffix} />}
            </div>
            <div className="text-[11px] font-semibold" style={{ color: `${color}90` }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
