import { useEffect } from 'react'

const SITE_NAME = 'La Cocina de Thor'
const DEFAULT_IMAGE = `${import.meta.env.BASE_URL}assets/logotipo.webp`

function resolveAsset(src) {
  if (!src || /^https?:\/\//.test(src)) return src
  return `${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`
}

function setMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function useSEO({ title, description, image = DEFAULT_IMAGE, noindex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
    document.title = fullTitle
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')

    const resolvedImage = resolveAsset(image)

    if (description) {
      setMeta('name', 'description', description)
      setMeta('property', 'og:description', description)
      setMeta('name', 'twitter:description', description)
    }

    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:image', `${window.location.origin}${resolvedImage}`)
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:image', `${window.location.origin}${resolvedImage}`)

    // Canonical/og:url derived from the real browser URL (already includes the router basename)
    const url = `${window.location.origin}${window.location.pathname}`
    setCanonical(url)
    setMeta('property', 'og:url', url)
  }, [title, description, image, noindex])
}
