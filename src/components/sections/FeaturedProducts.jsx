import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/ui/ProductCard'
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/woocommerce'

export default function FeaturedProducts() {
  const [active, setActive] = useState('todos')

  const filtered = active === 'todos'
    ? MOCK_PRODUCTS.slice(0, 4)
    : MOCK_PRODUCTS.filter(p => p.categories.some(c => c.name.toLowerCase() === active)).slice(0, 4)

  return (
    <section className="py-20 px-6 md:px-12" style={{ background: 'transparent' }}>
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="block text-[10px] font-bold tracking-[2px] uppercase mb-1.5" style={{ color: '#FF3EA5' }}>Más Vendidos</span>
            <h2 className="text-[32px] font-black tracking-tight">No te puede <span className="grad-text-pink">faltar</span></h2>
          </div>
          <div className="flex items-center gap-4 flex-wrap min-w-0">
            <Tabs value={active} onValueChange={setActive}>
              <TabsList className="flex-wrap h-auto">
                {MOCK_CATEGORIES.map(c => (
                  <TabsTrigger key={c.slug} value={c.slug}>{c.name}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/tienda" className="flex items-center gap-1.5">Ver todos <ArrowRight size={13} weight="bold"/></Link>
            </Button>
          </div>
        </div>

        {filtered.length === 0
          ? <p className="text-center py-16 text-offwhite/25 text-sm">Sin productos en esta categoría</p>
          : <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        }
      </div>
    </section>
  )
}
