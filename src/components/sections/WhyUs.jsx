import { PawPrint, Certificate, Leaf, Headset } from '@phosphor-icons/react'
import BorderGlow from '@/components/ui/BorderGlow'

const FEATURES = [
  { Icon: PawPrint,    title: 'Son nuestros compañeros', desc: 'Probados primero por nuestros peludos.', color: '#C8FF00', bg: 'rgba(200,255,0,.07)',   border: 'rgba(200,255,0,.14)'   },
  { Icon: Certificate, title: 'Calidad Certificada',     desc: 'Estándares de alimentación humana.',    color: '#00F0FF', bg: 'rgba(0,240,255,.07)',   border: 'rgba(0,240,255,.14)'   },
  { Icon: Leaf,        title: 'Solo Natural',            desc: 'Sin conservantes ni colorantes.',       color: '#FFD700', bg: 'rgba(255,215,0,.07)',   border: 'rgba(255,215,0,.14)'   },
  { Icon: Headset,     title: 'Soporte 24h',             desc: 'Siempre disponibles para ti.',          color: '#FF6B00', bg: 'rgba(255,107,0,.07)',   border: 'rgba(255,107,0,.14)'   },
]

export default function WhyUs() {
  return (
    <section className="relative py-20 px-6 md:px-12 overflow-hidden" style={{ background: 'transparent' }}>
      {/* static gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 50% at 15% 50%, rgba(250,37,136,.06) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center relative z-10">
        <div>
          <span className="block text-[10px] font-bold tracking-[2px] uppercase text-lime mb-3">Por qué elegirnos</span>
          <h2 className="text-[32px] font-black leading-tight tracking-tight mb-5">
            Sabemos lo que hacemos y{' '}
            <span className="grad-text-pink">amamos a los peludos</span>
          </h2>
          <p className="text-[14px] leading-relaxed text-offwhite/38 mb-8 max-w-md">
            Todos nuestros productos tienen las mismas condiciones sanitarias y de calidad que los alimentos para personas.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {FEATURES.map(({ Icon, title, desc, color, bg, border }) => (
            <BorderGlow key={title} variant="mixed" borderRadius={14} glowRadius={28} edgeSensitivity={22} className="p-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3.5" style={{ background: bg, border: `1px solid ${border}` }}>
                <Icon size={18} weight="duotone" style={{ color }} />
              </div>
              <p className="text-[13px] font-bold mb-1.5">{title}</p>
              <p className="text-[11px] leading-relaxed text-offwhite/30">{desc}</p>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  )
}
