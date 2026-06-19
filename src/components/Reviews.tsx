import React from 'react';
import { Review } from '../types';
import { Star, MessageSquareCode, BadgeCheck } from 'lucide-react';

interface ReviewsProps {
  reviews: Review[];
}

export default function Reviews({ reviews }: ReviewsProps) {
  return (
    <section id="reviews-section" className="scroll-mt-12 bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3.5 mb-14 md:mb-18">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Client Success
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            백개 가량의 SNS 실황 리얼 후기
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm sm:text-base">
            동아리 회장님부터 로컬 베이커리 대표님까지, 3일의 신속함과 고퀄리티 모바일 최적화에 만족하신 솔직한 메시지입니다.
          </p>
        </div>

        {/* Testimonials Grid Layout */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              id={`review-card-${rev.id}`}
              className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-sm border border-gray-150/70 hover:shadow-md transition-all text-left"
            >
              <div className="space-y-4">
                {/* Visual Rating Indicator bar */}
                <div className="flex items-center justify-between">
                  {/* Stars Group */}
                  <div className="flex items-center space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4.5 w-4.5 ${
                          i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Certified badge */}
                  <span className="inline-flex items-center gap-1 text-9px font-bold text-emerald-600 rounded bg-emerald-50 px-2 py-0.5 border border-emerald-100 uppercase">
                    <BadgeCheck className="h-3 w-3 shrink-0" />
                    <span>인증 고객</span>
                  </span>
                </div>

                {/* Review Message Text */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-semibold font-sans italic">
                  "{rev.content}"
                </p>
              </div>

              {/* Reviewer Bio */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-900">{rev.author}</p>
                  <p className="text-10px text-indigo-600 font-bold mt-0.5">{rev.projectType}</p>
                </div>
                <span className="font-mono text-10px text-gray-400 font-semibold">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Global Statistics Score card */}
        <div className="mt-14 max-w-3xl mx-auto rounded-3xl bg-gray-900 p-8 text-white grid grid-cols-1 sm:grid-cols-3 gap-6 text-center shadow-lg relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl"></div>

          <div className="space-y-1">
            <p className="text-3xl font-black text-indigo-400 tracking-tight font-mono">99.8%</p>
            <p className="text-xs text-gray-400 font-bold">고객 만족 희망도</p>
          </div>
          <div className="space-y-1 border-t sm:border-t-0 sm:border-x border-white/15 py-4 sm:py-0">
            <p className="text-3xl font-black text-indigo-400 tracking-tight font-mono">1.2일</p>
            <p className="text-xs text-gray-400 font-bold">평균 1차 피드백 도달속도</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black text-indigo-400 tracking-tight font-mono">250+</p>
            <p className="text-xs text-gray-400 font-bold">누적 포트폴리오 연동완료</p>
          </div>
        </div>

      </div>
    </section>
  );
}
