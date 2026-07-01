import { Link } from 'react-router-dom'
import { Heart, Leaf, Lightning, Users, PawPrint, ArrowRight } from '@phosphor-icons/react'
import Reveal from '@/components/ui/Reveal'
import PageBg from '@/components/ui/PageBg'
import useSEO from '@/hooks/useSEO'
import './Nosotros.css'

const VALUES = [
  { Icon: Leaf,      color: '#C8FF00', bg: 'rgba(200,255,0,.07)',  border: 'rgba(200,255,0,.18)',  label: 'Alimentación 100% natural sin aditivos' },
  { Icon: PawPrint,  color: '#00F0FF', bg: 'rgba(0,240,255,.07)',  border: 'rgba(0,240,255,.18)',  label: 'Ingredientes reales y de calidad certificada' },
  { Icon: Lightning, color: '#FFD700', bg: 'rgba(255,215,0,.07)',  border: 'rgba(255,215,0,.18)',  label: 'Energía, alegría y vitalidad animal' },
  { Icon: Users,     color: '#FF6B00', bg: 'rgba(255,107,0,.07)',  border: 'rgba(255,107,0,.18)',  label: 'Comunidad y cercanía con las familias' },
  { Icon: Heart,     color: '#FF3EA5', bg: 'rgba(255,62,165,.07)', border: 'rgba(255,62,165,.18)', label: 'Honrar para siempre la memoria de Thor' },
]

