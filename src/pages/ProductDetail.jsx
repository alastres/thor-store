import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { Minus, Plus, ShoppingCart, ArrowLeft, ShieldCheck, Truck, ArrowCounterClockwise, PawPrint, Check, Dog, Cat, Bone } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import BorderGlow from '@/components/ui/BorderGlow'
import { useCart } from '@/context/CartContext'
import { MOCK_PRODUCTS } from '@/lib/woocommerce'
import PageBg from '@/components/ui/PageBg'
import useSEO from '@/hooks/useSEO'

export default function ProductDetail() {
  const { slug } = useParams()
  const { dispatch } = useCart()
  const [qty, setQty]     = useState(1)
  const [added, setAdded] = useState(false)

  const CAT_ICONS = { perro: Dog, gato: Cat, snacks: Bone, salchichas: Bone, default: PawPrint }
  const product = MOCK_PRODUCTS.find(p => p.slug === slug) ?? MOCK_PRODUCTS[0]
  const hasDiscount = product.regular_price && parseFloat(product.regular_price) > parseFloat(product.price)
  const cat = (product.categories?.[0]?.name ?? 'default').toLowerCase()
  const CatIcon = CAT_ICONS[cat] ?? CAT_ICONS.default

  useSEO({
    title: product.name,
    description: product.short_description || `Compra ${product.name} — alimentación natural premium para tu mascota, sin conservantes ni aditivos.`,
    path: `/producto/${product.slug}`,
  })

  function addToCart() {
    dispatch({ type: 'ADD', item: { id: product.id, name: product.name, price: parseFloat(product.price), slug: product.slug, qty } })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <PageBg />
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <Link to="/tienda" className="inline-flex items-center gap-1.5 text-[12px] text-offwhite/35 hover:text-offwhite/70 mb-8 transition-colors">
          <ArrowLeft size={14}/> Volver a la tienda
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="p-px rounded-2xl" style={{ background: 'linear-gradient(135deg,rgba(201,241,5,.4),rgba(250,37,136,.25),rgba(255,255,255,.04))' }}>
            <div className="rounded-[15px] h-80 flex items-center justify-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg,rgba(201,241,5,.08),rgba(250,37,136,.05),rgba(6,6,8,.95))' }}>
              <CatIcon size={80} weight="duotone" style={{ color: 'rgba(200,255,0,.4)' }} />
              {hasDiscount && (
                <span className="absolute top-4 right-4 bg-pink text-white rounded-lg px-2.5 py-1 text-[12px] font-bold">
                  -{Math.round((1 - parseFloat(product.price) / parseFloat(product.regular_price)) * 100)}%
                </span>
              )}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold tracking-[2px] uppercase text-lime mb-2 block">{product.categories?.[0]?.name}</span>
            <h1 className="text-3xl font-black tracking-tight mb-3">{product.name}</h1>
            <p className="text-[14px] leading-relaxed text-offwhite/42 mb-5">{product.short_description}</p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-black text-lime" style={{ textShadow: '0 0 16px rgba(201,241,5,.4)' }}>
                {parseFloat(product.price).toFixed(2).replace('.', ',')} €
              </span>
              {hasDiscount && (
                <span className="text-[16px] text-offwhite/25 line-through">
                  {parseFloat(product.regular_price).toFixed(2).replace('.', ',')} €
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center border border-white/12 rounded-lg overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2.5 text-offwhite/50 hover:text-offwhite hover:bg-white/6 transition-all"><Minus size={14}/></button>
                <span className="px-4 text-[14px] font-bold min-w-[40px] text-center">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="px-3 py-2.5 text-offwhite/50 hover:text-offwhite hover:bg-white/6 transition-all"><Plus size={14}/></button>
              </div>
              <Button variant={added ? 'ghost' : 'lime'} size="lg" onClick={addToCart} className="flex-1">
                <ShoppingCart size={16}/> {added ? <><Check size={13} weight="bold"/> ¡Añadido!</> : 'Añadir al carrito'}
              </Button>
            </div>

            <BorderGlow variant="mixed" borderRadius={14} glowRadius={24} edgeSensitivity={20}>
              <div className="p-4 grid grid-cols-3 gap-3 text-center">
                {[[ShieldCheck,'Pago seguro'],[Truck,'Envío gratis +30€'],[ArrowCounterClockwise,'Dev. 30 días']].map(([Icon, label]) => (
                  <div key={label}>
                    <Icon size={18} className="text-lime mx-auto mb-1"/>
                    <p className="text-[10px] text-offwhite/35">{label}</p>
                  </div>
                ))}
              </div>
            </BorderGlow>
          </div>
        </div>
      </div>
    </div>
  )
}
