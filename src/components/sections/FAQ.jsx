import { useState } from 'react'
import { CaretDown } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

const PALETTE = [
  { color: '#C8FF00', bg: 'rgba(200,255,0,.05)',  border: 'rgba(200,255,0,.22)' },
  { color: '#00F0FF', bg: 'rgba(0,240,255,.05)',  border: 'rgba(0,240,255,.22)' },
  { color: '#FFD700', bg: 'rgba(255,215,0,.05)',  border: 'rgba(255,215,0,.22)' },
  { color: '#FF6B00', bg: 'rgba(255,107,0,.05)',  border: 'rgba(255,107,0,.22)' },
  { color: '#FF3EA5', bg: 'rgba(255,62,165,.05)', border: 'rgba(255,62,165,.22)' },
]

const FAQS = [
  { q: '¿Cuándo recibiré mi pedido?', a: 'Pedidos antes de las 15h llegan el mismo día. Los pedidos de tarde llegan al día siguiente laborable.' },
  { q: '¿Los productos son realmente 100% naturales?', a: 'Sí. Ninguno de nuestros productos contiene conservantes, colorantes ni aditivos artificiales.' },
  { q: '¿Puedo devolver un producto?', a: 'Tienes 30 días para devolver cualquier producto en perfecto estado. La devolución es gratuita.' },
  { q: '¿Apto para mascotas con alergias?', a: 'Ofrecemos opciones monoproteicas específicas para perros con sensibilidades. Consúltanos por WhatsApp.' },
  { q: '¿Tienen suscripción o pedido recurrente?', a: 'Pronto lanzaremos un plan de suscripción con descuento. Por ahora contáctanos por WhatsApp para gestionarlo.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className="py-20 px-6 md:px-12 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="block text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: '#FFD700' }}>FAQ</span>
          <h2 className="text-[32px] font-black tracking-tight">
            Preguntas <span className="grad-text-orange">frecuentes</span>
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          {FAQS.map((f, i) => {
            const p = PALETTE[i % PALETTE.length]
            const isOpen = open === i
            return (
              <div key={i}
                className="rounded-xl border transition-all duration-200 overflow-hidden cursor-pointer"
                style={{
                  borderColor: isOpen ? p.border : 'rgba(255,255,255,.07)',
                  background: isOpen ? p.bg : 'rgba(12,12,16,.5)',
                }}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <div className="flex items-center justify-between gap-4 px-5 py-4">
                  <span className="text-[13px] font-semibold leading-snug" style={{ color: isOpen ? p.color : undefined }}>{f.q}</span>
                  <CaretDown
                    size={15}
                    style={{ color: isOpen ? p.color : 'rgba(251,251,248,.35)', flexShrink: 0 }}
                    className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
                  />
                </div>
                {isOpen && (
                  <div className="px-5 pb-4">
                    <p className="text-[12px] leading-relaxed text-offwhite/42">{f.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
