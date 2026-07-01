import { useRef, useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Star, CheckCircle, ArrowRight, PawPrint, Heart, Fire, Storefront } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import DarkVeil from '@/components/ui/DarkVeil'
import CardBurst from '@/components/ui/CardBurst'
import { asset } from '@/lib/assetUrl'
import './HeroCard.css'

const THOR_IMGS = [
  asset('assets/thor-dog.webp'),
  asset('assets/thor-dog2.webp'),
  asset('assets/thor-dog3.webp'),
]

function HeroProductCard() {
  const wrapRef = useRef(null)
  const cardRef = useRef(null)
  const photoRef = useRef(null)
  const textRef = useRef(null)
  const dotsRef = useRef(null)
  const moveFrameRef = useRef(0)
  const pointerRef = useRef({ x: 0, y: 0 })
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % THOR_IMGS.length), 5000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    return () => {
      if (moveFrameRef.current) cancelAnimationFrame(moveFrameRef.current)
    }
  }, [])

  const onMouseMove = useCallback((e) => {
    pointerRef.current = { x: e.clientX, y: e.clientY }
    if (moveFrameRef.current) return
    moveFrameRef.current = requestAnimationFrame(() => {
      moveFrameRef.current = 0
      const { x, y } = pointerRef.current
      const el = wrapRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const dx = ((x - rect.left) / rect.width  - 0.5) * 2
      const dy = ((y - rect.top)  / rect.height - 0.5) * 2
      cardRef.current?.classList.remove('resetting')
      photoRef.current?.classList.remove('resetting')
      textRef.current?.classList.remove('resetting')
      dotsRef.current?.classList.remove('resetting')
      if (cardRef.current) {
        cardRef.current.style.transform =
          `perspective(900px) rotateY(${dx * 10}deg) rotateX(${-dy * 6}deg) translateZ(8px)`
      }
      if (photoRef.current) {
        photoRef.current.style.transform =
          `perspective(900px) rotateY(${dx * 6}deg) rotateX(${-dy * 4}deg) translateX(${dx * 8}px) translateY(${dy * 6}px) scale(1.04)`
      }
      if (textRef.current) {
        textRef.current.style.transform =
          `perspective(700px) rotateY(${dx * 8}deg) rotateX(${-dy * 5}deg) translateX(${dx * 5}px) translateY(${dy * 4}px) translateZ(20px)`
      }
      if (dotsRef.current) {
        dotsRef.current.style.transform =
          `perspective(700px) rotateY(${dx * 8}deg) rotateX(${-dy * 5}deg) translateX(${dx * 5}px) translateY(${dy * 4}px) translateZ(20px)`
      }
      el.style.setProperty('--mx', `${((x - rect.left) / rect.width  * 100).toFixed(1)}%`)
      el.style.setProperty('--my', `${((y - rect.top)  / rect.height * 100).toFixed(1)}%`)
    })
  }, [])

  const onMouseLeave = useCallback(() => {
    if (moveFrameRef.current) {
      cancelAnimationFrame(moveFrameRef.current)
      moveFrameRef.current = 0
    }
    cardRef.current?.classList.add('resetting')
    photoRef.current?.classList.add('resetting')
    textRef.current?.classList.add('resetting')
    dotsRef.current?.classList.add('resetting')
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0)'
    }
    if (photoRef.current) {
      photoRef.current.style.transform =
        'perspective(900px) rotateY(0deg) rotateX(0deg) translateX(0) translateY(0) scale(1)'
    }
    if (textRef.current) {
      textRef.current.style.transform =
        'perspective(700px) rotateY(0deg) rotateX(0deg) translateX(0) translateY(0) translateZ(0)'
    }
    if (dotsRef.current) {
      dotsRef.current.style.transform =
        'perspective(700px) rotateY(0deg) rotateX(0deg) translateX(0) translateY(0) translateZ(0)'
    }
  }, [])

  return (
    <div ref={wrapRef} className="relative select-none"
      style={{ width: '100%', maxWidth: '400px', paddingTop: '52px' }}
      onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>

      {/* ── Burst particles — behind everything ── */}
      <CardBurst />

      {/* ── Static frame — wider than the card, clips the tilting photo so it never pokes out ── */}
      <div className="absolute z-10 pointer-events-none rounded-t-[28px] overflow-hidden"
        style={{ left: '-22px', right: '-22px', top: '-26px', height: '320px' }}>
        {/* Dog slideshow — tilts/scales inside the clipped frame above */}
        <div ref={photoRef} className="hero-photo-tilt absolute inset-x-0" style={{ top: '26px', height: '294px', transformOrigin: 'center 70%' }}>
          {THOR_IMGS.map((src, i) => (
            <div key={src} className="absolute inset-0" style={{
              backgroundImage: `url(${src})`,
              backgroundSize: '220%',
              backgroundPosition: '78% 5%',
              backgroundRepeat: 'no-repeat',
              opacity: slide === i ? 1 : 0,
              transition: 'opacity 1.4s ease-in-out',
            }} />
          ))}
          {/* HUD corners */}
          <div className="hud-corner hud-tl" /><div className="hud-corner hud-tr" />
          {/* Bottom fade into card bg */}
          <div className="absolute inset-x-0 bottom-0 h-32 z-10 pointer-events-none" style={{
            background: 'linear-gradient(to bottom, transparent 0%, #060608 100%)'
          }} />
        </div>
      </div>

      {/* Name tag — separate layer in front of the photo, with its own subtle tilt */}
      <div ref={textRef} className="hero-text-tilt absolute z-20 pointer-events-none" style={{ top: '226px', left: '20px', transformOrigin: 'left bottom' }}>
        <p className="text-[11px] font-bold tracking-[2px] uppercase text-lime/60 mb-0.5">El protagonista</p>
        <p className="text-[28px] font-black tracking-tight leading-none text-offwhite"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,.8)' }}>Thor</p>
      </div>
      {/* Slide indicator dots — separate layer in front of the photo, with its own tilt */}
      <div ref={dotsRef} className="hero-text-tilt absolute z-20 flex gap-1.5 pointer-events-none" style={{ top: '264px', right: '16px', transformOrigin: 'right bottom' }}>
        {THOR_IMGS.map((_, i) => (
          <div key={i} className="h-1 rounded-full transition-all duration-500" style={{
            background: slide === i ? '#C9F105' : 'rgba(255,255,255,.25)',
            boxShadow: slide === i ? '0 0 5px rgba(201,241,5,.9)' : 'none',
            width: slide === i ? '14px' : '4px',
          }} />
        ))}
      </div>

      {/* ── Floating badges ── */}
      <div className="badge-float-a absolute z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black text-black"
        style={{ top: '4px', left: '-4px', background: 'linear-gradient(135deg,#C9F105,#a8cc04)', boxShadow: '0 0 20px rgba(201,241,5,.55)' }}>
        <PawPrint size={10} weight="fill" /> Nuestra inspiración
      </div>
      <div className="badge-float-b absolute z-30 flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10px] font-black text-white"
        style={{ top: '8px', right: '-4px', background: 'linear-gradient(135deg,#FA2588,#c91060)', boxShadow: '0 0 18px rgba(250,37,136,.55)' }}>
        <Heart size={10} weight="fill" /> 15 años juntos
      </div>

      {/* ── Card (holo border + content) — wider than the photo frame above ── */}
      <div ref={cardRef} className="hero-holo-border hero-card-inner card-bg-glow rounded-[28px] p-px"
        style={{ marginLeft: '-44px', marginRight: '-44px' }}>
        <div className="rounded-[27px] overflow-hidden" style={{ background: '#060608' }}>

          {/* Space reserved for dog photo overlap */}
          <div style={{ height: '268px' }} />

          {/* ── Logo centrado y grande ── */}
          <div className="flex items-center justify-center px-6 py-6">
            <img src={asset('assets/logotipo.webp')} alt="La Cocina de Thor"
              className="w-full object-contain"
              style={{ filter: 'drop-shadow(0 0 18px rgba(201,241,5,.45))' }}
            />
          </div>
        </div>
      </div>

      {/* Bottom badge */}
      <div className="badge-float-c absolute -bottom-5 right-10 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold"
        style={{ background: 'rgba(255,255,255,.07)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,.12)', color: 'rgba(251,251,248,.65)' }}>
        <Heart size={11} weight="fill" style={{ color: '#FF3EA5' }} /> Alimento con amor
      </div>
    </div>
  )
}

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
        opacity: 0.68,
        filter: 'hue-rotate(210deg) saturate(2.35)',
      }}>
        <DarkVeil
          hueShift={0}
          speed={0.42}
          warpAmount={0.55}
          noiseIntensity={0.018}
          resolutionScale={0.45}
          maxFps={30}
        />
      </div>

      {/* Dark overlay restores brand bg while animation shows through */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(135deg,rgba(6,6,8,.42) 0%,rgba(6,6,8,.12) 50%,rgba(6,6,8,.42) 100%)',
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
        <div className="animate-fade-up self-start lg:mt-6" style={{ animationDelay: '0ms', animationFillMode: 'both' }}>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
            style={{ background: 'linear-gradient(90deg,rgba(0,240,255,.07),rgba(200,255,0,.07))', border: '1px solid rgba(0,240,255,.2)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background: '#00F0FF', boxShadow: '0 0 6px rgba(0,240,255,.8)' }} />
            <span className="text-[10px] font-bold tracking-[1.8px] uppercase" style={{ color: '#00F0FF' }}>100% Natural · Premium Quality</span>
          </div>

          <h1 className="font-black leading-[1.05] tracking-[-1px] uppercase mb-4">
            <span className="block text-[26px] md:text-[36px] text-offwhite/95">Porque ellos</span>
            <span className="block text-[26px] md:text-[36px] text-offwhite/95">no lo dicen,</span>
            <span className="hero-slogan-sweep block text-[34px] md:text-[48px] mt-1">pero lo son todo.</span>
          </h1>

          <p className="text-[15px] leading-relaxed text-offwhite/42 mb-2">Alimentación premium sin conservantes ni artificiales.</p>
          <p className="text-[13px] font-bold mb-7" style={{ color: '#FF6B00', textShadow: '0 0 10px rgba(255,107,0,.35)' }}>
            <Fire size={14} weight="fill" style={{ color: '#FF6B00', display: 'inline', verticalAlign: 'middle' }} /> 15 años y 10,000+ animales felices nos avalan.
          </p>

          <div className="relative flex flex-wrap items-center gap-2 sm:gap-3 mb-7" style={{ isolation: 'isolate' }}>
            {/* Glow pulsante detrás del CTA principal */}
            <span className="absolute rounded-full pointer-events-none cta-glow-pulse"
              style={{ left: '4px', top: '50%', width: '150px', height: '46px', transform: 'translateY(-50%)', zIndex: -1 }} />

            <Button variant="lime" size="lg" asChild className="group relative px-4 sm:px-7 text-[13px] sm:text-base">
              <Link to="/tienda" className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                Comprar Ahora
                <ArrowRight size={15} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1"/>
              </Link>
            </Button>
            <Button variant="ghost" size="lg" asChild className="group px-4 sm:px-7 text-[13px] sm:text-base">
              <Link to="/tienda" className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                <Storefront size={15} weight="regular" className="text-offwhite/45 transition-colors group-hover:text-lime"/>
                Ver Catálogo
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap gap-x-2.5 gap-y-2 sm:gap-5">
            {[
              [CheckCircle, 'Certificado',  '#C8FF00', 'rgba(200,255,0,.15)'],
              [Star,        '10K+ Felices', '#FFD700', 'rgba(255,215,0,.15)'],
              [ShieldCheck, 'SSL Seguro',   '#00F0FF', 'rgba(0,240,255,.15)'],
            ].map(([Icon, label, color, bg]) => (
              <span key={label} className="text-[11px] flex items-center gap-1.5 px-2.5 py-1 rounded-full whitespace-nowrap"
                style={{ color, background: bg, border: `1px solid ${color}22` }}>
                <Icon size={13} weight="fill" /> {label}
              </span>
            ))}
          </div>
        </div>

        {/* Hero card — only visible on large screens */}
        <div className="hidden lg:flex justify-center animate-fade-up" style={{ animationDelay: '120ms', animationFillMode: 'both', padding: '28px' }}>
          <HeroProductCard />
        </div>
      </div>
    </div>
  )
}
