'use client'

import React from 'react'
import { useEffect, useState, useRef } from 'react'
import axios, { AxiosError } from 'axios'
import { VisitorIdUtils, VisitorData, VisitorCount, SCRIPT_URL } from '@/components/utils/VisitorUtils'

// 고유 방문자 ID 생성/가져오기
export const getUVfromCookie = () => {
  const hash = Math.random().toString(36).substring(2, 8).toUpperCase()
  const existingHash = getCookieValue('user')
  
  if (!existingHash) {
    console.log('새로운 방문자 ID 생성:', hash)
    setCookieValue('user', hash, 180)
    return hash
  }
  console.log('기존 방문자 ID 사용:', existingHash)
  return existingHash
}

// 쿠키 값 가져오기
const getCookieValue = (name: string) => {
  const value = '; ' + document.cookie
  const parts = value.split('; ' + name + '=')
  if (parts.length === 2) return parts.pop()?.split(';').shift()
}

// 쿠키 값 설정
const setCookieValue = (name: string, value: string, days: number) => {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toUTCString()
  }
  
  // SameSite=None과 Secure 속성 추가
  document.cookie = `${name}=${value || ''}${expires}; path=/; SameSite=None; Secure`
  console.log('쿠키 설정 완료:', name, value, days)
}

export default function VisitorTracking() {
  const [visitorCount, setVisitorCount] = useState<VisitorCount>({ total: 0, today: 0 })
  const isTracking = useRef(false)
  const visitorId = useRef<string | null>(null)

  useEffect(() => {
    const trackVisitor = async () => {
      // 이미 추적 중이면 중복 실행 방지
      if (isTracking.current) return
      isTracking.current = true

      console.log('방문자 추적 시작')
      try {
        // 방문자 ID 생성/가져오기
        if (!visitorId.current) {
          visitorId.current = VisitorIdUtils.getUVfromCookie()
        }

        // IP 주소와 방문자 데이터를 병렬로 처리
        const [ipResponse, visitorResponse] = await Promise.all([
          axios.get('https://api.ipify.org?format=json'),
          axios.get(`${SCRIPT_URL}?action=read&table=visitors`, {
            withCredentials: false,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
        ])

        const ipAddress = ipResponse.data.ip
        console.log('IP 주소:', ipAddress)

        // 방문자 수 업데이트
        updateVisitorCount(visitorResponse);

        // UTM 파라미터 가져오기
        const urlParams = new URLSearchParams(window.location.search)
        const utm = urlParams.get('utm') || 'direct'
        console.log('UTM 파라미터:', utm)

        // 디바이스 타입 확인
        const userAgent = navigator.userAgent.toLowerCase()
        const device = /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent) 
          ? 'mobile' 
          : 'desktop'
        console.log('디바이스 타입:', device)

        // 방문자 데이터 생성
        const visitorData: VisitorData = {
          id: visitorId.current,
          landingUrl: window.location.href,
          ip: ipAddress,
          referer: document.referrer || 'direct',
          time_stamp: new Date().toISOString(),
          utm: utm,
          device: device
        }
        console.log('방문자 데이터:', visitorData)

        // 방문자 데이터 전송
        console.log('방문자 데이터 전송 중...')
        const encodedData = encodeURIComponent(JSON.stringify(visitorData))
        const response = await axios.get(
          `${SCRIPT_URL}?action=insert&table=visitors&data=${encodedData}`,
          {
          withCredentials: false,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            maxRedirects: 0
          }
        )
        console.log('방문자 데이터 전송 완료:', response.data)

      } catch (error) {
        console.error('방문자 추적 중 오류 발생:', error)
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError
          if (axiosError.response) {
            console.error('응답 오류:', axiosError.response.data)
            console.error('상태 코드:', axiosError.response.status)
          } else if (axiosError.request) {
            console.error('요청 오류:', axiosError.request)
          } else {
            console.error('오류 메시지:', axiosError.message)
          }
        } else {
          console.error('알 수 없는 오류:', error)
        }
      } finally {
        isTracking.current = false
      }
    }

    trackVisitor()
  }, [])

  const updateVisitorCount = (visitorResponse: any) => {
    if (visitorResponse.data?.success && visitorResponse.data?.data?.length > 0) {
      const visitorDatas = visitorResponse.data.data
      // 방문자 수 계산
      const today = new Date().toISOString().split('T')[0]
      const todayVisitors = visitorDatas.filter(
        (visitor: VisitorData) => visitor.time_stamp.split('T')[0] === today
      )
      const totalVisitors = visitorDatas.length
      const newCount: VisitorCount = {
        total: totalVisitors || 0,
        today: todayVisitors.length || 0
      }
      console.log('새로운 방문자 수:', newCount)
      setVisitorCount(newCount)
    }
  }

  return (
    <div className="text-center md:text-left">
      <div className="text-sm text-white/60 mb-4">
        <span className="text-sm text-white/60 mb-4">오늘 방문자 : </span>
        <span className="text-sm text-white/60 mb-4">{visitorCount.today}</span>
        <span className="text-sm text-white/60 mb-4"> / 총 방문자 : </span>
        <span className="text-sm text-white/60 mb-4">{visitorCount.total}</span>
      </div>
    </div>
  )
} 