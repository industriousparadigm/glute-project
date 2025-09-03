import { Hero, OurStudio, Services, TestimonialCarousel, MeetTheTeam, ContactForm, Location, InstagramFeed, Footer } from '@/components/sections'
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
        <section id="studio" className="snap-section bg-gradient-studio">
          <OurStudio />
        </section>
        <section id="services" className="snap-section bg-gradient-services">
          <Services />
        </section>
        <section id="testimonials" className="snap-section bg-gradient-testimonials">
          <TestimonialCarousel />
        </section>
        <section id="team" className="snap-section bg-gradient-team">
          <MeetTheTeam />
        </section>
        <section id="instagram" className="snap-section bg-gradient-instagram">
          <InstagramFeed />
        </section>
        <section id="contact" className="snap-section bg-gradient-contact">
          <ContactForm />
          <Location />
        </section>
        <Footer />
      </main>
    </>
  )
}