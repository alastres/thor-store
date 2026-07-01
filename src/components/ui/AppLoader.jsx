import { useEffect } from 'react'

export default function AppLoader() {
  useEffect(() => {
    const loader = document.getElementById('app-loader')
    if (!loader) return

    const onLoad = () => {
      // Dejar minimamente visible para que no parpadee
      requestAnimationFrame(() => {
        loader.style.opacity = '0'
        loader.style.visibility = 'hidden'
      })
      // Removerlo del DOM después de la transición
      setTimeout(() => {
        if (loader && loader.parentNode) {
          loader.parentNode.removeChild(loader)
        }
      }, 500)
    }

    if (document.readyState === 'complete') {
      onLoad()
    } else {
      window.addEventListener('load', onLoad, { once: true })
    }

    // Fallback: se oculta sí o sí a los 3s
    const fallback = setTimeout(onLoad, 3000)

    return () => {
      window.removeEventListener('load', onLoad)
      clearTimeout(fallback)
    }
  }, [])

  return null
}
