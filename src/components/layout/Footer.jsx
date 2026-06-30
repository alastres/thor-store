import { Link } from 'react-router-dom'
import Logo from '@/components/ui/Logo'

const SocialIcons = {
  instagram: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>,
  facebook:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  youtube:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>,
}

const COL = {
  Productos: [['Perro','/tienda'],['Gato','/tienda'],['Latas','/tienda'],['Salchichas','/tienda']],
  Empresa:   [['Quiénes somos','/'],['Blog','/'],['Contacto','/'],['Amazon','/',true]],
}

export default function Footer() {
  return (
    <footer className="bg-[#040406] border-t border-white/[.05] pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="text-[11px] text-offwhite/20 leading-relaxed mb-5 max-w-[180px]">
              Alimentación 100% natural y premium para tus peludos.
            </p>
            <div className="flex gap-2">
              {Object.values(SocialIcons).map((icon, i) => (
                <button key={i} className="w-8 h-8 rounded-lg bg-white/4 border border-white/8 flex items-center justify-center hover:bg-white/8 hover:border-lime/20 transition-all cursor-pointer text-offwhite/30 hover:text-offwhite/60">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {Object.entries(COL).map(([title, links]) => (
            <div key={title}>
              <p className="text-[10px] font-bold tracking-[1.8px] uppercase mb-1">{title}</p>
              <div className="w-5 h-px bg-gradient-to-r from-lime/70 to-transparent mb-4" />
              <div className="flex flex-col gap-2.5">
                {links.map(([label, to, pink]) => (
                  <Link key={label} to={to} className={`text-[12px] transition-colors ${pink ? 'text-pink font-semibold hover:text-pink/70' : 'text-offwhite/22 hover:text-lime'}`}>{label}</Link>
                ))}
              </div>
            </div>
          ))}

          <div>
            <p className="text-[10px] font-bold tracking-[1.8px] uppercase mb-1">Contacto</p>
            <div className="w-5 h-px bg-gradient-to-r from-lime/70 to-transparent mb-4" />
            <div className="flex flex-col gap-2 text-[12px] text-offwhite/20">
              <span>Lun–Vie 9:00–19:00</span>
              <span>info@lacocinadethor.es</span>
              <span>+34 684 41 01 99</span>
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
