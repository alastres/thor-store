import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '@/components/ui/Logo'

const SOCIALS = [
  {
    key: 'facebook',
    href: 'https://www.facebook.com/profile.php?id=61591269361107',
    color: '#00F0FF',
    glow: 'rgba(0,240,255,.35)',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  },
  {
    key: 'instagram',
    href: 'https://www.instagram.com/lacocinadethor_es/',
    color: '#FF3EA5',
    glow: 'rgba(255,62,165,.35)',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>,
  },
  {
    key: 'tiktok',
    href: 'https://www.tiktok.com/@la_cocina_de_thor',
    color: '#FF6B00',
    glow: 'rgba(255,107,0,.35)',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917" /></svg>,
  },
]

function SocialBtn({ social }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.key}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer"
      style={{
        background: hovered ? `${social.color}18` : 'rgba(255,255,255,.04)',
        border: `1px solid ${hovered ? social.color + '55' : 'rgba(255,255,255,.08)'}`,
        color: hovered ? social.color : 'rgba(251,251,248,.3)',
        boxShadow: hovered ? `0 0 12px ${social.glow}` : 'none',
      }}>
      {social.icon}
    </a>
  )
}

const COL = [
  { title: 'Productos', color: '#C8FF00', links: [['Perro','/tienda'],['Gato','/tienda'],['Latas','/tienda'],['Salchichas','/tienda']] },
  { title: 'Empresa',   color: '#00F0FF', links: [
    ['Quiénes somos', '/nosotros'],
    ['Blog', '/'],
    ['Contacto', '/contacto'],
  ] },
]

export default function Footer() {
  return (
    <footer className="bg-[#040406] border-t border-white/[.05] pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          <div className="col-span-2 md:col-span-1 flex flex-col items-center text-center">
            <Logo />
            <p className="text-[11px] text-offwhite/20 leading-relaxed mb-5 max-w-[180px]">
              Alimentación 100% natural y premium para tus peludos.
            </p>
            <div className="flex justify-center gap-2">
              {SOCIALS.map(s => <SocialBtn key={s.key} social={s} />)}
            </div>
          </div>

          {COL.map(({ title, color, links }) => (
            <div key={title}>
              <p className="text-[10px] font-bold tracking-[1.8px] uppercase mb-1" style={{ color }}>{title}</p>
              <div className="w-5 h-px mb-4" style={{ background: `linear-gradient(to right,${color}99,transparent)` }} />
              <div className="flex flex-col gap-2.5">
                {links.map(([label, to, accent]) => {
                  const props = {
                    className: 'text-[12px] transition-colors',
                    style: { color: accent ? '#FF3EA5' : 'rgba(251,251,248,.22)' },
                    onMouseEnter: e => e.currentTarget.style.color = color,
                    onMouseLeave: e => e.currentTarget.style.color = accent ? '#FF3EA5' : 'rgba(251,251,248,.22)',
                  }
                  return to.startsWith('http')
                    ? <a key={label} href={to} target="_blank" rel="noopener noreferrer" {...props}>{label}</a>
                    : <Link key={label} to={to} {...props}>{label}</Link>
                })}
              </div>
            </div>
          ))}

          <div>
            <p className="text-[10px] font-bold tracking-[1.8px] uppercase mb-1" style={{ color: '#FF6B00' }}>Contacto</p>
            <div className="w-5 h-px mb-4" style={{ background: 'linear-gradient(to right,rgba(255,107,0,.7),transparent)' }} />
            <div className="flex flex-col gap-2 text-[12px] text-offwhite/20">
              <span>Lun–Vie 9:00–19:00</span>
              <span>info@lacocinadethor.es</span>
              <span>+34 633 28 33 47</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[.05] pt-4 flex items-center justify-between">
          <span className="text-[10px] text-offwhite/12">© 2026 La Cocina de Thor</span>
          <span className="text-[10px] text-offwhite/12">Hecho con <span className="text-lime">AMOR</span> para tus peludos</span>
        </div>
      </div>
    </footer>
  )
}
