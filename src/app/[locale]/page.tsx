import { Hero, OurStudio, Pricing, TestimonialCarousel, ContactForm, Location, InstagramFeed, Footer } from '@/components/sections'
import { NavRail } from '@/components/ui'
import { LanguageTracker } from './LanguageTracker'

export default function HomePage() {
  return (
    <>
      <LanguageTracker />
      <NavRail />
      <main id="main" className="min-h-screen bg-brand-black text-white">
        <section id="hero" className="snap-section">
          <Hero />
        </section>
        <section id="studio" className="snap-section bg-brand-black">
          <OurStudio />
        </section>
        <section id="pricing" className="snap-section bg-brand-black">
          <Pricing />
        </section>
        <section id="testimonials" className="snap-section bg-brand-black">
          <TestimonialCarousel />
        </section>
        <section id="instagram" className="snap-section bg-brand-black">
          <InstagramFeed />
        </section>
        <section id="contact" className="snap-section bg-brand-black">
          <ContactForm />
          <Location />
        </section>
        <Footer />
      </main>
    </>
  )
}