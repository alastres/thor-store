// Resolves a public/ asset path against Vite's base (needed for GitHub Pages'
// /repo-name/ subpath — plain string literals in JSX are never rewritten by Vite,
// only href/src attributes inside index.html are).
export function asset(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
