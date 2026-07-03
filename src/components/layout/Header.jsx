import { useRef, useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Bag, List } from '@phosphor-icons/react'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetClose } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'
import Logo from '@/components/ui/Logo'

const NAV = [
  { to: '/',           label: 'Inicio'   },
  { to: '/tienda',     label: 'Tienda'   },
  { to: '/nosotros',   label: 'Nosotros' },
  { to: '/contacto',   label: 'Contacto' },
]

export default function Header() {
  const { totalItems } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const scrolledRef = useRef(false)

  useEffect(() => {
    const fn = () => {
      const next = window.scrollY > 24
      if (next === scrolledRef.current) return
      scrolledRef.current = next
      setScrolled(next)
    }
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    /* Fixed wrapper — announcement bar + navbar together */
    <div className="fixed inset-x-0 top-0 z-50">
      

      {/* box-shadow replaces border-b: no hard white line, smooth on/off */}
      <header
        className="transition-all duration-300 backdrop-blur-2xl"
        style={{
          background: scrolled ? 'rgba(6,6,8,0.88)' : 'rgba(6,6,8,0.55)',
          boxShadow: scrolled
            ? '0 1px 0 rgba(255,255,255,0.055), 0 6px 32px rgba(0,0,0,0.55)'
            : '0 1px 0 rgba(255,255,255,0.025)',
        }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">

          <Logo className="p-0.5" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV.map(n => (
              <NavLink key={n.label} to={n.to}
                className={({ isActive }) =>
                  `text-[12px] font-semibold transition-colors ${isActive ? 'text-lime' : 'text-offwhite/40 hover:text-offwhite/80'}`
                }
              >{n.label}</NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link to="/carrito" className="relative p-2.5 rounded-xl bg-white/4 border border-white/8 hover:bg-white/8 hover:border-lime/20 transition-all">
              <Bag size={17} weight="regular" className="text-offwhite/65" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-[17px] h-[17px] rounded-full bg-lime text-black text-[9px] font-black flex items-center justify-center shadow-[0_0_8px_rgba(201,241,5,.5)]">
                  {totalItems}
                </span>
              )}
            </Link>

            <Button variant="lime" size="sm" className="hidden md:inline-flex" asChild>
              <Link to="/tienda">Ver Tienda</Link>
            </Button>

            {/* Mobile sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden p-2.5 rounded-xl bg-white/4 border border-white/8 hover:bg-white/8 transition-all">
                  <List size={17} weight="regular" className="text-offwhite/65" />
                </button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <Logo size="sm" />
                </SheetHeader>
                <nav className="px-6 py-5 flex flex-col gap-1">
                  {NAV.map(n => (
                    <NavLink key={n.label} to={n.to}
                      className={({ isActive }) =>
                        `py-3 px-3 rounded-xl text-[13px] font-semibold transition-all ${isActive ? 'bg-lime/10 text-lime border border-lime/18' : 'text-offwhite/55 hover:bg-white/5'}`
                      }
                    >{n.label}</NavLink>
                  ))}
                  <div className="mt-4 pt-4 border-t border-white/8">
                    <Button variant="lime" size="md" className="w-full" asChild>
                      <Link to="/tienda" className="flex items-center gap-2 justify-center"><Bag size={14}/> Ir a la Tienda</Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </div>
  )
}
