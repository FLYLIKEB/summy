'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { IconType } from 'react-icons'
import { LucideIcon } from 'lucide-react'

// 네비게이션 항목 타입 정의
interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarNavigationProps {
  isOpen: boolean;
  navigation: NavigationItem[];
}

export default function SidebarNavigation({ isOpen, navigation }: SidebarNavigationProps) {
  const pathname = usePathname()
  
  return (
    <nav className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin">
      <ul className="space-y-1">
        {navigation.map((item) => {
          // 대시보드는 정확히 일치할 때만 활성화, 다른 항목은 해당 경로로 시작할 때 활성화
          const isActive = 
            item.href === '/dashboard' 
              ? pathname === '/dashboard' 
              : pathname.startsWith(item.href);
          
          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white-opacity-06 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white-opacity-03'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white/60'}`} />
                <motion.span
                  initial={{ opacity: 1, width: "auto" }}
                  animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? "auto" : 0 }}
                  transition={{ duration: 0.2 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  {item.name}
                </motion.span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
} 