import { Lock, ArrowCounterClockwise, Truck, Lightning } from '@phosphor-icons/react'
import Hero from '@/components/sections/Hero'
import FeaturedProducts from '@/components/sections/FeaturedProducts'
import Stats from '@/components/sections/Stats'
import WhyUs from '@/components/sections/WhyUs'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import Newsletter from '@/components/sections/Newsletter'
import NeonMesh from '@/components/ui/NeonMesh'

function TrustStrip() {
  const items = [
    { Icon: Lock,                  label: 'Pago SSL seguro' },
    { Icon: ArrowCounterClockwise, label: 'Devolución 30 días' },
    { Icon: Truck,                 label: 'Envío gratis +30€' },
    { Icon: Lightning,             label: 'Entrega 24h' },
  ]
  return (
    <div className="bg-surface-1 px-6 py-3.5 flex flex-wrap items-center justify-center gap-6 border-y border-white/[.05]">
      {items.map(({ Icon, label }) => (
        <span key={label} className="text-[12px] text-offwhite/35 flex items-center gap-1.5">
          <Icon size={13} weight="regular" className="text-offwhite/45 shrink-0" /> {label}
        </span>
      ))}
      <div className="flex gap-2">
        {['VISA', 'MC', 'PayPal', 'Bizum'].map(p => (
          <span key={p} className={`text-[10px] font-bold rounded px-2 py-0.5 border ${p === 'PayPal' ? 'bg-lime-300/7 border-lime-300/20 text-lime-300' : 'bg-white/4 border-white/10 text-offwhite/40'}`}>{p}</span>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <NeonMesh style={{ background: '#060608' }}>
        <FeaturedProducts />
        <Stats />
        <WhyUs />
      </NeonMesh>
      <Testimonials />
      <FAQ />
      <Newsletter />
    </>
  )
}
