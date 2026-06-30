import { useState } from 'react'
import { CaretDown } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

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
          <span className="block text-[10px] font-bold tracking-[2px] uppercase text-lime mb-2">FAQ</span>
          <h2 className="text-[32px] font-black tracking-tight">
            Preguntas <span className="grad-text">frecuentes</span>
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          {FAQS.map((f, i) => (
            <div key={i}
              className={cn(
                'rounded-xl border transition-all duration-200 overflow-hidden cursor-pointer',
                open === i
                  ? 'border-lime/25 bg-lime/5'
                  : 'border-white/7 bg-surface-1/50 hover:border-white/15'
              )}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <span className="text-[13px] font-semibold leading-snug">{f.q}</span>
                <CaretDown
                  size={15}
                  className={cn('shrink-0 text-offwhite/35 transition-transform duration-200', open === i && 'rotate-180 text-lime')}
                />
              </div>
              {open === i && (
                <div className="px-5 pb-4">
                  <p className="text-[12px] leading-relaxed text-offwhite/42">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
