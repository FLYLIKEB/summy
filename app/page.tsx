import Image from 'next/image'
import Link from 'next/link'
import Hero from '@/components/Hero'
import Demo from '@/components/Demo'
import PersonaProblems from '@/components/PersonaProblems'
import Features from '@/components/Features'
import SpecialFeatures from '@/components/SpecialFeatures'
import FinalCTA from '@/components/FinalCTA'

// 홈페이지 메인 화면
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a1f]">
      <main className="flex-1">
        <Hero /> {/* 홈페이지 첫 화면 */}
        <Demo /> {/* 데모 영상 */}
        <PersonaProblems /> {/* 사용자 문제 소개 */}
        <Features /> {/* 주요 기능 소개 */}
        <SpecialFeatures /> {/* 특별한 점 소개 */}
        <FinalCTA /> {/* 최종 초대 호출 */}
      </main>
    </div>
  )
} 