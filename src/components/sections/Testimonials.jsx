import { Star } from '@phosphor-icons/react'

const REVIEWS = [
  { name: 'Eva Bueno',   role: 'Mamá perro', initials: 'EB', text: '"Sus productos naturales han mejorado la salud de mi perro. ¡La mejor tienda!"', hl: false, color: '#C8FF00', colorBg: 'rgba(200,255,0,.1)',  colorBorder: 'rgba(200,255,0,.22)' },
  { name: 'Ana García',  role: 'Mamá gato',  initials: 'AG', text: '"Su gama de productos naturales es incomparable. ¡Muy recomendable a todos!"',  hl: true,  color: '#FF3EA5', colorBg: 'rgba(255,62,165,.1)', colorBorder: 'rgba(255,62,165,.22)' },
  { name: 'Pepe Blanco', role: 'Papá perro', initials: 'PB', text: '"Con sus alimentos naturales, mis peludos están más sanos que nunca."',          hl: false, color: '#00F0FF', colorBg: 'rgba(0,240,255,.1)',  colorBorder: 'rgba(0,240,255,.22)' },
]

function Stars() {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({length:5}).map((_,i) => <Star key={i} size={12} weight="fill" style={{ color: '#FFD700', filter: 'drop-shadow(0 0 3px rgba(255,215,0,.6))' }}/>)}
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
              ? <div key={r.name} className="p-px rounded-2xl"
                  style={{ background: `linear-gradient(135deg,${r.color}88,rgba(0,0,0,0) 60%,${r.color}44)` }}>
                  <div className="h-full rounded-[15px] p-6 bg-surface-1/90 backdrop-blur">
                    <Stars />
                    <p className="text-[13px] leading-relaxed text-offwhite/42 mb-5 italic">{r.text}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold"
                        style={{ border: `1px solid ${r.colorBorder}`, background: r.colorBg, color: r.color }}>
                        {r.initials}
                      </div>
                      <div>
                        <p className="text-[12px] font-bold" style={{ color: r.color }}>{r.name}</p>
                        <p className="text-[10px] text-offwhite/28">{r.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              : <div key={r.name} className="rounded-2xl p-6"
                  style={{ background: 'rgba(12,12,16,.7)', border: `1px solid ${r.colorBorder}`, boxShadow: `0 0 30px -10px ${r.color}22` }}>
                  <Stars />
                  <p className="text-[13px] leading-relaxed text-offwhite/42 mb-5 italic">{r.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold"
                      style={{ border: `1px solid ${r.colorBorder}`, background: r.colorBg, color: r.color }}>
                      {r.initials}
                    </div>
                    <div>
                      <p className="text-[12px] font-bold" style={{ color: r.color }}>{r.name}</p>
                      <p className="text-[10px] text-offwhite/28">{r.role}</p>
                    </div>
                  </div>
                </div>
          ))}
        </div>
      </div>
    </section>
  )
}
