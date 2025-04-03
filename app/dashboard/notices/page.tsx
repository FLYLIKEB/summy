'use client';

import { useRouter } from 'next/navigation';
import { BellRing, CalendarClock, PenLine, FileText } from 'lucide-react';
import { ContentList } from '@/components/common';
import { ListItem, CategoryOption } from '@/components/common/types';

// 공지사항 데이터 타입 확장
interface NoticeItem extends ListItem {
  author: string;
  isImportant: boolean;
}

// 지원되는 공지사항 유형 목록
const NOTICE_TYPES: CategoryOption[] = [
  { name: '공지', icon: BellRing },
  { name: '안내', icon: FileText },
  { name: '이벤트', icon: CalendarClock },
];

// 임시 공지사항 데이터
const MOCK_NOTICES: NoticeItem[] = [
  {
    id: 1,
    title: '서비스 점검 안내',
    category: '공지',
    date: '2024-04-01',
    author: '관리자',
    isImportant: true,
    content: '2024년 4월 5일 금요일 02:00 ~ 06:00까지 서비스 점검이 예정되어 있습니다. 해당 시간 동안에는 서비스 이용이 제한될 수 있으니 양해 부탁드립니다.',
  },
  {
    id: 2,
    title: '새로운 기능 추가 안내',
    category: '안내',
    date: '2024-03-28',
    author: '개발팀',
    isImportant: false,
    content: '1. 대화 요약 기능 개선\n2. 다크 모드 지원\n3. 성능 최적화',
  },
  {
    id: 3,
    title: '봄맞이 프로모션 이벤트',
    category: '이벤트',
    date: '2024-03-20',
    author: '마케팅팀',
    isImportant: true,
    content: '4월 한 달간 프리미엄 요약 서비스를 50% 할인된 가격으로 이용하실 수 있습니다. 자세한 내용은 공지사항을 참고해주세요.',
  },
  {
    id: 4,
    title: '개인정보처리방침 개정 안내',
    category: '공지',
    date: '2024-03-15',
    author: '법무팀',
    isImportant: true,
    content: '2024년 4월 1일부터 적용되는 개인정보처리방침이 개정되었습니다. 주요 변경사항은 다음과 같습니다.\n\n1. 개인정보 보관 기간 변경\n2. 제3자 제공 항목 추가\n3. 이용자 권리 행사 방법 명시',
  },
  {
    id: 5,
    title: '사용자 피드백 조사 안내',
    category: '안내',
    date: '2024-03-10',
    author: '서비스팀',
    isImportant: false,
    content: '서비스 개선을 위한 사용자 피드백 조사를 진행하고 있습니다. 설문에 참여하시면 추첨을 통해 소정의 상품을 드립니다.',
  },
];

/**
 * 공지사항 페이지 컴포넌트
 * 관리자가 작성한 공지사항과 안내 사항을 표시
 */
export default function NoticesPage() {
  const router = useRouter();
  
  // 헤더 렌더링 함수
  const renderNoticeHeader = (notice: NoticeItem) => (
    <div>
      <div className="flex items-center gap-2">
        <h3 className="font-medium text-lg mb-1 line-clamp-1">
          {notice.isImportant && (
            <span className="text-red-500 mr-1">●</span>
          )}
          {notice.title}
        </h3>
      </div>
      <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-2">
        {notice.category}
      </span>
    </div>
  );
  
  // 메타데이터 렌더링 함수
  const renderNoticeMeta = (notice: NoticeItem) => (
    <>
      <div className="flex items-center gap-1">
        <span>{notice.date}</span>
      </div>
      <div className="flex items-center gap-1">
        <PenLine className="w-3.5 h-3.5" />
        <span>{notice.author}</span>
      </div>
    </>
  );
  
  // 상세 페이지 이동 핸들러
  const handleViewDetail = (notice: NoticeItem) => {
    router.push(`/dashboard/notices/${notice.id}`);
  };
  
  // 새 공지사항 작성 핸들러
  const handleCreateNotice = () => {
    router.push('/dashboard/notices/new');
  };

  return (
    <ContentList
      items={MOCK_NOTICES}
      categories={NOTICE_TYPES}
      title="공지사항"
      description="서비스 관련 공지사항과 안내 사항을 확인하세요."
      createButtonText="공지사항 작성"
      onCreateItem={handleCreateNotice}
      onViewDetail={handleViewDetail}
      renderHeader={renderNoticeHeader}
      renderMeta={renderNoticeMeta}
      categoryLabel="유형"
      emptyMessage="등록된 공지사항이 없습니다"
      noResultsMessage="검색 결과가 없습니다"
    />
  );
} 