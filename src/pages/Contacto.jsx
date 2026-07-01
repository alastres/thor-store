import { useState } from 'react'
import { Envelope, Phone, Clock, MapPin, PaperPlaneTilt, WhatsappLogo, CheckCircle, PawPrint } from '@phosphor-icons/react'
import PageBg from '@/components/ui/PageBg'
import Reveal from '@/components/ui/Reveal'
import { Input } from '@/components/ui/input'
import useSEO from '@/hooks/useSEO'

const INFO = [
  {
    Icon: Phone,
    color: '#C8FF00',
    bg: 'rgba(200,255,0,.07)',
    border: 'rgba(200,255,0,.18)',
    label: 'Teléfono',
    value: '+34 633 28 33 47',
    sub: 'Llamadas y WhatsApp',
  },
  {
    Icon: Envelope,
    color: '#00F0FF',
    bg: 'rgba(0,240,255,.07)',
    border: 'rgba(0,240,255,.18)',
    label: 'Email',
    value: 'info@lacocinadethor.es',
    sub: 'Respondemos en 24 h',
  },
  {
    Icon: Clock,
    color: '#FFD700',
    bg: 'rgba(255,215,0,.07)',
    border: 'rgba(255,215,0,.18)',
    label: 'Horario',
    value: 'Lun – Vie  9:00 – 19:00',
    sub: 'Hora peninsular española',
  },
  {
    Icon: MapPin,
    color: '#FF6B00',
    bg: 'rgba(255,107,0,.07)',
    border: 'rgba(255,107,0,.18)',
    label: 'Ubicación',
    value: 'Turís, Valencia, España',
    sub: 'Envíos a toda la Península',
  },
]

const SUBJECTS = [
  'Consulta sobre un producto',
  'Estado de mi pedido',
  'Devolución o cambio',
  'Alimentación y consejos',
  'Colaboraciones',
  'Otro',
]

