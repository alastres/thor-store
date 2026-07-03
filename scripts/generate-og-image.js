import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function main() {
  const logoPath = path.join(__dirname, '..', 'public', 'assets', 'logo_main.svg')
  const outPath = path.join(__dirname, '..', 'public', 'assets', 'og-image.webp')

  if (!fs.existsSync(logoPath)) {
    console.error('No se encontró el logo en:', logoPath)
    process.exit(1)
  }

  const logoMeta = await sharp(logoPath).metadata()

  if (!logoMeta.width || !logoMeta.height) {
    console.error('El logo no tiene dimensiones válidas')
    process.exit(1)
  }

  // 55% del ancho del canvas con límites para que no se escape verticalmente
  const targetWidth = Math.min(Math.round(1200 * 0.55), 800)
  const maxHeight = Math.round(630 * 0.6)
  let targetHeight = Math.round((logoMeta.height / logoMeta.width) * targetWidth)

  if (targetHeight > maxHeight) {
    targetHeight = Math.round((targetWidth / logoMeta.width) * logoMeta.height)
    if (targetHeight > maxHeight) {
      const ratio = maxHeight / targetHeight
      targetHeight = maxHeight
      targetWidth = Math.round(targetWidth * ratio)
    }
  }

  const buffer = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 8, g: 8, b: 8, alpha: 1 },
    },
  })
    .composite([
      {
        input: await sharp(logoPath)
          .resize({ width: targetWidth, height: targetHeight, fit: 'inside' })
          .png()
          .toBuffer(),
        gravity: 'center',
      },
    ])
    .webp({ quality: 92 })
    .toBuffer()

  fs.writeFileSync(outPath, buffer)
  console.log('OG image generada en:', outPath)
}

main().catch(err => {
  console.error('Error generando og-image:', err)
  process.exit(1)
})
