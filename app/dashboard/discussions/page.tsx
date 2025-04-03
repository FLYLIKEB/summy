'use client';

import { useRouter } from 'next/navigation';
import { HelpCircle, MessageSquare, Zap, Award, User } from 'lucide-react';
import { ContentList } from '@/components/common';
import { ListItem, CategoryOption } from '@/components/common/types';

// 토론/질문 데이터 타입 확장
interface DiscussionItem extends ListItem {
  author: string;
  commentCount: number;
  likes: number;
  solved: boolean;
}

// 지원되는 토론/질문 유형 목록
const DISCUSSION_TYPES: CategoryOption[] = [
  { name: '질문', icon: HelpCircle },
  { name: '토론', icon: MessageSquare },
  { name: '팁', icon: Zap },
  { name: '성과', icon: Award },
];

// 임시 토론/질문 데이터
const MOCK_DISCUSSIONS: DiscussionItem[] = [
  {
    id: 1,
    title: '대화 요약 결과가 정확하지 않을 때 어떻게 해야 하나요?',
    category: '질문',
    date: '2024-04-02',
    author: '초보자123',
    commentCount: 8,
    likes: 5,
    solved: true,
    content: '몇몇 대화를 요약했는데 중요한 내용이 누락되는 경우가 있습니다. 정확도를 높이기 위한 팁이 있을까요?',
  },
  {
    id: 2,
    title: '요약 서비스의 발전 방향에 대한 토론',
    category: '토론',
    date: '2024-04-01',
    author: '미래주의자',
    commentCount: 15,
    likes: 12,
    solved: false,
    content: '앞으로 대화 요약 서비스가 나아가야 할 방향에 대해 의견을 나누고 싶습니다. AI 기술의 발전과 함께 어떤 기능이 추가되면 좋을까요?',
  },
  {
    id: 3,
    title: '효율적인 대화 요약을 위한 5가지 팁',
    category: '팁',
    date: '2024-03-30',
    author: '전문가준',
    commentCount: 7,
    likes: 23,
    solved: false,
    content: '1. 핵심 키워드 먼저 입력하기\n2. 대화 주제 명확히 설정하기\n3. 불필요한 메시지 미리 제외하기\n4. 요약 길이 적절히 조정하기\n5. 요약 후 검토 과정 추가하기',
  },
  {
    id: 4,
    title: '회사 회의 요약으로 업무 효율 30% 향상 사례',
    category: '성과',
    date: '2024-03-25',
    author: '효율맥스',
    commentCount: 6,
    likes: 19,
    solved: false,
    content: '우리 팀은 매일 진행되는 스탠드업 미팅을 이 서비스로 요약하여 업무 효율성을 크게 높였습니다. 구체적인 도입 과정과 결과를 공유합니다.',
  },
  {
    id: 5,
    title: '영어 대화 요약이 잘 안되는 문제',
    category: '질문',
    date: '2024-03-20',
    author: '글로벌워커',
    commentCount: 12,
    likes: 8,
    solved: true,
    content: '한국어 대화는 잘 요약되는데 영어로 된 대화를 업로드하면 요약 품질이 떨어집니다. 해결 방법이 있을까요?',
  },
];

/**
 * 토론/질문 게시판 페이지 컴포넌트
 * 사용자들이 서로 질문하고 정보를 공유하는 게시판
 */
export default function DiscussionsPage() {
  const router = useRouter();
  
  // 헤더 렌더링 함수
  const renderDiscussionHeader = (discussion: DiscussionItem) => (
    <div>
      <div className="flex items-center gap-2">
        <h3 className="font-medium text-lg mb-1 line-clamp-1">
          {discussion.solved && discussion.category === '질문' && (
            <span className="text-green-500 mr-1">[해결]</span>
          )}
          {discussion.title}
        </h3>
      </div>
      <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-2">
        {discussion.category}
      </span>
    </div>
  );
  
  // 메타데이터 렌더링 함수
  const renderDiscussionMeta = (discussion: DiscussionItem) => (
    <>
      <div className="flex items-center gap-1">
        <User className="w-3.5 h-3.5" />
        <span>{discussion.author}</span>
      </div>
      <div className="flex items-center gap-1">
        <span>{discussion.date}</span>
      </div>
      <div className="flex items-center gap-1">
        <MessageSquare className="w-3.5 h-3.5" />
        <span>답변 {discussion.commentCount}</span>
      </div>
      <div className="flex items-center gap-1">
        <Zap className="w-3.5 h-3.5" />
        <span>좋아요 {discussion.likes}</span>
      </div>
    </>
  );
  
  // 상세 페이지 이동 핸들러
  const handleViewDetail = (discussion: DiscussionItem) => {
    router.push(`/dashboard/discussions/${discussion.id}`);
  };
  
  // 새 글 작성 핸들러
  const handleCreateDiscussion = () => {
    router.push('/dashboard/discussions/new');
  };

  return (
    <ContentList
      items={MOCK_DISCUSSIONS}
      categories={DISCUSSION_TYPES}
      title="토론 & 질문"
      description="다른 사용자들과 질문하고 정보를 공유하세요."
      createButtonText="글 작성하기"
      onCreateItem={handleCreateDiscussion}
      onViewDetail={handleViewDetail}
      renderHeader={renderDiscussionHeader}
      renderMeta={renderDiscussionMeta}
      categoryLabel="유형"
      emptyMessage="등록된 글이 없습니다"
      noResultsMessage="검색 결과가 없습니다"
    />
  );
} 