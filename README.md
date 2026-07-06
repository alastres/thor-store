# 🐾 La Cocina de Thor — Thor Store

Landing page y tienda para **La Cocina de Thor**, alimentación natural premium para perros y gatos. Construida como una SPA en React + Vite + Tailwind CSS, desplegada en GitHub Pages.

**🔗 Demo en vivo:** [alastres.github.io/thor-store](https://alastres.github.io/thor-store/)

---

## Tabla de contenidos

- [Stack tecnológico](#stack-tecnológico)
- [Características](#características)
- [Requisitos previos](#requisitos-previos)
- [Instalación y uso local](#instalación-y-uso-local)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Despliegue (GitHub Pages)](#despliegue-github-pages)
- [Reutilizar los componentes en WordPress](#reutilizar-los-componentes-en-wordpress)
- [Convenciones de assets e imágenes](#convenciones-de-assets-e-imágenes)
- [Licencia](#licencia)

---

## Stack tecnológico

| Área | Tecnología |
|---|---|
| Framework | [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/) |
| Estilos | [Tailwind CSS](https://tailwindcss.com/) + CSS plano para animaciones |
| Routing | [React Router 6](https://reactrouter.com/) (modo SPA, con `basename`) |
| Estado global | [Zustand](https://github.com/pmndrs/zustand) (carrito) |
| Componentes UI | [Radix UI](https://www.radix-ui.com/) (dialog, tabs, tooltip) + primitivas propias estilo shadcn/ui |
| Iconos | [Phosphor Icons](https://phosphoricons.com/) + [Tabler Icons](https://tabler.io/icons) |
| Imágenes | `sharp` (generación de `og-image`), assets en `.webp`/`.svg` |
| Despliegue | [gh-pages](https://www.npmjs.com/package/gh-pages) → GitHub Pages |

## Características

- Landing completa: Hero animado, catálogo de productos, testimonios, FAQ, newsletter.
- Tienda con ficha de producto, carrito persistente (Zustand) y checkout.
- SEO on-page dinámico (`useSEO` hook): title, meta description, Open Graph y Twitter Cards por página.
- Diseño responsive, con variantes específicas para móvil (logo, hero, footer).
- Animaciones y efectos: glow pulsante de marca, tilt 3D en la card del hero, fondo `DarkVeil` con shaders (`ogl`).
- Soporte SPA para GitHub Pages (redirect 404 → index vía `public/404.html`).

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- npm 9+ (incluido con Node)

## Instalación y uso local

```bash
# clonar el repo
git clone https://github.com/alastres/thor-store.git
cd thor-store

# instalar dependencias
npm install

# levantar el servidor de desarrollo (http://localhost:5173/thor-store/)
npm run dev
```

## Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con hot-reload (Vite). |
| `npm run build` | Compila la app de producción en `dist/`. |
| `npm run preview` | Sirve localmente el contenido de `dist/` para probar el build final. |
| `npm run deploy` | Compila (`predeploy`) y publica `dist/` en la rama `gh-pages` (GitHub Pages). |

## Estructura del proyecto

```
thor-store/
├─ public/
│  ├─ assets/            # imágenes, logos (.svg/.webp), og-image
│  ├─ 404.html            # redirect SPA para GitHub Pages
│  ├─ robots.txt
│  └─ sitemap.xml
├─ scripts/
│  └─ generate-og-image.js  # genera public/assets/og-image.webp con sharp
├─ src/
│  ├─ components/
│  │  ├─ layout/          # Header, Footer
│  │  ├─ sections/        # Hero, WhyUs, Testimonials, FAQ, Newsletter, Stats...
│  │  └─ ui/               # Logo, botones, cards, diálogos, efectos visuales
│  ├─ context/            # CartContext (estado del carrito)
│  ├─ hooks/               # useSEO (meta tags dinámicos)
│  ├─ lib/                 # utilidades (assetUrl, helpers de shadcn)
│  ├─ pages/                # Home, Shop, ProductDetail, Nosotros, Contacto, Cart, Checkout
│  ├─ App.jsx               # definición de rutas
│  └─ main.jsx               # punto de entrada
├─ index.html                # shell HTML + loader inicial + meta tags SEO estáticas
├─ vite.config.js
└─ tailwind.config.js
```

## Despliegue (GitHub Pages)

El sitio se sirve desde `https://alastres.github.io/thor-store/`, con `base: '/thor-store/'` configurado en `vite.config.js`.

```bash
npm run deploy
```

Esto ejecuta `vite build` y publica el contenido de `dist/` en la rama `gh-pages` mediante el paquete `gh-pages`. GitHub Pages debe estar configurado (Settings → Pages) para servir desde esa rama.

> **Nota:** las rutas del router usan `basename={import.meta.env.BASE_URL}`, y `public/404.html` redirige cualquier ruta profunda (`/tienda`, `/producto/...`) de vuelta a `index.html` para que el router de React la resuelva — es el patrón estándar de SPA en GitHub Pages.

---

## Reutilizar los componentes en WordPress

Este proyecto **no es un plugin ni un tema de WordPress** — es una SPA de React independiente. Antes de intentar "meter" los componentes en WordPress, es importante entender las dos rutas posibles, porque no son intercambiables:

### Opción A — Copiar secciones estáticas (recomendado para una landing de marketing)

Ideal si en WordPress solo quieres reutilizar el **diseño visual** de secciones como el Hero, "Por qué elegirnos", testimonios o FAQ, sin la interactividad de React (carrito, rutas, formularios con estado).

1. **Genera el build de producción:**
   ```bash
   npm run build
   ```
   Esto crea `dist/index.html` y `dist/assets/*.css` / `*.js` ya compilados.

2. **Extrae el HTML de la sección que quieras.** La forma más simple es abrir `npm run preview` en el navegador, hacer clic derecho sobre la sección → "Inspeccionar" → clic derecho en el nodo raíz del componente en el DOM → **"Copy → Copy outerHTML"**.

3. **En WordPress**, pega ese HTML dentro de un bloque **"HTML personalizado"** (Gutenberg) o con un plugin como **WPCode** / **Insert Headers and Footers** si necesitas que se repita en varias páginas.

4. **Sube el CSS compilado.** El archivo `dist/assets/index-*.css` contiene todas las utilidades de Tailwind ya generadas. Dos formas de usarlo:
   - **Recomendado:** sube el CSS a la carpeta de tu tema (`wp-content/themes/tu-tema/`) y enqueuea solo ese archivo con `wp_enqueue_style()`, o pégalo dentro de un plugin de CSS personalizado (p. ej. "Simple Custom CSS").
   - **Evita pegarlo tal cual en el Customizer de WordPress** sin revisar antes: Tailwind incluye un *reset* global (`preflight`) que sobreescribe estilos de `h1`, `p`, `button`, etc. en **toda la página**, no solo en tu sección — puede romper el diseño del resto del sitio. Si esto pasa, hay dos soluciones:
     - Quitar el preflight del build (`corePlugins: { preflight: false }` en `tailwind.config.js`, requiere recompilar) antes de exportar el CSS para WordPress.
     - O incrustar la sección dentro de un `<iframe>` que cargue una página HTML aislada con su propio CSS — más simple si solo es una sección puntual (ej. un banner).

5. **Sube las imágenes** de `public/assets/*.webp` y `*.svg` a la Biblioteca de medios de WordPress, y actualiza las rutas `src` del HTML copiado para que apunten a las nuevas URLs de WordPress.

6. **Fuentes:** el proyecto usa Google Fonts "Inter", cargada en `index.html`:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
   ```
   Puedes pegar ese mismo `<link>` en el `<head>` de WordPress (vía un plugin de "Insert Headers and Footers" o en `header.php` de tu tema hijo).

> Esta opción funciona bien para secciones **estáticas** (Hero, testimonios, FAQ, banners). Los componentes con estado de React (carrito, formularios de checkout, tabs interactivos) **no funcionarán** solo copiando el HTML, porque necesitan que React "hidrate" ese markup — ver Opción B.

### Opción B — Reutilizar componentes React con interactividad

Si necesitas que la interactividad (carrito, formularios, animaciones controladas por estado) siga funcionando dentro de WordPress, hay que decidir entre dos caminos:

1. **WordPress como backend headless + este frontend React tal cual.**
   Mantén esta app React exactamente como está (o alojada en un subdominio, ej. `tienda.tudominio.com`), y usa WordPress solo como fuente de contenido vía **WPGraphQL** o la **REST API de WP**. El e-commerce (carrito, checkout) seguiría siendo React + Zustand como ahora; WordPress solo alimentaría contenido (productos, posts del blog, etc.). Esto requiere más trabajo de integración pero conserva el 100% de la experiencia actual.

2. **Convertir componentes puntuales en bloques de Gutenberg.**
   Para un componente aislado (ej. el `Hero` o una card de producto), puedes empaquetarlo como un **bloque de Gutenberg** usando `@wordpress/scripts` y `@wordpress/create-block`. Esto implica:
   - Reescribir el componente para que no dependa de React Router (WordPress ya maneja sus propias URLs) ni de `import.meta.env.BASE_URL` (usa `asset()` de `src/lib/assetUrl.js` como referencia, pero reemplaza la resolución de rutas por la de WordPress, ej. mediante `wp_localize_script`).
   - Compilar el componente con el bundler de `@wordpress/scripts` (usa webpack, no Vite), registrarlo como bloque con `register_block_type()` en PHP.
   - Publicarlo como plugin instalable en el sitio de WordPress.

   Este camino tiene sentido si vas a reutilizar el mismo componente en **muchos sitios WordPress distintos** (ej. una agencia con varios clientes); si es solo para este proyecto, es más trabajo del que aporta valor — mejor Opción A.

### Recomendación práctica

Para la mayoría de los casos (llevar el diseño de esta landing a un sitio WordPress existente), **usa la Opción A**: exporta el HTML/CSS estático de las secciones de marketing (Hero, Por qué elegirnos, Testimonios, FAQ, Newsletter) y dejá que WooCommerce (u otro plugin de e-commerce nativo de WP) maneje el carrito y checkout, en vez de tratar de portar la lógica de `CartContext.jsx` a WordPress.

---

## Convenciones de assets e imágenes

- Todos los assets estáticos (logos, fotos, favicon) viven en `public/assets/` y se referencian con la utilidad `asset()` (`src/lib/assetUrl.js`), que antepone `import.meta.env.BASE_URL` para que funcionen tanto en local como bajo el subpath `/thor-store/` de GitHub Pages.
- El logo de marca (`logo_main.svg` completo, `logo_iso.svg` solo el ícono del martillo) se usa a través del componente [`Logo`](src/components/ui/Logo.jsx), que expone tamaños predefinidos (`sm`, `md`, `lg`, `xl`, `full`) y un modo `glow` con animación de pulso.
- La imagen de preview para redes sociales (`og-image.webp`) se regenera con:
  ```bash
  node scripts/generate-og-image.js
  ```
  a partir de `logo_main.svg`, y se referencia con URL absoluta completa en `index.html` (`og:image` / `twitter:image`) — importante porque los crawlers de redes sociales no ejecutan JavaScript y no resuelven rutas relativas al subpath de GitHub Pages.

## Licencia

Proyecto privado de La Cocina de Thor. Todos los derechos reservados.
