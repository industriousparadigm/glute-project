import { Hero, Differentiators, Pricing, FacilityGallery, TestimonialCarousel, ContactForm, Location, Footer } from '@/components/sections'
import { NavRail } from '@/components/ui'

export default function HomePage() {
  return (
    <>
      <NavRail />
      <main id="main" className="min-h-screen bg-brand-black">
        <section id="hero" className="snap-section">
          <Hero />
        </section>
        <section id="why" className="snap-section bg-surface-dark">
          <Differentiators />
        </section>
        <section id="gallery" className="snap-section bg-brand-black">
          <FacilityGallery />
        </section>
        <section id="testimonials" className="snap-section bg-surface-dark">
          <TestimonialCarousel />
        </section>
        <section id="pricing" className="snap-section bg-brand-black">
          <Pricing />
        </section>
        <section id="contact" className="snap-section bg-surface-dark">
          <ContactForm />
          <Location />
        </section>
        <Footer />
      </main>
    </>
  )
}