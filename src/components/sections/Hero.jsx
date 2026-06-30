import { Link } from 'react-router-dom'
import { ShieldCheck, Star, CheckCircle, ArrowRight } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import DarkVeil from '@/components/ui/DarkVeil'

export default function Hero() {
  return (
    /* Outer wrapper — fixed height so the canvas always has real px dimensions */
    <div className="relative bg-background" style={{ width: '100%', maxWidth: '100vw', minHeight: '580px', overflow: 'hidden' }}>

      {/* ── DarkVeil canvas fills the entire hero ── */}
      <div style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        overflow: 'hidden',
        mixBlendMode: 'screen',
        opacity: 0.6,
        filter: 'hue-rotate(210deg) saturate(3)',
      }}>
        <DarkVeil
          hueShift={0}
          speed={0.22}
          warpAmount={0.35}
          noiseIntensity={0.02}
          resolutionScale={0.5}
        />
      </div>

      {/* Dark overlay restores brand bg while animation shows through */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(135deg,rgba(6,6,8,.55) 0%,rgba(6,6,8,.25) 50%,rgba(6,6,8,.55) 100%)',
      }} />

      {/* Dot grid vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.22,
        backgroundImage: 'radial-gradient(rgba(201,241,5,.2) 1px,transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%,black,transparent)',
      }} />

      {/* ── Content grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center" style={{ minHeight: '580px' }}>

        {/* Copy */}
        <div className="animate-fade-up" style={{ animationDelay: '0ms', animationFillMode: 'both' }}>
          <div className="inline-flex items-center gap-2 bg-lime/7 border border-lime/25 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-lime rounded-full animate-pulse-dot shadow-[0_0_6px_rgba(201,241,5,.8)]" />
            <span className="text-[10px] font-bold tracking-[1.8px] uppercase text-lime">100% Natural · Premium Quality</span>
          </div>

          <h1 className="text-[36px] md:text-[50px] font-black leading-[1.05] tracking-[-2px] mb-4">
            La Nutrición<br />que Tu Mascota<br />
            <span className="grad-text">Merece</span> ⚡
          </h1>

          <p className="text-[15px] leading-relaxed text-offwhite/42 mb-2">Alimentación premium sin conservantes ni artificiales.</p>
          <p className="text-[13px] font-bold text-lime mb-7" style={{ textShadow: '0 0 10px rgba(201,241,5,.35)' }}>
            ⚡ 15 años y 10,000+ animales felices nos avalan.
          </p>

          <div className="flex flex-wrap gap-3 mb-7">
            <Button variant="lime" size="lg" asChild>
              <Link to="/tienda" className="flex items-center gap-2">Comprar Ahora <ArrowRight size={15} weight="bold"/></Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link to="/tienda">Ver Catálogo</Link>
            </Button>
          </div>

          <div className="flex flex-wrap gap-5">
            {[[CheckCircle,'Certificado'],[Star,'10K+ Felices'],[ShieldCheck,'SSL Seguro']].map(([Icon, label]) => (
              <span key={label} className="text-[11px] text-offwhite/30 flex items-center gap-1.5">
                <Icon size={13} weight="fill" className="text-lime" /> {label}
              </span>
            ))}
          </div>
        </div>

        {/* Hero card — only visible on large screens */}
        <div className="hidden lg:block animate-fade-up" style={{ animationDelay: '120ms', animationFillMode: 'both' }}>
          <div className="animate-float">
            <div className="p-px rounded-2xl" style={{ background: 'linear-gradient(135deg,rgba(201,241,5,.55),rgba(250,37,136,.4),rgba(255,255,255,.04) 60%)' }}>
              <div className="rounded-[15px] p-7 backdrop-blur-xl" style={{ background: 'rgba(12,12,16,.88)' }}>

                <div className="relative rounded-xl h-52 flex items-center justify-center mb-5 overflow-hidden border border-white/[.05]"
                  style={{ background: 'linear-gradient(135deg,rgba(201,241,5,.06),rgba(250,37,136,.03),rgba(8,8,12,.95))' }}>
                  <img
                    src="/assets/logotipo.png"
                    alt="La Cocina de Thor"
                    className="h-40 w-auto object-contain relative z-10 drop-shadow-[0_0_18px_rgba(201,241,5,.35)]"
                  />
                  <Badge variant="pink" className="absolute top-3 left-3 text-[11px]">🔥 Más vendido</Badge>
                </div>

                <div className="rounded-xl p-4 border border-lime/12" style={{ background: 'rgba(6,6,8,.70)' }}>
                  <span className="block text-[10px] font-bold text-lime/50 tracking-widest uppercase mb-1.5">Producto Estrella</span>
                  <p className="text-[14px] font-bold leading-snug mb-3">Lata Natural Premium · Pollo con Plátano 400gr</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[22px] font-black text-lime" style={{ textShadow: '0 0 14px rgba(201,241,5,.45)' }}>2,99 €</span>
                      <span className="text-[11px] text-offwhite/22 ml-1.5 line-through">3,99 €</span>
                    </div>
                    <Button variant="pink" size="sm" asChild>
                      <Link to="/tienda">🛒 Añadir</Link>
                    </Button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
