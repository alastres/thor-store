import { useState } from 'react'
import { ArrowRight, EnvelopeSimple } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent]   = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setEmail('')
  }

  return (
    <section className="relative overflow-hidden py-16 px-6 md:px-12"
      style={{ background: 'linear-gradient(135deg,#0a0614 0%,#100808 40%,#001014 80%,#0a0614 100%)' }}>
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(255,107,0,.6),rgba(200,255,0,.4),transparent)' }} />
      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(0,240,255,.4),rgba(255,62,165,.3),transparent)' }} />
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(255,107,0,.12),transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(0,240,255,.10),transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      <div className="max-w-xl mx-auto text-center relative z-10">
        <div className="w-12 h-12 mx-auto mb-5 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(255,107,0,.1)', border: '1px solid rgba(255,107,0,.25)' }}>
          <EnvelopeSimple size={20} weight="duotone" style={{ color: '#FF6B00' }} />
        </div>
        <h2 className="text-[26px] font-black mb-3 tracking-tight">
          10% OFF en tu <span className="grad-text-orange">primer pedido</span>
        </h2>
        <p className="text-[13px] text-offwhite/35 mb-7">Suscríbete y recibe novedades, recetas y descuentos exclusivos.</p>

        {sent
          ? <div className="rounded-xl px-6 py-5 text-center"
              style={{ border: '1px solid rgba(255,107,0,.3)', background: 'rgba(255,107,0,.07)' }}>
              <span className="text-2xl mb-2 block">🔥</span>
              <p className="text-[13px] font-bold" style={{ color: '#FF6B00' }}>¡Genial! Ya estás en la lista.</p>
              <p className="text-[11px] text-offwhite/30 mt-1">Revisa tu correo para obtener tu descuento.</p>
            </div>
          : <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <Input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="flex-1"
                style={{ borderColor: 'rgba(255,107,0,.25)' }}
              />
              <Button type="submit" size="md" className="shrink-0 font-bold"
                style={{ background: 'linear-gradient(135deg,#FF6B00,#FF3EA5)', color: '#fff', boxShadow: '0 0 20px rgba(255,107,0,.35)' }}>
                Quiero mi 10% <ArrowRight size={14} weight="bold"/>
              </Button>
            </form>
        }

        <p className="text-[10px] text-offwhite/15 mt-4">Sin spam · Cancelación en 1 clic</p>
      </div>
    </section>
  )
}
