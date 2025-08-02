import { Hero, Differentiators, Pricing } from '@/components/sections'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Differentiators />
      <Pricing />
      {/* Other sections will be added here */}
    </main>
  )
}