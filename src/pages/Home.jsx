import { Lock, ArrowCounterClockwise, Truck, Lightning } from '@phosphor-icons/react'
import Hero from '@/components/sections/Hero'
import FeaturedProducts from '@/components/sections/FeaturedProducts'
import Stats from '@/components/sections/Stats'
import WhyUs from '@/components/sections/WhyUs'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import Newsletter from '@/components/sections/Newsletter'
import NeonMesh from '@/components/ui/NeonMesh'
import Reveal from '@/components/ui/Reveal'

function TrustStrip() {
  const items = [
    { Icon: Lock,                  label: 'Pago SSL seguro',    color: '#00F0FF' },
    { Icon: ArrowCounterClockwise, label: 'Devolución 30 días', color: '#FFD700' },
    { Icon: Truck,                 label: 'Envío gratis +30€',  color: '#C8FF00' },
    { Icon: Lightning,             label: 'Entrega 24h',        color: '#FF6B00' },
  ]
  return (
    <div className="bg-surface-1 px-6 py-3.5 flex flex-wrap items-center justify-center gap-6 border-y border-white/[.05]">
      {items.map(({ Icon, label, color }) => (
        <span key={label} className="text-[12px] text-offwhite/35 flex items-center gap-1.5">
          <Icon size={13} weight="fill" style={{ color, filter: `drop-shadow(0 0 4px ${color}88)` }} className="shrink-0" /> {label}
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
      <Reveal from="bottom" delay={0}>
        <TrustStrip />
      </Reveal>
      <NeonMesh style={{ background: '#060608' }}>
        <Reveal from="bottom" delay={0}>
          <FeaturedProducts />
        </Reveal>
        <Reveal from="bottom" delay={60}>
          <Stats />
        </Reveal>
        <Reveal from="bottom" delay={80}>
          <WhyUs />
        </Reveal>
      </NeonMesh>
      <Reveal from="bottom" delay={0}>
        <Testimonials />
      </Reveal>
      <Reveal from="bottom" delay={0}>
        <FAQ />
      </Reveal>
      <Reveal from="bottom" delay={0}>
        <Newsletter />
      </Reveal>
    </>
  )
}
