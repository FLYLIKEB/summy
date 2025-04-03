import { LayoutDashboard, MessageSquare, Settings } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

// 네비게이션 항목 타입 정의
export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

// 네비게이션 항목 설정
export const navigation: NavigationItem[] = [
  {
    name: '대시보드',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: '요약 내역',
    href: '/dashboard/summaries',
    icon: MessageSquare,
  },
  {
    name: '설정',
    href: '/dashboard/settings',
    icon: Settings,
  },
] 