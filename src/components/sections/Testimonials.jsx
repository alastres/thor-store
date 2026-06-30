import { Star } from '@phosphor-icons/react'
import BorderGlow from '@/components/ui/BorderGlow'

const REVIEWS = [
  { name: 'Eva Bueno',   role: 'Mamá perro', initials: 'EB', text: '"Sus productos naturales han mejorado la salud de mi perro. ¡La mejor tienda!"', hl: false },
  { name: 'Ana García',  role: 'Mamá gato',  initials: 'AG', text: '"Su gama de productos naturales es incomparable. ¡Muy recomendable a todos!"',  hl: true  },
  { name: 'Pepe Blanco', role: 'Papá perro', initials: 'PB', text: '"Con sus alimentos naturales, mis peludos están más sanos que nunca."',          hl: false },
]

function Stars() {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({length:5}).map((_,i) => <Star key={i} size={12} weight="fill" className="text-lime"/>)}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-20 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="block text-[10px] font-bold tracking-[2px] uppercase text-lime mb-2">Opiniones</span>
          <h2 className="text-[32px] font-black tracking-tight">
            Lo que dicen nuestros <span className="grad-text-pink">clientes</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {REVIEWS.map(r => (
            r.hl
              ? <div key={r.name} className="p-px rounded-2xl" style={{ background: 'linear-gradient(135deg,rgba(201,241,5,.5),rgba(250,37,136,.4))' }}>
                  <div className="h-full rounded-[15px] p-6 bg-surface-1/90 backdrop-blur">
                    <Stars />
                    <p className="text-[13px] leading-relaxed text-offwhite/42 mb-5 italic">{r.text}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold border border-pink/25 bg-pink/10 text-pink">{r.initials}</div>
                      <div><p className="text-[12px] font-bold">{r.name}</p><p className="text-[10px] text-offwhite/28">{r.role}</p></div>
                    </div>
                  </div>
                </div>
              : <BorderGlow key={r.name} variant="lime" borderRadius={16} glowRadius={30} edgeSensitivity={24} className="p-6">
                  <Stars />
                  <p className="text-[13px] leading-relaxed text-offwhite/42 mb-5 italic">{r.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold border border-lime/22 bg-lime/8 text-lime">{r.initials}</div>
                    <div><p className="text-[12px] font-bold">{r.name}</p><p className="text-[10px] text-offwhite/28">{r.role}</p></div>
                  </div>
                </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  )
}
