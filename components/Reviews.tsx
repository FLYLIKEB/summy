'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * 사용자 리뷰 섹션 컴포넌트
 * 
 * 사용자의 실제 후기를 보여주는 캐러셀 형태의 컴포넌트로
 * 서비스의 신뢰도를 높이고 실제 사용자 경험을 공유합니다.
 */
export default function Reviews() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)

  // 리뷰 데이터
  const reviews = [
    {
      id: 1,
      text: "Summy에서 제공하는 요약 기능이 정말 놀라워요! 긴 회의 내용을 몇 분 안에 정리해줘서 업무 효율이 크게 높아졌습니다.",
      author: "김지훈, 마케팅 매니저",
      rating: 5
    },
    {
      id: 2,
      text: "다양한 메신저 대화를 한 번에 요약해주는 기능이 가장 마음에 들어요. 여러 채널을 오가며 정보를 찾을 필요가 없어졌어요.",
      author: "이수진, 프리랜서 디자이너",
      rating: 5
    },
    {
      id: 3,
      text: "회의 시간을 60% 이상 줄일 수 있게 되었어요. Summy는 우리 팀의 필수 도구가 되었습니다!",
      author: "박민수, 개발팀 리더",
      rating: 5
    }
  ];

  // 이전 리뷰로 이동
  const goToPreviousReview = () => {
    setCurrentReviewIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  // 다음 리뷰로 이동
  const goToNextReview = () => {
    setCurrentReviewIndex((prevIndex) => 
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="py-20 bg-apple-dark overflow-hidden" aria-labelledby="reviews-section-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            id="reviews-section-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-medium text-white cursor-pointer"
            onClick={() => {
              const reviewsSection = document.getElementById('reviews')
              if (reviewsSection) {
                reviewsSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            title="사용자 후기 섹션으로 이동"
          >
            사용자 후기
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-sm sm:text-base text-white/70 max-w-2xl mx-auto"
          >
            summy가 가져온 소통의 변화, 직접 경험해보세요
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-3xl mx-auto relative"
          aria-labelledby="review-carousel"
        >
          <h3 id="review-carousel" className="sr-only">사용자 리뷰 캐러셀</h3>
          <div className="bg-white bg-opacity-[0.03] rounded-xl overflow-hidden backdrop-blur-sm border border-white-opacity-04">
            <div className="p-6 sm:p-8 md:p-10 text-center">
              <div className="flex justify-center gap-1 mb-4" aria-label={`평점 ${reviews[currentReviewIndex].rating}점`}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                ))}
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReviewIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="min-h-[120px] flex items-center justify-center"
                >
                  <p className="text-base sm:text-lg md:text-xl text-white max-w-2xl mx-auto">
                    "{reviews[currentReviewIndex].text}"
                  </p>
                </motion.div>
              </AnimatePresence>
              
              <motion.p 
                key={reviews[currentReviewIndex].author}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm sm:text-base text-white/60 mt-4"
              >
                {reviews[currentReviewIndex].author}
              </motion.p>
              
              {/* 페이지네이션 인디케이터 */}
              <div className="flex justify-center gap-2 mt-6">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReviewIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all focus-visible-ring ${
                      index === currentReviewIndex 
                        ? 'bg-white-opacity-20' 
                        : 'bg-white-opacity-05'
                    }`}
                    aria-label={`${index + 1}번째 리뷰로 이동`}
                    aria-current={index === currentReviewIndex ? 'true' : 'false'}
                  />
                ))}
              </div>
            </div>
            
            {/* 네비게이션 버튼 */}
            <div className="absolute top-1/2 transform -translate-y-1/2 left-2 sm:left-4">
              <button 
                onClick={goToPreviousReview}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white-opacity-05 hover:bg-white-opacity-10 transition-all flex items-center justify-center focus-visible-ring"
                aria-label="이전 리뷰"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              </button>
            </div>
            
            <div className="absolute top-1/2 transform -translate-y-1/2 right-2 sm:right-4">
              <button 
                onClick={goToNextReview}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white-opacity-05 hover:bg-white-opacity-10 transition-all flex items-center justify-center focus-visible-ring"
                aria-label="다음 리뷰"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 