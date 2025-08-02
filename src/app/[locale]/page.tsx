import { Hero, Differentiators, Pricing, FacilityGallery, TestimonialCarousel } from '@/components/sections'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Differentiators />
      <FacilityGallery />
      <TestimonialCarousel />
      <Pricing />
      {/* Other sections will be added here */}
    </main>
  )
}