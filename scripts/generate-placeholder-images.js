const fs = require('fs')
const path = require('path')

// Create placeholder SVG images for gallery
const placeholders = [
  { name: 'facility-1.jpg', text: 'Weight Training Area' },
  { name: 'facility-2.jpg', text: 'Cardio Zone' },
  { name: 'facility-3.jpg', text: 'Functional Area' },
  { name: 'facility-4.jpg', text: 'Class Studio' },
  { name: 'facility-5.jpg', text: 'Free Weight Area' },
  { name: 'facility-6.jpg', text: 'Stretching Zone' },
]

placeholders.forEach(({ name, text }) => {
  const svg = `
<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="400" fill="#0A0A0A"/>
  <rect x="50" y="50" width="500" height="300" fill="#1a1a1a" stroke="#FF5E1B" stroke-width="2"/>
  <text x="300" y="200" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#FF5E1B" text-anchor="middle">
    ${text}
  </text>
  <text x="300" y="230" font-family="Arial, sans-serif" font-size="16" fill="#666" text-anchor="middle">
    Placeholder Image
  </text>
</svg>
  `.trim()

  const filePath = path.join(__dirname, '..', 'public', 'images', name.replace('.jpg', '.svg'))
  fs.writeFileSync(filePath, svg)
  console.log(`Created ${filePath}`)
})

console.log('Placeholder images generated successfully!')