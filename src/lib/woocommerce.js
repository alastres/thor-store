// WooCommerce REST API v3 integration
// Set your WordPress URL and credentials in .env:
//   VITE_WC_URL=https://tu-tienda.com
//   VITE_WC_KEY=ck_xxxxxxxxxxxx
//   VITE_WC_SECRET=cs_xxxxxxxxxxxx

const BASE = import.meta.env.VITE_WC_URL || ''
const KEY = import.meta.env.VITE_WC_KEY || ''
const SECRET = import.meta.env.VITE_WC_SECRET || ''

const auth = btoa(`${KEY}:${SECRET}`)

async function wc(endpoint, options = {}) {
  const res = await fetch(`${BASE}/wp-json/wc/v3/${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
      ...options.headers,
    },
  })
  if (!res.ok) throw new Error(`WC API error: ${res.status}`)
  return res.json()
}

// --- Products ---
export const getProducts = (params = {}) => {
  const q = new URLSearchParams({ per_page: 20, ...params }).toString()
  return wc(`products?${q}`)
}

export const getProduct = (id) => wc(`products/${id}`)

export const getProductBySlug = (slug) =>
  wc(`products?slug=${slug}`).then(arr => arr[0] ?? null)

export const getCategories = () => wc('products/categories?per_page=50')

// --- Orders ---
export const createOrder = (data) =>
  wc('orders', { method: 'POST', body: JSON.stringify(data) })

// --- MOCK DATA (used when WC credentials are not configured) ---
export const MOCK_PRODUCTS = [
  { id: 1, name: 'Lata Pollo con Plátano', slug: 'lata-pollo-platano', price: '2.99', regular_price: '3.99', categories: [{ name: 'Perro' }], short_description: 'Carne natural de pollo con plátano ecológico. Sin conservantes.', images: [], stock_status: 'instock', tags: [{ name: 'Popular' }] },
  { id: 2, name: 'Lata Salmón Premium', slug: 'lata-salmon-premium', price: '3.49', regular_price: '3.49', categories: [{ name: 'Gato' }], short_description: 'Salmón atlántico fresco con aceite de oliva. Rico en omega-3.', images: [], stock_status: 'instock', tags: [] },
  { id: 3, name: 'Salchichas con Verduras', slug: 'salchichas-verduras', price: '7.99', regular_price: '7.99', categories: [{ name: 'Perro' }], short_description: 'Mix de carnes con zanahoria, guisantes y calabacín. 1kg.', images: [], stock_status: 'instock', tags: [{ name: 'Popular' }] },
  { id: 4, name: 'Lata Pavo con Piña', slug: 'lata-pavo-pina', price: '2.99', regular_price: '2.99', categories: [{ name: 'Perro' }], short_description: 'Pavo de granja con piña natural. Digestión perfecta.', images: [], stock_status: 'instock', tags: [] },
  { id: 5, name: 'Snacks Naturales Mix', slug: 'snacks-naturales', price: '5.49', regular_price: '6.49', categories: [{ name: 'Snacks' }], short_description: 'Mix de snacks deshidratados 100% naturales. Sin aditivos.', images: [], stock_status: 'instock', tags: [{ name: 'Nuevo' }] },
  { id: 6, name: 'Lata Ternera con Arroz', slug: 'lata-ternera-arroz', price: '3.29', regular_price: '3.29', categories: [{ name: 'Perro' }], short_description: 'Ternera premium con arroz integral. Alta digestibilidad.', images: [], stock_status: 'instock', tags: [] },
]

export const MOCK_CATEGORIES = [
  { id: 1, name: 'Todos', slug: 'todos' },
  { id: 2, name: 'Perro', slug: 'perro' },
  { id: 3, name: 'Gato', slug: 'gato' },
  { id: 4, name: 'Snacks', slug: 'snacks' },
  { id: 5, name: 'Salchichas', slug: 'salchichas' },
]
