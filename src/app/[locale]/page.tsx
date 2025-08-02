import { Hero, Differentiators, Pricing, FacilityGallery, TestimonialCarousel, ContactForm, Location } from '@/components/sections'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Differentiators />
      <FacilityGallery />
      <TestimonialCarousel />
      <Pricing />
      <ContactForm />
      <Location />
      {/* Footer will be added here */}
    </main>
  )
}