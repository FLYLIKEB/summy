// 쿠키 관련 유틸리티 함수들
export class CookieUtils {
  static getCookieValue(name: string): string | undefined {
    const value = '; ' + document.cookie
    const parts = value.split('; ' + name + '=')
    if (parts.length === 2) return parts.pop()?.split(';').shift()
  }

  static setCookieValue(name: string, value: string, days: number): void {
    let expires = ''
    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
      expires = '; expires=' + date.toUTCString()
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/'
    console.log('쿠키 설정 완료:', name, value, days)
  }
}

// 방문자 ID 관련 유틸리티 클래스
export class VisitorIdUtils {
  static getUVfromCookie(): string {
    const hash = Math.random().toString(36).substring(2, 8).toUpperCase()
    const existingHash = CookieUtils.getCookieValue('user')
    
    if (!existingHash) {
      console.log('새로운 방문자 ID 생성:', hash)
      CookieUtils.setCookieValue('user', hash, 180)
      return hash
    }
    console.log('기존 방문자 ID 사용:', existingHash)
    return existingHash
  }
}

// 방문자 데이터 인터페이스
export interface VisitorData {
  id: string
  landingUrl: string
  ip: string
  referer: string
  time_stamp: string
  utm: string
  device: string
}

// 방문자 수 인터페이스
export interface VisitorCount {
  total: number
  today: number
}

// Google Apps Script 웹 앱 URL
export const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxCD5NYRDP-9-BHcBUGvFgELesMKX4NJ3Vr9xcA9I7zNHW6X7A5HAsebQcOp00_qh1s9w/exec'