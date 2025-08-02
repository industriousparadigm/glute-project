import { Hero, Differentiators, Pricing, FacilityGallery } from '@/components/sections'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Differentiators />
      <FacilityGallery />
      <Pricing />
      {/* Other sections will be added here */}
    </main>
  )
}