export default function Contacto() {
  useSEO({
    title: 'Contacto',
    description: 'Contacta con La Cocina de Thor para dudas sobre productos, pedidos o alimentación natural para mascotas. Respondemos en menos de 24 horas.',
    path: '/contacto',
  })

  const [form, setForm] = useState({ name: '', email: '', subject: SUBJECTS[0], message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1200)
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <PageBg />

      <div className="relative z-10">

        {/* ── Hero ── */}
        <div className="py-20 px-6 md:px-12 text-center">
          <Reveal from="top">
            <span className="block text-[10px] font-bold tracking-[2px] uppercase mb-3"
              style={{ color: '#00F0FF' }}>Estamos aquí para ayudarte</span>
            <h1 className="text-[40px] md:text-[54px] font-black leading-[1.02] tracking-[-2px] mb-4">
              Hablemos sobre tu <span className="grad-text-cyan">mascota</span>
            </h1>
            <p className="text-[15px] text-offwhite/40 max-w-lg mx-auto">
              ¿Tienes dudas sobre nutrición, un pedido o simplemente quieres contarnos la historia de tu peludo?
              Escríbenos y te respondemos en menos de 24 horas.
            </p>
          </Reveal>
        </div>

        {/* ── Tarjetas de contacto ── */}
        <Reveal from="bottom" delay={60}>
          <div className="max-w-5xl mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {INFO.map(({ Icon, color, bg, border, label, value, sub }) => (
              <div key={label} className="rounded-2xl p-5 flex flex-col gap-3"
                style={{ background: bg, border: `1px solid ${border}` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                  <Icon size={18} weight="duotone" style={{ color }} />
                </div>
                <div>
                  <p className="text-[9px] font-bold tracking-[1.8px] uppercase mb-0.5" style={{ color }}>{label}</p>
                  <p className="text-[12px] font-bold text-offwhite leading-snug">{value}</p>
                  <p className="text-[10px] text-offwhite/30 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── Formulario + WhatsApp ── */}
        <div className="max-w-5xl mx-auto px-6 md:px-12 pb-24 grid lg:grid-cols-[1fr_340px] gap-8">

          {/* Formulario */}
          <Reveal from="left">
            {sent ? (
              <div className="glass rounded-xl p-6 flex flex-col items-center justify-center gap-4 py-16 text-center">
                <CheckCircle size={48} weight="fill" style={{ color: '#C8FF00', filter: 'drop-shadow(0 0 12px rgba(200,255,0,.5))' }} />
                <div>
                  <p className="text-[18px] font-black mb-1">¡Mensaje enviado!</p>
                  <p className="text-[13px] text-offwhite/40">Te responderemos en menos de 24 horas.</p>
                </div>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: SUBJECTS[0], message: '' }) }}
                  className="text-[11px] text-lime/60 hover:text-lime transition-colors mt-1">
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="glass rounded-xl p-6">
                  <h3 className="text-[14px] font-bold mb-5">Tu mensaje</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-offwhite/40 mb-1.5">Nombre</label>
                      <Input name="name" type="text" required placeholder="Tu nombre"
                        value={form.name} onChange={handleChange} />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-offwhite/40 mb-1.5">Email</label>
                      <Input name="email" type="email" required placeholder="tu@email.com"
                        value={form.email} onChange={handleChange} />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[11px] font-semibold text-offwhite/40 mb-1.5">Asunto</label>
                      <select name="subject" value={form.subject} onChange={handleChange}
                        className="flex h-10 w-full rounded-lg bg-surface-2 border border-white/8 px-4 py-2 text-sm text-offwhite placeholder:text-offwhite/25 outline-none focus:border-lime/40 focus:shadow-[0_0_0_2px_rgba(201,241,5,.12)] transition-all appearance-none cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(251,251,248,.3)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}>
                        {SUBJECTS.map(s => <option key={s} value={s} style={{ background: '#111118' }}>{s}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[11px] font-semibold text-offwhite/40 mb-1.5">Mensaje</label>
                      <textarea name="message" required rows={5}
                        placeholder="Cuéntanos en qué podemos ayudarte..."
                        value={form.message} onChange={handleChange}
                        className="flex w-full rounded-lg bg-surface-2 border border-white/8 px-4 py-2.5 text-sm text-offwhite placeholder:text-offwhite/25 outline-none focus:border-lime/40 focus:shadow-[0_0_0_2px_rgba(201,241,5,.12)] transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-[13px] text-black transition-all hover:scale-[1.02] active:scale-[.98] disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg,#C8FF00,#a8cc00)', boxShadow: '0 0 28px rgba(200,255,0,.3)' }}>
                  {loading
                    ? <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    : <><PaperPlaneTilt size={15} weight="fill" /> Enviar mensaje</>
                  }
                </button>
              </form>
            )}
          </Reveal>

          {/* Panel lateral */}
          <Reveal from="right" delay={120}>
            <div className="flex flex-col gap-4">

              {/* WhatsApp */}
              <a href="https://wa.me/34684410199" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl p-6 transition-all hover:scale-[1.02] group"
                style={{ background: 'linear-gradient(135deg,rgba(37,211,102,.12),rgba(18,140,84,.08))', border: '1px solid rgba(37,211,102,.25)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(37,211,102,.15)', border: '1px solid rgba(37,211,102,.3)' }}>
                  <WhatsappLogo size={24} weight="fill" style={{ color: '#25d366' }} />
                </div>
                <div>
                  <p className="text-[13px] font-black text-offwhite mb-0.5">Chatea con nosotros</p>
                  <p className="text-[11px] text-offwhite/40">Respuesta inmediata por WhatsApp</p>
                </div>
              </a>

              {/* FAQ rápida */}
              <div className="rounded-2xl p-6"
                style={{ background: 'rgba(12,12,16,.7)', border: '1px solid rgba(255,255,255,.06)' }}>
                <p className="text-[11px] font-bold tracking-[1.5px] uppercase text-offwhite/35 mb-4">Preguntas frecuentes</p>
                {[
                  ['¿Cuándo llega mi pedido?', 'El mismo día si pides antes de las 15:00 h.'],
                  ['¿Puedo devolver un producto?', 'Sí, tienes 30 días y la devolución es gratuita.'],
                  ['¿Los productos son naturales?', '100%. Sin conservantes, colorantes ni artificiales.'],
                ].map(([q, a]) => (
                  <div key={q} className="mb-4 last:mb-0">
                    <p className="text-[12px] font-semibold text-offwhite/70 mb-1">{q}</p>
                    <p className="text-[11px] text-offwhite/30 leading-snug">{a}</p>
                  </div>
                ))}
              </div>

              {/* Mascota chip */}
              <div className="rounded-2xl p-5 text-center"
                style={{ background: 'rgba(255,62,165,.06)', border: '1px solid rgba(255,62,165,.15)' }}>
                <PawPrint size={28} weight="duotone" style={{ color: '#FF3EA5' }} className="mx-auto mb-2 block" />
                <p className="text-[12px] font-bold text-offwhite/70">¿Tu mascota tiene necesidades especiales?</p>
                <p className="text-[11px] text-offwhite/30 mt-1">Cuéntanoslo en el mensaje y te asesoramos de forma personalizada.</p>
              </div>

            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
