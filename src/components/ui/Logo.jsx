import { Link } from 'react-router-dom'

export default function Logo({ imageSize = 'h-9', textSize = 'text-[30px]' }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 shrink-0">
      <img
        src="/assets/isotipo.webp"
        alt="Thor"
        className={`${imageSize} w-auto`}
        style={{ filter: 'drop-shadow(0 0 8px rgba(201,241,5,.5))' }}
      />
      <div className="flex flex-col leading-none gap-[2px]">
        <span className="text-[8px] font-bold tracking-[2.5px] text-white/60 uppercase ml-0.5">La Cocina de</span>
        <span className={`${textSize} font-black tracking-[1px] uppercase text-lime`} style={{ textShadow: '0 0 10px rgba(201,241,5,.45)' }}>
          TH<span className="text-white">O</span>R
        </span>
      </div>
    </Link>
  )
}
