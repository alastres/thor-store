import { useState, useMemo } from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react'
import ProductCard from '@/components/ui/ProductCard'
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/woocommerce'

export default function Shop() {
  const [cat, setCat] = useState('todos')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('default')

  const products = useMemo(() => {
    let p = [...MOCK_PRODUCTS]
    if (cat !== 'todos') p = p.filter(x => x.categories.some(c => c.name.toLowerCase() === cat))
    if (query) p = p.filter(x => x.name.toLowerCase().includes(query.toLowerCase()))
    if (sort === 'price-asc')  p.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    if (sort === 'price-desc') p.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    return p
  }, [cat, query, sort])

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden py-14 px-6 md:px-10"
        style={{ background: 'linear-gradient(180deg,#0c0c12 0%,#060608 100%)' }}>
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="block text-[10px] font-bold tracking-[2px] uppercase text-lime mb-2">Tienda Online</span>
          <h1 className="text-4xl font-black tracking-tight mb-2">Todos los <span className="grad-text">Productos</span></h1>
          <p className="text-[14px] text-offwhite/38">Alimentación natural premium para tu mascota.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="relative flex-1 min-w-[180px]">
            <MagnifyingGlass size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-offwhite/30" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full bg-surface-1 border border-white/8 rounded-lg pl-9 pr-4 py-2.5 text-[13px] text-offwhite outline-none focus:border-lime/35 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {MOCK_CATEGORIES.map(c => (
              <button key={c.slug} onClick={() => setCat(c.slug)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all ${cat === c.slug ? 'bg-lime text-black shadow-[0_0_12px_rgba(201,241,5,.25)]' : 'bg-white/4 border border-white/10 text-offwhite/60 hover:bg-white/8'}`}>
                {c.name}
              </button>
            ))}
          </div>

          <select value={sort} onChange={e => setSort(e.target.value)}
            className="bg-surface-1 border border-white/8 rounded-lg px-3 py-2.5 text-[12px] text-offwhite/70 outline-none cursor-pointer">
            <option value="default">Ordenar por</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
          </select>
        </div>

        {products.length === 0
          ? <div className="text-center py-20 text-offwhite/30">No se encontraron productos</div>
          : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        }
      </div>
    </div>
  )
}
