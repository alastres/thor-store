import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, ShoppingCart, Star, Fire, Plant, Eye } from '@phosphor-icons/react'
import BorderGlow from '@/components/ui/BorderGlow'
import { CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useCart } from '@/context/CartContext'

const EMOJI = { perro: '🐕', gato: '🐈', snacks: '🦴', salchichas: '🌭', default: '🐾' }

export default function ProductCard({ product }) {
  const { dispatch } = useCart()
  const [added, setAdded] = useState(false)
  const [qty, setQty]     = useState(1)

  const cat     = (product.categories?.[0]?.name ?? 'default').toLowerCase()
  const emoji   = EMOJI[cat] ?? EMOJI.default
  const isNew   = product.tags?.some(t => t.name.toLowerCase() === 'nuevo')
  const isPop   = product.tags?.some(t => t.name.toLowerCase() === 'popular')
  const discount = product.regular_price && parseFloat(product.regular_price) > parseFloat(product.price)
    ? Math.round((1 - parseFloat(product.price) / parseFloat(product.regular_price)) * 100) : null

  function addToCart(q = 1) {
    dispatch({ type: 'ADD', item: { id: product.id, name: product.name, price: parseFloat(product.price), slug: product.slug, category: product.categories?.[0]?.name, qty: q } })
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  const price    = parseFloat(product.price).toFixed(2).replace('.', ',')
  const priceOld = product.regular_price ? parseFloat(product.regular_price).toFixed(2).replace('.', ',') : null

  return (
    <BorderGlow variant="lime" className="flex flex-col h-full" borderRadius={16} glowRadius={32} edgeSensitivity={25}>
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-[15px]">
        <Link to={`/producto/${product.slug}`}>
          <div className="h-36 sm:h-40 flex items-center justify-center bg-gradient-to-br from-lime/5 to-surface-2 transition-colors duration-300">
            {product.images?.[0]?.src
              ? <img src={product.images[0].src} alt={product.name} className="h-full w-full object-cover" />
              : <span className="text-5xl">{emoji}</span>
            }
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isPop && <Badge variant="pink" className="text-[9px] px-1.5 py-0.5 flex items-center gap-1"><Fire size={11} weight="fill"/> Popular</Badge>}
          {isNew && <Badge variant="new"  className="text-[9px] px-1.5 py-0.5 flex items-center gap-1"><Plant size={11} weight="fill"/> Nuevo</Badge>}
        </div>
        {discount && <Badge variant="pink" className="absolute top-2 right-2 text-[9px] px-1.5">-{discount}%</Badge>}

        {/* Quick view — visible on desktop hover, always accessible on mobile as icon */}
        <Dialog>
          <DialogTrigger asChild>
            {/* Desktop: slide-up bar */}
            <button className="absolute bottom-0 inset-x-0 hidden sm:flex items-center justify-center gap-1.5 py-2 text-[11px] font-semibold text-offwhite/80 bg-background/80 backdrop-blur border-t border-white/10 opacity-0 hover:opacity-100 transition-opacity duration-200">
              <Eye size={12}/> Vista rápida
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <Badge variant="lime" className="w-fit mb-2">{product.categories?.[0]?.name}</Badge>
              <DialogTitle>{product.name}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-5 items-start">
              <div className="h-44 rounded-xl flex items-center justify-center text-5xl bg-gradient-to-br from-lime/6 to-surface-2 border border-white/8">
                {emoji}
              </div>
              <div>
                <p className="text-[13px] text-offwhite/42 leading-relaxed mb-4">{product.short_description}</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-black text-lime" style={{ textShadow: '0 0 12px rgba(201,241,5,.4)' }}>{price} €</span>
                  {discount && <span className="text-sm text-offwhite/22 line-through">{priceOld} €</span>}
                </div>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({length:5}).map((_,i) => <Star key={i} size={11} weight="fill" style={{ color: '#FFD700', filter: 'drop-shadow(0 0 3px rgba(255,215,0,.5))' }}/>)}
                  <span className="text-[10px] text-offwhite/28 ml-1.5">+24 reseñas</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center border border-white/12 rounded-lg overflow-hidden text-sm">
                    <button onClick={()=>setQty(q=>Math.max(1,q-1))} className="px-3 py-2 text-offwhite/40 hover:text-offwhite transition-colors">−</button>
                    <span className="px-3 font-bold">{qty}</span>
                    <button onClick={()=>setQty(q=>q+1)} className="px-3 py-2 text-offwhite/40 hover:text-offwhite transition-colors">+</button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant={added ? 'ghost' : 'lime'} size="sm" onClick={() => addToCart(qty)} className="flex-1">
                    <ShoppingCart size={13}/>{added ? '¡Añadido! ✓' : 'Añadir'}
                  </Button>
                  <Button variant="ghost" size="sm" asChild><Link to={`/producto/${product.slug}`}>Ver más</Link></Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Card body */}
      <CardContent className="p-3 sm:p-4 flex flex-col flex-1">
        <span className="text-[9px] sm:text-[10px] font-semibold text-lime/55 tracking-widest uppercase mb-1 truncate">
          {product.categories?.[0]?.name} · {product.weight || '400gr'}
        </span>
        <Link
          to={`/producto/${product.slug}`}
          className="text-[12px] sm:text-[13px] font-bold mb-2 leading-snug hover:text-lime transition-colors line-clamp-2 flex-1 block"
        >
          {product.name}
        </Link>

        {/* Price + add to cart */}
        <div className="flex items-end justify-between mt-auto gap-1">
          <div className="min-w-0">
            <span className="text-[14px] sm:text-[16px] font-black text-lime whitespace-nowrap leading-none" style={{ textShadow: '0 0 10px rgba(201,241,5,.3)' }}>{price} €</span>
            {discount && <span className="block text-[9px] text-offwhite/22 line-through leading-none mt-0.5">{priceOld} €</span>}
          </div>
          <button
            onClick={() => addToCart(1)}
            className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${added ? 'bg-lime/15 text-lime border border-lime/30' : 'bg-pink text-white border border-pink/0 hover:bg-pink/85'}`}
          >
            {added ? <span className="text-[11px] font-bold">✓</span> : <Plus size={13}/>}
          </button>
        </div>
      </CardContent>
    </BorderGlow>
  )
}
