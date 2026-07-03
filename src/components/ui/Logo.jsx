import { Link } from 'react-router-dom'
import { asset } from '@/lib/assetUrl'

const SIZES = {
  sm: 'h-12 w-auto',
  md: 'h-14 w-auto',
  lg: 'h-28 w-auto',
  xl: 'w-full max-w-[360px] h-auto object-contain',
  full: 'w-full h-auto object-contain',
}

export default function Logo({ size = 'md', linked = true, className = '', glow = false }) {
  const image = (
    <img
      src={asset('assets/logo_main.svg')}
      alt="La Cocina de Thor"
      className={`${SIZES[size] || SIZES.md} ${glow ? 'logo-glow-pulse' : ''}`}
      style={glow ? undefined : { filter: 'drop-shadow(0 0 8px rgba(201,241,5,.5))' }}
    />
  )

  if (!linked) return image

  return (
    <Link to="/" className={`flex items-center shrink-0 ${className}`}>
      {image}
    </Link>
  )
}
