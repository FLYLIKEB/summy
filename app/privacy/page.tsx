'use client'

import React from 'react'
import LegalLayout from '@/components/layout/LegalLayout'

export default function PrivacyPage() {
  return (
    <LegalLayout title="개인정보처리방침" lastUpdated="2024년 3월 20일">
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">1. 개인정보의 수집 및 이용 목적</h2>
        <p>
          summy는 다음의 목적을 위하여 개인정보를 처리합니다:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>서비스 제공 및 운영</li>
          <li>회원 관리 및 서비스 이용에 따른 본인확인</li>
          <li>서비스 이용 기록 분석 및 통계</li>
          <li>서비스 개선 및 신규 서비스 개발</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">2. 수집하는 개인정보 항목</h2>
        <p>
          summy는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>필수항목: 이메일 주소, 비밀번호</li>
          <li>선택항목: 이름, 프로필 정보</li>
          <li>자동수집항목: IP 주소, 쿠키, 서비스 이용 기록</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">3. 개인정보의 보유 및 이용기간</h2>
        <p>
          회원 탈퇴 시까지 개인정보를 보유하며, 탈퇴 시 즉시 파기됩니다.
          단, 관련 법령에 따라 일정 기간 보관이 필요한 정보는 해당 기간 동안 보관됩니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">4. 개인정보의 파기</h2>
        <p>
          summy는 개인정보의 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
          단, 관련 법령에 따라 보관이 필요한 정보는 별도 보관 후 기간 종료 시 파기됩니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">5. 이용자 권리</h2>
        <p>
          이용자는 다음과 같은 권리를 행사할 수 있습니다:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>개인정보 열람 요구</li>
          <li>오류 정정 요구</li>
          <li>삭제 요구</li>
          <li>처리정지 요구</li>
          <li>동의 철회</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">6. 개인정보의 안전성 확보 조치</h2>
        <p>
          summy는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>개인정보의 암호화</li>
          <li>해킹 등에 대비한 기술적 대책</li>
          <li>개인정보에 대한 접근 제한</li>
          <li>개인정보 취급 직원의 최소화 및 교육</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">7. 개인정보 자동 수집 장치의 설치/운영 및 거부</h2>
        <p>
          summy는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고
          수시로 불러오는 &apos;쿠키(cookie)&apos;를 사용합니다.
        </p>
      </section>
    </LegalLayout>
  )
} 