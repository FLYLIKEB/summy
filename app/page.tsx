import Image from 'next/image'
import Link from 'next/link'
import Hero from '@/components/Hero'
import Demo from '@/components/Demo'
import PersonaProblems from '@/components/PersonaProblems'
import Features from '@/components/Features'
import SpecialFeatures from '@/components/SpecialFeatures'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Hero />
        <Demo />
        <PersonaProblems />
        <Features />
        <SpecialFeatures />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
} 