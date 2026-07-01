import { useState } from 'react'
import { Lock, Check, CreditCard, DeviceMobile, Bank } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import BorderGlow from '@/components/ui/BorderGlow'
import { useCart } from '@/context/CartContext'
import useSEO from '@/hooks/useSEO'

const FIELDS = [
  { name: 'firstName', label: 'Nombre',       type: 'text',  col: 1 },
  { name: 'lastName',  label: 'Apellidos',     type: 'text',  col: 1 },
  { name: 'email',     label: 'Email',          type: 'email', col: 2 },
  { name: 'phone',     label: 'Teléfono',       type: 'tel',   col: 2 },
  { name: 'address',   label: 'Dirección',      type: 'text',  col: 2 },
  { name: 'city',      label: 'Ciudad',          type: 'text',  col: 1 },
  { name: 'zip',       label: 'Código postal',   type: 'text',  col: 1 },
]

export default function Checkout() {
  useSEO({ title: 'Finalizar Pedido', noindex: true })

  const { items, totalPrice, dispatch } = useCart()
  const [form, setForm]       = useState({})
  const [done, setDone]       = useState(false)
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1400))
    dispatch({ type: 'CLEAR' })
    setDone(true)
    setLoading(false)
  }

  const shipping = totalPrice >= 30 ? 0 : 3.99
  const total    = totalPrice + shipping

  if (done) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5 text-center px-6">
        <div className="w-20 h-20 rounded-full bg-lime flex items-center justify-center shadow-[0_0_30px_rgba(201,241,5,.5)] mb-2">
          <Check size={36} className="text-black"/>
        </div>
        <h2 className="text-3xl font-black">¡Pedido confirmado!</h2>
        <p className="text-[14px] text-offwhite/40 max-w-sm">Te enviaremos un email de confirmación en breve. ¡Gracias por confiar en La Cocina de Thor!</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-10 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black mb-8">Finalizar <span className="grad-text">Pedido</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          <form onSubmit={submit} className="space-y-5">
            <div className="glass rounded-xl p-6">
              <h3 className="text-[14px] font-bold mb-5">Datos de envío</h3>
              <div className="grid grid-cols-2 gap-4">
                {FIELDS.map(f => (
                  <div key={f.name} className={f.col === 2 ? 'col-span-2' : ''}>
                    <label className="block text-[11px] font-semibold text-offwhite/40 mb-1.5">{f.label}</label>
                    <Input type={f.type} required onChange={e => setForm(prev => ({ ...prev, [f.name]: e.target.value }))} />
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-xl p-6">
              <h3 className="text-[14px] font-bold mb-4">Método de pago</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {[
                  { Icon: CreditCard,   label: 'Tarjeta' },
                  { Icon: null,         label: 'PayPal'  },
                  { Icon: DeviceMobile, label: 'Bizum'   },
                  { Icon: Bank,         label: 'Trans.'  },
                ].map(({ Icon, label }) => (
                  <label key={label} className="flex items-center justify-center gap-2 p-3 rounded-lg border border-white/10 bg-white/3 cursor-pointer hover:border-lime/30 text-[12px] font-semibold text-offwhite/55 transition-all">
                    <input type="radio" name="payment" className="accent-lime"/>
                    {Icon && <Icon size={14}/>} {label}
                  </label>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><label className="block text-[11px] font-semibold text-offwhite/40 mb-1.5">Número de tarjeta</label><Input type="text" placeholder="1234 5678 9012 3456"/></div>
                <div><label className="block text-[11px] font-semibold text-offwhite/40 mb-1.5">Caducidad</label><Input type="text" placeholder="MM/AA"/></div>
                <div><label className="block text-[11px] font-semibold text-offwhite/40 mb-1.5">CVV</label><Input type="text" placeholder="123"/></div>
              </div>
            </div>

            <Button type="submit" variant="lime" size="lg" className="w-full" disabled={loading}>
              <Lock size={15}/> {loading ? 'Procesando...' : `Pagar ${total.toFixed(2).replace('.', ',')} €`}
            </Button>
          </form>

          <BorderGlow variant="lime" borderRadius={16} glowRadius={28} edgeSensitivity={20} animated className="p-5 h-fit">
            <h3 className="text-[14px] font-black mb-4">Tu pedido</h3>
            <div className="space-y-2.5 mb-4">
              {items.map(i => (
                <div key={i.id} className="flex justify-between text-[12px] text-offwhite/55">
                  <span className="truncate mr-2">{i.name} ×{i.qty}</span>
                  <span className="shrink-0">{(i.price * i.qty).toFixed(2).replace('.', ',')} €</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/8 pt-3 space-y-1.5 text-[12px]">
              <div className="flex justify-between text-offwhite/40"><span>Subtotal</span><span>{totalPrice.toFixed(2).replace('.', ',')} €</span></div>
              <div className="flex justify-between text-offwhite/40"><span>Envío</span><span className={totalPrice >= 30 ? 'text-lime' : ''}>{totalPrice >= 30 ? 'GRATIS' : '3,99 €'}</span></div>
              <div className="flex justify-between font-black text-[14px] pt-2 border-t border-white/8">
                <span>Total</span>
                <span className="text-lime" style={{ textShadow: '0 0 10px rgba(201,241,5,.35)' }}>{total.toFixed(2).replace('.', ',')} €</span>
              </div>
            </div>
          </BorderGlow>
        </div>
      </div>
    </div>
  )
}
