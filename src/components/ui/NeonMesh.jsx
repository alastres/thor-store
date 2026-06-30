import './NeonMesh.css'

export default function NeonMesh({ children, className = '', style = {} }) {
  return (
    <div className={`neon-mesh ${className}`} style={style}>
      <div className="neon-mesh-dots" />
      <div className="neon-orb neon-orb-l1" />
      <div className="neon-orb neon-orb-p1" />
      <div className="neon-orb neon-orb-l2" />
      <div className="neon-orb neon-orb-p2" />
      <div className="neon-orb neon-orb-c1" />
      <div className="neon-orb neon-orb-o1" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
