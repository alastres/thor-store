import useScrollReveal from '@/hooks/useScrollReveal'

const ORIGINS = {
  bottom: 'translateY(36px)',
  top:    'translateY(-24px)',
  left:   'translateX(-36px)',
  right:  'translateX(36px)',
}

export default function Reveal({ children, delay = 0, from = 'bottom', className = '', style = {} }) {
  const [ref, visible] = useScrollReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translate(0)' : ORIGINS[from],
        transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
