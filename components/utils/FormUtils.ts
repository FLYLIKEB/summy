import axios from 'axios'
import { SCRIPT_URL, VisitorIdUtils } from '../utils/VisitorUtils'

export class FormUtils {
  static validateEmail(email: string): boolean {
    const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    return re.test(email)
  }

  static async submitFeedback(email: string, advice: string): Promise<boolean> {
    if (!email || !this.validateEmail(email)) {
      throw new Error("이메일이 유효하지 않습니다.")
    }

    const finalData = JSON.stringify({
      id: VisitorIdUtils.getUVfromCookie(),
      email: email,
      advice: advice
    })

    try {
      const response = await axios.get(
        `${SCRIPT_URL}?action=insert&table=tab_final&data=${finalData}`
      )
      console.log('피드백 제출 성공:', response.data.data)
      return true
    } catch (error) {
      console.error('피드백 제출 실패:', error)
      throw new Error("피드백 제출 중 오류가 발생했습니다.")
    }
  }
} 