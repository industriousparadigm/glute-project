'use client'

import { Hero, OurStudio, Services, TestimonialCarousel, MeetTheTeam, Lifestyle, Regybox, Contact, Footer } from '@/components/sections'
import { NavRail } from '@/components/ui'
import { LanguageTracker } from './LanguageTracker'
import { GalleryProvider, useGallery } from '@/components/GalleryContext'
import { StickyHeader } from '@/components/StickyHeader'

function HomeContent() {
  const { isGalleryOpen } = useGallery()

  return (
    <>
      <LanguageTracker />
      {!isGalleryOpen && <NavRail />}
      <StickyHeader />
      <main id="main" className="min-h-screen w-full overflow-x-hidden">
        <section id="hero" className="snap-section bg-brand-black text-white">
          <Hero />
        </section>
        <section id="studio" className="snap-section bg-gradient-studio text-dark-primary">
          <OurStudio />
        </section>
        <section id="services" className="snap-section bg-gradient-services text-dark-primary">
          <Services />
        </section>
        <section id="testimonials" className="snap-section bg-gradient-testimonials text-dark-primary">
          <TestimonialCarousel />
        </section>
        <section id="team" className="snap-section bg-gradient-team text-white">
          <MeetTheTeam />
        </section>
        <section id="lifestyle" className="snap-section bg-gradient-lifestyle text-dark-primary">
          <Lifestyle />
        </section>
        <section id="regybox" className="snap-section bg-gradient-regybox text-white">
          <Regybox />
        </section>
        <section id="contact" className="snap-section bg-gradient-contact text-white">
          <Contact />
        </section>
        <div className="bg-brand-black text-white">
          <Footer />
        </div>
      </main>
    </>
  )
}

export default function HomePage() {
  return (
    <GalleryProvider>
      <HomeContent />
    </GalleryProvider>
  )
}