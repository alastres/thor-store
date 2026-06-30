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
      style={{ background: 'linear-gradient(135deg,#0c1400 0%,#100808 50%,#0c1400 100%)' }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(201,241,5,.5),transparent)' }} />

      <div className="max-w-xl mx-auto text-center relative z-10">
        <div className="w-12 h-12 mx-auto mb-5 rounded-2xl bg-lime/8 border border-lime/18 flex items-center justify-center">
          <EnvelopeSimple size={20} weight="duotone" className="text-lime" />
        </div>
        <h2 className="text-[26px] font-black mb-3 tracking-tight">
          10% OFF en tu <span className="grad-text">primer pedido</span>
        </h2>
        <p className="text-[13px] text-offwhite/35 mb-7">Suscríbete y recibe novedades, recetas y descuentos exclusivos.</p>

        {sent
          ? <div className="rounded-xl border border-lime/25 bg-lime/6 px-6 py-5 text-center">
              <span className="text-2xl mb-2 block">⚡</span>
              <p className="text-[13px] font-bold text-lime">¡Genial! Ya estás en la lista.</p>
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
              />
              <Button type="submit" variant="lime" size="md" className="shrink-0">
                Quiero mi 10% <ArrowRight size={14} weight="bold"/>
              </Button>
            </form>
        }

        <p className="text-[10px] text-offwhite/15 mt-4">Sin spam · Cancelación en 1 clic</p>
      </div>
    </section>
  )
}
