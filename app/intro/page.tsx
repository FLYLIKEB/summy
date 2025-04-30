import Image from 'next/image'
import Link from 'next/link'
import Hero from '@/components/landing/Hero'
import Demo from '@/components/landing/Demo'
import PersonaProblems from '@/components/landing/PersonaProblems'
import Features from '@/components/landing/Features'
import SpecialFeatures from '@/components/landing/SpecialFeatures'
import FinalCTA from '@/components/landing/FinalCTA'
import Reviews from '@/components/landing/Reviews'
import PageNavigation from '@/components/layout/PageNavigation'
import VisitorTracking from '@/components/VisitorTracking'

export default function Intro() {
  return (
    <div className="min-h-screen flex flex-col bg-apple-dark">
      <main className="flex-1">
        <div id="hero">
          <Hero /> {/* 홈페이지 첫 화면 */}
        </div>
        <div id="reviews">
          <Reviews /> {/* 사용자 리뷰 */}
        </div>
        <div id="demo">
          <Demo /> {/* 데모 영상 */}
        </div>
        <div id="problems">
          <PersonaProblems /> {/* 사용자 문제 소개 */}
        </div>
        <div id="features">
          <Features /> {/* 주요 기능 소개 */}
        </div>
        <div id="special-features">
          <SpecialFeatures /> {/* 특별한 점 소개 */}
        </div>
        <div id="cta">
          <FinalCTA /> {/* 최종 초대 호출 */}
        </div>
      </main>
      <PageNavigation />
    </div>
  )
} 