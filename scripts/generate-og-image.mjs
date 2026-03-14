import sharp from 'sharp';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const WIDTH = 1200;
const HEIGHT = 630;

// App icon: resize to 56x56 with rounded corners
const iconPath = resolve(__dirname, '../../actual-expo/assets/icon.png');
const iconSize = 56;
const iconRadius = 12;
const iconX = 540;
const iconY = 160;

const iconRounded = await sharp(iconPath)
  .resize(iconSize, iconSize)
  .composite([{
    input: Buffer.from(`<svg width="${iconSize}" height="${iconSize}"><rect x="0" y="0" width="${iconSize}" height="${iconSize}" rx="${iconRadius}" ry="${iconRadius}" fill="white"/></svg>`),
    blend: 'dest-in',
  }])
  .png()
  .toBuffer();

const variants = [
  {
    lang: 'en',
    file: 'og-image.png',
    badge: 'Now in Beta',
    tagline1: 'No cloud required.',
    tagline2: 'Budget privately. Own your data.',
    pills: [
      { label: 'Local-first', width: 120 },
      { label: 'No Subscription', width: 140 },
      { label: 'Open Source', width: 130 },
      { label: 'E2E Encrypted', width: 120 },
    ],
  },
  {
    lang: 'es',
    file: 'og-image-es.png',
    badge: 'Ya en Beta',
    tagline1: 'Sin nube. Sin excusas.',
    tagline2: 'Tus finanzas son tuyas. Nadie más las ve.',
    pills: [
      { label: 'Local-first', width: 120 },
      { label: 'Sin suscripción', width: 140 },
      { label: 'Código abierto', width: 140 },
      { label: 'Cifrado E2E', width: 120 },
    ],
  },
];

function buildSvg({ badge, tagline1, tagline2, pills }) {
  // Center pills
  const gap = 20;
  const totalWidth = pills.reduce((sum, p) => sum + p.width, 0) + gap * (pills.length - 1);
  let pillX = (WIDTH - totalWidth) / 2;

  const pillsSvg = pills.map((p) => {
    const rx = pillX;
    const textX = rx + p.width / 2;
    pillX += p.width + gap;
    return `
  <rect x="${rx}" y="430" width="${p.width}" height="36" rx="18" fill="rgba(135,25,224,0.12)" stroke="rgba(168,85,247,0.2)" stroke-width="1"/>
  <text x="${textX}" y="453" text-anchor="middle" fill="#a855f7" font-size="13" font-weight="500" font-family="Inter, -apple-system, sans-serif">${p.label}</text>`;
  }).join('\n');

  return `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="40%" r="60%" fx="50%" fy="40%">
      <stop offset="0%" style="stop-color:#8719e0;stop-opacity:0.35"/>
      <stop offset="100%" style="stop-color:#0a0612;stop-opacity:0"/>
    </radialGradient>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#a855f7"/>
      <stop offset="100%" style="stop-color:#c084fc"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0a0612"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>

  <!-- Grid -->
  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(168,85,247,0.04)" stroke-width="1"/>
  </pattern>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)"/>

  <!-- Badge (vertically centered with icon at y=188) -->
  <rect x="612" y="174" width="128" height="28" rx="14" fill="rgba(135,25,224,0.15)" stroke="rgba(168,85,247,0.3)" stroke-width="1"/>
  <circle cx="628" cy="188" r="4" fill="#22c55e"/>
  <text x="676" y="193" text-anchor="middle" fill="#a855f7" font-size="13" font-weight="500" font-family="Inter, -apple-system, sans-serif">${badge}</text>

  <!-- App name -->
  <text x="600" y="280" text-anchor="middle" fill="#f1f5f9" font-size="48" font-weight="800" font-family="Inter, -apple-system, sans-serif" letter-spacing="-1">Actual Budget Mobile</text>

  <!-- Tagline line 1 (accent) -->
  <text x="600" y="340" text-anchor="middle" fill="url(#textGrad)" font-size="26" font-weight="600" font-family="Inter, -apple-system, sans-serif">${tagline1}</text>

  <!-- Tagline line 2 -->
  <text x="600" y="385" text-anchor="middle" fill="#94a3b8" font-size="26" font-weight="500" font-family="Inter, -apple-system, sans-serif">${tagline2}</text>

  <!-- Feature pills -->
${pillsSvg}

  <!-- Bottom URL -->
  <text x="600" y="560" text-anchor="middle" fill="#64748b" font-size="16" font-weight="400" font-family="Inter, -apple-system, sans-serif">actual.cubancodepath.com</text>
</svg>`;
}

for (const variant of variants) {
  const svg = buildSvg(variant);
  const outputPath = resolve(__dirname, `../public/images/${variant.file}`);

  await sharp(Buffer.from(svg))
    .composite([
      { input: iconRounded, top: iconY, left: iconX },
    ])
    .png()
    .toFile(outputPath);

  console.log(`OG image (${variant.lang}) generated at ${outputPath}`);
}