export default function Nosotros() {
  useSEO({
    title: 'Nuestra Historia',
    description: 'Conoce la historia de Thor, el perro que inspiró La Cocina de Thor. Doce años de familia convertidos en una marca de alimentación natural para mascotas.',
    path: '/nosotros',
    image: '/assets/thor-dog.webp',
  })

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <PageBg />

      {/* ── Hero de sección ── */}
      <div className="relative overflow-hidden py-20 px-6 md:px-12"
        style={{ background: 'linear-gradient(160deg,#0a0010 0%,#060608 50%,#001008 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,62,165,.12) 1px,transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)',
          }} />
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(255,62,165,.5),rgba(200,255,0,.3),transparent)' }} />

        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <span className="block text-[10px] font-bold tracking-[2px] uppercase mb-3"
            style={{ color: '#FF3EA5' }}>El origen de la marca</span>
          <h1 className="text-[40px] md:text-[56px] font-black leading-[1.02] tracking-[-2px] mb-5">
            Una historia de <span className="grad-text-pink">amor</span><br />
            convertida en <span className="grad-text">propósito</span>
          </h1>
          <p className="text-[16px] text-offwhite/45 leading-relaxed">
            La energía de Thor sigue viva en cada producto que lleva su nombre.
          </p>
        </div>
      </div>

      {/* ── Historia principal ── */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-20 space-y-20">

        {/* Thor */}
        <Reveal from="bottom">
          <article className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-5 text-[10px] font-bold tracking-[1.5px] uppercase"
                style={{ background: 'rgba(255,62,165,.08)', border: '1px solid rgba(255,62,165,.22)', color: '#FF3EA5' }}>
                <Heart size={11} weight="fill" /> Thor — El alma de esta empresa
              </div>
              <h2 className="text-[28px] md:text-[34px] font-black tracking-tight leading-tight mb-4">
                Doce años de familia.<br />
                <span className="grad-text-pink">Un legado eterno.</span>
              </h2>
              <div className="space-y-4 text-[14px] leading-relaxed text-offwhite/50">
                <p>
                  Thor fue mucho más que una mascota. Durante 12 años fue familia, compañero inseparable
                  y el centro de un hogar lleno de vida. Su pérdida, tras una larga batalla contra el cáncer,
                  dejó un vacío que solo podía llenarse de una forma: <strong className="text-offwhite/80">honrando su memoria
                  con algo verdaderamente grande.</strong>
                </p>
                <p>
                  <strong className="text-offwhite/80">La Cocina de Thor nace de esa necesidad de perpetuar su legado.</strong> Cada producto
                  lleva su nombre como una promesa: si hubiéramos tenido acceso a una alimentación de esta
                  calidad durante sus años con nosotros, se la habríamos dado sin dudarlo. Ahora podemos
                  dársela a las mascotas de otras familias.
                </p>
                <p>
                  El sistema visual neón de la marca refleja esa energía vital que Thor irradiaba: era pura
                  vida, alegría y movimiento. Celebramos ese espíritu con color, luz e impacto, sin perder
                  nunca el corazón emocional que le da origen.
                </p>
              </div>
            </div>

            {/* Foto de Thor */}
            <div className="relative" style={{ minHeight: '460px', isolation: 'isolate' }}>
              {/* Glow latido — pulsa como un corazón detrás del recuadro, alternando la paleta con transición suave */}
              <div className="thor-heartbeat-glow" style={{ top: '150px' }}>
                <span /><span /><span /><span /><span />
              </div>

              {/* Recuadro trasero — arranca a la altura del pecho, la cabeza sobresale por encima */}
              <div className="absolute inset-x-0 bottom-0 rounded-2xl"
                style={{ top: '150px', background: 'linear-gradient(160deg,rgb(25, 26, 25),rgba(6,6,8,.97))', border: '1px solid rgba(255,62,165,.2)', boxShadow: '0 0 60px rgba(255,62,165,.12)' }} />

              {/* Foto — centrada, encuadre de busto hacia arriba, sobresale del recuadro. Sombra sigue la silueta del perro (PNG con transparencia) */}
              <div className="relative mx-auto" style={{ width: '76%', height: '380px' }}>
                <img src="/assets/thor-dog.webp" alt="Thor, el perro que inspiró La Cocina de Thor"
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: '92% 12%',
                    filter: 'drop-shadow(0 18px 24px rgba(0,0,0,.5))',
                    maskImage: 'linear-gradient(to top, transparent 0%, black 14%)',
                    WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 14%)',
                  }}
                  loading="lazy" />
              </div>

              {/* Caption — dentro del recuadro, debajo de la foto */}
              <div className="relative text-center px-8 pt-5 pb-6">
                <p className="text-[11px] font-bold tracking-[1.5px] uppercase mb-1"
                  style={{ color: '#FF3EA5' }}>Thor · 2010 — 2022</p>
                <p className="text-[13px] font-black text-offwhite">"El perro que nos enseñó a cocinar con amor."</p>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Divisor */}
        <div className="h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent)' }} />

        {/* Misión + Visión */}
        <Reveal from="bottom" delay={80}>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                label: 'Misión',
                color: '#C8FF00',
                bg: 'rgba(200,255,0,.05)',
                border: 'rgba(200,255,0,.15)',
                text: 'Ofrecer alimentación 100% natural para perros y gatos, elaborada con ingredientes reales y de calidad, que contribuya a una vida más sana, feliz y longeva para cada mascota.',
              },
              {
                label: 'Visión',
                color: '#00F0FF',
                bg: 'rgba(0,240,255,.05)',
                border: 'rgba(0,240,255,.15)',
                text: 'Ser la marca de alimentación natural más reconocible y querida de España, construyendo una comunidad vibrante que celebra el vínculo único entre las personas y sus mascotas.',
              },
            ].map(({ label, color, bg, border, text }) => (
              <div key={label} className="rounded-2xl p-7"
                style={{ background: bg, border: `1px solid ${border}` }}>
                <p className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color }}>{label}</p>
                <div className="w-6 h-0.5 mb-4 rounded-full" style={{ background: color }} />
                <p className="text-[14px] leading-relaxed text-offwhite/55">{text}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Valores */}
        <Reveal from="bottom" delay={100}>
          <div>
            <div className="text-center mb-10">
              <span className="block text-[10px] font-bold tracking-[2px] uppercase mb-2"
                style={{ color: '#FFD700' }}>Valores</span>
              <h2 className="text-[28px] font-black tracking-tight">
                Lo que nos <span className="grad-text-orange">define</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {VALUES.map(({ Icon, color, bg, border, label }) => (
                <div key={label} className="flex items-start gap-4 rounded-xl p-5"
                  style={{ background: bg, border: `1px solid ${border}` }}>
                  <div className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                    <Icon size={18} weight="duotone" style={{ color }} />
                  </div>
                  <p className="text-[13px] font-semibold leading-snug text-offwhite/75 pt-1.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* CTA final */}
        <Reveal from="bottom" delay={60}>
          <div className="text-center rounded-2xl py-12 px-8"
            style={{ background: 'linear-gradient(135deg,rgba(200,255,0,.05),rgba(255,62,165,.05))', border: '1px solid rgba(255,255,255,.06)' }}>
            <p className="text-[11px] font-bold tracking-[2px] uppercase text-lime mb-3">Únete a la familia</p>
            <h3 className="text-[24px] font-black tracking-tight mb-3">
              Dale a tu mascota la <span className="grad-text">nutrición que merece</span>
            </h3>
            <p className="text-[13px] text-offwhite/35 mb-7 max-w-sm mx-auto">
              Porque si Thor hubiera tenido acceso a esto, no lo habríamos dudado ni un segundo.
            </p>
            <Link to="/tienda"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-[13px] text-black transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#C8FF00,#a8cc00)', boxShadow: '0 0 30px rgba(200,255,0,.3)' }}>
              Ver productos <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </Reveal>

      </div>
    </div>
  )
}
