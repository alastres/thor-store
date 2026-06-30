import { Link } from 'react-router-dom'
import { Minus, Plus, Trash, ArrowRight, ShoppingBag } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import BorderGlow from '@/components/ui/BorderGlow'
import { useCart } from '@/context/CartContext'

export default function Cart() {
  const { items, totalItems, totalPrice, dispatch } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5 px-6 text-center">
        <span className="text-7xl">🛒</span>
        <h2 className="text-2xl font-black">Tu carrito está vacío</h2>
        <p className="text-offwhite/35 text-[14px]">Añade productos para empezar</p>
        <Button variant="lime" size="md" asChild>
          <Link to="/tienda" className="flex items-center gap-2"><ShoppingBag size={15}/> Ir a la tienda</Link>
        </Button>
      </div>
    )
  }

  const shipping = totalPrice >= 30 ? 0 : 3.99
  const total    = totalPrice + shipping

  return (
    <div className="min-h-screen bg-background py-10 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black mb-2">Tu <span className="grad-text">Carrito</span></h1>
        <p className="text-[13px] text-offwhite/35 mb-8">{totalItems} {totalItems === 1 ? 'producto' : 'productos'}</p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          <div className="flex flex-col gap-3">
            {items.map(item => (
              <div key={item.id} className="glass rounded-xl p-4 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
                  style={{ background: 'linear-gradient(135deg,rgba(201,241,5,.07),rgba(6,6,8,.95))' }}>🐾</div>
                <div className="flex-1 min-w-0">
                  <Link to={`/producto/${item.slug}`} className="text-[13px] font-bold hover:text-lime transition-colors line-clamp-1">{item.name}</Link>
                  <p className="text-[12px] text-offwhite/35">{item.category}</p>
                </div>
                <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
                  <button onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty - 1 })} className="px-2 py-1.5 text-offwhite/40 hover:text-offwhite transition-colors"><Minus size={12}/></button>
                  <span className="px-3 text-[13px] font-bold">{item.qty}</span>
                  <button onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty + 1 })} className="px-2 py-1.5 text-offwhite/40 hover:text-offwhite transition-colors"><Plus size={12}/></button>
                </div>
                <span className="text-[15px] font-black text-lime min-w-[60px] text-right" style={{ textShadow: '0 0 10px rgba(201,241,5,.35)' }}>
                  {(item.price * item.qty).toFixed(2).replace('.', ',')} €
                </span>
                <button onClick={() => dispatch({ type: 'REMOVE', id: item.id })} className="text-offwhite/25 hover:text-pink transition-colors"><Trash size={15}/></button>
              </div>
            ))}
          </div>

          <BorderGlow variant="lime" borderRadius={16} glowRadius={32} edgeSensitivity={20} animated className="p-6 h-fit">
            <h3 className="text-[16px] font-black mb-5">Resumen del pedido</h3>
            <div className="space-y-3 mb-5 text-[13px]">
              <div className="flex justify-between text-offwhite/50"><span>Subtotal</span><span>{totalPrice.toFixed(2).replace('.', ',')} €</span></div>
              <div className="flex justify-between text-offwhite/50">
                <span>Envío</span>
                <span className={totalPrice >= 30 ? 'text-lime font-semibold' : ''}>{totalPrice >= 30 ? 'GRATIS' : '3,99 €'}</span>
              </div>
              {totalPrice < 30 && (
                <p className="text-[11px] text-lime/60 bg-lime/5 rounded-lg p-2.5 border border-lime/12">
                  ¡Añade {(30 - totalPrice).toFixed(2).replace('.', ',')} € más para envío gratis!
                </p>
              )}
              <div className="border-t border-white/8 pt-3 flex justify-between font-black text-[15px]">
                <span>Total</span>
                <span className="text-lime" style={{ textShadow: '0 0 10px rgba(201,241,5,.35)' }}>{total.toFixed(2).replace('.', ',')} €</span>
              </div>
            </div>
            <Button variant="lime" size="md" className="w-full" asChild>
              <Link to="/checkout" className="flex items-center gap-2 justify-center">Finalizar pedido <ArrowRight size={15}/></Link>
            </Button>
            <Link to="/tienda" className="block text-center text-[12px] text-offwhite/30 hover:text-offwhite/60 mt-3 transition-colors">Seguir comprando</Link>
          </BorderGlow>
        </div>
      </div>
    </div>
  )
}
