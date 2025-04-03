import Image from 'next/image'
import Link from 'next/link'
import Hero from '@/components/Hero'
import Demo from '@/components/Demo'
import PersonaProblems from '@/components/PersonaProblems'
import Features from '@/components/Features'
import SpecialFeatures from '@/components/SpecialFeatures'
import FinalCTA from '@/components/FinalCTA'
import Reviews from '@/components/Reviews'
import PageNavigation from '@/components/PageNavigation'

// 홈페이지 메인 화면
export default function Home() {
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