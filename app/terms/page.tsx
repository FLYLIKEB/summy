'use client'

import React from 'react'
import LegalLayout from '../../components/LegalLayout'

export default function TermsPage() {
  return (
    <LegalLayout title="이용약관" lastUpdated="2024년 3월 20일">
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">1. 서비스 소개</h2>
        <p>
          summy는 회의 내용을 자동으로 요약하고 적절한 답변을 제안하는 AI 기반 서비스입니다.
          본 서비스는 사용자가 제공한 회의 내용을 분석하여 요약본을 생성하고, 상황에 맞는 답변을 제안합니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">2. 서비스 이용</h2>
        <p>
          본 서비스는 회원가입을 통해 이용할 수 있습니다. 서비스 이용 시 다음 사항을 준수해야 합니다:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>정확한 정보 제공</li>
          <li>서비스 이용 규칙 준수</li>
          <li>타인의 권리 존중</li>
          <li>서비스의 안정적 운영 방해 금지</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">3. 개인정보 보호</h2>
        <p>
          summy는 사용자의 개인정보를 보호하기 위해 관련 법령을 준수하며,
          개인정보 보호를 위한 보안 시스템을 갖추고 있습니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">4. 서비스 변경 및 중단</h2>
        <p>
          summy는 서비스의 품질 향상을 위해 서비스 내용을 변경할 수 있으며,
          필요한 경우 서비스 제공을 일시적으로 중단할 수 있습니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">5. 회원 탈퇴</h2>
        <p>
          회원은 언제든지 서비스 이용을 중단하고 회원 탈퇴를 요청할 수 있습니다.
          탈퇴 시 보관 중인 개인정보는 즉시 파기됩니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">6. 기타</h2>
        <p>
          본 약관은 대한민국 법률에 따라 규율되고 해석됩니다.
          서비스 이용과 관련하여 발생한 분쟁에 대해 소송이 제기될 경우
          summy의 본사 소재지를 관할하는 법원을 전속관할법원으로 합니다.
        </p>
      </section>
    </LegalLayout>
  )
} 